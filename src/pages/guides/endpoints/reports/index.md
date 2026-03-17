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

- [**Report Search Filters**](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/reports/search-filters/): Apply advanced filtering logic to refine report results.

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


