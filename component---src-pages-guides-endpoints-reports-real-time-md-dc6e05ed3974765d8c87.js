"use strict";(self.webpackChunkanalytics_2_0_apis=self.webpackChunkanalytics_2_0_apis||[]).push([[9522],{30598:function(e,n,t){t.r(n),t.d(n,{_frontmatter:function(){return l},default:function(){return N}});var a=t(87462),r=t(63366),i=(t(15007),t(64983)),d=t(91515),m=["components"],l={},o=function(e){return function(n){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,i.mdx)("div",n)}},p=o("InlineAlert"),s=o("CodeBlock"),x={_frontmatter:l},u=d.Z;function N(e){var n=e.components,t=(0,r.Z)(e,m);return(0,i.mdx)(u,(0,a.Z)({},x,t,{components:n,mdxType:"MDXLayout"}),(0,i.mdx)("h1",{id:"analytics-real-time-reports-api"},"Analytics real-time reports API"),(0,i.mdx)("p",null,"The Analytics 2.0 real-time report API endpoint allows you to access real-time data programmatically through Adobe Developer. The real-time data reported is less than two minutes latent and auto-updates on a minute-by-minute basis. See the ",(0,i.mdx)("a",{parentName:"p",href:"https://experienceleague.adobe.com/en/docs/analytics/components/real-time-reporting/realtime"},"Real-time reporting overview")," for more information."),(0,i.mdx)("p",null,"The endpoint described in this guide is routed through analytics.adobe.io. To use it, you will need to first create a client with access to the Adobe Analytics Reporting API. For more information, refer to ",(0,i.mdx)("a",{parentName:"p",href:"https://developer.adobe.com/analytics-apis/docs/2.0/guides/"},"Getting started with the Analytics API"),"."),(0,i.mdx)(p,{variant:"info",slots:"text",mdxType:"InlineAlert"}),(0,i.mdx)("p",null,"Adobe may add optional request and response members (name/value pairs) to existing API objects at any time and without notice or changes in versioning. Adobe recommends that you refer to the API documentation of any third-party tool you integrate with our APIs so that such additions are ignored in processing if not understood. If implemented properly, such additions are non-breaking changes for your implementation. Adobe will not remove parameters or add required parameters without first providing standard notification through release notes."),(0,i.mdx)("h2",{id:"post-real-time-report"},"POST real-time report"),(0,i.mdx)("p",null,"Use this endpoint to Generates a real-time report for the data requested in a POST body."),(0,i.mdx)("p",null,(0,i.mdx)("strong",{parentName:"p"},"POST"),"  ",(0,i.mdx)("inlineCode",{parentName:"p"},"https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/reports/realtime")),(0,i.mdx)(p,{variant:"info",slots:"text",mdxType:"InlineAlert"}),(0,i.mdx)("p",null,"You can find your global company ID by using the ",(0,i.mdx)("a",{parentName:"p",href:"../discovery.md"},"Discovery API"),"."),(0,i.mdx)("h3",{id:"request-and-response-examples"},"Request and response examples"),(0,i.mdx)("p",null,"Click the ",(0,i.mdx)("strong",{parentName:"p"},"Request")," tab in the following example to see a cURL request for this endpoint. Click the ",(0,i.mdx)("strong",{parentName:"p"},"Response")," tab to see a successful JSON response for the request."),(0,i.mdx)(s,{slots:"heading, code",repeat:"2",languages:"CURL,JSON",mdxType:"CodeBlock"}),(0,i.mdx)("h3",{id:"request"},"Request"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-sh"},'curl -X POST "https://analytics.adobe.io/api/{GLOBAL_COMPANY-ID}/reports/realtime" \\\n  -H "accept: application/json" \\\n  -H "x-api-key: {CLIENT_ID}" \\\n  -H "Authorization: Bearer {ACCESS_TOKEN}"\\\n  -d \'{\n  "rsid": "examplersid",\n  "globalFilters": [\n    {\n      "type": "dateRange",\n      "dateRange": "YYYY-DD-D1T09:00:00/YYYY-MM-D1T09:30:00"\n    }\n  ],\n  "metricContainer": {\n    "metrics": [\n      {\n        "columnId": "0",\n    "id": "metrics/occurrences"\n      }\n    ]\n  },\n  "dimensions": [\n    {\n      "id": "variables/daterangeminute",\n      "dimensionColumnId": "0"\n    }\n  ],\n  "settings": {\n    "realTimeMinuteGranularity": 10,\n    "limit": 20\n  }\n}\'\n')),(0,i.mdx)("h3",{id:"response"},"Response"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-json"},'{\n  "totalPages": 1,\n  "firstPage": true,\n  "lastPage": true,\n  "numberOfElements": 3,\n  "number": 0,\n  "totalElements": 3,\n  "rows": [\n    {\n      "itemIds": [\n        "12403260900"\n      ],\n      "values": [\n        "09:00 YYYY-MM-D1"\n      ],\n      "data": [\n        2183\n      ],\n      "value": "09:00 YYYY-MM-D1",\n      "itemId": "12403260900"\n    },\n    {\n      "itemIds": [\n        "12403260910"\n      ],\n      "values": [\n        "09:10 YYYY-MM-D1"\n      ],\n      "data": [\n        2256\n      ],\n      "value": "09:10 YYYY-MM-D1",\n      "itemId": "12403260910"\n    },\n    {\n      "itemIds": [\n        "12403260920"\n      ],\n      "values": [\n        "09:20 YYY-MM-D1"\n      ],\n      "data": [\n        2034\n      ],\n      "value": "09:20 YYYY-MM-D1",\n      "itemId": "12403260920"\n    }\n  ],\n  "summaryData": {\n    "totals": [\n      6473\n    ]\n  }\n}\n')),(0,i.mdx)("h3",{id:"request-example-details"},"Request example details"),(0,i.mdx)("p",null,"The above example creates a real-time report request for the following:"),(0,i.mdx)("ul",null,(0,i.mdx)("li",{parentName:"ul"},"To show data for the dimension ",(0,i.mdx)("inlineCode",{parentName:"li"},"daterangeminute")," and the metric ",(0,i.mdx)("inlineCode",{parentName:"li"},"occurences"),"for the rsid ",(0,i.mdx)("inlineCode",{parentName:"li"},"examplersid"),"."),(0,i.mdx)("li",{parentName:"ul"},"To show data over a 30-minute time period from ",(0,i.mdx)("inlineCode",{parentName:"li"},"YYYY-DD-D1T09:00:00")," to ",(0,i.mdx)("inlineCode",{parentName:"li"},"YYYY-MM-D1T09:30:00"),", where ",(0,i.mdx)("inlineCode",{parentName:"li"},"D1")," represents the same day, between the time from ",(0,i.mdx)("inlineCode",{parentName:"li"},"09:00")," to ",(0,i.mdx)("inlineCode",{parentName:"li"},"09:30"),". The start date cannot be earlier than 20 hours from the time the request is made, according to the time zone specified for the report suite."),(0,i.mdx)("li",{parentName:"ul"},"To show data at a granularity of ",(0,i.mdx)("inlineCode",{parentName:"li"},"10")," minutes, as specified in the value of ",(0,i.mdx)("inlineCode",{parentName:"li"},"realTimeMinuteGranularity"),".")),(0,i.mdx)("h4",{id:"request-parameters"},"Request parameters"),(0,i.mdx)("p",null,"The GET dimensions endpoint includes the following request query parameters:"),(0,i.mdx)("table",null,(0,i.mdx)("thead",{parentName:"table"},(0,i.mdx)("tr",{parentName:"thead"},(0,i.mdx)("th",{parentName:"tr",align:null},"Parameter"),(0,i.mdx)("th",{parentName:"tr",align:null},"Req/Opt"),(0,i.mdx)("th",{parentName:"tr",align:null},"Type"),(0,i.mdx)("th",{parentName:"tr",align:null},"Description"))),(0,i.mdx)("tbody",{parentName:"table"},(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"rsid")),(0,i.mdx)("td",{parentName:"tr",align:null},"required"),(0,i.mdx)("td",{parentName:"tr",align:null},"string"),(0,i.mdx)("td",{parentName:"tr",align:null},"report suite ID")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"locale")),(0,i.mdx)("td",{parentName:"tr",align:null},"optional"),(0,i.mdx)("td",{parentName:"tr",align:null},"string"),(0,i.mdx)("td",{parentName:"tr",align:null},"The specified language")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"globalFilters")),(0,i.mdx)("td",{parentName:"tr",align:null},"optional"),(0,i.mdx)("td",{parentName:"tr",align:null},"container"),(0,i.mdx)("td",{parentName:"tr",align:null},"Contains the ",(0,i.mdx)("inlineCode",{parentName:"td"},"type")," and ",(0,i.mdx)("inlineCode",{parentName:"td"},"dateRange")," parameters")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"type")),(0,i.mdx)("td",{parentName:"tr",align:null},"optional"),(0,i.mdx)("td",{parentName:"tr",align:null},"dateRange"),(0,i.mdx)("td",{parentName:"tr",align:null},"The type of filter to be applied")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"dateRange")),(0,i.mdx)("td",{parentName:"tr",align:null},"optional"),(0,i.mdx)("td",{parentName:"tr",align:null},"string"),(0,i.mdx)("td",{parentName:"tr",align:null},"The start and end dates for the report. The format is ",(0,i.mdx)("inlineCode",{parentName:"td"},"YYYY-DD-DDT00:00:00/YYYY-MM-DDT00:00:00"),"and is based on the timezone of the ",(0,i.mdx)("inlineCode",{parentName:"td"},"rsid"),".")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"metricContainer")),(0,i.mdx)("td",{parentName:"tr",align:null},"optional"),(0,i.mdx)("td",{parentName:"tr",align:null},"container"),(0,i.mdx)("td",{parentName:"tr",align:null},"Contains the ",(0,i.mdx)("inlineCode",{parentName:"td"},"metrics")," container")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"columnId")),(0,i.mdx)("td",{parentName:"tr",align:null},"optional"),(0,i.mdx)("td",{parentName:"tr",align:null},"string"),(0,i.mdx)("td",{parentName:"tr",align:null},"The column ID")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"id")),(0,i.mdx)("td",{parentName:"tr",align:null},"optional"),(0,i.mdx)("td",{parentName:"tr",align:null},"string"),(0,i.mdx)("td",{parentName:"tr",align:null},"The metric or dimension ID")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"dimensions")),(0,i.mdx)("td",{parentName:"tr",align:null},"required"),(0,i.mdx)("td",{parentName:"tr",align:null},"container"),(0,i.mdx)("td",{parentName:"tr",align:null},"Contains the ",(0,i.mdx)("inlineCode",{parentName:"td"},"id")," and ",(0,i.mdx)("inlineCode",{parentName:"td"},"dimensionColumnId")," of the dimensions to be included in the report. For real-time reports, the ",(0,i.mdx)("inlineCode",{parentName:"td"},"variables/daterangeminute")," is required.")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"dimensionColumnId")),(0,i.mdx)("td",{parentName:"tr",align:null},"required"),(0,i.mdx)("td",{parentName:"tr",align:null},"string"),(0,i.mdx)("td",{parentName:"tr",align:null},"The dimension column ID")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"settings")),(0,i.mdx)("td",{parentName:"tr",align:null},"optional"),(0,i.mdx)("td",{parentName:"tr",align:null},"container"),(0,i.mdx)("td",{parentName:"tr",align:null},"Contains the settings object members for the specified real-time report, including ",(0,i.mdx)("inlineCode",{parentName:"td"},"realTimeMinuteGranularity"))),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"realtimeMinuteGranularity")),(0,i.mdx)("td",{parentName:"tr",align:null},"optional"),(0,i.mdx)("td",{parentName:"tr",align:null}),(0,i.mdx)("td",{parentName:"tr",align:null},"The number of minutes between the reporting of the specified data")))),(0,i.mdx)("h3",{id:"response-example-details"},"Response example details"),(0,i.mdx)("p",null,"The above JSON response example shows the following details:"),(0,i.mdx)("ul",null,(0,i.mdx)("li",{parentName:"ul"},"Information for two ",(0,i.mdx)("inlineCode",{parentName:"li"},"classifiable")," dimensions in the ",(0,i.mdx)("inlineCode",{parentName:"li"},"examplersid")," report suite, including ",(0,i.mdx)("inlineCode",{parentName:"li"},"campaign")," and ",(0,i.mdx)("inlineCode",{parentName:"li"},"clickmaplink"),"."),(0,i.mdx)("li",{parentName:"ul"},"The ",(0,i.mdx)("inlineCode",{parentName:"li"},"title")," and ",(0,i.mdx)("inlineCode",{parentName:"li"},"name")," values for each dimension."),(0,i.mdx)("li",{parentName:"ul"},"Both dimensions have the same data ",(0,i.mdx)("inlineCode",{parentName:"li"},"type"),", set as ",(0,i.mdx)("inlineCode",{parentName:"li"},"string"),"."),(0,i.mdx)("li",{parentName:"ul"},"The dimensions differ in ",(0,i.mdx)("inlineCode",{parentName:"li"},"category"),". The ",(0,i.mdx)("inlineCode",{parentName:"li"},"category")," for ",(0,i.mdx)("inlineCode",{parentName:"li"},"campaign")," is ",(0,i.mdx)("inlineCode",{parentName:"li"},"Traffic sources"),". The ",(0,i.mdx)("inlineCode",{parentName:"li"},"category")," for ",(0,i.mdx)("inlineCode",{parentName:"li"},"clickmaplink")," is ",(0,i.mdx)("inlineCode",{parentName:"li"},"ClickMap"),"."),(0,i.mdx)("li",{parentName:"ul"},"Both dimensions are ",(0,i.mdx)("inlineCode",{parentName:"li"},"reportable")," in ",(0,i.mdx)("inlineCode",{parentName:"li"},"oberon"),". Both are also ",(0,i.mdx)("inlineCode",{parentName:"li"},"segmentable"),"."),(0,i.mdx)("li",{parentName:"ul"},"The dimension ",(0,i.mdx)("inlineCode",{parentName:"li"},"campaign")," does not have any categories associated with it, but the ",(0,i.mdx)("inlineCode",{parentName:"li"},"clickmaplink")," dimension is associated with ",(0,i.mdx)("inlineCode",{parentName:"li"},"Activity Map"),".")),(0,i.mdx)("h4",{id:"response-parameters"},"Response parameters"),(0,i.mdx)("p",null,"The GET dimensions endpoint includes the following response parameters:"),(0,i.mdx)("table",null,(0,i.mdx)("thead",{parentName:"table"},(0,i.mdx)("tr",{parentName:"thead"},(0,i.mdx)("th",{parentName:"tr",align:null},"Parameter"),(0,i.mdx)("th",{parentName:"tr",align:null},"Type"),(0,i.mdx)("th",{parentName:"tr",align:null},"Description"))),(0,i.mdx)("tbody",{parentName:"table"},(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"id")),(0,i.mdx)("td",{parentName:"tr",align:null},"string"),(0,i.mdx)("td",{parentName:"tr",align:null},"Dimension ID")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"title")),(0,i.mdx)("td",{parentName:"tr",align:null},"string"),(0,i.mdx)("td",{parentName:"tr",align:null},"Dimension title")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"name")),(0,i.mdx)("td",{parentName:"tr",align:null},"string"),(0,i.mdx)("td",{parentName:"tr",align:null},"Dimension name")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"type")),(0,i.mdx)("td",{parentName:"tr",align:null},"array of enums"),(0,i.mdx)("td",{parentName:"tr",align:null},"Lists the data type of the dimension")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"category")),(0,i.mdx)("td",{parentName:"tr",align:null},"string"),(0,i.mdx)("td",{parentName:"tr",align:null},"Product category")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"categories")),(0,i.mdx)("td",{parentName:"tr",align:null},"string"),(0,i.mdx)("td",{parentName:"tr",align:null},"Product categories. An extra metadata item in response to the ",(0,i.mdx)("inlineCode",{parentName:"td"},"expansion")," request parameter.")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"support")),(0,i.mdx)("td",{parentName:"tr",align:null},"string"),(0,i.mdx)("td",{parentName:"tr",align:null},"Support information")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"pathable")),(0,i.mdx)("td",{parentName:"tr",align:null},"boolean"),(0,i.mdx)("td",{parentName:"tr",align:null},"Whether the report/dimension is pathing enabled")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"parent")),(0,i.mdx)("td",{parentName:"tr",align:null},"string"),(0,i.mdx)("td",{parentName:"tr",align:null},"Parent dimension")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"extraTitleInfo")),(0,i.mdx)("td",{parentName:"tr",align:null},"string"),(0,i.mdx)("td",{parentName:"tr",align:null},"Additional title info")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"segmentable")),(0,i.mdx)("td",{parentName:"tr",align:null},"boolean"),(0,i.mdx)("td",{parentName:"tr",align:null},"Whether the dimension is segmentable")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"reportable")),(0,i.mdx)("td",{parentName:"tr",align:null},"array (string)"),(0,i.mdx)("td",{parentName:"tr",align:null},"Whether the dimension is segmentable")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"description")),(0,i.mdx)("td",{parentName:"tr",align:null},"string"),(0,i.mdx)("td",{parentName:"tr",align:null},"Contents of dimension description field in report")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"allowedForReporting")),(0,i.mdx)("td",{parentName:"tr",align:null},"boolean"),(0,i.mdx)("td",{parentName:"tr",align:null},"Whether the dimension is set to be allowed for reporting. An extra metadata item in response to the ",(0,i.mdx)("inlineCode",{parentName:"td"},"expansion")," request parameter.")),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"noneSettings")),(0,i.mdx)("td",{parentName:"tr",align:null},"boolean"),(0,i.mdx)("td",{parentName:"tr",align:null},'Whether "none" item report setting is set.')),(0,i.mdx)("tr",{parentName:"tbody"},(0,i.mdx)("td",{parentName:"tr",align:null},(0,i.mdx)("inlineCode",{parentName:"td"},"tags")),(0,i.mdx)("td",{parentName:"tr",align:null},"object"),(0,i.mdx)("td",{parentName:"tr",align:null},"An extra metadata item in response to the ",(0,i.mdx)("inlineCode",{parentName:"td"},"expansion")," request parameter. This can include the tag ID, tag name, tag description, and a list of components associated the tag.")))),(0,i.mdx)("h2",{id:"second-example"},"Second example"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-json"},'{\n  "rsid": "examplersid",\n  "globalFilters": [\n    {\n      "type": "dateRange",\n      "dateRange": "YYYY-MM-25T09:00:00/YYYY-MM-25T09:30:00"\n    }\n  ],\n  "metricContainer": {\n    "metrics": [\n      {\n        "columnId": "0",\n    "id": "metrics/occurrences"\n      }\n    ]\n  },\n  "dimensions": [\n    {\n      "id": "variables/daterangeminute",\n      "dimensionColumnId": "0"\n    },\n        {\n      "id": "variables/clickmaplinkbyregion",\n      "dimensionColumnId": "1"\n    }\n  ],\n  "settings": {\n    "realTimeMinuteGranularity": 10,\n    "limit": 20\n  }\n}\n')),(0,i.mdx)("h2",{id:"third-example"},"Third example"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-json"},'{\n    "rsid": "examplersid",\n    "globalFilters": [\n        {\n            "type": "dateRange",\n            "dateRange": "YYYY-MM-25T09:31:01/YYYY-MM-25T10:00"\n        }\n    ],\n    "metricContainer": {\n        "metrics": [\n            {\n                "columnId": "0",\n                "id": "metrics/occurrences",\n                "filters": [\n                    "0"\n                ]\n            }\n        ],\n        "metricFilters": [\n            {\n                "id": "0",\n                "type": "breakdown",\n                "dimension": "variables/clickmaplinkbyregion",\n                "itemId": "812776935"\n            }\n        ]\n    },\n    "dimensions": [\n        {\n            "id": "variables/daterangeminute",\n            "dimensionColumnId": "0"\n        },\n        {\n            "id": "variables/clickmappage",\n            "dimensionColumnId": "1"\n        }\n    ],\n    "settings": {\n        "realTimeMinuteGranularity": 1\n    }\n}\n')))}N.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-guides-endpoints-reports-real-time-md-dc6e05ed3974765d8c87.js.map