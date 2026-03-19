---
title: Reporting API overview
description: Use the Reporting API to create data for reports or retrieve from a specified report suite.
---

# Reporting API overview

The **Report** endpoint is the core mechanism for retrieving data from Adobe Analytics 2.0 APIs. It enables you to generate fully customized reports by defining metrics, dimensions, date ranges, filters, and breakdowns in a single request body. Use the Report endpoint when you need:

- Custom metric and dimension combinations
- Time-series analysis
- Filtered and segmented reporting
- Nested breakdowns
- Anomaly analysis
- Realtime reporting
- Programmatic report generation for dashboards or automation

The Report endpoint is designed for flexibility and scalability, supporting both simple KPI queries and advanced analytical workflows.

For instructions on building specific types of API reports, see the following guides:

- [**Reporting API first calls**](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/reports/real-time/): Get a top items report and create a new report for pageviews, visits, and vistors.

- [**Anomaly detection report**](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/reports/anomaly/): Identify statistically significant deviations in your data using anomaly detection.

- [**Breakdown reports**](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/reports/breakdowns/): Generate multi-level reports by breaking down dimension items into additional dimensions.

- [**Date-trended basic report (KPI report)**](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/reports/kpi/): Create date-trended reports to track key performance indicators over time.

- [**Date-trended advanced report**](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/reports/advanced/): Create advanced date-trended API reports using date range comparisons and segments.

- [**Debugger for Analysis Workspace**](debugger.md): Use Oberon in Analysis Workspace to see XML and API calls with JSON debugger.
  
- [**Realtime Reports**](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/reports/real-time/): Generate low-latency reports for near-live activity monitoring.

- [**Report search filters**](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/reports/search-filters/): Apply advanced filtering logic to refine report results.

## Creating API Reports

Most Adobe Analytics reports are generated using the **`POST`** method. This design allows you to submit a structured JSON payload that defines:

- The report suite (`rsid`)
- Global and metric-specific filters
- Dimensions and metrics
- Date ranges
- Sorting and pagination settings
- Breakdowns and nested queries

Using `POST` provides the flexibility required for complex analytical queries, including multi-level breakdowns, anomaly detection, and advanced filtering.

### Exception: GET top items report

- [**GET top items report**](https://developer.adobe.com/analytics-apis/docs/2.0/apis/#operation/runTopItemReport)

This endpoint uses the `GET` method and is designed specifically for retrieving top dimension items in a simplified format. It does not support the full report definition structure available through `POST /reports`.

Unless you are using the Top Items report, all report generation should use `POST`.

## Report APIs provide data structures, not visualizations

When you design reports via the Report API, you interact with the data foundation used by Analysis Workspace or another intelligence tool. API structures do not specify the presentation layers built on top of the data. You will not see a visualization parameter type in the JSON request or response.

## Using `dimension` in report payload requests

The `dimension` object member is not required in report request payloads. When no dimension is provided:

- The request is effectively a **Totals** report.
- The response contains only `summaryData` with totals for the requested metrics over the specified date range.
- The `rows` array will be absent or empty. No dimension breakdown will be provided in the respone body.

### Example: Totals report (no dimension)

To retrieve only `metric` totals for a date range, omit the dimension property from the report request. The response will contain `summaryData` totals only and no rows.

## Date-range formatting

When specifying date ranges within the `globalFilters` array of objects, you can use any of three supported formats:

1. Absolute Date Range (Existing)
ISO 8601 format with start and end dates separated by /
Format: <start_date>/<end_date>
Examples:
"2024-01-01T00:00:00.000/2024-02-01T00:00:00.000"
"2024-01-01T00:00/2024-02-01T00:00"
2. Date Formula (New)
Dynamic date ranges using formula syntax, evaluated relative to the Report Suite (AA) or DataView (CJA) timezone.
Format: start_formula/end_formula
Base Units:
Code	Meaning
th	This hour
td	This day
tw	This week
tm	This month
tq	This quarter
ty	This year
Shift Modifiers: Add + or - followed by a number and unit
Modifier	Meaning
+/-Nh	Hours
+/-Nd	Days
+/-Nw	Weeks
+/-Nm	Months
+/-Nq	Quarters
+/-Ny	Years
Examples:
Formula	Meaning
th-24h/th	Last 24 hours
td-7d/td	Last 7 days
tm-1m/tm	Last month
tq-1q/tq	Last quarter
ty-1y/ty	Last year
td/td+1d	Today
tw/tw+1w	This week
3. Mixed Format (New)
Combine an absolute date with a formula.
Examples:
"2024-01-01T00:00:00/th" — From Jan 1, 2024 to now
"tm-1m/2024-06-01T00:00:00" — From start of last month to June 1, 2024
Notes
Formulas are evaluated in the Report Suite timezone (AA) or DataView timezone (CJA)
If timezone is not configured, an error is returned: "Could not determine timezone for dataId=<dataId>"
This applies to Ranked reports only (non-real-time)
The existing dateRangeRelative field remains available for Real-Time reports only






