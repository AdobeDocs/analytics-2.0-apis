---
title: Migrating to the 2.0 API
description: Steps to move from previous versions of the Analytics API to 2.0.
---

# Migrating to Adobe Analytics 2.0 APIs

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

### Global Company ID

All 2.0 API endpoints require the global company ID of your Adobe Analytics company as part of the URL path. For example:

**GET** `https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/annotations`

To retrieve your global company ID in the user interface, follow these steps:

1. Select **Admin** > **All Admin** from the top menu.
1. Select **Company settings home** from the **Company settings** list.
1. In the **Company Settings** page, select the **API Access** tab. <br/>The global company ID is displayed in **bold** at the top of the page.

To retrieve your global company ID with an API, use the [Analytics Discovery endpoint](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/discovery/), as shown below:

```curl
curl -X GET --header "x-api-key: {CLIENT_ID}" --header "Authorization: Bearer {ACCESS_TOKEN}" "https://analytics.adobe.io/discovery/me"
```

### Unique paths

Every method in the 2.0 APIs has a unique path. For example, to retrieve the names of dimensions and metrics in the 2.0 APIs, you use the following two requests:

**GET**  `https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/dimensions?rsid={RSID}`

**GET**  `https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/metrics?rsid={RSID}`

In the 1.4 APIs, methods are uniquely identified using the `method` request parameter, while most endpoints use the same path `/admin/1.4/rest/`. For example, to retrieve names of dimensions and metrics in the 1.4 APIs, you use the following two requests:

**POST** `https://api.omniture.com/admin/1.4/rest/?method=Report.GetElements` (for dimensions)

**POST** `https://api.omniture.com/admin/1.4/rest/?method=Report.GetMetrics` (for metrics)

## Metrics and dimensions

This section describes differences between 1.4 and 2.0 APIs for metrics and dimensions. These include the following changes for retrieving metrics or dimensions:

* Naming of some components
* Query structure
* The type and quantity of information retrieved
* Obtaining multiple or singular metrics or dimensions
* Using `expansion` member objects to include more specificity in retrieval options

**1.4 Dimensions example**

For example, in the 1.4 dimensions request

**POST** `https://api.omniture.com/admin/1.4/rest/?method=Report.GetElements` with a JSON body specifying at least the report suite, the following information for the `browser` dimension is returned:

```json
{
    "correlation": true,
    "id": "browser",
    "name": "Browser",
    "subrelation": true
}
```

**2.0 Dimensions example**

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

