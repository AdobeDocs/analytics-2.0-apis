"use strict";(self.webpackChunkanalytics_2_0_apis=self.webpackChunkanalytics_2_0_apis||[]).push([[8319],{7589:function(e,n,t){t.r(n),t.d(n,{_frontmatter:function(){return m},default:function(){return c}});var a,i=t(87462),d=t(63366),o=(t(15007),t(64983)),l=t(91515),r=["components"],m={},s=(a="CodeBlock",function(e){return console.warn("Component "+a+" was not imported, exported, or provided by MDXProvider as global scope"),(0,o.mdx)("div",e)}),p={_frontmatter:m},u=l.Z;function c(e){var n=e.components,t=(0,d.Z)(e,r);return(0,o.mdx)(u,(0,i.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,o.mdx)("h1",{id:"bulk-data-insertion-api-endpoints"},"Bulk Data Insertion API endpoints"),(0,o.mdx)("p",null,"Once you have met all ",(0,o.mdx)("a",{parentName:"p",href:"index.md"},"prerequisites"),", have a ",(0,o.mdx)("a",{parentName:"p",href:"file-format.md"},"correctly formatted file")," and have checked your file for syntax errors with our ",(0,o.mdx)("a",{parentName:"p",href:"#validate"},"validation")," tool, you can begin making API calls to Adobe's ingestion endpoint for this API."),(0,o.mdx)("h2",{id:"primary-ingestion-endpoint"},"Primary ingestion endpoint"),(0,o.mdx)("p",null,"The file ingestion endpoint is found here."),(0,o.mdx)("p",null,(0,o.mdx)("inlineCode",{parentName:"p"},"POST https://analytics-collection.adobe.io/aa/collect/v1/events")),(0,o.mdx)("p",null,"Include all of the required headers with each API call:"),(0,o.mdx)("ul",null,(0,o.mdx)("li",{parentName:"ul"},(0,o.mdx)("strong",{parentName:"li"},(0,o.mdx)("inlineCode",{parentName:"strong"},"Authorization")),": Required for authentication with the API. Format is the string ",(0,o.mdx)("inlineCode",{parentName:"li"},'"Bearer {ACCESS_TOKEN}'),"."),(0,o.mdx)("li",{parentName:"ul"},(0,o.mdx)("strong",{parentName:"li"},(0,o.mdx)("inlineCode",{parentName:"strong"},"x-api-key")),': Required for authentication with the API. Found in the Adobe Developer console under the JWT service credentials as "Client ID".'),(0,o.mdx)("li",{parentName:"ul"},(0,o.mdx)("strong",{parentName:"li"},(0,o.mdx)("inlineCode",{parentName:"strong"},"x-adobe-vgid")),": Required for this endpoint. The visitor group ID. See ",(0,o.mdx)("a",{parentName:"li",href:"visitor-groups.md"},"Visitor groups"),"."),(0,o.mdx)("li",{parentName:"ul"},(0,o.mdx)("strong",{parentName:"li"},(0,o.mdx)("inlineCode",{parentName:"strong"},"x-adobe-idempotency-key")),": Optional. Allows you to store a reference to your unique file identifier for the upload. This value can be used for duplication protection in cases when your request does not return a response from Adobe.")),(0,o.mdx)("p",null,"You must also add the file, which should be compressed in gzip format, and included as multipart/form-data."),(0,o.mdx)("p",null,"The ",(0,o.mdx)("inlineCode",{parentName:"p"},"https://analytics-collection.adobe.io")," domain automatically routes your API call to the best region for processing. However, if you are legally required to have your data processed in a specific part of the world, you can use one of the following regional host names for API calls:"),(0,o.mdx)("ul",null,(0,o.mdx)("li",{parentName:"ul"},(0,o.mdx)("strong",{parentName:"li"},"US processing"),": ",(0,o.mdx)("inlineCode",{parentName:"li"},"https://analytics-collection-va7.adobe.io")),(0,o.mdx)("li",{parentName:"ul"},(0,o.mdx)("strong",{parentName:"li"},"European processing"),": ",(0,o.mdx)("inlineCode",{parentName:"li"},"https://analytics-collection-nld2.adobe.io"))),(0,o.mdx)(s,{slots:"heading, code",repeat:"2",languages:"CURL,JSON",mdxType:"CodeBlock"}),(0,o.mdx)("h4",{id:"request"},"Request"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre",className:"language-sh"},'curl -X POST -H "accept: application/json" \\\n    -H "Authorization: Bearer {ACCESS_TOKEN}" \\\n    -H "x-api-key: {CLIENTID}" \\\n    -H "x-adobe-vgid: example_group" \\\n    -F file=@/tmp/ingest_file.gz \\\n    "https://analytics-collection.adobe.io/aa/collect/v1/events"\n')),(0,o.mdx)("h4",{id:"response"},"Response"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre",className:"language-json"},'{\n  "file_id": "5c04f400-fca5-420c-9c36-b94aaec55e69",\n  "visitor_group_id": "example_group",\n  "size": 355600,\n  "received_date": 1506553535,\n  "rows": 10000,\n  "invalid_rows": 42,\n  "upload_name": "ingest_file.gz",\n  "status": "string",\n  "status_code": "UPLOADED",\n  "processing_log": "string",\n  "idempotency_key": "5c04f400-fca5-420c-9c36-b94aaec55e69"\n}\n')),(0,o.mdx)("h3",{id:"response-object-details"},"Response object details"),(0,o.mdx)("p",null,"When you upload a file to this endpoint, Adobe returns a JSON object that can contain the following fields:"),(0,o.mdx)("table",null,(0,o.mdx)("thead",{parentName:"table"},(0,o.mdx)("tr",{parentName:"thead"},(0,o.mdx)("th",{parentName:"tr",align:null},"Field"),(0,o.mdx)("th",{parentName:"tr",align:null},"Data type"),(0,o.mdx)("th",{parentName:"tr",align:null},"Description"))),(0,o.mdx)("tbody",{parentName:"table"},(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:null},(0,o.mdx)("inlineCode",{parentName:"td"},"file_id")),(0,o.mdx)("td",{parentName:"tr",align:null},"string"),(0,o.mdx)("td",{parentName:"tr",align:null},"Unique identifier for the file upload transaction. Automatically generated by Adobe unless you include the ",(0,o.mdx)("inlineCode",{parentName:"td"},"x-adobe-idempotency-key")," header in the API call.")),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:null},(0,o.mdx)("inlineCode",{parentName:"td"},"visitor_group")),(0,o.mdx)("td",{parentName:"tr",align:null},"string"),(0,o.mdx)("td",{parentName:"tr",align:null},"Name of the visitor group as stated in the ",(0,o.mdx)("inlineCode",{parentName:"td"},"x-adobe-vgid")," header. See ",(0,o.mdx)("a",{parentName:"td",href:"visitor-groups.md"},"Visitor groups"),".")),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:null},(0,o.mdx)("inlineCode",{parentName:"td"},"size")),(0,o.mdx)("td",{parentName:"tr",align:null},"long"),(0,o.mdx)("td",{parentName:"tr",align:null},"The size of the uploaded file in bytes.")),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:null},(0,o.mdx)("inlineCode",{parentName:"td"},"received_date")),(0,o.mdx)("td",{parentName:"tr",align:null},"long"),(0,o.mdx)("td",{parentName:"tr",align:null},"The Unix timestamp when the file was received")),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:null},(0,o.mdx)("inlineCode",{parentName:"td"},"rows")),(0,o.mdx)("td",{parentName:"tr",align:null},"integer"),(0,o.mdx)("td",{parentName:"tr",align:null},"The number of rows contained in the file")),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:null},(0,o.mdx)("inlineCode",{parentName:"td"},"invalid_rows")),(0,o.mdx)("td",{parentName:"tr",align:null},"integer"),(0,o.mdx)("td",{parentName:"tr",align:null},"The number of invalid rows identified in the file")),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:null},(0,o.mdx)("inlineCode",{parentName:"td"},"upload_name")),(0,o.mdx)("td",{parentName:"tr",align:null},"string"),(0,o.mdx)("td",{parentName:"tr",align:null},"The name of the file included in the request")),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:null},(0,o.mdx)("inlineCode",{parentName:"td"},"status")),(0,o.mdx)("td",{parentName:"tr",align:null},"string"),(0,o.mdx)("td",{parentName:"tr",align:null},"More verbose details around the ",(0,o.mdx)("inlineCode",{parentName:"td"},"status_code"))),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:null},(0,o.mdx)("inlineCode",{parentName:"td"},"status_code")),(0,o.mdx)("td",{parentName:"tr",align:null},"string"),(0,o.mdx)("td",{parentName:"tr",align:null},"The status of the file upload. Valid values include ",(0,o.mdx)("inlineCode",{parentName:"td"},"UPLOADED")," or ",(0,o.mdx)("inlineCode",{parentName:"td"},"REJECTED"),".")),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:null},(0,o.mdx)("inlineCode",{parentName:"td"},"processing_log")),(0,o.mdx)("td",{parentName:"tr",align:null},"string"),(0,o.mdx)("td",{parentName:"tr",align:null},"Details around specific issues encountered. If an error type has 10 or less problem rows, they are explicitly mentioned. If an error type has more than 10 problem rows, summarized results are provided.")),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:null},(0,o.mdx)("inlineCode",{parentName:"td"},"idempotency_key")),(0,o.mdx)("td",{parentName:"tr",align:null},"string"),(0,o.mdx)("td",{parentName:"tr",align:null},"Either the value of the ",(0,o.mdx)("inlineCode",{parentName:"td"},"x-adobe-idempotency-key")," if supplied, or the ",(0,o.mdx)("inlineCode",{parentName:"td"},"file_id"))))),(0,o.mdx)("h2",{id:"validate"},"Validate"),(0,o.mdx)("p",null,"Before uploading your first file, Adobe strongly recommends running the file through the validation endpoint. Please note, you should not send EVERY file to this endpoint. This endpoint exists to validate file format before you begin uploading them to the ",(0,o.mdx)("inlineCode",{parentName:"p"},"events")," endpoint. Files uploaded to this endpoint are not stored on Adobe's servers or processed. This API is synchronous and returns an immediate reply that states the file's validation status. If a file fails validation, the reason is also returned. See ",(0,o.mdx)("a",{parentName:"p",href:"troubleshooting.md"},"Troubleshoot uploads")," for more information."),(0,o.mdx)("p",null,(0,o.mdx)("inlineCode",{parentName:"p"},"POST https://analytics-collection.adobe.io/aa/collect/v1/events/validate")),(0,o.mdx)(s,{slots:"heading, code",repeat:"3",languages:"CURL,JSON,JSON",mdxType:"CodeBlock"}),(0,o.mdx)("h4",{id:"request-1"},"Request"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre",className:"language-sh"},'curl -X POST -H "accept: application/json" \\\n    -H "Authorization: Bearer {ACCESS_TOKEN}" \\\n    -H "x-api-key: {CLIENTID}" \\\n    -H "x-adobe-vgid: example_group" \\\n    -F file=@/tmp/ingest_file.gz \\\n    "https://analytics-collection.adobe.io/aa/collect/v1/events/validate"\n')),(0,o.mdx)("h4",{id:"success-response"},"Success response"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre",className:"language-json"},'{\n    "success": "File is valid"\n}\n')),(0,o.mdx)("h4",{id:"failure-response---invalid-rows"},"Failure response - invalid rows"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre",className:"language-json"},'{\n    "error": "File has 2 rows that do not conform to the required CSV format! (Ex: row #59)"\n}\n')),(0,o.mdx)("h2",{id:"idempotency-key-lookup"},"Idempotency Key Lookup"),(0,o.mdx)("p",null,"The API offers duplication protection through the use of an ",(0,o.mdx)("inlineCode",{parentName:"p"},"idempotency_key"),".  This unique value is generated on the client side, then passed in through the ",(0,o.mdx)("inlineCode",{parentName:"p"},"x-adobe-idempotency-key")," header field. If your ",(0,o.mdx)("inlineCode",{parentName:"p"},"POST")," request submission does not return a response, you can call this lookup endpoint to verify if the file was received by Adobe."),(0,o.mdx)("p",null,"If you do not include an idempotency key when creating a file upload, it defaults to the ",(0,o.mdx)("inlineCode",{parentName:"p"},"file_id")," generated when uploading a file. Since this idempotency key is generated after a file is uploaded, automatically generated idempotency keys lose their effectiveness in preventing duplicate uploads."),(0,o.mdx)("p",null,(0,o.mdx)("inlineCode",{parentName:"p"},"GET https://analytics-collection.adobe.io/aa/collect/v1/events/key/{idempotency_key}")),(0,o.mdx)(s,{slots:"heading, code",repeat:"3",languages:"CURL,JSON,JSON",mdxType:"CodeBlock"}),(0,o.mdx)("h4",{id:"request-2"},"Request"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre",className:"language-sh"},'curl -X GET -H "accept: application/json" \\\n    -H "Authorization: Bearer {ACCESS_TOKEN}" \\\n    -H "x-api-key: {CLIENTID}" \\\n    "https://analytics-collection.adobe.io/aa/collect/v1/events/key/{IDEMPOTENCY_KEY}"\n')),(0,o.mdx)("h4",{id:"success-response-1"},"Success response"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre",className:"language-json"},'{\n    "file_id": "22eea6b6-eecf-4d13-b70f-abbb8a81efa2",\n    "size": 1687458,\n    "received_date": 1650323049,\n    "rows": 10212,\n    "idempotency_key":"{IDEMPOTENCY_KEY}"\n}\n')),(0,o.mdx)("h4",{id:"failure-response"},"Failure response"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre",className:"language-json"},'{\n    "error": "File not found"\n}\n')))}c.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-guides-endpoints-bulk-data-insertion-endpoints-md-c8909ba1e3403717331b.js.map