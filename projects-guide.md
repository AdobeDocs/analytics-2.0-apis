# Projects APIs

## Projects Overview

The Analytics 2.0 Projects APIs allow you to retrieve, update, or create projects programmatically through Adobe I/O. The APIs use the same data and methods that are used when working with projects in the UI. For more information on understanding project definition data architecture, see the [Project Definition](projects.md) article that accompanies this user guide.

## Authorization and Authentication

To obtain authorization and authentication, see the [Getting Started Guide for 2.0 APIs](https://www.adobe.io/apis/experiencecloud/analytics/docs.html#!AdobeDocs/analytics-2.0-apis/master/create-oauth-client.md).

## Best Practices

Please follow these guidelines when using the Projects APIs:

*  Make multiple, smaller requests instead of a large, single request.
*  Request data once and cache it.
*  Use caution when updating a project so that you do not alter the original project used by others.
*  Avoid creating duplicate projects with the same definition. Creating many projects will affect performance for your company in some situations.
*  If possible use the Analytics UI for creating projects from scratch. The UI offers significant advantages for managing and optimizing the complexity of this task. If you need to create projects programmatically, it is usually easier to create a template project in the UI and then have your application change only small portions of the project definition.

## /projects Endpoint Description

The `/projects` endpoint description is shown in our [Swagger UI](https://adobedocs.github.io/analytics-2.0-apis/). Use the Swagger UI to see endpoint summaries, available methods, parameters, example values, models, and status codes, and to try out the API.

### Expansions

Projects endpoints support the URL query parameter `expansion`. This parameter allows specifying additional data fields to be populated in response objects. Available expansions are shown in the [Swagger UI](https://adobedocs.github.io/analytics-2.0-apis/) description. The following table describes expansion fields:

|           Field       | 	Description         |
|---------------------|-------------------------|
| reportSuiteName | The name of the report suite |
| ownerFullName | The name of the owner of the project |
| modified | The date the project was last modified |
| tags |  Tags applied to the project |
| accessLevel | Access level the current user has to a particular project (Edit/Duplicate/View) |
| externalReferences | Analytics components (Segments, Calculated Metrics) used in the project definition |
| definition | The [project definition](projects.md) |

### IncludeTypes

The GET multiple `/projects` endpoint supports the query parameter `includeType`. This parameter alters the set of projects that are included in API responses. By default, responses without this parameter include only projects owned by the user making the request. When using this parameter, the following values are possible:

* `all`: Returns all projects linked to this company - this includeType is only available to admin users
* `shared`: Returns projects shared with the user

### Locale

Project endpoints support the URL query parameter `locale`. Supported values are `en_US`, `fr_FR`, `jp_JP`, `ja_JP`, `de_DE`, `es_ES`, `ko_KR`, `pt_BR`, `zh_CN`, and `zh_TW`. This query parameter specifies the language for responses.

## Pagination

Any response that can return multiple projects can be paginated with the `page` and `limit` URL query parameters. The `limit` parameter indicates the size of the desired page, and the `page` parameter indicates which page you want. A maximum page size of 1000 is enforced.

## Creating Projects

As mentioned in the [Best Practices](#best-practices) section above, the Analytics UI is recommended for creating projects from scratch. If you do choose to use the API to create projects, keep in mind that certain fields cannot be supplied via the `POST /projects` endpoint. For example, `tags` are not stored within the projects themselves and will therefore be ignored if supplied on a creation request. To modify a projects's tags, use the [Tags APIs](https://www.adobe.io/apis/experiencecloud/analytics/docs.html#!AdobeDocs/analytics-2.0-apis/master/tags.md).

## Retrieving Projects

By default, projects are returned which are owned or shared with the user making the request.  You can also use multiple URL query parameter filters. You can filter by project id (`filterByIds`), and `ownerId`. For example, to retrieve all projects for a particular owner, you can add the URL parameter `ownerId={loginId}`. The `filterByIds` filter accepts a comma-delimited list. These lists should be short, with no more than 100 items.

### Example cURL Request

The following example requests all projects on page 0 with page size 10:

```

curl -X GET "https://analytics.adobe.io/api/aawapp6/projects?locale=en_US&limit=10&page=0" -H "x-api-key: {OAUTHTOKEN}" -H "x-proxy-global-company-id: {COMPANYID}" -H "Authorization: Bearer {ACCESSTOKEN}" -H "Accept: application/json" -H "Content-Type: application/json"

```

### Example Response

The following response 10 projects owned by the caller on the first page:

```

{
  "content": [
    {
      "id": "6091a10005c7706c0acdd751",
      "name": "New Project",
      "description": "",
      "rsid": "apptestpnwtest",
      "owner": {
        "id": 622291
      },
      "type": "project",
      "created": "2021-05-04T19:31:12Z"
    },
    {
      "id": "6094a7e01936af351300b81b",
      "name": "New Project",
      "description": "",
      "rsid": "apptestpnwtest",
      "owner": {
        "id": 622291
      },
      "type": "project",
      "created": "2021-05-07T02:37:20Z"
    },
    {
      "id": "6094aa6b318ae31bf7d0a052",
      "name": "New Project",
      "description": "",
      "rsid": "apptestpnwtest",
      "owner": {
        "id": 622291
      },
      "type": "project",
      "created": "2021-05-07T02:48:11Z"
    },
    {
      "id": "609c001c17d70a6b31694b7b",
      "name": "New Project",
      "description": "",
      "rsid": "apptestpnwtest",
      "owner": {
        "id": 622291
      },
      "type": "project",
      "created": "2021-05-12T16:19:40Z"
    },
    {
      "id": "609d94557a1bac32bfe822d6",
      "name": "New Project",
      "description": "",
      "rsid": "apptestpnwtest",
      "owner": {
        "id": 622291
      },
      "type": "project",
      "created": "2021-05-13T21:04:21Z"
    },
    {
      "id": "609d9b7117d70a6b31699d63",
      "name": "New Project",
      "description": "",
      "rsid": "apptestpnwtest",
      "owner": {
        "id": 622291
      },
      "type": "project",
      "created": "2021-05-13T21:34:41Z"
    },
    {
      "id": "609eb9772ecede2233067197",
      "name": "New Project",
      "description": "",
      "rsid": "apptestpnwtest",
      "owner": {
        "id": 622291
      },
      "type": "project",
      "created": "2021-05-14T17:55:03Z"
    },
    {
      "id": "60a400cfad861025de7edf25",
      "name": "New Project",
      "description": "",
      "rsid": "apptestpnwtest",
      "owner": {
        "id": 622291
      },
      "type": "project",
      "created": "2021-05-18T18:00:47Z"
    },
    {
      "id": "60a403292ecede223306ffe3",
      "name": "New Project",
      "description": "",
      "rsid": "apptestpnwtest",
      "owner": {
        "id": 622291
      },
      "type": "project",
      "created": "2021-05-18T18:10:49Z"
    },
    {
      "id": "60a5777dad861025de7ee116",
      "name": "New Project",
      "description": "",
      "rsid": "apptestpnwtest",
      "owner": {
        "id": 622291
      },
      "type": "project",
      "created": "2021-05-19T20:39:25Z"
    }
  ],
  "totalPages": 10,
  "totalElements": 94,
  "number": 0,
  "numberOfElements": 10,
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
  "size": 10
}

```

## Retrieving a Single Project

You can retrieve projects individually if you know the project `id`. To find the project `id`, you can refer to the report descriptions or find it by using the multiple projects endpoint.

### Example Request

The following example requests data on the project `6091a10005c7706c0acdd751` with global company ID `aawapp6`:

```

curl -X GET "https://analytics.adobe.io/api/aawapp6/projects/6091a10005c7706c0acdd751?locale=en_US" -H "x-api-key: {OAUTHTOKEN}" -H "x-proxy-global-company-id: aawapp6" -H "Authorization: Bearer {ACCESSTOKEN}" -H "Accept: application/json" -H "Content-Type: application/json"

```

### Example Response

The following example shows the response data for the request on project `6091a10005c7706c0acdd751` with company ID `aawapp6`:

```

{
  "id": "6091a10005c7706c0acdd751",
  "name": "New Project",
  "description": "",
  "rsid": "apptestpnwtest",
  "owner": {
    "id": 622291
  },
  "type": "project",
  "created": "2021-05-04T19:31:12Z"
}

```

## Deleting a Project

If you delete a project, it is hidden from all users in all menus. Additionally, it is no longer returned when retrieving multiple projects in an API call.

### Example Request

The following example deletes project `6091a10005c7706c0acdd751`:

```
curl -X DELETE "https://analytics.adobe.io/api/aawapp6/projects/6091a10005c7706c0acdd751?locale=en_US" -H "x-api-key: {OAUTHTOKEN}" -H "x-proxy-global-company-id: {COMPANYID}" -H "Authorization: Bearer {ACCESSTOKEN}" -H "Accept: application/json" -H "Content-Type: application/json"

```

### Example Response

The following response shows the deletion status for project `6091a10005c7706c0acdd751`:

```

{
  "result": "success"
}

```

## Updating a Project

You can edit existing projects with the `PUT /projects/{id}` endpoint. Some fields cannot be edited on a project with the PUT endpoint, including `tags` and `reportSuiteName`. Other fields, including `owner`, `name`, `description`, `rsid`, and `definition`, can be edited.

The `PUT` endpoint also supports partial updates. This means that instead of sending the entire JSON object to the API, you can simply send fields that you want to update. For example, if you only want to update the name, use the JSON `{"name":"Updated name"}`. The entire object is returned in the response, modified by the requested expansions.

### Example Request

The following example updates the project `6091a10005c7706c0acdd751` with a new name:

```

curl -X PUT "https://analytics.adobe.io/api/aawapp6/projects/6091a10005c7706c0acdd751?locale=en_US" -H "x-api-key: {OAUTHTOKEN}" -H "x-proxy-global-company-id: {COMPANYID}" -H "Authorization: Bearer {ACCESSTOKEN}" -H "Accept: application/json" -H "Content-Type: application/json" -d "{"name":"{NAME UPDATE}"}"

```

### Example Response

The following example shows the response with updated name data:

```

{
  "id": "6091a10005c7706c0acdd751",
  "name": "{NAME UPDATE}",
  "description": "",
  "rsid": "apptestpnwtest",
  "owner": {
    "id": 622291
  },
  "type": "project",
  "created": "2021-05-04T19:31:12Z"
}

```

## Validate Endpoint

Because report suites can have different configurations, variables, or metrics, one project that is valid in one report suite may not be valid in another. To determine which projects to use in different report suites, you can use the `validate` endpoint. This endpoint allows you to `POST` a definition along with a target `rsid`. The validate endpoint responds with compatibility information on the project.

### Example Request

The following example requests validation for the project with `rsid`: `apptestpnwtest`. The example shows a `POST` of the JSON [definition](projects.md):

```

curl -X POST --header "Content-Type: application/json" --header "Accept: application/json" --header "Authorization: Bearer {ACCESSTOKEN}" -H "x-proxy-global-company-id: {COMPANYID}" -d "{
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
        "value": ["#00C0C7", "#5144D3", "#E8871A", "#DA3490", "#9089FA", "#47E26F", "#2780EB", "#6F38B1", "#DFBF03", "#CB6F10", "#268D6C", "#9BEC54", "#5EABFA", "#BE40CC", "#F56BB7", "#FEE02D"]
      },
      "countRepeatInstances": true,
      "currentWorkspaceIndex": 0,
      "customColorSchemes": [],
      "isCurated": false,
      "version": "31",
      "viewDensity": "expanded",
      "workspaces": [{
        "id": "3B1FE317-C72A-4983-ABF1-D3BD14A8D511",
        "name": "",
        "panels": [{
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
          "subPanels": [{
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
                "nodes": [{
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
                }],
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
                "columnWidths": [100, 100],
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
                "staticRows": [{
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
                }],
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
          }],
          "type": "panel"
        }]
      }]
    },
    "created": "2021-05-04T19:31:12Z"
  }
}" "https://analytics.adobe.io/api/aawapp6/projects/validate?rsid=apptestpnwtest" -H "x-api-key: {OAUTHTOKEN}"

```

### Example Response

The following response shows validation for the project with `rsid`: `apptestpnwtest`.

```
{
  "valid": true,
  "validatorVersion": "1.0.0"
}
```
