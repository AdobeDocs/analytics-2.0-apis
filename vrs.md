# Virtual Report Suite API Guide
The following guide provides information about the Virtual Report Suite APIs. We recommend using the [Report Suite APIs in the Swagger UI](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Report%20Suite%20APIs) to learn how to make these API calls.

For documentation about Virtual Report Suites see the [Virtual Report Suites Overview](https://docs.adobe.com/content/help/en/analytics/components/virtual-report-suites/vrs-about.html)

## Virtual Report Suite Schema
This section contains the schema for Virtual Report Suites and details about what each attribute means.

### VirtualReportSuite
| Attribute | Type | Description | Possible Values |
| --- | --- | ---------- | ----- |
| name | string | User defined friendly name of the virtual report suite | User defined |
| id | string | The unique id for the virtual report suite | System generated |
| rsid | string | Same as `id`. Included so normal and virtual report suites can both use this `rsid` attribute | System generated |
| parentRsid | string | The id of the report suite from which this virtual report suite inherits data and settings (The Analytics UI calls this `Source`) | |
| parentRsidName | string | Friendly name of the parent report suite | |
| description | string | Description of the purpose of the virtual report suite | User defined |
| timezone | integer | Timezone id. See the [/reportsuites/timezones API](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Report%20Suite%20APIs#/Timezone/getTimezones_1) to get all supported timezones | 0-74 |
| currentTimezoneOffset | integer | Timezone offset from GMT | |
| timezoneZoneinfo | string | Friendly timezone name | *Example*: US/Mountain |
| segmentList | Array of string | List of segment ids to be used to filter the data for this virtual report suite. Segment ids can be retrieved using the [Segments APIs](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Analytics%20Reporting%20APIs#/segments/segments_getSegments) | |
| globalCompanyKey | string | The global company id of the Analytics Company that owns the virtual report suite | |
| modified | string (date-time) | The date and time the virtual report suite was last modified | System generated |
| dataCurrentAsOf | string (date-time) | Timestamp of the most recent data that is processed and ready for reporting for this report suite | System generated |
| type | string | The virtual report suite type | System generated <br />**advancedVrs** - A virtual report suite is considered advanced if the dataSchema is CacheAndMid or Stitched. These types of virtual report suites are typically only supported in Analysis Workspace. <br />**vrs** - a virtual report suite will return this type if the dataSchema is set to Cache |
| dataSchema | string | Defines the data schema type for the virtual report suite | **Cache** - Most basic dataSchema type. Does not allow setting sessionDefinition or enabling visitor stitching. <br />**CacheAndMid** - Must use this dataSchema if sessionDefinition is provided. <br />**Stitched** - Enables visitor stitching. Indicates that a VRS has stitching enabled and uses stitched data. For more information see [Cross-Device Analytics](https://docs.adobe.com/content/help/en/analytics/components/cda/cda-home.html) |
| internal | boolean | Indicates if the virtual report suite was created by the system for internal use only | true, false |
| isDeleted | boolean | 	Indicates if the virtual report suite has been deleted. Virtual report suites are not actually removed from the database. This flag is set to true instead. | true, false |
| curationEnabled | boolean | Indicates if curation is enabled for the virtual report suite | true, false |
| curatedComponents | Array of [CuratedComponent](#curatedcomponent) | List of components to be curated | |
| sessionDefinition | Array of [SessionDefinitionOptions](#sessiondefinitionoptions) | Used to enable report time processing and change session timeout rules (The Analytics UI calls this `Visit Definition`) | |
| owner | [Owner](#owner) | Information about the Analytics user that owns the virtual report suite | |
| compatibility | [VrsCompatibility](#vrscompatibility) | Contains information about if the virtual report suite definition is valid and the products with which it is compatible. | |
| backgroundSessionsEnabled | boolean | Indicates if background hits will start a new visit. See [Context-aware sessions - Background Hit Processing](https://docs.adobe.com/content/help/en/analytics/components/virtual-report-suites/vrs-mobile-visit-processing.html#background-hit-processing) for more information | true, false |

### CuratedComponent
| Attribute | Type | Description | Possible Values |
| --- | --- | ---------- | ----- |
| componentId | string | The id of the component that will be curated | Depends on `componentType` |
| componentType | string | The type of component that will be curated | dimension, metric | 
| curatedName | string | The curated name of the component | User defined |

#### Curated Component Example
```
{
    "componentId": "variables/browser",
    "componentType": "dimension",
    "curatedName": "curated dimension example"
},
{
    "componentId": "metrics/visits",
    "componentType": "metric",
    "curatedName": "curated metric example"
}
```

### SessionDefinitionOptions
| Attribute | Type | Description | Possible Values |
| --- | --- | ---------- | ----- |
| func | string | Session definition option type | **inactivity** - Defines the amount of inactivity a unique visitor must have before a new visit is automatically started. <br />**beforeEvents** - A new session will start when any of these events are fired regardless of whether a session has timed out. The new session that is created will include the event that started it. |
| numPeriods | integer | number of periods of the selected granularity before a new visit is started when using `inactivity` type | positive integer |
| granularity | string | granularity selection when using `inactivity` type | minute, hour, day, week |
| events | Array of string | List of metrics ids (events) that will start a new session when using `beforeEvents` type | Valid metric ids. *Example:* "metrics/orders" |

#### Session Definition Example
In following example a new visit will start after 30 minutes of inactivity or when an order event is fired:
```
{
	"sessionDefinition": [{
		"numPeriods": 30,
		"func": "inactivity",
		"granularity": "minute"
	}, {
		"func": "beforeEvents",
		"events": ["metrics/orders"]
	}]
}
```

### Owner
| Attribute | Type | Description | Possible Values |
| --- | --- | ---------- | ----- |
| id | integer | Analytics integer id for the user | System generated |
| name | string | Analytics user friendly name | |
| login | string | Analytics login name | |

### VrsCompatibility
| Attribute | Type | Description | Possible Values |
| --- | --- | ---------- | ----- |
| valid | boolean | 	Indicates if the virtual report suite definition is valid | true, false |
| validator_version | string | Virtual report suite validator version | |
| message | string | Message with more information about what is wrong with the virtual report suite definition if it is invalid | |
| supported_products | Array of string | List of Analytics products with which the virtual report suite is compatible | analysis_workspace, reports_and_analytics, ad_hoc_analysis, report_builder, data_warehouse |

## Virtual Report Suite Creation Examples

### Basic Filtering Using a Segment
The following example creates a virtual report suite that filters data by the given segment:
```
{
  "name": "Basic VRS Creation Example",
  "parentRsid": "exampleRsid",
  "segmentList": [
    "s300005535_5b7d98bc5ef3a562937dba7e"
  ],
  "dataSchema": "Cache",
  "description": "Basic VRS Creation Example description"
}
```

### Timezone Override Example
In the following example the parent report suite has a timezone of US/Mountain but the virtual report suite overrides the timezone to use Australia/Sydney (timezone=47):
```
{
  "name": "Timezone Override Example",
  "parentRsid": "exampleRsid",
  "segmentList": [],
  "dataSchema": "Cache",
  "timezone" : 47
}
```
See the [/reportsuites/timezones API](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Report%20Suite%20APIs#/Timezone/getTimezones_1) to get all supported timezones

### Curated Components Example
The following example creates a virtual report suite that curates the browser dimension and visits metric:
```
{
	"name": "Curated Components Example",
	"parentRsid": "exampleRsid",
	"segmentList": [],
	"description": "Curated Components Example description",
	"curatedComponents": [{
			"componentId": "variables/browser",
			"componentType": "dimension",
			"curatedName": "curated dimension example"
		},
		{
			"componentId": "metrics/visits",
			"componentType": "metric",
			"curatedName": "curated metric example"
		}
	]
}
```

### Visitor Stitching Example
The following example creates a virtual report suite that has visitor stitching enabled:
```
{
  "name": "Visitor Stitching Example",
  "parentRsid": "exampleRsid",
  "segmentList": [],
  "dataSchema": "Stitched",
  "description": "Visitor Stitching Example description"
}
```
**NOTE:** The parent report suite must have visitor stitching enabled before a virtual report suite with visitor stitching enabled can be created.

### Custom Session Timeout Example
The following example creates a virtual report suite which overrides the session timeout rules so a new visit will start after 30 minutes of inactivity or when an order event is fired:
```
{
	"name": "Custom Session Timeout Example",
	"parentRsid": "exampleRsid",
	"segmentList": [],
	"dataSchema": "CacheAndMid",
	"sessionDefinition": [{
		"numPeriods": 30,
		"func": "inactivity",
		"granularity": "minute"
	}, {
		"func": "beforeEvents",
		"events": ["metrics/orders"]
	}]
}
```

