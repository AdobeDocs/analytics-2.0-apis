---
title: Job definition reference
description: Supported variables, actions, and filters when using the Data Repair API.
---

# Job definition reference

A JSON request body is required when creating a Data Repair API job. This page provides a full list of variables, actions, and filters that you can include to create a valid JSON request body.

## Structure

A JSON request body consists of one or more variables with the desired action for each variable. You can also optionally include filters for a given variable.

```json
{
  "variables": {
    "{VARIABLE_1}": {
      "action": "{ACTION_1}"
    },
    "{VARIABLE_2}": {
      "action": "{ACTION_2}",
      "filter": {"condition":  "{CONDITION_2}"}
    },
    "{VARIABLE_3}": {
      "action": "{ACTION_3}",
      "filters": [
        {"condition":  "{CONDITION_1}"},
        {"condition":  "{CONDITION_2}"}
      ]
    }
  }
}
```

## Variables

The Data Repair API supports the following variables, with their supported actions.

* If a variable supports the `set` action, you can use any filter with it unless otherwise noted.
* If a variable supports the `delete` action, you can use any filter except `isEmpty` with it unless otherwise noted.
* If a variable supports `deleteQueryString` or `deleteQueryStringParameters`, you cannot use any filters with either action.

Variable | Supported actions | Description
--- | --- | ---
`activitymap` | `delete` | Deletes all [Activity map](https://experienceleague.adobe.com/docs/analytics/analyze/activity-map/activitymap-reporting-analytics.html) data for the hit. This variable does not support any filters.
`campaign` | `set`<br/>`delete`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | The [Tracking code](https://experienceleague.adobe.com/docs/analytics/components/dimensions/tracking-code.html) dimension. Only tracking codes with an [expiration](https://experienceleague.adobe.com/docs/analytics/admin/admin-tools/conversion-variables/conversion-var-admin.html) of page view, visit, or time period of 1 day or shorter are supported by the Data Repair API. A data repair job fails if it includes this variable with an expiration of a time period greater than 1 day or on an event. As a best practice, Adobe recommends [resetting](https://experienceleague.adobe.com/docs/analytics/admin/admin-tools/conversion-variables/conversion-var-admin.html) the tracking code before a data repair job runs so that values persisted by visitors do not reappear after a data repair job is complete.
`entrypage`<br/> | `set`<br/>`delete`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | The [Entry page](https://experienceleague.adobe.com/docs/analytics/components/dimensions/entry-dimensions.html) dimension. Note that 'Entry page' is calculated at report time in Analysis Workspace; if you repair or delete values in this variable, make sure that you make similar changes to the `page` variable as well.
`entrypageoriginal` | `set`<br/>`delete`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | The [Entry page original](https://experienceleague.adobe.com/docs/analytics/components/dimensions/entry-dimensions.html) dimension. While 'Entry page' is calculated at report time in Analysis Workspace, 'Entry page original' uses this variable for reporting. If you modify this variable, Adobe recommends modifying the `page` variable with similar modifications for consistency.
`evar1` - `evar250` | `set`<br/>`delete`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | [eVar](https://experienceleague.adobe.com/docs/analytics/components/dimensions/evar.html) dimensions. Only eVars with an [expiration](https://experienceleague.adobe.com/docs/analytics/admin/admin-tools/conversion-variables/conversion-var-admin.html) of page view, visit, or time period of 1 day or shorter are supported by the Data Repair API. Merchandising variables, enabled currently or historically, are not supported. As a best practice, Adobe recommends [resetting](https://experienceleague.adobe.com/docs/analytics/admin/admin-tools/conversion-variables/conversion-var-admin.html) the eVar in question before a data repair job runs so that values persisted by visitors do not reappear after a data repair job is complete.
`geodma` | `delete` | The [US DMA](https://experienceleague.adobe.com/docs/analytics/components/dimensions/us-dma.html) dimension. The only supported filter is `inList`.
`geocity` | `delete` | The [Cities](https://experienceleague.adobe.com/docs/analytics/components/dimensions/cities.html) dimension. The only supported filter is `inList`.
`geocountry` | `delete` | The [Countries](https://experienceleague.adobe.com/docs/analytics/components/dimensions/countries.html) dimension. The only supported filter is `inList`.
`geolatitude`<br/>`geolongitude` | `delete` | The only supported filter is `inList`.
`georegion` | `delete` | The [Regions](https://experienceleague.adobe.com/docs/analytics/components/dimensions/regions.html) dimension. The only supported filter is `inList`.
`geozip` | `delete` | The [Zip code](https://experienceleague.adobe.com/docs/analytics/components/dimensions/zip-code.html) dimension collected through geolocation. See also `zip`. The only supported filter is `inList`.
`ipaddress` | `delete` | The IP address of the visitor. The only supported filter is `inList`.
`latitude`<br/>`longitude` | `delete` | The only supported filter is `inList`.
`latlon1`<br/>`latlon23`<br/>`latlon45`<br/>`pointofinterest`<br/>`pointofinterestdistance` | `delete` | [Mobile](https://experienceleague.adobe.com/docs/analytics/components/dimensions/mobile-dimensions.html) dimensions. These variables do not support any filters.
`mobileaction` | `delete` | The [Mobile action](https://experienceleague.adobe.com/docs/analytics/components/dimensions/mobile-dimensions.html) dimension.
`mobileappid`<br/>`mobilemessagebuttonname`<br/>`mobilemessageid`<br/>`mobilerelaunchcampaigncontent`<br/>`mobilerelaunchcampaignmedium`<br/>`mobilerelaunchcampaignsource`<br/>`mobilerelaunchcampaignterm`<br/>`mobilerelaunchcampaigntrackingcode` | `set`<br/>`delete`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | [Mobile](https://experienceleague.adobe.com/docs/analytics/components/dimensions/mobile-dimensions.html) dimensions. If using the `delete` action with this variable, no filters are supported. Standard filters are supported when using the `set` action with this variable.
`page` | `set`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | The [Page](https://experienceleague.adobe.com/docs/analytics/components/dimensions/page.html) dimension. The `isEmpty` filter is not supported. If you modify values in this variable, consider also making similar modifications to the `entrypage` and `entrypageoriginal` variables.
`pageeventvar1` | `set`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | The [`linkURL`](https://experienceleague.adobe.com/docs/analytics/implementation/vars/config-vars/linkurl.html) implementation variable. The `isEmpty` filter is not supported.
`pageeventvar2` | `set`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | The [Download link](https://experienceleague.adobe.com/docs/analytics/components/dimensions/download-link.html), [Exit link](https://experienceleague.adobe.com/docs/analytics/components/dimensions/exit-link.html), or [Custom link](https://experienceleague.adobe.com/docs/analytics/components/dimensions/custom-link.html) dimension, depending on the type of link. The `isEmpty` filter is not supported.
`pageurl` | `deleteQueryString`<br/>`deleteQueryStringParameters` | The [Page URL](https://experienceleague.adobe.com/docs/analytics/components/dimensions/page-url.html) dimension.
`pageurlfirsthit`<br/>`pageurlvisitstart` | `deleteQueryString`<br/>`deleteQueryStringParameters` | N/A
`prop1` - `prop75` | `set`<br/>`delete`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | [Prop](https://experienceleague.adobe.com/docs/analytics/components/dimensions/prop.html) dimensions.
`referrer` | `deleteQueryString`<br/>`deleteQueryStringParameters` | The [Referrer](https://experienceleague.adobe.com/docs/analytics/components/dimensions/referrer.html) dimension.
`referrerfirsthit`<br/>`referrervisit` | `deleteQueryString`<br/>`deleteQueryStringParameters` | N/A
`sitesections` | `set`<br/>`delete`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | The [Site section](https://experienceleague.adobe.com/docs/analytics/components/dimensions/site-section.html) dimension.
`video`<br/>`videoad` | `set`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | [Media Analytics](https://experienceleague.adobe.com/docs/media-analytics/using/metrics-and-metadata/audio-video-parameters.html) dimensions.
`videoadname`<br/>`videoadplayername`<br/>`videoadadvertiser`<br/>`videoaudioalbum`<br/>`videoaudioartist`<br/>`videoaudioauthor`<br/>`videoaudiolabel`<br/>`videoaudiopublisher`<br/>`videoaudiostation`<br/>`videoadcampaign`<br/>`videochannel`<br/>`videochapter`<br/>`videocontenttype`<br/>`videoepisode`<br/>`videofeedtype`<br/>`videomvpd`<br/>`videoname`<br/>`videonetwork`<br/>`videopath`<br/>`videoplayername`<br/>`videoseason`<br/>`videoshow`<br/>`videoshowtype`<br/>`videostreamtype` | `set`<br/>`delete`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | [Media Analytics](https://experienceleague.adobe.com/docs/media-analytics/using/metrics-and-metadata/audio-video-parameters.html) dimensions.
`zip` | `delete` | The [Zip code](https://experienceleague.adobe.com/docs/analytics/components/dimensions/zip-code.html) dimension collected through the `zip` variable (not geosegmentation). See also `geozip`. The only supported filter is `inList`.

## Actions

Each variable requires an action. The Data Repair API supports the following four actions:

* **`set`**: Overwrites the variable to the value in the `setValue` property. Include the `setValue` property alongside the `action` property inside the variable. It supports all filters by default; however, some variables do not support all filters for this action. See the above table to confirm that a variable supports a filter with this action.
* **`delete`**: Clears the variable value. It supports all filters except `isEmpty` by default. Some variables do not support all filters for this action. See the above table to confirm that a variable supports a filter with this action.
* **`deleteQueryString`**: Remove the entire query string from a variable value. If the value does not appear to be a URL, no action is taken. Filters are not supported with this action.
* **`deleteQueryStringParameters`**: Remove one or more query string parameters and their values from a variable. The query parameters removed are based on the string array `parameters`. Include the `parameters` array alongside the `action` property inside the variable.
  * Up to 10 parameters are supported.
  * Parameters are case sensitive.
  * Filters are not supported with this action.
  * If the value is not a correctly formatted URL, no action is taken.

<CodeBlock slots="heading, code" repeat="4" languages="JSON,JSON,JSON,JSON"/>

#### set

```json
{
  "variables": {
    "evar1": {
      "action": "set",
      "setValue": "New value"
    }
  }
}
```

#### delete

```json
{
  "variables": {
    "evar1": {
      "action": "delete"
    }
  }
}
```

#### deleteQueryString

```json
{
  "variables": {
    "evar1": {
      "action": "deleteQueryString"
    }
  }
}
```

#### deleteQueryStringParameters

```json
{
  "variables": {
    "evar1": {
      "action": "deleteQueryStringParameters",
      "parameters": ["param1", "param2"]
    }
  }
}
```

## Filters

The `set` and `delete` actions support filters, which allow you to selectively repair certain rows based on the filter criteria. Check the above variable table to make sure that an action supports the desired filter. The `deleteQueryString` and `deleteQueryStringParameters` actions do not support any filters.

You can specify a single filter using `filter` or multiple filters using `filters`. Matching one of multiple filters (using an 'OR' operator) is not supported; when using multiple filters, each row must match all filters to be included in the repair.

All filters are case-sensitive.

* **`inList`**: Include all rows where the variable is an exact match to at least one value from the `matchValues` array. The `matchValues` array can hold up to 1000 values.
* **`isEmpty`**: Only include rows where the variable does not contain a value. Cannot be used with the `delete` action.
* **`contains`**: Include rows where the variable contains the value in `matchValue`.
* **`doesNotContain`**: Include rows where the value in `matchValue` is not present.
* **`startsWith`**: Limit the action to rows where the value starts with the value in `matchValue`.
* **`doesNotStartWith`**: Limit the action to rows where the value does not start with the value in `matchValue`.
* **`endsWith`**: Limit the action to rows where the value ends with the value in `matchValue`.
* **`doesNotEndWith`**: Limit the action to rows where the value does not end with the value in `matchValue`.
* **`isURL`**: Only include the row if the Data Repair API recognizes the value as a URL.
* **`isNotURL`**: Only include the row if the Data Repair API recognizes that the value is not a URL.
* **`isNumeric`**: Include rows where the variable contains only numbers (0-9).
* **`isNotNumeric`**: Include rows where the variable contains characters other than numbers.

<CodeBlock slots="heading, code" repeat="7" languages="JSON,JSON,JSON,JSON,JSON,JSON,JSON"/>

#### inList

```json
{
  "variables": {
    "evar1": {
      "action": "delete",
      "filter": {
        "condition": "inList",
        "matchValues": ["match1", "match2"]
      }
    },
    "evar2": {
      "action": "delete",
      "filters": [{
        "condition": "inList",
        "matchValues": ["match1", "match2"]
      }, {
        "condition": "inList",
        "matchValues": ["match2", "match3"]
      }]
    }
  }
}
```

#### isEmpty

```json
{
  "variables": {
    "evar1": {
      "action": "set", 
      "setValue": "new value", 
      "filter": {
        "condition": "isEmpty"
      }
    }
  }
}
```

#### contains

```json
{
  "variables": {
    "evar1": {
      "action": "delete",
      "filter": {
        "condition": "contains",
        "matchValue": "@"
      }
    }
  }
}
```

#### startsWith

```json
{
  "variables": {
    "evar1": {
      "action": "delete",
      "filter": {
        "condition": "startsWith",
        "matchValue": "ABC"
      }
    }
  }
}
```

#### endsWith

```json
{
  "variables": {
    "evar1": {
      "action": "delete",
      "filter": {
        "condition": "endsWith",
        "matchValue": "XYZ"
      }
    }
  }
}
```

#### isURL

```json
{
  "variables": {
    "evar1": {
      "action": "delete",
      "filter": {
        "condition": "isURL"
      }
    }
  }
}
```

#### isNumeric

```json
{
  "variables": {
    "evar1": {
      "action": "delete",
      "filter": {
        "condition": "isNumeric"
      }
    }
  }
}
```

### Filter Variables

By default, a filter is applied to the variable being repaired.  Use `filter.variable` to filter by a variable other
than the target variable.  For example, the following means `delete evar2 where evar3 contains '@'`:

```json
{
  "evar2": {
    "action": "delete",
    "filter": {
      "condition": "contains",
      "matchValue": "@",
      "variable": "evar3"
    }
  }
}
```

## Example Data Repair API definition file

The following Data Repair API definition simultaneously performs the following five actions:

* Deletes all activity map data
* Deletes the value in `prop12` across all rows
* Sets `eVar74` to the value of "Turtles" across all rows
* Deletes the value in `eVar107` if the existing eVar value contains "Fox" or "Dog"
* Deletes the value in `evar110` where `evar110` starts with `Horse` AND `evar111` starts with `Zebra`
        
```json
{
  "variables": {
    "activitymap": {
      "action": "delete"
    },
    "prop12": {
      "action": "delete"
    },
    "evar74": {
      "action": "set",
      "setValue": "Turtles"
    },
    "evar107": {
      "action": "delete",
      "filter": {
        "condition": "inList",
        "matchValues": ["Fox", "Dog"]
      }
    },
    "evar110": {
      "action": "delete",
      "filters": [{
        "condition": "startsWith",
        "matchValue": "Horse"
      }, {
        "condition": "startsWith",
        "matchValue": "Zebra",
        "variable": "evar111"
      }]
    }
  }
}
```

Once you have a completed JSON request body and a `validationToken` from the [Server Call estimate endpoint](server-call-estimate.md), you can make a call to the [Job endpoint](job.md) to make the Data Repair API call.
