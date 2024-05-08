"use strict";(self.webpackChunkanalytics_2_0_apis=self.webpackChunkanalytics_2_0_apis||[]).push([[1925],{93986:function(e,n,t){t.r(n),t.d(n,{_frontmatter:function(){return m},default:function(){return h}});var a=t(87462),i=t(63366),o=(t(15007),t(64983)),r=t(91515),d=["components"],m={},l=function(e){return function(n){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,o.mdx)("div",n)}},s=l("CodeBlock"),p=l("InlineAlert"),u={_frontmatter:m},c=r.Z;function h(e){var n=e.components,t=(0,i.Z)(e,d);return(0,o.mdx)(c,(0,a.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,o.mdx)("h1",{id:"discovery-api"},"Discovery API"),(0,o.mdx)("p",null,"The ",(0,o.mdx)("inlineCode",{parentName:"p"},"discovery/me")," API returns information on the user's company that is necessary for making other Adobe Analytics API calls. It returns information on who is making the call by inspecting the ",(0,o.mdx)("inlineCode",{parentName:"p"},"Access Token")," that is sent for authentication. "),(0,o.mdx)("p",null,"For example, if you have multiple logins for various companies, you can use this API to return a list of the companies associated your Client ID. From the list you can then choose which company to call with other APIs."),(0,o.mdx)("p",null,(0,o.mdx)("inlineCode",{parentName:"p"},"GET https://analytics.adobe.io/discovery/me")),(0,o.mdx)("h2",{id:"example-curl-request"},"Example cURL Request"),(0,o.mdx)("p",null,"The following example requests the user's information for company logins:"),(0,o.mdx)(s,{slots:"heading, code",repeat:"2",languages:"CURL,JSON",mdxType:"CodeBlock"}),(0,o.mdx)("h4",{id:"request"},"Request"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre",className:"language-sh"},'curl -X GET --header "x-api-key: {CLIENTID}" --header "Authorization: Bearer {ACCESS_TOKEN}" "https://analytics.adobe.io/discovery/me"\n')),(0,o.mdx)("h4",{id:"response"},"Response"),(0,o.mdx)("pre",null,(0,o.mdx)("code",{parentName:"pre",className:"language-json"},'{\n  "imsUserId": "1B..OMITTED..01@AdobeID",\n  "imsOrgs": [\n    {\n      "imsOrgId": "EA..OMITTED..29@AdobeOrg",\n      "companies": [\n        {\n          "globalCompanyId": "testco0",\n          "companyName": "Test Company",\n          "apiRateLimitPolicy": "aa_api_tier10_tp"\n        },\n        {\n          "globalCompanyId": "anothe0",\n          "companyName": "Another Test Company",\n          "apiRateLimitPolicy": "aa_api_tier10_tp"\n        }\n      ]\n    }\n  ]\n}\n')),(0,o.mdx)(p,{variant:"info",slots:"text",mdxType:"InlineAlert"}),(0,o.mdx)("p",null,"Adobe may add optional request and response members (name/value pairs) to existing API objects at any time and without notice or changes in versioning. Adobe recommends that you refer to the API documentation of any third-party tool you integrate with our APIs so that such additions are ignored in processing if not understood. If implemented properly, such additions are non-breaking changes for your implementation. Adobe will not remove parameters or add required parameters without first providing standard notification through release notes."),(0,o.mdx)("h2",{id:"discovery-attributes"},"Discovery Attributes"),(0,o.mdx)("p",null,"The following table provides descriptions for attributes commonly used with the ",(0,o.mdx)("inlineCode",{parentName:"p"},"discovery/me")," API:"),(0,o.mdx)("table",null,(0,o.mdx)("thead",{parentName:"table"},(0,o.mdx)("tr",{parentName:"thead"},(0,o.mdx)("th",{parentName:"tr",align:null},"Attribute"),(0,o.mdx)("th",{parentName:"tr",align:null},"Description"))),(0,o.mdx)("tbody",{parentName:"table"},(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:null},(0,o.mdx)("inlineCode",{parentName:"td"},"imsUserId")),(0,o.mdx)("td",{parentName:"tr",align:null},"The unique identifier for a user in the Adobe IMS system")),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:null},(0,o.mdx)("inlineCode",{parentName:"td"},"imsOrgs")),(0,o.mdx)("td",{parentName:"tr",align:null},"List of the IMS Organization for which the user has access")),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:null},(0,o.mdx)("inlineCode",{parentName:"td"},"imsOrgId")),(0,o.mdx)("td",{parentName:"tr",align:null},"The unique identifier for an IMS Organization")),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:null},(0,o.mdx)("inlineCode",{parentName:"td"},"companies")),(0,o.mdx)("td",{parentName:"tr",align:null},"List of companies for which the user has access within an IMS Organization")),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:null},(0,o.mdx)("inlineCode",{parentName:"td"},"globalCompanyId")),(0,o.mdx)("td",{parentName:"tr",align:null},"The globally unique identifier for an Analytics Company. This is needed as a path parameter to make API calls to the Adobe Analytics APIs.")),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:null},(0,o.mdx)("inlineCode",{parentName:"td"},"companyName")),(0,o.mdx)("td",{parentName:"tr",align:null},"The friendly name of the Analytics Company")),(0,o.mdx)("tr",{parentName:"tbody"},(0,o.mdx)("td",{parentName:"tr",align:null},(0,o.mdx)("inlineCode",{parentName:"td"},"apiRateLimitPolicy")),(0,o.mdx)("td",{parentName:"tr",align:null},"The API rate limiting policy setting for the given Analytics Company.")))))}h.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-guides-endpoints-discovery-md-6cf54b69a586d34f9a78.js.map