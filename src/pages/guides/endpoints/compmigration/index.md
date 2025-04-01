---
title: Component Migration API
description: Use Analytics Component Migration APIs to migrate components from Adobe Analytics to CJA.
---

# Component Migration API

Use this API to migrate components (dimensions, metrics, segments, calculated metrics, and date ranges) from Adobe Analytics to Customer Journey Analytics. See the [Component Migration overview](https://experienceleague.adobe.com/en/docs/analytics/admin/admin-tools/component-migration/component-migration) for more information regarding component migration.

The endpoints described in this guide are routed through `analytics.adobe.io`. To use them, you must first create a client with access to the Adobe Developer Console. For more information, see [Getting started with the Analytics API](https://developer.adobe.com/analytics-apis/docs/2.0/guides/) for more information.

This guide includes instructions for three API services:

**Components Migration Service**

The Components Migration Service includes the following endpoints for migrating components From Adobe Analytics to Customer Journey Analytics:

* POST /projects/{projectId}/migrate: Creates a project migration
* GET /projects/{projectId}/summary: Retrieves migration summary for a project

**Dimension Mapping Service**

The Dimension Mapping service includes the following endpoints for performing dimension mapping operations:

* GET /dimensions/csv: Retrieves all dimensions from a csv file
* PUT /dimensions/csv: Updates dimension mappings with a csv file
* POST /dimensions/map/csv: Creates a dimensions mapping with a csv file
* DELETE /dimensions/map/all - Deletes all dimension mappings

**Metric Mapping Service**

The Metric Mapping service includes the following endpoints for performing metric mapping operations:

- `GET /metrics` - Get all metrics
- `GET /metrics/{aaId}` - Get specific metric
- `POST /metrics/map` - Map metrics
- `DELETE /metrics/map/{aaId}` - Delete metric mapping


