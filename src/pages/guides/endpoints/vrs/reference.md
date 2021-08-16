---
title: JSON body reference
description: List of all JSON objects you can use with the Virtual report suite API.
---

# JSON body reference

Use the following object parameters when creating or editing virtual report suites. See also [Examples](examples.md) for context around how to use them.

## VirtualReportSuite

| Attribute | Type | Description |
| --- | --- | ---------- |
| `name` | `string` | User defined friendly name of the virtual report suite |
| `id` | `string` | The unique id for the virtual report suite. System generated. |
| `rsid` | `string` | Same as `id`. Included so normal and virtual report suites can both use this `rsid` attribute. System generated. |
| `parentRsid` | `string` | The id of the report suite from which this virtual report suite inherits data and settings (The Analytics UI calls this `Source`) |
| `parentRsidName` | `string` | Friendly name of the parent report suite |
| `description` | `string` | Description of the purpose of the virtual report suite |
| `timezone` | `integer` | Timezone ID. Use the `reportsuites/reportsuites/timezones` endpoint to retrieve a lookup of values. Valid integers range from `0`-`74`. |
| `currentTimezoneOffset` | `integer` | Timezone offset from GMT |
| `timezoneZoneinfo` | `string` | Friendly timezone name |
| `segmentList` | Array of `string` | List of segment ids to be used to filter the data for this virtual report suite. Retrieve segment IDs using the [Segments API](../segments/index.md). |
| `globalCompanyKey` | `string` | The global company id of the Analytics Company that owns the virtual report suite |
| `modified` | `string` (date-time) | The date and time the virtual report suite was last modified. System generated. |
| `dataCurrentAsOf` | `string` (date-time) | Timestamp of the most recent data that is processed and ready for reporting for this report suite. System generated. |
| `type` | `string` | The virtual report suite type. System generated.<br />**advancedVrs**: A VRS is advanced if `dataSchema` is `CacheAndMid` or `Stitched`.<br />**vrs**: A VRS is basic if `dataSchema` is set to `Cache` |
| `dataSchema` | `string` | Defines the data schema type for the virtual report suite.<br />**Cache**: Basic `dataSchema` type. Does not allow setting `sessionDefinition` or CDA.<br />**CacheAndMid**: Must use this `dataSchema` if `sessionDefinition` is provided.<br />**Stitched**: Enables [Cross-Device Analytics](https://docs.adobe.com/content/help/en/analytics/components/cda/cda-home.html). |
| `internal` | `boolean` | Adobe-use only |
| `isDeleted` | `boolean` | Indicates if the virtual report suite has been deleted. Virtual report suites are not actually removed from the database. This flag is set to true instead. |
| `curationEnabled` | `boolean` | Indicates if curation is enabled for the virtual report suite. |
| `curatedComponents` | Array of [CuratedComponent](#curatedcomponent) | List of components to curate. |
| `sessionDefinition` | Array of [SessionDefinitionOptions](#sessiondefinitionoptions) | Used to enable report time processing and change session timeout rules (The Analytics UI calls this `Visit Definition`) |
| `owner` | [Owner](#owner) | Information about the Analytics user that owns the virtual report suite. |
| `compatibility` | [VrsCompatibility](#vrscompatibility) | Contains information about if the virtual report suite definition is valid and the products with which it is compatible. |
| `backgroundSessionsEnabled` | `boolean` | Indicates if background hits will start a new visit. See [Context-aware sessions - Background Hit Processing](https://docs.adobe.com/content/help/en/analytics/components/virtual-report-suites/vrs-mobile-visit-processing.html#background-hit-processing) for more information. |

## CuratedComponent

| Attribute | Type | Description |
| --- | --- | ---------- |
| `componentId` | `string` | The id of the component to curate. Depends on `componentType` |
| `componentType` | `string` | The type of component to curate. dimension, metric | 
| `curatedName` | `string` | The curated name of the component. User defined |


## SessionDefinitionOptions

| Attribute | Type | Description |
| --- | --- | ---------- |
| `func` | `string` | Session definition option type.<br />**inactivity**: Defines the amount of inactivity a unique visitor must have before a new visit is automatically started.<br />**beforeEvents**: A new session starts when any of these events are fired regardless of whether a session has timed out. The new session that is created includes the event that started it. |
| `numPeriods` | `integer` | Number of periods of the selected granularity before a new visit is started when using `inactivity` type. |
| `granularity` | `string` | Granularity selection when using `inactivity` type. Valid values include `minute`, `hour`, `day`, or `week`. |
| `events` | Array of `string` | List of metrics ids (events) that start a new session when using `beforeEvents` type. For example, `metrics/orders` |

## Owner

| Attribute | Type | Description |
| --- | --- | ---------- |
| `id` | `integer` | Analytics integer id for the user. System generated. |
| `name` | `string` | Analytics user friendly name. |
| `login` | `string` | Analytics login name. |

## VrsCompatibility

| Attribute | Type | Description |
| --- | --- | ---------- | 
| `valid` | `boolean` | Indicates if the virtual report suite definition is valid. |
| `validator_version` | `string` | Virtual report suite validator version |
| `message` | `string` | Message with more information about what is wrong with the virtual report suite definition if it is invalid |
| `supported_products` | Array of `string` | List of Analytics products with which the virtual report suite is compatible. Valid values include `analysis_workspace`, `reports_and_analytics`, `ad_hoc_analysis`, `report_builder`, and `data_warehouse`. |
