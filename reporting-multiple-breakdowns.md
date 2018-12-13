# Reporting with Multiple Breakdowns

The following guide will give an example of how to run multiple levels of breakdowns using the `/reports` endpoint. This guide should help provide a deeper understanding of how to use metric filters to get the data you want from the reporting API.

Analysis Workspace will be used to give a visual representation of each step. For more information about how to use Analysis Workspace to build and validate report requests refer to the [Reporting Tricks Guide](reporting-tricks.md)

## Running the top level report

For this example we will start with a simple report that is using `Day` for the dimension and includes the `Page Views` and `Visits` metrics. The date range is set to the week of November 18, 2018.

![multiple_breakdowns_example_1](/images/multiple_breakdowns_example_1.png?raw=true)

The JSON message request body for this report request looks like this:

```json={line-numbers="yes"}
{
    "rsid": "[REPORT SUITE ID HERE]",
    "globalFilters": [
        {
            "type": "dateRange",
            "dateRange": "2018-11-18T00:00:00.000/2018-11-25T00:00:00.000"
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
                "id": "metrics/visits"
            }
        ]
    },
    "dimension": "variables/daterangeday",
    "settings": {
        "countRepeatInstances": true,
        "limit": 400,
        "page": 0,
        "dimensionSort": "asc"
    }
}
```

Running the report request results in a response like the following:

```json={line-numbers="yes"}
{
    "totalPages": 1,
    "firstPage": true,
    "lastPage": true,
    "numberOfElements": 7,
    "number": 0,
    "totalElements": 7,
    "columns": {
        "dimension": {
            "id": "variables/daterangeday",
            "type": "time"
        },
        "columnIds": [
            "0",
            "1"
        ]
    },
    "rows": [
        {
            "itemId": "1181018",
            "value": "Nov 18, 2018",
            "data": [
                63,
                30
            ]
        },
        {
            "itemId": "1181019",
            "value": "Nov 19, 2018",
            "data": [
                73,
                37
            ]
        },
        {
            "itemId": "1181020",
            "value": "Nov 20, 2018",
            "data": [
                96,
                42
            ]
        },
        {
            "itemId": "1181021",
            "value": "Nov 21, 2018",
            "data": [
                135,
                57
            ]
        },
        {
            "itemId": "1181022",
            "value": "Nov 22, 2018",
            "data": [
                87,
                45
            ]
        },
        {
            "itemId": "1181023",
            "value": "Nov 23, 2018",
            "data": [
                77,
                50
            ]
        },
        {
            "itemId": "1181024",
            "value": "Nov 24, 2018",
            "data": [
                112,
                49
            ]
        }
    ],
    "summaryData": {
        "totals": [
            643,
            310
        ]
    }
}
```

## Running the second level breakdown report

For the second level breakdown of our example we will break down the day of `Nov 19, 2018` by the `Page` dimension. In order to do this we need the `itemId` of the row from the report response of the top level report. In this case the itemId for `Nov 19, 2018` is `1181019` so we will use that in our report request below.

![multiple_breakdowns_example_2](/images/multiple_breakdowns_example_2.png?raw=true)

The JSON message request body for this report request looks like this:

```json={line-numbers="yes"}
{
    "rsid": "[REPORT SUITE ID HERE]",
    "globalFilters": [
        {
            "type": "dateRange",
            "dateRange": "2018-11-18T00:00:00.000/2018-11-25T00:00:00.000"
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
                "filters": [
                    "1"
                ]
            }
        ],
        "metricFilters": [
            {
                "id": "0",
                "type": "breakdown",
                "dimension": "variables/daterangeday",
                "itemId": "1181019"
            },
            {
                "id": "1",
                "type": "breakdown",
                "dimension": "variables/daterangeday",
                "itemId": "1181019"
            }
        ]
    },
    "dimension": "variables/page",
    "settings": {
        "countRepeatInstances": true,
        "limit": 5,
        "page": 0
    }
}
```

