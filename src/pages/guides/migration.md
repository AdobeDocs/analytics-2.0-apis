---
title: Migrating to the 2.0 API
description: Learn what steps that you can take to move from previous versions of the Analytics API to 2.0.
---

# Migrating to the 2.0 APIs

This guide is intended to help users of the 1.3 and 1.4 versions of the Analytics APIs migrate to the newer and more capable 2.0 APIs. By migrating to the 2.0 APIs, you can take advantage of the following features:

* Faster response times with simpler and more efficient query methods, eliminating the need for polling
* Programmatic capability for queries and dynamic report updates
* More graceful error handling
* Flexible functioning to do to anything you can do in Analysis Workspace
* Consistency and matching of API calls to UI actions
* Access to all Attribution IQ models used in Analysis Workspace
* Access to all Anomaly Detection algorithms used in Analysis Workspace
* Ability to integrate with other Experience Cloud products
* Increased capacity for multiple breakdown reports
* Newest Analytics features availability

## Current limitations

The 2.0 APIs currently do not support the following:

* Data Sources
* Data Feeds
* Data Insertion

If you rely upon these features, you can still use a hybrid approach of using the 1.4 APIs for the above features and 2.0 APIs for everything else.


## How the 2.0 APIs work

The 2.0 APIs introduce some fundamental changes in their operation from the 1.4 APIs.

### HTTP methods

The 2.0 APIs use standard HTTP methods for retrieving resources (`GET`), creating child resources (`POST`), creating or replacing resources (`PUT`), updating (parts of) a resource (`PATCH`) or deleting a resource (`DELETE`). 

The 1.4 APIs only use the HTTP `POST` method for all of its operations, irrespective of its intent.

### Global Company Id

All 2.0 API endpoints require the global company id of your Adobe Analytics company as part of the URL path. For example: 

**GET** `https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/annotations`


To retrieve the global company id for your Adobe Analytics company, in the Adobe Analytics UI:

1. Select **Admin** > **All Admin** from the top menu.
1. Select **Company settings home** from the <img src="https://spectrum.adobe.com/static/icons/workflow_18/Smock_Building_18_N.svg" width="15"/> **Company settings** list.
1. In the **Company Settings** page, select the **API Access** tab. <br/>The global company id is displayed in **bold** at the top of the page.


### Unique paths

Every method in the 2.0 APIs has its own unique path. For example, to retrieve the names of dimensions and metrics in the 2.0 APIs, you use the following requests:

**GET**  `https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/dimensions?rsid={RSID}`

**GET**  `https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/metrics?rsid={RSID}`

In the 1.4 APIs, methods are uniquely identified using the `method` request parameter, while most endpoints use the same path `/admin/1.4/rest/`. To retrieve names of dimensions and metrics in the 1.4 APIs, you use the following requests:

**POST** `https://api.omniture.com/admin/1.4/rest/?method=Report.GetElements` (for dimensions)

**POST** `https://api.omniture.com/admin/1.4/rest/?method=Report.GetMetrics` (for metrics)


## Metrics and dimensions