The 2.0 example `/dimensions` request shown above is using the `expansion=allowedForReporting` query parameter and value. Using `allowedForReporting` is recommended to request dimensions and metrics that are allowed to be included in reports (see [Reports](#reports)).

See [Dimensions](endpoints/dimensions/index.md) and [Metrics](endpoints/metrics/index.md) endpoint guides for more information.

## Reports

This section describes differences between 1.4 and 2.0 report APIs.  The 2.0 `reports` endpoint includes many important changes. It uses the same underlying process as the Analysis Workspace UI. Each API call matches an action in the UI, so you can test the functionality of an interaction in the UI first to plan your calls. The `/reports` endpoint is a simple REST GET call, and no longer requires a queue/get workflow to retrieve data. This simplifies development and maintenance of API clients.

The `/reports` endpoint is intended to run small requests quickly. While 1.3/1.4 APIs handle requests that can require 1-2 days to process, the 2.0 APIs require many smaller requests put together in a series. The 1.3/1.4 APIs might include requests for data from a large time frame, lots of metrics at once, or many breakdowns. When migrating to the 2.0  `/reports` endpoint, split these large requests into multiple simpler and quicker calls. Following this practice, results are provided more quickly, and can be evaluated in a more timely manner. Multiple breakdowns are not requested automatically.

### Example report differences

The examples in this section show how migration from 1.4 to 2.0 APIs affects your reports.

#### 1.4 example

The following 1.4 report queries ten `campaign` items. For each of those, it queries 100 `geocity` items. Finally, for each city, it queries the top 100 `pages`. In addition, it tries to get three metrics for each of those items. Finally, it tries to do that for each day in the date range, which can span multiple years. This report has the potential to return 1,000,000 records or more.

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


#### 2.0 example

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

You can cache historical data as part of the client application so that you would only need to query the newest day's worth of data each day.

### Breakdowns

With the 2.0 `/reports` endpoint, you can request as many breakdowns as you like, instead of the limit of four with the 1.4 APIs. To request a breakdown report, use an `itemId` in the `metricFilter` section of your request (as shown above). See [Breakdowns](endpoints/reports/breakdowns.md) for more detailed information.

### Real-time

The [Analytics 2.0 real-time report API](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/reports/real-time/) endpoint allows you to access real-time data programmatically through Adobe Developer. The real-time data reported is less than two minutes latent and auto-updates on a minute-by-minute basis.

## Data Warehouse

This section describes the difference between Data Warehouse 1.4 and 2.0 APIs.

With 1.4 APIs, you can run Data Warehouse reports with the `Report.Run` method in a [POST request](https://adobedocs.github.io/analytics-1.4-apis/#/Report/Report.Run). This is requested by specifying `source":"warehouse"` in the `reportDescription` object in the request payload. This service returns requested analytics data, as described in [Adobe Analytics 1.4 Data Warehouse Reports](https://developer.adobe.com/analytics-apis/docs/1.4/guides/reporting/data-warehouse/).

With 2.0 APIs, Data Warehouse functions similar to an export service that includes granular scheduling and detailed reports generated from scheduled requests. The Data Warehouse reports returned by the 2.0 APIs do not return analytics data.

Currently, you must make your first scheduled request in Analysis Workspace. Subsequently, you can create additional scheduled requests, update requests, and retrieve request information with the 2.0 APIs. You can also update and retrieve reports generated from scheduled requests. The 2.0 APIs include destination options for sending request information and reports. For more information, refer to both the [Data Warehouse 2.0 AI Reference](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Data%20Warehouse%20APIs) and the [Data Warehouse 2.0 API Endpoint Guide](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/data-warehouse/).

## Data Sources

This section includes the difference between Data Sources 1.4 and 2.0 APIs.

### RESTful methods

With the 1.4 APIs, all Data Source requests are structured with the `POST` method and then appended with a query parameter method description in the URI. For example, the 1.4 `GetJobs` endpoint URI that returns all current jobs for a data source is shown below:

`curl -X POST "https://api.omniture.com/admin/1.4/rest/?method=DataSources.GetJobs"`

The Data Sources 2.0 APIs use fully RESTful methods for working with data source accounts. Each method is used to perform the inherent operation of the request. For example, the 2.0 **GET all jobs** endpoint URI that returns all current jobs is shown below:

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/datasources/job/{REPORT_SUITE_ID}/{DATA_SOURCE_ID}`

With this 2.0 example, the report suite ID and the data source ID are added as query parameters, so there is no need to add a JSON payload. With the 1.4 request, a JSON payload is needed to make a similar request.

### Managing accounts and jobs

The 1.4 APIs include one method for retrieving current jobs, as shown above, as well as functions for saving, uploading, restarting, and deleting. The 2.0 APIs divide requests into working with accounts and working with jobs. Account-based endpoints allow you to create, view, and delete data sources accounts. Job-based endpoints include three methods for getting all jobs,  getting single job, and for uploading a file to a data source account. When you upload a file with the **PUT data** endpoint, a job is automatically created for you to manage.

For more information, see the [2.0 Data Sources API guide](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/data-sources/#get-all-jobs) and the [2.0 API Data Sources API Reference](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Data%20Sources%202.0%20APIs).


## Classifications


The [1.4 Classifications APIs](https://adobedocs.github.io/analytics-1.4-apis/#/Classifications) allow for SAINT job importing, exporting, retrieving, filtering, templating, and attaching. The [2.0 Classifications APIs](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Classification%202.0%20APIs) instead allow for more flexible ways of working with classification datasets. The 2.0 APIs use the same data and methods that are used when working with classifications in the Adobe Analytics UI.

Instead of importing SAINT classifications, with the 2.0 APIs you can [import API classifications by uploading data files](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/classifications/import-file/). You can create, upload, and commit classification jobs with data files in `.tsv`, `.tab`, or JSON format. The following table describes this uploading process:

| Step | API | Description |
| --- | --- | -- |
| 1 | [POST create job](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/classifications/import-file/#post-create-job) | Create an import job for a classification dataset. Creating an import job is required to produce a job ID that can be associated with an uploaded dataset file. |
| 2 | [POST upload file](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/classifications/import-file/#post-upload-file) | Uploads a file that will be associated with the job ID created with the POST create job endpoint. |
| 3 | [POST commit job](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/classifications/import-file/#post-commit-job) | Commits the changes of a specified job ID. |

Additionally, the 2.0 Classifications APIs provide 12 more endpoints for creating, importing, exporting, retrieving, updating, and deleting classification datasets and the jobs associated with them. 

For more information, see the [2.0 Classifications API guide](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/classifications/) and the [2.0 API Classifications API Reference](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Classification%202.0%20APIs).
