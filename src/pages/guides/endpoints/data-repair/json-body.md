---
title: JSON body reference
description: Supported variables, actions, and filters when using the Data Repair API.
---

# JSON body reference

A JSON request body is required when creating a Data Repair API job. This page provides a full list of variables, actions, and filters that you can include to create a valid JSON request body.

## Structure

A request body consists of one or more variables with the desired action for each variable. You can also optionally include a filter for a given variable.

```json
{
  "variables": {
    "{VARIABLE_1}": {
      "action": "{ACTION_1}",
      "filter": {"condition":  "{CONDITION_1}"}
    },
    "{VARIABLE_2}": {
      "action": "{ACTION_2}"
    }
  }
}
```

## Variables

The Data Repair API supports the following variables, with their supported actions.

Variable | Supported actions | Description
--- | --- | ---
`campaign` | `set`<br/>`delete`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | The [Tracking code](https://experienceleague.adobe.com/docs/analytics/components/dimensions/tracking-code.html) dimension. Only tracking codes with an [expiration](https://experienceleague.adobe.com/docs/analytics/admin/admin-tools/conversion-variables/conversion-var-admin.html) of page view, visit, or time period of 1 day or shorter are supported with this API. A data repair job fails if it includes this variable with an expiration of a time period greater than 1 day or on an event. As a best practice, Adobe recommends [resetting](https://experienceleague.adobe.com/docs/analytics/admin/admin-tools/conversion-variables/conversion-var-admin.html) the tracking code before a repair job runs so that values persisted by visitors do not reappear after a repair job is complete.
`entrypage` | `set`<br/>`delete`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | The [Entry page](https://experienceleague.adobe.com/docs/analytics/components/dimensions/entry-dimensions.html) dimension.
`sitesections` | `set`<br/>`delete`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | The [Site section](https://experienceleague.adobe.com/docs/analytics/components/dimensions/site-section.html) dimension.
`geodma` | `delete` | The [US DMA](https://experienceleague.adobe.com/docs/analytics/components/dimensions/us-dma.html) dimension.
`geocity` | `delete` | The [Cities](https://experienceleague.adobe.com/docs/analytics/components/dimensions/cities.html) dimension.
`geocountry` | `delete` | The [Countries](https://experienceleague.adobe.com/docs/analytics/components/dimensions/countries.html) dimension.
`geolatitude` | `delete` | N/A
`geolongitude` | `delete` | N/A
`georegion` | `delete` | The [Regions](https://experienceleague.adobe.com/docs/analytics/components/dimensions/regions.html) dimension.
`geozip` | `delete` | The [Zip code](https://experienceleague.adobe.com/docs/analytics/components/dimensions/zip-code.html) dimension collected through geolocation. See also `zip`.
`ipaddress` | `delete` | The IP address of the visitor.
`latitude` | `delete` | N/A
`longitude` | `delete` | N/A
`zip` | `delete` | The [Zip code](https://experienceleague.adobe.com/docs/analytics/components/dimensions/zip-code.html) dimension collected through the `zip` variable (not geosegmentation). See also `geozip`.
`page` | `set`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | The [Page](https://experienceleague.adobe.com/docs/analytics/components/dimensions/page.html) dimension.
`pageeventvar1` | `set`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | The [`linkURL`](https://experienceleague.adobe.com/docs/analytics/implementation/vars/config-vars/linkurl.html) implementation variable.
`pageeventvar2` | `set`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | The [Download link](https://experienceleague.adobe.com/docs/analytics/components/dimensions/download-link.html), [Exit link](https://experienceleague.adobe.com/docs/analytics/components/dimensions/exit-link.html), or [Custom link](https://experienceleague.adobe.com/docs/analytics/components/dimensions/custom-link.html) dimension, depending on the type of link.
`pageurl` | `deleteQueryString`<br/>`deleteQueryStringParameters` | The [Page URL](https://experienceleague.adobe.com/docs/analytics/components/dimensions/page-url.html) dimension.
`evar1` - `evar250` | `set`<br/>`delete`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | [eVar](https://experienceleague.adobe.com/docs/analytics/components/dimensions/evar.html) dimensions. Only eVars with an [expiration](https://experienceleague.adobe.com/docs/analytics/admin/admin-tools/conversion-variables/conversion-var-admin.html) of page view, visit, or time period of 1 day or shorter are supported with this API. A data repair job fails if it includes an eVar with an expiration of a time period greater than 1 day or on an event. As a best practice, Adobe recommends [resetting](https://experienceleague.adobe.com/docs/analytics/admin/admin-tools/conversion-variables/conversion-var-admin.html) the eVar in question before a repair job runs so that values persisted by visitors do not reappear after a repair job is complete.
`prop1` - `prop75` | `set`<br/>`delete`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | [Prop](https://experienceleague.adobe.com/docs/analytics/components/dimensions/prop.html) dimensions.
`mobileappid`<br/>`mobilemessagebuttonname`<br/>`mobilemessageid`<br/>`mobilerelaunchcampaigncontent`<br/>`mobilerelaunchcampaignmedium`<br/>`mobilerelaunchcampaignsource`<br/>`mobilerelaunchcampaignterm`<br/>`mobilerelaunchcampaigntrackingcode` | `set`<br/>`delete`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | [Mobile](https://experienceleague.adobe.com/docs/analytics/components/dimensions/mobile-dimensions.html) dimensions.
`activitymap` | `delete` | Deletes all [Activity map](https://experienceleague.adobe.com/docs/analytics/analyze/activity-map/activitymap-reporting-analytics.html) data for the hit. Does not support filters, because it handles multiple dimensions.
`latlon1`<br/>`latlon23`<br/>`latlon45`<br/>`mobileaction`<br/>`pointofinterest`<br/>`pointofinterestdistance` | `delete` | [Mobile](https://experienceleague.adobe.com/docs/analytics/components/dimensions/mobile-dimensions.html) dimensions.
`videoadname`<br/>`videoadplayername`<br/>`videoadadvertiser`<br/>`videoaudioalbum`<br/>`videoaudioartist`<br/>`videoaudioauthor`<br/>`videoaudiolabel`<br/>`videoaudiopublisher`<br/>`videoaudiostation`<br/>`videoadcampaign`<br/>`videochannel`<br/>`videocontenttype`<br/>`videoepisode`<br/>`videofeedtype`<br/>`videomvpd`<br/>`videoname`<br/>`videonetwork`<br/>`videopath`<br/>`videoplayername`<br/>`videoseason`<br/>`videoshow`<br/>`videoshowtype`<br/>`videostreamtype` | `set`<br/>`delete`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | [Media Analytics](https://experienceleague.adobe.com/docs/media-analytics/using/metrics-and-metadata/audio-video-parameters.html) dimensions.
`video`<br/>`videoad` | `set`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | [Media Analytics](https://experienceleague.adobe.com/docs/media-analytics/using/metrics-and-metadata/audio-video-parameters.html) dimensions.

latitude
longitude
geolatitude
geolongitude
pageurlfirsthit
pageurlvisitstart
referrerfirsthit
referrervisit

## Actions

Each variable requires an action. Adobe supports the following actions, with their supported filters:

* **`set`**: Overwrites the variable to the value in the `setValue` property. Include the `setValue` property alongside the `action` property inside the variable. It supports the following filters: `inList`, `isEmpty`, `isURL`, `isNotURL`, `startsWith`, `endsWith`, `contains`.
* **`delete`**: Clears the variable value. It supports the following filters: `inList`, `isURL`, `isNotURL`, `startsWith`, `endsWith`, `contains`.
* **`deleteQueryString`**: Remove the entire query string from a variable value. If the value does not appear to be a URL, no action is taken. Filters are not supported with this action.
* **`deleteQueryStringParameters`**: Remove one or more query string parameters and their values from a variable. The query parameters removed are based on the string array `parameters`. Include the `parameters` array alongside the `action` property inside the variable. Up to 10 parameters are supported. If the value does not appear to be a URL, no action is taken. Filters are not supported with this action.

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

Some actions support filters, which allow you to selectively repair certain rows based on the filter criteria. Make sure that an action supports the desired filter when creating the JSON body.

* **`inList`**: Include all rows where the variable contains at least one value from the `matchValues` array. The `matchValues` array can hold up to 1000 values.
* **`isEmpty`**: Only include rows where the variable does not contain a value.
* **`contains`**: Include rows where the variable contains the value in `matchValue`.
* **`doesNotContain`**: Include rows where the value in `matchValue` is not present.
* **`startsWith`**: Limit the action to rows where the value starts with the value in `matchValue`.
* **`doesNotStartWith`**: Limit the action to rows where the value does not start with the value in `matchValue`.
* **`endsWith`**: Limit the action to rows where the value ends with the value in `matchValue`.
* **`doesNotEndWith`**: Limit the action to rows where the value does not end with the value in `matchValue`.
* **`isURL`**: Only include the row if Adobe recognizes the value as a URL.
* **`isNotURL`**: Only include the row if Adobe recognizes that the value is not a URL.

<CodeBlock slots="heading, code" repeat="10" languages="JSON,JSON,JSON,JSON,JSON,JSON,JSON,JSON,JSON,JSON"/>

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

#### doesNotContain

```json
{
  "variables": {
    "evar1": {
      "action": "delete",
      "filters": {
        "condition": "doesNotContain",
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

#### doesNotStartWith

```json
{
  "variables": {
    "evar1": {
      "action": "delete",
      "filters": {
        "condition": "doesNotStartWith",
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

#### doesNotEndWith

```json
{
  "variables": {
    "evar1": {
      "action": "delete",
      "filters": {
        "condition": "doesNotEndWith",
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

#### isNotURL

```json
{
  "variables": {
    "evar1": {
      "action": "delete",
      "filter": {
        "condition": "isNotURL"
      }
    }
  }
}
```

Once you have a completed JSON body and a `validationToken` from the [Server call estimate endpoint](server-call-estimate.md), you can make a call to the [Job endpoint](job.md) to make the data repair API call.
