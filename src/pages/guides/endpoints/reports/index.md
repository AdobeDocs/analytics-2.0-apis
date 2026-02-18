---
title: Reporting API
description: Use the Reporting API to create data for reports or retrieve from a specified report suite.
---

# Reporting API

The **Report** endpoint is the core mechanism for retrieving data from Adobe Analytics 2.0 APIs. It enables you to generate fully customized reports by defining metrics, dimensions, date ranges, filters, and breakdowns in a single request body.

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

# When to use the Report endpoint

Use the Report endpoint when you need:

- Custom metric and dimension combinations
- Time-series analysis
- Filtered and segmented reporting
- Nested breakdowns
- Anomaly analysis
- Realtime reporting
- Programmatic report generation for dashboards or automation

The Report endpoint is designed for flexibility and scalability, supporting both simple KPI queries and advanced analytical workflows.

# Report types and guides

Use the following guides to build specific types of reports:

* [**Realtime Reports**](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/reports/real-time/): Generate low-latency reports for near-live activity monitoring.

* [**Date-Trended Basic Report (KPI Report)**](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/reports/kpi/): Create date-trended reports to track key performance indicators over time.

* [**Anomaly Detection Report**](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/reports/anomaly/): Identify statistically significant deviations in your data using anomaly detection.

* [**Report Search Filters**](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/reports/search-filters/): Apply advanced filtering logic to refine report results.

* [**Breakdown Reports**](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/reports/breakdowns/): Generate multi-level reports by breaking down dimension items into additional dimensions.

* [**Analysis Workspace Debugger**](debugger.md): Use Oberon in Analysis Workspace to see XML and API calls with JSON debugger.
  
