---
title: Projects APIs
description: Create, edit, or delete projects using the API.
---

# Projects API

The Analytics 2.0 Projects APIs allow you to retrieve, update, or create projects programmatically through Adobe I/O. These APIs use the same data and methods that Adobe uses inside the product UI.

## Retrieve multiple projects

See [Project parameters](parameters.md) for a list of query strings that you can attach to this API call.

`GET https://analytics.adobe.io/api/{COMPANYID}/projects`

For example, get a response localized in English, limited to the first page, with three responses per page.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET "https://analytics.adobe.io/api/aawapp6/projects?locale=en_US&limit=3&page=0" \
    -H "x-api-key: {OAUTHTOKEN}" \
    -H "x-proxy-global-company-id: {COMPANYID}" \
    -H "Authorization: Bearer {ACCESSTOKEN}" \
    -H "Accept: application/json" \
    -H "Content-Type: application/json"
```

#### Response

```json
{
  "content": [
    {
      "id": "6091a10005c7706c0acdd751",
      "name": "New Project 1",
      "description": "",
      "rsid": "examplersid",
      "owner": {
        "id": 622291
      },
      "type": "project",
      "created": "YYYY-05-04T19:31:12Z"
    },
    {
      "id": "6094a7e01936af351300b81b",
      "name": "Example project",
      "description": "",
      "rsid": "examplersid",
      "owner": {
        "id": 622291
      },
      "type": "project",
      "created": "YYYY-05-07T02:37:20Z"
    },
    {
      "id": "6094aa6b318ae31bf7d0a052",
      "name": "My project 3",
      "description": "",
      "rsid": "examplersid",
      "owner": {
        "id": 622291
      },
      "type": "project",
      "created": "YYYY-05-07T02:48:11Z"
    }
  ],
  "totalPages": 32,
  "totalElements": 94,
  "number": 0,
  "numberOfElements": 3,
  "firstPage": true,
  "lastPage": false,
  "sort": [
    {
      "direction": "ASC",
      "property": "id",
      "ignoreCase": false,
      "ascending": true
    }
  ],
  "size": 3
}
```

## Retrieve a single project

You can retrieve details around a single project if you know the project ID. You can find the project ID by looking in the [debugger](../reports/debugger.md) or using the multiple projects endpoint.

`GET https://analytics.adobe.io/api/examplecompany/projects/{ID}`

For example, find details around the project with an ID of `6091a`:

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X GET "https://analytics.adobe.io/api/examplecompany/projects/6091a" \
    -H "x-api-key: {OAUTHTOKEN}" \
    -H "x-proxy-global-company-id: {COMPANYID}" \
    -H "Authorization: Bearer {ACCESSTOKEN}" \
    -H "Accept: application/json" \
    -H "Content-Type: application/json"
```

#### Response

```json
{
  "id": "6091a",
  "name": "Example project",
  "description": "",
  "rsid": "examplersid",
  "owner": {
    "id": 622291
  },
  "type": "project",
  "created": "YYYY-05-04T19:31:12Z"
}
```

## Delete a project

When you delete a project, it is hidden from all users in all menus. It is also hidden from API calls to the multiple projects endpoint. You can still retrieve details on a deleted project if you still have the project ID.

`DELETE https://analytics.adobe.io/api/examplecompany/projects/{ID}`

For example, delete a project with the ID of `c7706c`:

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X DELETE "https://analytics.adobe.io/api/aawapp6/projects/c7706c" \
    -H "x-api-key: {OAUTHTOKEN}" \
    -H "x-proxy-global-company-id: {COMPANYID}" \
    -H "Authorization: Bearer {ACCESSTOKEN}" \
    -H "Accept: application/json" \
    -H "Content-Type: application/json"
