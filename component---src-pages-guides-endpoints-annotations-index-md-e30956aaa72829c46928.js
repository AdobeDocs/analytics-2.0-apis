"use strict";(self.webpackChunkanalytics_2_0_apis=self.webpackChunkanalytics_2_0_apis||[]).push([[7647],{30636:function(e,n,a){a.r(n),a.d(n,{_frontmatter:function(){return r},default:function(){return x}});var t=a(87462),o=a(63366),i=(a(15007),a(64983)),s=a(91515),d=["components"],r={},l=function(e){return function(n){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,i.mdx)("div",n)}},p=l("InlineAlert"),m=l("CodeBlock"),c={_frontmatter:r},u=s.Z;function x(e){var n=e.components,a=(0,o.Z)(e,d);return(0,i.mdx)(u,(0,t.Z)({},c,a,{components:n,mdxType:"MDXLayout"}),(0,i.mdx)("h1",{id:"annotations-api"},"Annotations API"),(0,i.mdx)("p",null,"The Analytics 2.0 Annotations APIs allow you to retrieve, update, or create annotations programmatically through Adobe Developer. These APIs use the same data and methods that Adobe uses inside the product UI."),(0,i.mdx)(p,{variant:"info",slots:"text",mdxType:"InlineAlert"}),(0,i.mdx)("p",null,"Adobe may add optional request and response members (name/value pairs) to existing API objects at any time and without notice or changes in versioning. Adobe recommends that you refer to the API documentation of any third-party tool you integrate with our APIs so that such additions are ignored in processing if not understood. If implemented properly, such additions are non-breaking changes for your implementation. Adobe will not remove parameters or add required parameters without first providing standard notification through release notes."),(0,i.mdx)("h2",{id:"retrieve-multiple-annotations"},"Retrieve multiple annotations"),(0,i.mdx)("p",null,"Retrieve a list of annotations that the user can access. See ",(0,i.mdx)("a",{parentName:"p",href:"parameters.md"},"Annotation parameters")," for query strings that you can attach to this API call."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"GET https://analytics.adobe.io/api/{GLOBALCOMPANYID}/annotations")),(0,i.mdx)("p",null,"For example, get a response of all annotations shared with the user."),(0,i.mdx)(m,{slots:"heading, code",repeat:"2",languages:"CURL,JSON",mdxType:"CodeBlock"}),(0,i.mdx)("h4",{id:"request"},"Request"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-sh"},'curl -X GET "https://analytics.adobe.io/api/exampleco/annotations?includeType=shared" \\\n    -H "x-api-key: {CLIENTID}" \\\n    -H "Authorization: Bearer {ACCESSTOKEN}"\n')),(0,i.mdx)("h4",{id:"response"},"Response"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-json"},'{\n    "content": [\n        {\n            "id": "62437d"\n        }\n    ],\n    "totalElements": 1,\n    "totalPages": 1,\n    "numberOfElements": 1,\n    "number": 0,\n    "firstPage": true,\n    "lastPage": true,\n    "sort": null,\n    "size": 10\n}\n')),(0,i.mdx)("h2",{id:"retrieve-a-single-annotation"},"Retrieve a single annotation"),(0,i.mdx)("p",null,"You can retrieve details around a single annotation if you know the annotation ID. You can find the annotation ID by using the multiple annotations endpoint. See ",(0,i.mdx)("a",{parentName:"p",href:"parameters.md"},"Annotation parameters")," for query strings that you can attach to this API call."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"GET https://analytics.adobe.io/api/{GLOBALCOMPANYID}/annotations/{ID}")),(0,i.mdx)("p",null,"For example, find details around the annotation with an ID of ",(0,i.mdx)("inlineCode",{parentName:"p"},"62437d"),", including the name, description, date range, and color:"),(0,i.mdx)(m,{slots:"heading, code",repeat:"2",languages:"CURL,JSON",mdxType:"CodeBlock"}),(0,i.mdx)("h4",{id:"request-1"},"Request"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-sh"},'curl -X GET "https://analytics.adobe.io/api/exampleco/annotations/62437d?expansion=name,description,dateRange,color" \\\n    -H "x-api-key: {CLIENTID}" \\\n    -H "Authorization: Bearer {ACCESSTOKEN}"\n')),(0,i.mdx)("h4",{id:"response-1"},"Response"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-json"},'{\n    "id": "62437d",\n    "name": "Example annotation",\n    "description": "This is an example annotation description.",\n    "dateRange": "YYYY-03-29T00:00:00/YYYY-03-29T23:59:59",\n    "color": "STANDARD6"\n}\n')),(0,i.mdx)("h2",{id:"create-an-annotation"},"Create an annotation"),(0,i.mdx)("p",null,"You can create annotations using ",(0,i.mdx)("inlineCode",{parentName:"p"},"POST")," API calls. The following fields are required within a JSON body attached to the API call:"),(0,i.mdx)("ul",null,(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("strong",{parentName:"li"},(0,i.mdx)("inlineCode",{parentName:"strong"},"name")),": The name of the annotation."),(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("strong",{parentName:"li"},(0,i.mdx)("inlineCode",{parentName:"strong"},"rsid")),": The report suite ID for the annotation."),(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("strong",{parentName:"li"},(0,i.mdx)("inlineCode",{parentName:"strong"},"dateRange")),": The date range of the annotation. Use two date ranges separated by a forward slash (",(0,i.mdx)("inlineCode",{parentName:"li"},"/"),") in ISO 8601 format, based on the report suite's time zone."),(0,i.mdx)("li",{parentName:"ul"},(0,i.mdx)("strong",{parentName:"li"},(0,i.mdx)("inlineCode",{parentName:"strong"},"color")),": The annotation's color. Supported values include ",(0,i.mdx)("inlineCode",{parentName:"li"},"STANDARD1")," through ",(0,i.mdx)("inlineCode",{parentName:"li"},"STANDARD9"),", representing each of the available colors in the UI.")),(0,i.mdx)("p",null,(0,i.mdx)("span",{parentName:"p",className:"gatsby-resp-image-wrapper",style:{position:"relative",display:"block",marginLeft:"auto",marginRight:"auto",maxWidth:"391px"}},"\n      ",(0,i.mdx)("span",{parentName:"span",className:"gatsby-resp-image-background-image",style:{paddingBottom:"17.1875%",position:"relative",bottom:"0",left:"0",display:"block",transition:"opacity 0.5s 0.5s",pointerEvents:"none"}}),"\n  ",(0,i.mdx)("picture",{parentName:"span"},"\n          ",(0,i.mdx)("source",{parentName:"picture",srcSet:["/analytics-2.0-apis/static/c39995e569c580002530ce87a991edaa/5530d/annotation-colors.webp 320w","/analytics-2.0-apis/static/c39995e569c580002530ce87a991edaa/60541/annotation-colors.webp 391w"],sizes:"(max-width: 391px) 100vw, 391px",type:"image/webp"}),"\n          ",(0,i.mdx)("source",{parentName:"picture",srcSet:["/analytics-2.0-apis/static/c39995e569c580002530ce87a991edaa/dd4a7/annotation-colors.png 320w","/analytics-2.0-apis/static/c39995e569c580002530ce87a991edaa/7e80f/annotation-colors.png 391w"],sizes:"(max-width: 391px) 100vw, 391px",type:"image/png"}),"\n          ",(0,i.mdx)("img",{parentName:"picture",className:"gatsby-resp-image-image",src:"/analytics-2.0-apis/static/c39995e569c580002530ce87a991edaa/7e80f/annotation-colors.png",alt:"Annotation colors",title:"Annotation colors",loading:"lazy",style:{width:"100%",height:"100%",margin:"0",verticalAlign:"middle",position:"absolute",opacity:"0",transition:"opacity 0.5s",color:"inherit",boxShadow:"inset 0px 0px 0px 400px none",top:"0",left:"0"}}),"\n        "),"\n    ")),(0,i.mdx)("p",null,"See ",(0,i.mdx)("a",{parentName:"p",href:"definition.md"},"Annotation definition data structure")," for a full reference of available fields."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"POST https://analytics.adobe.io/api/{GLOBALCOMPANYID}/annotations")),(0,i.mdx)("p",null,"For example, create a basic annotation with the minimum required fields. The API responds with the automatically generated annotation ID."),(0,i.mdx)(m,{slots:"heading, code",repeat:"2",languages:"CURL,JSON",mdxType:"CodeBlock"}),(0,i.mdx)("h4",{id:"request-2"},"Request"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-sh"},'curl -X POST \'https://analytics.adobe.io/api/exampleco/annotations\' \\\n    -H \'x-api-key: {CLIENTID}\' \\\n    -H \'Authorization: Bearer {ACCESSTOKEN}\' \\\n    -H \'Content-Type: application/json\' \\\n    -d \'{"name": "Example annotation",\n        "rsid": "examplersid",\n        "dateRange": YYYY-02-14T00:00:00/YYYY-02-14T23:59:59",\n        "color": "STANDARD1"}\'\n')),(0,i.mdx)("h4",{id:"response-2"},"Response"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-json"},'{\n    "id": "62439328"\n}\n')),(0,i.mdx)("h2",{id:"delete-an-annotation"},"Delete an annotation"),(0,i.mdx)("p",null,"When you delete an annotation, it is hidden from all users in all menus. It is also hidden from API calls to the multiple annotations endpoint. You can still retrieve details on a deleted annotation if you have the annotation ID."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"DELETE https://analytics.adobe.io/api/{GLOBALCOMPANYID}/annotations/{ID}")),(0,i.mdx)("p",null,"For example, delete an annotation with the ID of ",(0,i.mdx)("inlineCode",{parentName:"p"},"62437d"),":"),(0,i.mdx)(m,{slots:"heading, code",repeat:"2",languages:"CURL,JSON",mdxType:"CodeBlock"}),(0,i.mdx)("h4",{id:"request-3"},"Request"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-sh"},'curl -X DELETE "https://analytics.adobe.io/api/exampleco/annotations/62437d" \\\n    -H "x-api-key: {CLIENTID}" \\\n    -H "Authorization: Bearer {ACCESSTOKEN}"\n')),(0,i.mdx)("h4",{id:"response-3"},"Response"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-json"},'{\n  "result": "success"\n}\n')),(0,i.mdx)("h2",{id:"update-an-annotation"},"Update an annotation"),(0,i.mdx)("p",null,"You can edit annotations using ",(0,i.mdx)("inlineCode",{parentName:"p"},"PUT")," API calls. It supports partial updates, meaning that instead of sending an entire annotation JSON object, you can only send the fields that you want to update. This API call requires a JSON body, which determines the parts of an annotation that you want to update."),(0,i.mdx)("p",null,(0,i.mdx)("inlineCode",{parentName:"p"},"PUT https://analytics.adobe.io/api/{GLOBALCOMPANYID}/annotations/{ID}")),(0,i.mdx)("p",null,"See ",(0,i.mdx)("a",{parentName:"p",href:"definition.md"},"Annotation definition data structure")," for a full reference of available fields."),(0,i.mdx)("p",null,"For example, only update the name of the annotation with an ID of ",(0,i.mdx)("inlineCode",{parentName:"p"},"62437d"),":"),(0,i.mdx)(m,{slots:"heading, code",repeat:"2",languages:"CURL,JSON",mdxType:"CodeBlock"}),(0,i.mdx)("h4",{id:"request-4"},"Request"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-sh"},"curl -X PUT 'https://analytics.adobe.io/api/exampleco/annotations/62437d' \\\n    -H 'x-api-key: {CLIENTID}' \\\n    -H 'Authorization: Bearer {ACCESSTOKEN}' \\\n    -H 'Content-Type: application/json' \\\n    -d '{\"name\":\"Different annotation name\"}'\n")),(0,i.mdx)("h4",{id:"response-4"},"Response"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-json"},'{\n    "id": "62437d"\n}\n')))}x.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-guides-endpoints-annotations-index-md-e30956aaa72829c46928.js.map