For 2.0 APIs, metrics and dimension are named slightly different. Similarly, the query for individual or the full list of available metrics and dimensions is different. Aside from the difference in endpoints (see [How the 2.0 API's work](#how-the-20-apis-work)), the information returned is different.

In the 1.4 APIs, using

**POST** `https://api.omniture.com/admin/1.4/rest/?method=Report.GetElements` with a JSON body specifying at least the report suite, returns the following information for the `browser` dimension:

```json
{
    "correlation": true,
    "id": "browser",
    "name": "Browser",
    "subrelation": true
}
```

In the 2.0 APIs, using

**GET** `https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/dimensions?rsid={RSID}&expansion=allowedForReporting`

returns the following detailed information for the `browser` dimension:

```json
{
    "allowedForReporting": true,
    "category": "Audience",
    "description": "Shows the name and version of the browser used to access the site. This can help you prioritize which browsers and browser versions you use when testing new features or versions of your site.",
    "id": "variables/browser",
    "multiValued": false,
    "name": "Browser",
    "pathable": false,
    "reportable": [
        "oberon"
    ],
    "segmentable": true,
    "standardComponent": true,
    "support": [
        "oberon",
        "dataWarehouse"
    ],
    "supportsDataGovernance": true,
    "title": "Browser",
    "type": "string"
}
```

The 2.0 API also supports retrieval of a single dimension (`/dimension/{id}`) or metric (`/metric/{id}`).

The exampe `/dimensions` request shown above is using the `expansion=allowedForReporting` query parameter and value. Using `allowedForReporting` is highly recommended to query for dimensions and metrics that are allowed to report on using the 2.0 APIs (see [Reports](#reports)).

See [Dimensions](endpoints/dimensions/index.md) and [Metrics](endpoints/metrics/index.md) endpoint guides for more information.

## Reports

For the 2.0 APIs, the `reports` endpoint contains the biggest change. It utilizes the same underlying processing pipeline as the Analysis Workspace UI. Each API call matches an action in the UI, so you can test the functionality of an interaction in the UI first to plan your calls. The `/reports` endpoint is a simple REST GET call and no longer requires a queue/get workflow to retrieve data. This simplifies development and maintenance of API clients.

The `/reports` end point is intended to run very small requests quickly. While 1.3/1.4 APIs handle requests that can require 1-2 days to process, the 2.0 APIs require many smaller requests put together in a series. The 1.3/1.4 APIs might include requests for data from a large time frame, lots of metrics at once, or many breakdowns. To migrate to the 2.0  `/reports` endpoint, you want to split these large requests into multiple simpler and quicker calls. Following this practice, results are provided much quicker and can be evaluated in a more timely manner. Multiple breakdowns are not requested automatically.

## Use case example

To see how the migration affects your reports, consider the following example.

Example 1.4 request:

```json
{
    "reportDescription": {
        "reportSuiteID":"exampleglobalprod",
        "dateFrom":"2024-02-10",
        "dateTo":"2024-02-20",
        "granularity":"day",
        "metrics": [
            {"id":"pageviews"},
            {"id":"visits"},
            {"id":"visitors"},
        ],
        "elements": [
            {"id":"campaign", "top":10},
            {"id":"geocity", "top":100},
            {"id":"page","top":100}
        ]
    }
}
```

This 1.4 report queries ten `campaign` items. For each of those, it queries 100 `geocity` items. Finally, for each city, it queries the top 100 `pages`. In addition, it tries to get three metrics for each of those items. Finally, it tries to do that for each day in the date range, which can span multiple years. This report has the potential to return 1,000,000 records or more.

### Changes for 2.0 request

Requests to the 2.0 `/reports` endpoint are smaller and made in sequence:

1. Request the top ten `campaign` values for the given time period.

   ```json
    {
        "rsid": "exampleglobalprod",
        "globalFilters": [
            {
                "type": "dateRange",
                "dateRange": "2024-02-10T00:00:00.000/2024-02-20T00:00:00.000",
                "dateRangeId": "lastTenDays"
            }
        ],
        "metricContainer": {
            "metrics": [
                {
                    "columnId": "0",
                    "id": "metrics/pageviews"
                },
                {
                    "columnId": "1",
                    "id": "metrics/visits",
                    "sort": "desc"
                },
                {
                    "columnId": "4",
                    "id": "metrics/visitors"
                }
            ]
        },
        "dimension": "variables/campaign",
        "settings": {
            "countRepeatInstances": true,
            "limit": 10,
            "page": 0
        }
    }
   ```

   This results in a response, containing 10 rows of `campaign` data, each row looking like:

   ```json
    {
        "data": [
            2948.0,                             /* pageviews    */  
            606.0,                              /* visits       */
            254.0                               /* visitors     */
        ],
        "itemId": "3484165051",                 /* campaign id  */ 
        "value": "BJ4T3D2C"
    }
   ```

2. For each `campaign`, request a breakdown of the top 100 `geocity` values:

    ```json
    {
        "rsid": "amc.exl.global.prod",
        "globalFilters": [
            {
                "type": "dateRange",
                "dateRange": "2024-02-10T00:00:00.000/2024-02-20T00:00:00.000",
                "dateRangeId": "lastTenDays"
            }
        ],
        "metricContainer": {
            "metrics": [
                {
                    "columnId": "0",
                    "id": "metrics/pageviews",
                    "filters": [
                        "0"
                    ]
                },
                {
                    "columnId": "1",
                    "id": "metrics/visits",
                    "sort": "desc",
                    "filters": [
                        "0"
                    ]
                },
                {
                    "columnId": "2",
                    "id": "metrics/visitors",
                    "filters": [
                        "0"
                    ]
                }
            ],
            "metricFilters": [
            {
                "id":"0",
                "type":"breakdown",                   /* breakdown  */ 
                "dimension":"variables/campaign",     /* a campaign */
                "itemId": "3484165051"                /* using id   */
            }
            
        ]
        },
        "dimension": "variables/geocity",             /* on geocity */
        "settings": {
            "countRepeatInstances": true,
            "limit": 100,
            "page": 0
        }
    }
    ```

   This results in a response, containing 100 rows of `geocity` data, each row looking like:

   ```json
    {
        "data": [
            115.0,
            16.0,
             4.0
        ],
        "itemId": "1280116081",                       /* geocity id */
        "value": "Grand Rapids (Michigan, United States)"
    }
   ```



3. For each `geocity`, request a breakdown of the top 100 `page` values.

   ```json
    {
        "rsid": "amc.exl.global.prod",
        "globalFilters": [
            {
                "type": "dateRange",
                "dateRange": "2024-02-10T00:00:00.000/2024-02-20T00:00:00.000",
                "dateRangeId": "lastTenDays"
            }
        ],
        "metricContainer": {
            "metrics": [
                {
                    "columnId": "0",
                    "id": "metrics/pageviews",
                    "filters": [
                        "0"
                    ]
                },
                {
                    "columnId": "1",
                    "id": "metrics/visits",
                    "sort": "desc",
                    "filters": [
                        "0"
                    ]
                },
                {
                    "columnId": "2",
                    "id": "metrics/visitors",
                    "filters": [
                        "0"
                    ]
                }
            ],
            "metricFilters": [
                {
                    "id":"0",
                    "type":"breakdown",               /* breakdown  */
                    "dimension":"variables/geocity",  /* a geocity  */
                    "itemId": "1280116081"            /* using id   */
                }    
            ]
        },
        "dimension": "variables/page",                 /* on page   */
        "settings": {
            "countRepeatInstances": false,
            "limit": 5,
            "page": 0
        }
    }
   ```

   This results in a response, containing 100 rows of `page` data, each row looking like:

   ```json

   {
        "data": [
            14.0,
            12.0,
            9.0
        ],
        "itemId": "2616484196",
        "value": "home page"
    }
   ```


4. Request a separate report for each metric. This means that you go through steps 1-3 for `pageviews`, then again for `visits`, and so on.

You can cache historical data as part of the client application. This means that you would only need to query the newest day's worth of data each day.

### Breakdowns

With the 2.0 `/reports` endpoint, you can request as many breakdowns as you like, instead of the limit of four with the 1.4 APIs. To request a breakdown report, use an `itemId` in the `metricFilter` section of your request (as shown above). See [Breakdowns](endpoints/reports/breakdowns.md) for more detailed information.
