---
title: Component Migration API
description: Use Analytics Component Migration APIs to migrate components from Adobe Analytics to CJA.
---

# Component Migration API

Use this API to migrate components (dimensions, metrics, segments, calculated metrics, and date ranges) from Adobe Analytics to Customer Journey Analytics. See the [Component Migration overview](https://experienceleague.adobe.com/en/docs/analytics/admin/admin-tools/component-migration/component-migration) for more information regarding component migration.

The endpoints described in this guide are routed through `analytics.adobe.io`. To use them, you must first create a client with access to the Adobe Developer Console. For more information, see [Getting started with the Analytics API](https://developer.adobe.com/analytics-apis/docs/2.0/guides/) for more information.

This guide includes instructions for the following services and endpoints:

**Components Migration Service**
- `POST /projects/{projectId}/migrate` - Migrate components for a specific project
- `GET /projects/{projectId}/summary` - Get migration summary for a project

**Dimension Mapping Service**
- `GET /dimensions` - Get all dimensions
- `GET /dimensions/{aaId}` - Get specific dimension
- `POST /dimensions/map` - Map dimensions
- `DELETE /dimensions/map/{aaId}` - Delete dimension mapping

**Metric Mapping Service**
- `GET /metrics` - Get all metrics
- `GET /metrics/{aaId}` - Get specific metric
- `POST /metrics/map` - Map metrics
- `DELETE /metrics/map/{aaId}` - Delete metric mapping