```

#### Response

```json
{
  "result": "success"
}
```

## Update a project

You can edit projects using `PUT` API calls. It supports partial updates, meaning that instead of sending an entire project JSON object, you can only send the fields that you want to update. This API call requires a JSON body, which determines the parts of a project that you want to update.

`PUT https://analytics.adobe.io/api/examplecompany/projects/{ID}`

For example, only update the name of the project with an ID of `cdd751`:

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X PUT "https://analytics.adobe.io/api/examplecompany/projects/cdd751" \
    -H "x-api-key: {OAUTHTOKEN}" \
    -H "x-proxy-global-company-id: {COMPANYID}" \
    -H "Authorization: Bearer {ACCESSTOKEN}" \
    -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    -d "{'name':'Different project name'}"
```

#### Response

```json
{
  "id": "cdd751",
  "name": "Different project name",
  "description": "",
  "rsid": "examplersid",
  "owner": {
    "id": 622291
  },
  "type": "project",
  "created": "YYYY-05-04T19:31:12Z"
}
```

## Validate

Report suites can have different configurations, variables or metrics. One project that is valid in one report suite might not be valid in another. You can use this endpoint to make sure that a project is compatible with a report suite.

This API call requires a JSON request body, which is a [project definition](definition.md).

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X POST "https://analytics.adobe.io/api/aawapp6/projects/validate?rsid=apptestpnwtest" \
    -H "x-api-key: {OAUTHTOKEN}" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Authorization: Bearer {ACCESSTOKEN}" \
    -H "x-proxy-global-company-id: {COMPANYID}" \
    -d '{
        "project": {
            "id": "6091a10005c7706c0acdd751",
            "name": "New Project",
            "description": "",
            "rsid": "apptestpnwtest",
            "owner": {
            "id": 622291
            },
            "type": "project",
            "definition": {
            "additionalCuratedComponents": [],
            "colorScheme": {
                "id": "default",
                "label": "",
                "value": [
                "#00C0C7",
                "#5144D3",
                "#E8871A",
                "#DA3490",
                "#9089FA",
                "#47E26F",
                "#2780EB",
                "#6F38B1",
                "#DFBF03",
                "#CB6F10",
                "#268D6C",
                "#9BEC54",
                "#5EABFA",
                "#BE40CC",
                "#F56BB7",
                "#FEE02D"
                ]
            },
            "countRepeatInstances": true,
            "currentWorkspaceIndex": 0,
            "customColorSchemes": [],
            "isCurated": false,
            "version": "31",
            "viewDensity": "expanded",
            "workspaces": [
                {
                "id": "3B1FE317-C72A-4983-ABF1-D3BD14A8D511",
                "name": "",
                "panels": [
                    {
                    "annotations": [],
                    "collapsed": false,
                    "dateRange": {
                        "id": "thisMonth",
                        "__entity__": true,
                        "type": "DateRange",
                        "__metaData__": {
                        "name": "This month"
                        }
                    },
                    "description": "",
                    "id": "C0DACAE8-CCE1-4332-9496-ABDBE80C9C23",
                    "name": "Freeform",
                    "position": {
                        "autoHeight": 374,
                        "autoSize": true,
                        "width": 100,
                        "x": 0,
                        "y": 0
                    },
                    "reportSuite": {
                        "id": "apptestpnwtest",
                        "__entity__": true,
                        "type": "ReportSuite",
                        "__metaData__": {
                        "name": "apptestpnwtest",
                        "rsid": "apptestpnwtest"
                        }
                    },
                    "segmentGroups": [],
                    "subPanels": [
                        {
                        "collapsed": false,
                        "description": "",
                        "id": "F2AAAA88-E63E-4AB6-9090-3612F378B9F0",
                        "isQuickInsightsSubPanel": false,
                        "linkedSourceId": "",
                        "position": {
                            "autoHeight": 222,
                            "autoSize": true,
                            "width": 100,
                            "x": 0,
                            "y": 0
                        },
                        "reportlet": {
                            "advancedMode": false,
                            "advancedSettings": {
                            "rows": [],
                            "tableState": "builder"
                            },
                            "columnTree": {
                            "_computedValues": [],
                            "dataSettings": {
                                "advancedItemLimit": 5,
                                "advancedItemSearch": {
                                "operator": "AND",
                                "rules": []
                                }
                            },
                            "id": "f46df4-2",
                            "name": "",
                            "nodes": [
                                {
                                "_computedValues": [],
                                "component": {
                                    "id": "All_Visits",
                                    "__entity__": true,
                                    "type": "Segment",
                                    "__metaData__": {
                                    "name": "All Visits"
                                    }
                                },
                                "dataSettings": {
                                    "advancedItemLimit": 5,
                                    "advancedItemSearch": {
                                    "operator": "AND",
                                    "rules": []
                                    }
                                },
                                "id": "f46df4-4",
                                "name": "All Visits",
                                "nodes": [],
                                "selectionCoordinates": [],
                                "tableCellDisplay": {
                                    "conditionalFormattingOpts": {
                                    "autoGenerate": true,
                                    "usePercentLimits": false
                                    },
                                    "location": "behindNumber",
                                    "type": {
                                    "anomaly": true,
                                    "background": true,
                                    "backgroundType": "bar",
                                    "comparison": "none",
                                    "interpretZeroAsNoValue": false,
                                    "number": true,
                                    "percent": true,
                                    "showGrandTotal": true,
                                    "showSparklines": true,
                                    "showTotals": true,
                                    "wrapHeaderText": true
                                    }
                                }
                                }
                            ],
                            "selectionCoordinates": [],
                            "tableCellDisplay": {
                                "conditionalFormattingOpts": {
                                "autoGenerate": true,
                                "usePercentLimits": false
                                },
                                "location": "behindNumber",
                                "type": {
                                "anomaly": true,
                                "background": true,
                                "backgroundType": "bar",
                                "comparison": "none",
                                "interpretZeroAsNoValue": false,
                                "number": true,
                                "percent": true,
                                "showGrandTotal": true,
                                "showSparklines": true,
                                "showTotals": true,
                                "wrapHeaderText": true
                                }
                            }
                            },
                            "freeformTable": {
                            "alignDatesForTimeDimension": true,
                            "attributionSettings": [],
                            "breakdowns": [],
                            "collapsed": false,
                            "columnWidths": [
                                100,
                                100
                            ],
                            "pagination": {
                                "currentPage": 0,
                                "viewBy": 50
                            },
                            "search": {
                                "operator": "AND",
                                "rules": []
                            },
                            "selectionCoordinates": [],
                            "settings": {
                                "breakdownByPosition": false,
                                "rowBasedPercentages": false,
                                "totalsType": "columnSum"
                            },
                            "sort": {
                                "asc": false,
                                "columnId": "f46df4-4",
                                "labelColumn": false
                            },
                            "staticRows": [
                                {
                                "component": {
                                    "id": "metrics/visits",
                                    "__entity__": true,
                                    "type": "Metric",
                                    "__metaData__": {
                                    "name": "Visits"
                                    }
                                },
                                "dataSettings": {
                                    "advancedItemLimit": 5,
                                    "advancedItemSearch": {
                                    "operator": "AND",
                                    "rules": []
                                    }
                                },
                                "id": "f46df4-a"
                                }
                            ],
                            "statistics": {
                                "functions": [],
                                "ignoreZeros": true
                            }
                            },
                            "isConfigVisible": true,
                            "type": "FreeformReportlet"
                        },
                        "swatchColor": "#00C0C7",
                        "type": "genericSubPanel",
                        "visible": true,
                        "visualizationIndex": 1
                        }
                    ],
                    "type": "panel"
                    }
                ]
                }
            ]
            },
            "created": "YYYY-05-04T19:31:12Z"
        }
    }'
```

#### Response

```json
{
  "valid": true,
  "validatorVersion": "1.0.0"
}
```
