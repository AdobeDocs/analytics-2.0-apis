"use strict";(self.webpackChunkanalytics_2_0_apis=self.webpackChunkanalytics_2_0_apis||[]).push([[6187],{48155:function(e,n,a){a.r(n),a.d(n,{_frontmatter:function(){return d},default:function(){return p}});var t=a(87462),i=a(63366),r=(a(15007),a(64983)),o=a(91515),s=["components"],d={},m={_frontmatter:d},l=o.Z;function p(e){var n=e.components,a=(0,i.Z)(e,s);return(0,r.mdx)(l,(0,t.Z)({},m,a,{components:n,mdxType:"MDXLayout"}),(0,r.mdx)("h1",{id:"migrating-to-adobe-analytics-20-apis"},"Migrating to Adobe Analytics 2.0 APIs"),(0,r.mdx)("p",null,"This guide is intended to help users of the 1.3 and 1.4 versions of the Analytics APIs migrate to the newer and more capable 2.0 APIs. By migrating to the 2.0 APIs, you can take advantage of the following features:"),(0,r.mdx)("ul",null,(0,r.mdx)("li",{parentName:"ul"},"Faster response times with simpler and more efficient query methods, eliminating the need for polling"),(0,r.mdx)("li",{parentName:"ul"},"Programmatic capability for queries and dynamic report updates"),(0,r.mdx)("li",{parentName:"ul"},"More graceful error handling"),(0,r.mdx)("li",{parentName:"ul"},"Flexible functioning to do to anything you can do in Analysis Workspace"),(0,r.mdx)("li",{parentName:"ul"},"Consistency and matching of API calls to UI actions"),(0,r.mdx)("li",{parentName:"ul"},"Access to all Attribution IQ models used in Analysis Workspace"),(0,r.mdx)("li",{parentName:"ul"},"Access to all Anomaly Detection algorithms used in Analysis Workspace"),(0,r.mdx)("li",{parentName:"ul"},"Ability to integrate with other Experience Cloud products"),(0,r.mdx)("li",{parentName:"ul"},"Increased capacity for multiple breakdown reports"),(0,r.mdx)("li",{parentName:"ul"},"Newest Analytics features availability")),(0,r.mdx)("h2",{id:"current-limitations"},"Current limitations"),(0,r.mdx)("p",null,"The 2.0 APIs currently do not support the following:"),(0,r.mdx)("ul",null,(0,r.mdx)("li",{parentName:"ul"},"Data Sources"),(0,r.mdx)("li",{parentName:"ul"},"Data Feeds"),(0,r.mdx)("li",{parentName:"ul"},"Data Insertion")),(0,r.mdx)("p",null,"If you rely upon these features, you can still use a hybrid approach of using the 1.4 APIs for the above features and 2.0 APIs for everything else."),(0,r.mdx)("h2",{id:"how-the-20-apis-work"},"How the 2.0 APIs work"),(0,r.mdx)("p",null,"The 2.0 APIs introduce some fundamental changes in their operation from the 1.4 APIs."),(0,r.mdx)("h3",{id:"http-methods"},"HTTP methods"),(0,r.mdx)("p",null,"The 2.0 APIs use standard HTTP methods for retrieving resources (",(0,r.mdx)("inlineCode",{parentName:"p"},"GET"),"), creating child resources (",(0,r.mdx)("inlineCode",{parentName:"p"},"POST"),"), creating or replacing resources (",(0,r.mdx)("inlineCode",{parentName:"p"},"PUT"),"), updating (parts of) a resource (",(0,r.mdx)("inlineCode",{parentName:"p"},"PATCH"),") or deleting a resource (",(0,r.mdx)("inlineCode",{parentName:"p"},"DELETE"),")."),(0,r.mdx)("p",null,"The 1.4 APIs only use the HTTP ",(0,r.mdx)("inlineCode",{parentName:"p"},"POST")," method for all of its operations, irrespective of its intent."),(0,r.mdx)("h3",{id:"global-company-id"},"Global Company ID"),(0,r.mdx)("p",null,"All 2.0 API endpoints require the global company ID of your Adobe Analytics company as part of the URL path. For example:"),(0,r.mdx)("p",null,(0,r.mdx)("strong",{parentName:"p"},"GET")," ",(0,r.mdx)("inlineCode",{parentName:"p"},"https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/annotations")),(0,r.mdx)("p",null,"To retrieve your global company ID in the user interface, follow these steps:"),(0,r.mdx)("ol",null,(0,r.mdx)("li",{parentName:"ol"},"Select ",(0,r.mdx)("strong",{parentName:"li"},"Admin")," > ",(0,r.mdx)("strong",{parentName:"li"},"All Admin")," from the top menu."),(0,r.mdx)("li",{parentName:"ol"},"Select ",(0,r.mdx)("strong",{parentName:"li"},"Company settings home")," from the ",(0,r.mdx)("strong",{parentName:"li"},"Company settings")," list."),(0,r.mdx)("li",{parentName:"ol"},"In the ",(0,r.mdx)("strong",{parentName:"li"},"Company Settings")," page, select the ",(0,r.mdx)("strong",{parentName:"li"},"API Access")," tab. ",(0,r.mdx)("br",null),"The global company ID is displayed in ",(0,r.mdx)("strong",{parentName:"li"},"bold")," at the top of the page.")),(0,r.mdx)("p",null,"To retrieve your global company ID with an API, use the ",(0,r.mdx)("a",{parentName:"p",href:"https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/discovery/"},"Analytics Discovery endpoint"),", as shown below:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre"},'curl -X GET --header "x-api-key: {CLIENT_ID}" --header "Authorization: Bearer {ACCESS_TOKEN}" "https://analytics.adobe.io/discovery/me"\n')),(0,r.mdx)("h3",{id:"unique-paths"},"Unique paths"),(0,r.mdx)("p",null,"Every method in the 2.0 APIs has a unique path. For example, to retrieve the names of dimensions and metrics in the 2.0 APIs, you use the following two requests:"),(0,r.mdx)("p",null,(0,r.mdx)("strong",{parentName:"p"},"GET"),"  ",(0,r.mdx)("inlineCode",{parentName:"p"},"https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/dimensions?rsid={RSID}")),(0,r.mdx)("p",null,(0,r.mdx)("strong",{parentName:"p"},"GET"),"  ",(0,r.mdx)("inlineCode",{parentName:"p"},"https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/metrics?rsid={RSID}")),(0,r.mdx)("p",null,"In the 1.4 APIs, methods are uniquely identified using the ",(0,r.mdx)("inlineCode",{parentName:"p"},"method")," request parameter, while most endpoints use the same path ",(0,r.mdx)("inlineCode",{parentName:"p"},"/admin/1.4/rest/"),". For example, to retrieve names of dimensions and metrics in the 1.4 APIs, you use the following two requests:"),(0,r.mdx)("p",null,(0,r.mdx)("strong",{parentName:"p"},"POST")," ",(0,r.mdx)("inlineCode",{parentName:"p"},"https://api.omniture.com/admin/1.4/rest/?method=Report.GetElements")," (for dimensions)"),(0,r.mdx)("p",null,(0,r.mdx)("strong",{parentName:"p"},"POST")," ",(0,r.mdx)("inlineCode",{parentName:"p"},"https://api.omniture.com/admin/1.4/rest/?method=Report.GetMetrics")," (for metrics)"),(0,r.mdx)("h2",{id:"metrics-and-dimensions"},"Metrics and dimensions"),(0,r.mdx)("p",null,"This section describes differences between 1.4 and 2.0 APIs for metrics and dimensions. These include the following changes for retrieving metrics or dimensions:"),(0,r.mdx)("ul",null,(0,r.mdx)("li",{parentName:"ul"},"Naming of some components"),(0,r.mdx)("li",{parentName:"ul"},"Query structure"),(0,r.mdx)("li",{parentName:"ul"},"The type and quantity of information retrieved"),(0,r.mdx)("li",{parentName:"ul"},"Obtaining multiple or singular metrics or dimensions"),(0,r.mdx)("li",{parentName:"ul"},"Using ",(0,r.mdx)("inlineCode",{parentName:"li"},"expansion")," member objects to include more specificity in retrieval options")),(0,r.mdx)("p",null,(0,r.mdx)("strong",{parentName:"p"},"1.4 Dimensions example")),(0,r.mdx)("p",null,"For example, in the 1.4 dimensions request"),(0,r.mdx)("p",null,(0,r.mdx)("strong",{parentName:"p"},"POST")," ",(0,r.mdx)("inlineCode",{parentName:"p"},"https://api.omniture.com/admin/1.4/rest/?method=Report.GetElements")," with a JSON body specifying at least the report suite, the following information for the ",(0,r.mdx)("inlineCode",{parentName:"p"},"browser")," dimension is returned:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-json"},'{\n    "correlation": true,\n    "id": "browser",\n    "name": "Browser",\n    "subrelation": true\n}\n')),(0,r.mdx)("p",null,(0,r.mdx)("strong",{parentName:"p"},"2.0 Dimensions example")),(0,r.mdx)("p",null,"In the 2.0 APIs, using"),(0,r.mdx)("p",null,(0,r.mdx)("strong",{parentName:"p"},"GET")," ",(0,r.mdx)("inlineCode",{parentName:"p"},"https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/dimensions?rsid={RSID}&expansion=allowedForReporting")),(0,r.mdx)("p",null,"returns the following detailed information for the ",(0,r.mdx)("inlineCode",{parentName:"p"},"browser")," dimension:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-json"},'{\n    "allowedForReporting": true,\n    "category": "Audience",\n    "description": "Shows the name and version of the browser used to access the site. This can help you prioritize which browsers and browser versions you use when testing new features or versions of your site.",\n    "id": "variables/browser",\n    "multiValued": false,\n    "name": "Browser",\n    "pathable": false,\n    "reportable": [\n        "oberon"\n    ],\n    "segmentable": true,\n    "standardComponent": true,\n    "support": [\n        "oberon",\n        "dataWarehouse"\n    ],\n    "supportsDataGovernance": true,\n    "title": "Browser",\n    "type": "string"\n}\n')),(0,r.mdx)("p",null,"The 2.0 API also supports retrieval of a single dimension (",(0,r.mdx)("inlineCode",{parentName:"p"},"/dimension/{id}"),") or metric (",(0,r.mdx)("inlineCode",{parentName:"p"},"/metric/{id}"),")."),(0,r.mdx)("p",null,"The 2.0 example ",(0,r.mdx)("inlineCode",{parentName:"p"},"/dimensions")," request shown above is using the ",(0,r.mdx)("inlineCode",{parentName:"p"},"expansion=allowedForReporting")," query parameter and value. Using ",(0,r.mdx)("inlineCode",{parentName:"p"},"allowedForReporting")," is recommended to request dimensions and metrics that are allowed to be included in reports (see ",(0,r.mdx)("a",{parentName:"p",href:"#reports"},"Reports"),")."),(0,r.mdx)("p",null,"See ",(0,r.mdx)("a",{parentName:"p",href:"endpoints/dimensions/index.md"},"Dimensions")," and ",(0,r.mdx)("a",{parentName:"p",href:"endpoints/metrics/index.md"},"Metrics")," endpoint guides for more information."),(0,r.mdx)("h2",{id:"reports"},"Reports"),(0,r.mdx)("p",null,"This section describes differences between 1.4 and 2.0 report APIs.  The 2.0 ",(0,r.mdx)("inlineCode",{parentName:"p"},"reports")," endpoint includes many important changes. It uses the same underlying process as the Analysis Workspace UI. Each API call matches an action in the UI, so you can test the functionality of an interaction in the UI first to plan your calls. The ",(0,r.mdx)("inlineCode",{parentName:"p"},"/reports")," endpoint is a simple REST GET call, and no longer requires a queue/get workflow to retrieve data. This simplifies development and maintenance of API clients."),(0,r.mdx)("p",null,"The ",(0,r.mdx)("inlineCode",{parentName:"p"},"/reports")," endpoint is intended to run small requests quickly. While 1.3/1.4 APIs handle requests that can require 1-2 days to process, the 2.0 APIs require many smaller requests put together in a series. The 1.3/1.4 APIs might include requests for data from a large time frame, lots of metrics at once, or many breakdowns. When migrating to the 2.0  ",(0,r.mdx)("inlineCode",{parentName:"p"},"/reports")," endpoint, split these large requests into multiple simpler and quicker calls. Following this practice, results are provided more quickly, and can be evaluated in a more timely manner. Multiple breakdowns are not requested automatically."),(0,r.mdx)("h3",{id:"example-report-differences"},"Example report differences"),(0,r.mdx)("p",null,"The examples in this section show how migration from 1.4 to 2.0 APIs affects your reports."),(0,r.mdx)("h4",{id:"14-example"},"1.4 example"),(0,r.mdx)("p",null,"The following 1.4 report queries ten ",(0,r.mdx)("inlineCode",{parentName:"p"},"campaign")," items. For each of those, it queries 100 ",(0,r.mdx)("inlineCode",{parentName:"p"},"geocity")," items. Finally, for each city, it queries the top 100 ",(0,r.mdx)("inlineCode",{parentName:"p"},"pages"),". In addition, it tries to get three metrics for each of those items. Finally, it tries to do that for each day in the date range, which can span multiple years. This report has the potential to return 1,000,000 records or more."),(0,r.mdx)("p",null,"Example 1.4 request:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-json"},'{\n    "reportDescription": {\n        "reportSuiteID":"exampleglobalprod",\n        "dateFrom":"2024-02-10",\n        "dateTo":"2024-02-20",\n        "granularity":"day",\n        "metrics": [\n            {"id":"pageviews"},\n            {"id":"visits"},\n            {"id":"visitors"},\n        ],\n        "elements": [\n            {"id":"campaign", "top":10},\n            {"id":"geocity", "top":100},\n            {"id":"page","top":100}\n        ]\n    }\n}\n')),(0,r.mdx)("h4",{id:"20-example"},"2.0 example"),(0,r.mdx)("p",null,"Requests to the 2.0 ",(0,r.mdx)("inlineCode",{parentName:"p"},"/reports")," endpoint are smaller and made in sequence:"),(0,r.mdx)("ol",null,(0,r.mdx)("li",{parentName:"ol"},(0,r.mdx)("p",{parentName:"li"},"Request the top ten ",(0,r.mdx)("inlineCode",{parentName:"p"},"campaign")," values for the given time period."),(0,r.mdx)("pre",{parentName:"li"},(0,r.mdx)("code",{parentName:"pre",className:"language-json"},' {\n     "rsid": "exampleglobalprod",\n     "globalFilters": [\n         {\n             "type": "dateRange",\n             "dateRange": "2024-02-10T00:00:00.000/2024-02-20T00:00:00.000",\n             "dateRangeId": "lastTenDays"\n         }\n     ],\n     "metricContainer": {\n         "metrics": [\n             {\n                 "columnId": "0",\n                 "id": "metrics/pageviews"\n             },\n             {\n                 "columnId": "1",\n                 "id": "metrics/visits",\n                 "sort": "desc"\n             },\n             {\n                 "columnId": "4",\n                 "id": "metrics/visitors"\n             }\n         ]\n     },\n     "dimension": "variables/campaign",\n     "settings": {\n         "countRepeatInstances": true,\n         "limit": 10,\n         "page": 0\n     }\n }\n')),(0,r.mdx)("p",{parentName:"li"},"This results in a response, containing 10 rows of ",(0,r.mdx)("inlineCode",{parentName:"p"},"campaign")," data, each row looking like:"),(0,r.mdx)("pre",{parentName:"li"},(0,r.mdx)("code",{parentName:"pre",className:"language-json"},' {\n     "data": [\n         2948.0,                             /* pageviews    */  \n         606.0,                              /* visits       */\n         254.0                               /* visitors     */\n     ],\n     "itemId": "3484165051",                 /* campaign id  */ \n     "value": "BJ4T3D2C"\n }\n'))),(0,r.mdx)("li",{parentName:"ol"},(0,r.mdx)("p",{parentName:"li"},"For each ",(0,r.mdx)("inlineCode",{parentName:"p"},"campaign"),", request a breakdown of the top 100 ",(0,r.mdx)("inlineCode",{parentName:"p"},"geocity")," values:"),(0,r.mdx)("pre",{parentName:"li"},(0,r.mdx)("code",{parentName:"pre",className:"language-json"},'{\n    "rsid": "amc.exl.global.prod",\n    "globalFilters": [\n        {\n            "type": "dateRange",\n            "dateRange": "2024-02-10T00:00:00.000/2024-02-20T00:00:00.000",\n            "dateRangeId": "lastTenDays"\n        }\n    ],\n    "metricContainer": {\n        "metrics": [\n            {\n                "columnId": "0",\n                "id": "metrics/pageviews",\n                "filters": [\n                    "0"\n                ]\n            },\n            {\n                "columnId": "1",\n                "id": "metrics/visits",\n                "sort": "desc",\n                "filters": [\n                    "0"\n                ]\n            },\n            {\n                "columnId": "2",\n                "id": "metrics/visitors",\n                "filters": [\n                    "0"\n                ]\n            }\n        ],\n        "metricFilters": [\n        {\n            "id":"0",\n            "type":"breakdown",                   /* breakdown  */ \n            "dimension":"variables/campaign",     /* a campaign */\n            "itemId": "3484165051"                /* using id   */\n        }\n        \n    ]\n    },\n    "dimension": "variables/geocity",             /* on geocity */\n    "settings": {\n        "countRepeatInstances": true,\n        "limit": 100,\n        "page": 0\n    }\n}\n')),(0,r.mdx)("p",{parentName:"li"},"This results in a response, containing 100 rows of ",(0,r.mdx)("inlineCode",{parentName:"p"},"geocity")," data, each row looking like:"),(0,r.mdx)("pre",{parentName:"li"},(0,r.mdx)("code",{parentName:"pre",className:"language-json"},' {\n     "data": [\n         115.0,\n         16.0,\n          4.0\n     ],\n     "itemId": "1280116081",                       /* geocity id */\n     "value": "Grand Rapids (Michigan, United States)"\n }\n'))),(0,r.mdx)("li",{parentName:"ol"},(0,r.mdx)("p",{parentName:"li"},"For each ",(0,r.mdx)("inlineCode",{parentName:"p"},"geocity"),", request a breakdown of the top 100 ",(0,r.mdx)("inlineCode",{parentName:"p"},"page")," values."),(0,r.mdx)("pre",{parentName:"li"},(0,r.mdx)("code",{parentName:"pre",className:"language-json"},' {\n     "rsid": "amc.exl.global.prod",\n     "globalFilters": [\n         {\n             "type": "dateRange",\n             "dateRange": "2024-02-10T00:00:00.000/2024-02-20T00:00:00.000",\n             "dateRangeId": "lastTenDays"\n         }\n     ],\n     "metricContainer": {\n         "metrics": [\n             {\n                 "columnId": "0",\n                 "id": "metrics/pageviews",\n                 "filters": [\n                     "0"\n                 ]\n             },\n             {\n                 "columnId": "1",\n                 "id": "metrics/visits",\n                 "sort": "desc",\n                 "filters": [\n                     "0"\n                 ]\n             },\n             {\n                 "columnId": "2",\n                 "id": "metrics/visitors",\n                 "filters": [\n                     "0"\n                 ]\n             }\n         ],\n         "metricFilters": [\n             {\n                 "id":"0",\n                 "type":"breakdown",               /* breakdown  */\n                 "dimension":"variables/geocity",  /* a geocity  */\n                 "itemId": "1280116081"            /* using id   */\n             }    \n         ]\n     },\n     "dimension": "variables/page",                 /* on page   */\n     "settings": {\n         "countRepeatInstances": false,\n         "limit": 5,\n         "page": 0\n     }\n }\n')),(0,r.mdx)("p",{parentName:"li"},"This results in a response, containing 100 rows of ",(0,r.mdx)("inlineCode",{parentName:"p"},"page")," data, each row looking like:"),(0,r.mdx)("pre",{parentName:"li"},(0,r.mdx)("code",{parentName:"pre",className:"language-json"},'\n{\n     "data": [\n         14.0,\n         12.0,\n         9.0\n     ],\n     "itemId": "2616484196",\n     "value": "home page"\n }\n'))),(0,r.mdx)("li",{parentName:"ol"},(0,r.mdx)("p",{parentName:"li"},"Request a separate report for each metric. This means that you go through steps 1-3 for ",(0,r.mdx)("inlineCode",{parentName:"p"},"pageviews"),", then again for ",(0,r.mdx)("inlineCode",{parentName:"p"},"visits"),", and so on."))),(0,r.mdx)("p",null,"You can cache historical data as part of the client application so that you would only need to query the newest day's worth of data each day."),(0,r.mdx)("h3",{id:"breakdowns"},"Breakdowns"),(0,r.mdx)("p",null,"With the 2.0 ",(0,r.mdx)("inlineCode",{parentName:"p"},"/reports")," endpoint, you can request as many breakdowns as you like, instead of the limit of four with the 1.4 APIs. To request a breakdown report, use an ",(0,r.mdx)("inlineCode",{parentName:"p"},"itemId")," in the ",(0,r.mdx)("inlineCode",{parentName:"p"},"metricFilter")," section of your request (as shown above). See ",(0,r.mdx)("a",{parentName:"p",href:"endpoints/reports/breakdowns.md"},"Breakdowns")," for more detailed information."),(0,r.mdx)("h2",{id:"data-warehouse"},"Data Warehouse"),(0,r.mdx)("p",null,"This section describes the difference between Data Warehouse 1.4 and 2.0 APIs."),(0,r.mdx)("p",null,"With 1.4 APIs, you can run Data Warehouse reports with the ",(0,r.mdx)("inlineCode",{parentName:"p"},"Report.Run")," method in a ",(0,r.mdx)("a",{parentName:"p",href:"https://adobedocs.github.io/analytics-1.4-apis/#/Report/Report.Run"},"POST request"),". This is requested by specifying ",(0,r.mdx)("inlineCode",{parentName:"p"},'source":"warehouse"')," in the ",(0,r.mdx)("inlineCode",{parentName:"p"},"reportDescription")," object in the request payload. This service returns requested analytics data, as described in ",(0,r.mdx)("a",{parentName:"p",href:"https://developer.adobe.com/analytics-apis/docs/1.4/guides/reporting/data-warehouse/"},"Adobe Analytics 1.4 Data Warehouse Reports"),"."),(0,r.mdx)("p",null,"With 2.0 APIs, Data Warehouse functions similar to an export service that includes granular scheduling and detailed reports generated from scheduled requests. The Data Warehouse reports returned by the 2.0 APIs do not return analytics data."),(0,r.mdx)("p",null,"Currently, you must make your first scheduled request in Analysis Workspace. Subsequently, you can create additional scheduled requests, update requests, and retrieve request information with the 2.0 APIs. You can also update and retrieve reports generated from scheduled requests. The 2.0 APIs include destination options for sending request information and reports. For more information, refer to both the ",(0,r.mdx)("a",{parentName:"p",href:"https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Data%20Warehouse%20APIs"},"Data Warehouse 2.0 AI Reference")," and the ",(0,r.mdx)("a",{parentName:"p",href:"https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/data-warehouse/"},"Data Warehouse 2.0 API Endpoint Guide"),"."))}p.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-guides-migration-md-8ce8fa117686715315aa.js.map