"use strict";(self.webpackChunkanalytics_2_0_apis=self.webpackChunkanalytics_2_0_apis||[]).push([[194],{43834:function(e,t,a){a.r(t),a.d(t,{_frontmatter:function(){return o},default:function(){return u}});var n,d=a(87462),i=a(63366),l=(a(15007),a(64983)),r=a(91515),m=["components"],o={},p=(n="CodeBlock",function(e){return console.warn("Component "+n+" was not imported, exported, or provided by MDXProvider as global scope"),(0,l.mdx)("div",e)}),s={_frontmatter:o},x=r.Z;function u(e){var t=e.components,a=(0,i.Z)(e,m);return(0,l.mdx)(x,(0,d.Z)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,l.mdx)("h1",{id:"import-api-classifications-by-uploading-files"},"Import API Classifications by uploading files"),(0,l.mdx)("p",null,"This guide includes instructions for importing JSON classification datasets that are larger than 50 MB, or that include a .tsv or .tab file. With this method, a dataset is uploaded as a file with the POST request. Alternatively, your dataset can be imported as a JSON body of the POST request if it is smaller than 50MB. For more information on this alternative, see the ",(0,l.mdx)("a",{parentName:"p",href:"classifications/index.md"},"Analytics classification APIs")," guide."),(0,l.mdx)("p",null,'Additionally, using these endpoints requires your global company ID in each request. If you receive the response error message "Cannot find proper global company ID," add the following header to your requests: ',(0,l.mdx)("inlineCode",{parentName:"p"},"x-proxy-global-company-id:{GLOBAL_COMPANY_ID}"),". You can find your global company ID by using the ",(0,l.mdx)("a",{parentName:"p",href:"../discovery.md"},"Discovery API"),"."),(0,l.mdx)("p",null,"To import an API classification by uploading a file, you follow a three-step process:"),(0,l.mdx)("ol",null,(0,l.mdx)("li",{parentName:"ol"},"Create an import job with the ",(0,l.mdx)("a",{parentName:"li",href:"#post-create-job"},"POST create job")," endpoint."),(0,l.mdx)("li",{parentName:"ol"},"Upload a file using the ",(0,l.mdx)("a",{parentName:"li",href:"#put-upload-file"},"PUT upload file")," endpoint."),(0,l.mdx)("li",{parentName:"ol"},"Commit your upload using the ",(0,l.mdx)("a",{parentName:"li",href:"#post-commit-job"},"POST commit job")," endpoint.")),(0,l.mdx)("p",null,"The endpoints described in this guide are routed through analytics.adobe.io. To use them, you will need to first create a client with access to the Adobe Developer Console. For more information, refer to ",(0,l.mdx)("a",{parentName:"p",href:"src/pages/guides/endpoints/classifications/index.md"},"Getting started with the Analytics API"),"."),(0,l.mdx)("h2",{id:"post-create-job"},"POST create job"),(0,l.mdx)("p",null,"Use this endpoint to create an import job for a classification dataset. Creating an import job is required to produce a job ID that can be associated with an uploaded dataset file. For more information on classification jobs, see ",(0,l.mdx)("a",{parentName:"p",href:"https://experienceleague.adobe.com/docs/analytics/components/classifications/sets/job-manager.htm"},"Classification set jobs manager"),"."),(0,l.mdx)("p",null,(0,l.mdx)("inlineCode",{parentName:"p"},"POST https://analytics.adobe.io/api/{GLOBALCOMPANYID}/classification/job/import/createApiJob/{DATASET_ID}")),(0,l.mdx)("h3",{id:"request-and-response-examples"},"Request and Response Examples"),(0,l.mdx)("p",null,"Click the ",(0,l.mdx)("strong",{parentName:"p"},"Request")," tab in the following example to see a cURL request for this endpoint. Click the ",(0,l.mdx)("strong",{parentName:"p"},"Response")," tab to see a successful JSON response for the request."),(0,l.mdx)(p,{slots:"heading, code",repeat:"2",languages:"CURL,JSON",mdxType:"CodeBlock"}),(0,l.mdx)("h4",{id:"request"},"Request"),(0,l.mdx)("pre",null,(0,l.mdx)("code",{parentName:"pre",className:"language-sh"},'curl -X POST "https://analytics.adobe.io/api/{GLOBALCOMPANYID}/classification/job/import/createApiJob/6449b63563c1e069c6159415" \\\n     -H "x-api-key: {CLIENT_ID}" \\\n     -H "Content-Type: application/json" \\\n     -H "Authorization: Bearer {ACCESS_TOKEN}" \\\n     -d \'{\n            "dataFormat": "tsv",\n            "encoding": "UTF8",\n            "jobName": "testsuite evar1 classifications",\n            "notifications": [\n                {\n                "method": "email",\n                "state": "completed",\n                "recipients": [\n                    john@example.com\n                ]\n                }\n            ],\n            "listDelimiter": ",",\n            "source": "Direct API Upload",\n            "keyOptions": {\n                "byte_length": 0,\n                "type": "string"\n            }\n         }\'\n')),(0,l.mdx)("h4",{id:"response"},"Response"),(0,l.mdx)("pre",null,(0,l.mdx)("code",{parentName:"pre",className:"language-JSON"},'{\n  "api_job_id": "a6fc824c-4d6f-45f9-8f55-456f918e0b41",\n  "dataset_id": "6449b63563c1e069c6159415",\n  "ims_org_id": "0DFE76D95967D5B50A494010@AdobeOrg",\n  "api_job_status": "CREATED",\n  "job_options": {\n    "dataFormat": "tsv",\n    "encoding": "utf8",\n    "jobName": "testsuite evar1 classifications",\n    "fileBasename": null,\n    "notifications": [\n      {\n        "method": "email",\n        "state": "completed",\n        "recipients": [\n          "john@example.com"\n        ]\n      }\n    ],\n    "statesWithQueuedNotifications": [],\n    "listDelimiter": ",",\n    "pipelineTag": "",\n    "source": "Direct API Upload",\n    "dataUri": null,\n    "originalDataUri": null,\n    "keyOptions": {\n      "byte_length": 255,\n      "type": "string"\n    },\n    "notification_extras": [\n      {\n        "key": "Report Suite",\n        "value": "testsuite"\n      }\n    ]\n  }\n}\n')),(0,l.mdx)("h3",{id:"request-example-details"},"Request example details"),(0,l.mdx)("p",null,"The example request above creates an import job with the following specifications:"),(0,l.mdx)("ul",null,(0,l.mdx)("li",{parentName:"ul"},"the ",(0,l.mdx)("inlineCode",{parentName:"li"},"dataFormat")," for the classification as ",(0,l.mdx)("inlineCode",{parentName:"li"},"tsv"),"."),(0,l.mdx)("li",{parentName:"ul"},"the ",(0,l.mdx)("inlineCode",{parentName:"li"},"jobName")," to be ",(0,l.mdx)("inlineCode",{parentName:"li"},"testsuite evar1 classifications"),"."),(0,l.mdx)("li",{parentName:"ul"},"the notification will be delivered by ",(0,l.mdx)("inlineCode",{parentName:"li"},"email")," to ",(0,l.mdx)("inlineCode",{parentName:"li"},"john@example.com")," when the state is ",(0,l.mdx)("inlineCode",{parentName:"li"},"completed"),"."),(0,l.mdx)("li",{parentName:"ul"},"the data source is ",(0,l.mdx)("inlineCode",{parentName:"li"},"Direct API Upload"),".")),(0,l.mdx)("h3",{id:"response-example-details"},"Response example details"),(0,l.mdx)("p",null,"The example response above shows the following job creation information:"),(0,l.mdx)("ul",null,(0,l.mdx)("li",{parentName:"ul"},"the ",(0,l.mdx)("inlineCode",{parentName:"li"},"api_job_id")," is ",(0,l.mdx)("inlineCode",{parentName:"li"},"a6fc824c-4d6f-45f9-8f55-456f918e0b41"),". This ID is necessary to both upload and commit the dataset with the other endpoints in this guide."),(0,l.mdx)("li",{parentName:"ul"},"the notification details, including its ",(0,l.mdx)("inlineCode",{parentName:"li"},"completed")," state.")),(0,l.mdx)("h3",{id:"request-parameters"},"Request Parameters"),(0,l.mdx)("p",null,"The following table describes the POST create job request parameters:"),(0,l.mdx)("table",null,(0,l.mdx)("thead",{parentName:"table"},(0,l.mdx)("tr",{parentName:"thead"},(0,l.mdx)("th",{parentName:"tr",align:null},"Name"),(0,l.mdx)("th",{parentName:"tr",align:null},"Required"),(0,l.mdx)("th",{parentName:"tr",align:null},"Type"),(0,l.mdx)("th",{parentName:"tr",align:null},"Description"))),(0,l.mdx)("tbody",{parentName:"table"},(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"dataFormat")),(0,l.mdx)("td",{parentName:"tr",align:null},"required"),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The data format options. Includes ",(0,l.mdx)("inlineCode",{parentName:"td"},"tsv"),", ",(0,l.mdx)("inlineCode",{parentName:"td"},"tab"),", or ",(0,l.mdx)("inlineCode",{parentName:"td"},"json"),".")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"encoding")),(0,l.mdx)("td",{parentName:"tr",align:null},"optional"),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The encoding for data. The default value is ",(0,l.mdx)("inlineCode",{parentName:"td"},"UTF-8"),".")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"jobName")),(0,l.mdx)("td",{parentName:"tr",align:null},"optional"),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The name of the job")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"fileBasename")),(0,l.mdx)("td",{parentName:"tr",align:null},"optional"),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The name of the file currently being read, without path or extension")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"notifications")),(0,l.mdx)("td",{parentName:"tr",align:null},"optional"),(0,l.mdx)("td",{parentName:"tr",align:null},"container"),(0,l.mdx)("td",{parentName:"tr",align:null},"Contains the notification information. Includes the ",(0,l.mdx)("inlineCode",{parentName:"td"},"method"),", ",(0,l.mdx)("inlineCode",{parentName:"td"},"state"),", and ",(0,l.mdx)("inlineCode",{parentName:"td"},"recipients")," parameters.")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"method")),(0,l.mdx)("td",{parentName:"tr",align:null},"optional"),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The method by which the notification is sent. This includes the enums ",(0,l.mdx)("inlineCode",{parentName:"td"},"email")," and ",(0,l.mdx)("inlineCode",{parentName:"td"},"rabbit"),".")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"state")),(0,l.mdx)("td",{parentName:"tr",align:null},"optional"),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The state of the notification. Includes the following enums: ",(0,l.mdx)("inlineCode",{parentName:"td"},"created"),", ",(0,l.mdx)("inlineCode",{parentName:"td"},"queued"),", ",(0,l.mdx)("inlineCode",{parentName:"td"},"validated"),", ",(0,l.mdx)("inlineCode",{parentName:"td"},"failed_validation"),", ",(0,l.mdx)("inlineCode",{parentName:"td"},"processing"),", ",(0,l.mdx)("inlineCode",{parentName:"td"},"done_processing"),", ",(0,l.mdx)("inlineCode",{parentName:"td"},"failed_processing"),", and ",(0,l.mdx)("inlineCode",{parentName:"td"},"completed"),".")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"recipients")),(0,l.mdx)("td",{parentName:"tr",align:null},"optional"),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The recipients of the notification")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"statesWithQueuedNotifications")),(0,l.mdx)("td",{parentName:"tr",align:null},"optional"),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"Notifications for queued states")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"listDelimiter")),(0,l.mdx)("td",{parentName:"tr",align:null},"optional"),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"Specifies the data delimiter for the list. Default delimiter is ",(0,l.mdx)("inlineCode",{parentName:"td"},",")," (comma)")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"pipelineTag")),(0,l.mdx)("td",{parentName:"tr",align:null},"optional"),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"Pipeline tag")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"source")),(0,l.mdx)("td",{parentName:"tr",align:null},"optional"),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The data source. Default value is ",(0,l.mdx)("inlineCode",{parentName:"td"},"Direct API Upload"),".")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"dataUri")),(0,l.mdx)("td",{parentName:"tr",align:null},"optional"),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The data URI")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"originalDataUri")),(0,l.mdx)("td",{parentName:"tr",align:null},"optional"),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The original data URI")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"keyOptions")),(0,l.mdx)("td",{parentName:"tr",align:null},"optional"),(0,l.mdx)("td",{parentName:"tr",align:null},"container"),(0,l.mdx)("td",{parentName:"tr",align:null},"Contains the ",(0,l.mdx)("inlineCode",{parentName:"td"},"byte_length"),", ",(0,l.mdx)("inlineCode",{parentName:"td"},"type"),", and ",(0,l.mdx)("inlineCode",{parentName:"td"},"overwrite")," parameters")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"byte_length")),(0,l.mdx)("td",{parentName:"tr",align:null},"optional"),(0,l.mdx)("td",{parentName:"tr",align:null},"integer"),(0,l.mdx)("td",{parentName:"tr",align:null},"The byte length of the job")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"type")),(0,l.mdx)("td",{parentName:"tr",align:null},"optional"),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The type of the job")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"overwrite")),(0,l.mdx)("td",{parentName:"tr",align:null},"optional"),(0,l.mdx)("td",{parentName:"tr",align:null},"boolean"),(0,l.mdx)("td",{parentName:"tr",align:null},"Whether or not the import will overwrite.")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"notification_extras")),(0,l.mdx)("td",{parentName:"tr",align:null},"optional"),(0,l.mdx)("td",{parentName:"tr",align:null},"container"),(0,l.mdx)("td",{parentName:"tr",align:null},"Extra options for notifications. Contains the ",(0,l.mdx)("inlineCode",{parentName:"td"},"key"),", and ",(0,l.mdx)("inlineCode",{parentName:"td"},"value")," parameters.")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"key")),(0,l.mdx)("td",{parentName:"tr",align:null},"optional"),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The field or column name associated with key value")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"value")),(0,l.mdx)("td",{parentName:"tr",align:null},"optional"),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The actual value of the key (as in a field or column name)")))),(0,l.mdx)("h3",{id:"response-parameters"},"Response Parameters"),(0,l.mdx)("p",null,"The following table describes the POST create job response parameters:"),(0,l.mdx)("table",null,(0,l.mdx)("thead",{parentName:"table"},(0,l.mdx)("tr",{parentName:"thead"},(0,l.mdx)("th",{parentName:"tr",align:null},"Name"),(0,l.mdx)("th",{parentName:"tr",align:null},"Type"),(0,l.mdx)("th",{parentName:"tr",align:null},"Description"))),(0,l.mdx)("tbody",{parentName:"table"},(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"api_job_status")),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The staus of the API job")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"dataset_id")),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"Classification dataset ID")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"api_job_id")),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The API Job ID for uploading the file")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"ims_org_id")),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The ID associated with the analytics company of the user")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"taxonomist_job_id")),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"Job ID for taxonomist")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"job_options")),(0,l.mdx)("td",{parentName:"tr",align:null},"container"),(0,l.mdx)("td",{parentName:"tr",align:null},"Contains the options for jobs. Includes the ",(0,l.mdx)("inlineCode",{parentName:"td"},"dataFormat"),", ",(0,l.mdx)("inlineCode",{parentName:"td"},"encoding"),", ",(0,l.mdx)("inlineCode",{parentName:"td"},"jobName"),", ",(0,l.mdx)("inlineCode",{parentName:"td"},"fileBasename"),", and ",(0,l.mdx)("inlineCode",{parentName:"td"},"notifications")," parameters as shown in the following five rows.")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"dataFormat")),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The data format options. Includes ",(0,l.mdx)("inlineCode",{parentName:"td"},"tsv"),", ",(0,l.mdx)("inlineCode",{parentName:"td"},"tab"),", or ",(0,l.mdx)("inlineCode",{parentName:"td"},"json"),".")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"encoding")),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The encoding for data. The default value is ",(0,l.mdx)("inlineCode",{parentName:"td"},"UTF-8"),".")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"jobName")),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The name of the job")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"fileBasename")),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The name of the file currently being read, without path or extension")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"notifications")),(0,l.mdx)("td",{parentName:"tr",align:null},"container"),(0,l.mdx)("td",{parentName:"tr",align:null},"Contains the notification information. Includes the ",(0,l.mdx)("inlineCode",{parentName:"td"},"method"),", ",(0,l.mdx)("inlineCode",{parentName:"td"},"state"),", and ",(0,l.mdx)("inlineCode",{parentName:"td"},"recipients")," parameters.")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"method")),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The method by which the notification is sent. This includes the enums ",(0,l.mdx)("inlineCode",{parentName:"td"},"email")," and ",(0,l.mdx)("inlineCode",{parentName:"td"},"rabbit"),".")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"state")),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The state of the notification. Includes the following enums: ",(0,l.mdx)("inlineCode",{parentName:"td"},"created"),", ",(0,l.mdx)("inlineCode",{parentName:"td"},"queued"),", ",(0,l.mdx)("inlineCode",{parentName:"td"},"validated"),", ",(0,l.mdx)("inlineCode",{parentName:"td"},"failed_validation"),", ",(0,l.mdx)("inlineCode",{parentName:"td"},"processing"),", ",(0,l.mdx)("inlineCode",{parentName:"td"},"done_processing"),", ",(0,l.mdx)("inlineCode",{parentName:"td"},"failed_processing"),", and ",(0,l.mdx)("inlineCode",{parentName:"td"},"completed"),".")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"recipients")),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The recipients of the notification")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"statesWithQueuedNotifications")),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"Notifications for queued states")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"listDelimiter")),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"Specifies the data delimiter for the list. Default delimiter is ",(0,l.mdx)("inlineCode",{parentName:"td"},",")," (comma)")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"pipelineTag")),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"Pipeline tag")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"source")),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The data source. Default value is ",(0,l.mdx)("inlineCode",{parentName:"td"},'"Direct API Upload"'),".")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"dataUri")),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The data URI")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"originalDataUri")),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The original data URI")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"keyOptions")),(0,l.mdx)("td",{parentName:"tr",align:null},"container"),(0,l.mdx)("td",{parentName:"tr",align:null},"Contains the ",(0,l.mdx)("inlineCode",{parentName:"td"},"byte_length")," ",(0,l.mdx)("inlineCode",{parentName:"td"},"type")," and ",(0,l.mdx)("inlineCode",{parentName:"td"},"overwrite")," parameters")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"byte_length")),(0,l.mdx)("td",{parentName:"tr",align:null},"integer"),(0,l.mdx)("td",{parentName:"tr",align:null},"The byte length of the job")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"type")),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The type of the job")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"overwrite")),(0,l.mdx)("td",{parentName:"tr",align:null},"boolean"),(0,l.mdx)("td",{parentName:"tr",align:null},"Whether or not the import will overwrite.")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"notification_extras")),(0,l.mdx)("td",{parentName:"tr",align:null},"container"),(0,l.mdx)("td",{parentName:"tr",align:null},"Extra options for notifications. Contains the ",(0,l.mdx)("inlineCode",{parentName:"td"},"key"),", and ",(0,l.mdx)("inlineCode",{parentName:"td"},"value")," parameters.")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"key")),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The field or column name associated with key value")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"value")),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The actual value of the key (as in a field or column name)")))),(0,l.mdx)("h2",{id:"put-upload-file"},"PUT upload file"),(0,l.mdx)("p",null,"Use this endpoint to upload a file that will be associated with the job ID created with the POST create job endpoint. This file can be tsv, tab, or JSON. For more information on how to structure your classification files, see ",(0,l.mdx)("a",{parentName:"p",href:"https://experienceleague.adobe.com/docs/analytics/components/classifications/classifications-importer/c-saint-data-files.html"},"Classification data files")),(0,l.mdx)("p",null,(0,l.mdx)("inlineCode",{parentName:"p"},"PUT https://analytics.adobe.io.api/{GLOBAL_COMPANY_ID}/classification/job/import/uploadFile/{API_JOB_ID}")),(0,l.mdx)("h3",{id:"request-and-response-examples-1"},"Request and Response Examples"),(0,l.mdx)("p",null,"Click the ",(0,l.mdx)("strong",{parentName:"p"},"Request")," tab in the following example to see a cURL request for this endpoint. Click the ",(0,l.mdx)("strong",{parentName:"p"},"Response")," tab to see a successful JSON response for the request."),(0,l.mdx)(p,{slots:"heading, code",repeat:"2",languages:"CURL,JSON",mdxType:"CodeBlock"}),(0,l.mdx)("h4",{id:"request-1"},"Request"),(0,l.mdx)("pre",null,(0,l.mdx)("code",{parentName:"pre",className:"language-sh"},'curl -X PUT "https://analytics.adobe.io.api/{GLOBAL_COMPANY_ID}/classification/job/import/uploadFile/a6fc824c-4d6f-45f9-8f55-456f918e0b41"\n     -H "x-api-key: {CLIENT_ID}" \\\n     -H "Authorization: Bearer {ACCESS_TOKEN}" \\\n     -H "Content-Type: multipart/form-data" \\\n     -d \'{\n        "Key": "example_file.tsv",\n        "Value": "/files/examples/example_file.tsv"\n         }\' \n')),(0,l.mdx)("h4",{id:"response-1"},"Response"),(0,l.mdx)("pre",null,(0,l.mdx)("code",{parentName:"pre",className:"language-json"},'{\n    "api_job_id": "a6fc824c-4d6f-45f9-8f55-456f918e0b41",\n    "status": "success"\n}\n')),(0,l.mdx)("h3",{id:"request-example-details-1"},"Request example details"),(0,l.mdx)("p",null,"The example above shows a cURL request with the following:"),(0,l.mdx)("ul",null,(0,l.mdx)("li",{parentName:"ul"},"the ",(0,l.mdx)("inlineCode",{parentName:"li"},"Key")," parameter specified as the file name ",(0,l.mdx)("inlineCode",{parentName:"li"},"example_file.tsv"),"."),(0,l.mdx)("li",{parentName:"ul"},"the ",(0,l.mdx)("inlineCode",{parentName:"li"},"Value")," parameter specified as the file path ",(0,l.mdx)("inlineCode",{parentName:"li"},"/files/examples/example_file.tsv"),".")),(0,l.mdx)("h3",{id:"response-example-details-1"},"Response example details"),(0,l.mdx)("p",null,"The example response above shows a successful status for the upload."),(0,l.mdx)("h3",{id:"request-parameters-1"},"Request Parameters"),(0,l.mdx)("p",null,"The following table describes the PUT upload file request parameters:"),(0,l.mdx)("table",null,(0,l.mdx)("thead",{parentName:"table"},(0,l.mdx)("tr",{parentName:"thead"},(0,l.mdx)("th",{parentName:"tr",align:null},"Name"),(0,l.mdx)("th",{parentName:"tr",align:null},"Required"),(0,l.mdx)("th",{parentName:"tr",align:null},"Type"),(0,l.mdx)("th",{parentName:"tr",align:null},"Description"))),(0,l.mdx)("tbody",{parentName:"table"},(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"api_job_id")),(0,l.mdx)("td",{parentName:"tr",align:null},"required"),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The API job ID for uploading the file. This ID was provided with the response of the POST create job endpoint.")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"Key")),(0,l.mdx)("td",{parentName:"tr",align:null},"required"),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The name of the uploaded file")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"Value")),(0,l.mdx)("td",{parentName:"tr",align:null},"required"),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The location of the uploaded file")))),(0,l.mdx)("h3",{id:"response-parameters-1"},"Response Parameters"),(0,l.mdx)("p",null,"The following table describes the PUT upload file response parameters:"),(0,l.mdx)("table",null,(0,l.mdx)("thead",{parentName:"table"},(0,l.mdx)("tr",{parentName:"thead"},(0,l.mdx)("th",{parentName:"tr",align:null},"Name"),(0,l.mdx)("th",{parentName:"tr",align:null},"Type"),(0,l.mdx)("th",{parentName:"tr",align:null},"Description"))),(0,l.mdx)("tbody",{parentName:"table"},(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"api_job_id")),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The API job ID for uploading the file. This ID is provided with the response of the POST create job endpoint.")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"status")),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The status of the API job")))),(0,l.mdx)("h2",{id:"post-commit-job"},"POST commit job"),(0,l.mdx)("p",null,"Use this endpoint to commit the changes of a specified job ID. This endpoint finalizes the file uploading process. For more information on classification jobs, see ",(0,l.mdx)("a",{parentName:"p",href:"https://experienceleague.adobe.com/docs/analytics/components/classifications/sets/job-manager.htm"},"Classification set jobs manager"),"."),(0,l.mdx)("p",null,(0,l.mdx)("inlineCode",{parentName:"p"},"POST https://analytics.adobe.io.api/{GLOBAL_COMPANY_ID}/classification/job/import/commitApiJob/{API_JOB_ID}")),(0,l.mdx)("h3",{id:"request-and-response-examples-2"},"Request and Response Examples"),(0,l.mdx)("p",null,"Click the ",(0,l.mdx)("strong",{parentName:"p"},"Request")," tab in the following example to see a cURL request for this endpoint. Click the ",(0,l.mdx)("strong",{parentName:"p"},"Response")," tab to see a successful JSON response for the request."),(0,l.mdx)(p,{slots:"heading, code",repeat:"2",languages:"CURL,JSON",mdxType:"CodeBlock"}),(0,l.mdx)("h4",{id:"request-2"},"Request"),(0,l.mdx)("pre",null,(0,l.mdx)("code",{parentName:"pre",className:"language-sh"},'curl -X POST "https://analytics.adobe.io.api/{GLOBAL_COMPANY_ID}/classification/job/import/commitApiJob/a6fc824c-4d6f-45f9-8f55-456f918e0b41" \\\n     -H "x-api-key: {CLIENT_ID}" \\\n     -H "Content-Type: application/json" \\\n     -H "Authorization: Bearer {ACCESS_TOKEN}"\n')),(0,l.mdx)("h4",{id:"response-2"},"Response"),(0,l.mdx)("pre",null,(0,l.mdx)("code",{parentName:"pre",className:"language-json"},'{\n  "import_job_id": "e11671f1-d352-4b34-bb95-3a26775ef334",\n  "api_job_id": "a6fc824c-4d6f-45f9-8f55-456f918e0b41"\n}\n')),(0,l.mdx)("h3",{id:"request-example-details-2"},"Request example details"),(0,l.mdx)("p",null,"The example above shows a cURL request to commit the job associated with the ",(0,l.mdx)("inlineCode",{parentName:"p"},"api_job_id")," of ",(0,l.mdx)("inlineCode",{parentName:"p"},"a6fc824c-4d6f-45f9-8f55-456f918e0b41"),"."),(0,l.mdx)("h3",{id:"response-example-details-2"},"Response example details"),(0,l.mdx)("p",null,"The example above shows the successful response for committing the job, including the values for ",(0,l.mdx)("inlineCode",{parentName:"p"},"import_job_id")," and ",(0,l.mdx)("inlineCode",{parentName:"p"},"api_job_id"),"."),(0,l.mdx)("h3",{id:"request-parameters-2"},"Request Parameters"),(0,l.mdx)("p",null,"The following table describes the POST commit job request parameters:"),(0,l.mdx)("table",null,(0,l.mdx)("thead",{parentName:"table"},(0,l.mdx)("tr",{parentName:"thead"},(0,l.mdx)("th",{parentName:"tr",align:null},"Name"),(0,l.mdx)("th",{parentName:"tr",align:null},"Required"),(0,l.mdx)("th",{parentName:"tr",align:null},"Type"),(0,l.mdx)("th",{parentName:"tr",align:null},"Description"))),(0,l.mdx)("tbody",{parentName:"table"},(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"api_job_id")),(0,l.mdx)("td",{parentName:"tr",align:null},"required"),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The API job ID for uploading the file. This ID was provided with the response of the POST create job endpoint.")))),(0,l.mdx)("h3",{id:"response-parameters-2"},"Response Parameters"),(0,l.mdx)("p",null,"The following table describes the POST commit job response parameters:"),(0,l.mdx)("table",null,(0,l.mdx)("thead",{parentName:"table"},(0,l.mdx)("tr",{parentName:"thead"},(0,l.mdx)("th",{parentName:"tr",align:null},"Name"),(0,l.mdx)("th",{parentName:"tr",align:null},"Type"),(0,l.mdx)("th",{parentName:"tr",align:null},"Description"))),(0,l.mdx)("tbody",{parentName:"table"},(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"import_job_id")),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The ID of the import job")),(0,l.mdx)("tr",{parentName:"tbody"},(0,l.mdx)("td",{parentName:"tr",align:null},(0,l.mdx)("inlineCode",{parentName:"td"},"api_job_id")),(0,l.mdx)("td",{parentName:"tr",align:null},"string"),(0,l.mdx)("td",{parentName:"tr",align:null},"The API job ID for uploading the file. This ID was provided with the response of the POST create job endpoint.")))),(0,l.mdx)("p",null,"After importing your classification datasets you can export them to other applications. See the ",(0,l.mdx)("a",{parentName:"p",href:"classifications/index.md"},"Analytics classification APIs guide")," for more information."),(0,l.mdx)("h2",{id:"api-status-codes"},"API status codes"),(0,l.mdx)("p",null,"For a description of API status codes and tips for troubleshooting, see the ",(0,l.mdx)("a",{parentName:"p",href:"https://experienceleague.adobe.com/docs/experience-platform/landing/troubleshooting.html#api-status-codes"},"Platform FAQ and troubleshooting guide"),"."))}u.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-guides-endpoints-classifications-import-file-md-aa7e49de063957b7c703.js.map