"use strict";(self.webpackChunkanalytics_2_0_apis=self.webpackChunkanalytics_2_0_apis||[]).push([[9650],{3732:function(e,n,t){t.r(n),t.d(n,{_frontmatter:function(){return s},default:function(){return p}});var a,i=t(87462),o=t(63366),r=(t(15007),t(64983)),d=t(91515),c=["components"],s={},l=(a="CodeBlock",function(e){return console.warn("Component "+a+" was not imported, exported, or provided by MDXProvider as global scope"),(0,r.mdx)("div",e)}),m={_frontmatter:s},u=d.Z;function p(e){var n=e.components,t=(0,o.Z)(e,c);return(0,r.mdx)(u,(0,i.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,r.mdx)("h1",{id:"validate-calculated-metrics"},"Validate calculated metrics"),(0,r.mdx)("p",null,"Because report suites can have different configurations, dimensions, or metrics, a calculated metric that is valid in one report suite may not be valid in another. To determine which calculated metric to use in different report suites, and why it may or may not be available, you can use the ",(0,r.mdx)("inlineCode",{parentName:"p"},"/validate")," endpoint. This endpoint allows you to ",(0,r.mdx)("inlineCode",{parentName:"p"},"POST")," a definition along with a target report suite id. The validate endpoint responds with compatibility information on the calculated metric."),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"POST https://analytics.adobe.io/api/{COMPANY_ID}/calculatedmetrics/validate")),(0,r.mdx)("h2",{id:"example-validate-request"},"Example validate request"),(0,r.mdx)("p",null,"The following example shows a request to validate a target report suite id for a given calculated metric definition:"),(0,r.mdx)(l,{slots:"heading, code",repeat:"2",languages:"CURL,JSON",mdxType:"CodeBlock"}),(0,r.mdx)("h4",{id:"request"},"Request"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-sh"},'curl -X POST "http://analytics.adobe.io/api/exampleco/calculatedmetrics/validate?locale=en_US" \\\n    -H "x-api-key: {CLIENTID}" \\\n    -H "Authorization: Bearer {ACCESSTOKEN}" \\\n    -d \'{\n  "rsid": "[report suite id]",\n  "definition": {\n    "formula": {\n      "func": "subtract",\n      "col2": {\n        "func": "metric",\n        "name": "metrics/reloads"\n      },\n      "col1": {\n        "func": "metric",\n        "name": "metrics/occurrences"\n      }\n    },\n    "func": "calc-metric",\n    "version": [\n      1,\n      0,\n      0\n    ]\n  }\n}\'\n')),(0,r.mdx)("h4",{id:"response"},"Response"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-json"},'{\n  "valid": true,\n  "identityMetrics": [ { "identity": "metrics/occurrences" }, { "identity": "metrics/reloads" } ],\n  "functions": [ "subtract" ],\n  "validator_version": "1.0.0",\n  "supported_products": [ "oberon", "frag" ],\n  "supported_schema": [ "schema_oberon", "schema_frag" ]\n}\n')))}p.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-guides-endpoints-calculatedmetrics-validate-md-10c439af40d4be8eff42.js.map