*Notice* there is a `metricFilters` attribute in the request containing a metric filter that corresponds to a metric in the `metrics` attribute of the request. Each metric has a `filters` array which will apply metric filters to the metric column. In this example we are applying metric filter 0 to the `Page Views` metric column and metric filter 1 to the `Visits` metric column.


Running the report request results in a response like the following:

```json={line-numbers="yes"}
{
    "totalPages": 1,
    "firstPage": true,
    "lastPage": true,
    "numberOfElements": 5,
    "number": 0,
    "totalElements": 5,
    "columns": {
        "dimension": {
            "id": "variables/page",
            "type": "string"
        },
        "columnIds": [
            "0",
            "1"
        ]
    },
    "rows": [
        {
            "itemId": "364325780",
            "value": "videoPage3",
            "data": [
                22,
                22
            ]
        },
        {
            "itemId": "2095855582",
            "value": "videoPage2",
            "data": [
                19,
                19
            ]
        },
        {
            "itemId": "2770622699",
            "value": "videoPage1",
            "data": [
                15,
                15
            ]
        },
        {
            "itemId": "2519319590",
            "value": "videoPage4",
            "data": [
                15,
                15
            ]
        },
        {
            "itemId": "4240790753",
            "value": "videoPage5",
            "data": [
                2,
                2
            ]
        }
    ],
    "summaryData": {
        "totals": [
            73,
            37
        ]
    }
}
```

## Running the third level breakdown report

For the third level breakdown of our example we will break down the page `videoPage3` by the `Cities` dimension. In order to do this we need the `itemId` of the row from the report response of the second level report. In this case the itemId for `videoPage3` is `364325780` so we will use that in our report request below.

![multiple_breakdowns_example_3](/images/multiple_breakdowns_example_3.png?raw=true)

The JSON message request body for this report request looks like this:

```json={line-numbers="yes"}
{
    "rsid": "[REPORT SUITE ID HERE]",
    "globalFilters": [
        {
            "type": "dateRange",
            "dateRange": "2018-11-18T00:00:00.000/2018-11-25T00:00:00.000"
        }
    ],
    "metricContainer": {
        "metrics": [
            {
                "columnId": "0",
                "id": "metrics/pageviews",
                "filters": [
                    "0",
                    "2"
                ]
            },
            {
                "columnId": "1",
                "id": "metrics/visits",
                "filters": [
                    "1",
                    "3"
                ]
            }
        ],
        "metricFilters": [
            {
                "id": "0",
                "type": "breakdown",
                "dimension": "variables/daterangeday",
                "itemId": "1181019"
            },
            {
                "id": "1",
                "type": "breakdown",
                "dimension": "variables/daterangeday",
                "itemId": "1181019"
            },
            {
                "id": "2",
                "type": "breakdown",
                "dimension": "variables/page",
                "itemId": "364325780"
            },
            {
                "id": "3",
                "type": "breakdown",
                "dimension": "variables/page",
                "itemId": "364325780"
            }
        ]
    },
    "dimension": "variables/geocity",
    "settings": {
        "countRepeatInstances": true,
        "limit": 5,
        "page": 0
    }
}
```

*Notice* we now have 4 metric filters in the `metricFilters` array of our request. Filters 0 and 2 are applied to the `Page Views` metric column and filters 1 and 3 are applied to the `Visits` metric column.

Running the report request results in a response like the following:

```json={line-numbers="yes"}
{
    "totalPages": 1,
    "firstPage": true,
    "lastPage": true,
    "numberOfElements": 1,
    "number": 0,
    "totalElements": 1,
    "columns": {
        "dimension": {
            "id": "variables/geocity",
            "type": "enum"
        },
        "columnIds": [
            "0",
            "1"
        ]
    },
    "rows": [
        {
            "itemId": "3113581109",
            "value": "Lehi (Utah, United States)",
            "data": [
                22,
                22
            ]
        }
    ],
    "summaryData": {
        "totals": [
            22,
            22
        ]
    }
}
```

