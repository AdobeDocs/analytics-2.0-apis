# Project Definition Data Structure
The project definition data structure is used to communicate project rules to the API. This data structure defines the raw logic that is used to layout a workspace project. The project definition is a hierarchical data structure of workspaces, panels, and other properties that are used to define the project. Workspace in the Adobe Analytics UI defines these rules and can be a useful tool for creating and understanding how projects are structured.

## Example

The following example is a very simple report to show all visits noted under a specific report suite for the last month.  As you can see, even though it's a very simple report, the definition is very large.  It is suggested that creating Workspace Projects be done in the Adobe Analytics UI, and the `/projects` endpoints be used to update or copy projects in simple ways.

If creating a project through the API is required, make sure to utilize the `/projects/validate` endpoint, as described in the [Projects Guide](projects-guide.md).

```json
{
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
  }
}
```
