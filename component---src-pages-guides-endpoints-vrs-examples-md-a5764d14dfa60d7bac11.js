"use strict";(self.webpackChunkanalytics_2_0_apis=self.webpackChunkanalytics_2_0_apis||[]).push([[5457],{8838:function(e,n,t){t.r(n),t.d(n,{_frontmatter:function(){return o},default:function(){return l}});var a=t(87462),i=t(63366),s=(t(15007),t(64983)),r=t(91515),m=["components"],o={},d={_frontmatter:o},p=r.Z;function l(e){var n=e.components,t=(0,i.Z)(e,m);return(0,s.mdx)(p,(0,a.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,s.mdx)("h1",{id:"virtual-report-suite-examples"},"Virtual report suite examples"),(0,s.mdx)("p",null,"Example calls that you can make to the Virtual report suite API endpoint."),(0,s.mdx)("h2",{id:"basic-filtering-using-a-segment"},"Basic filtering using a segment"),(0,s.mdx)("p",null,"Creates a virtual report suite that filters data by a segment:"),(0,s.mdx)("pre",null,(0,s.mdx)("code",{parentName:"pre",className:"language-json"},'{\n  "name": "Basic VRS Creation Example",\n  "parentRsid": "examplersid",\n  "segmentList": [\n    "s300005535_5b7d98bc5ef3a562937dba7e"\n  ],\n  "dataSchema": "Cache",\n  "description": "Basic VRS Creation Example description"\n}\n')),(0,s.mdx)("h2",{id:"timezone-override"},"Timezone override"),(0,s.mdx)("p",null,"The parent report suite has a timezone of ",(0,s.mdx)("inlineCode",{parentName:"p"},"US/Mountain")," but the virtual report suite overrides the timezone to use ",(0,s.mdx)("inlineCode",{parentName:"p"},"Australia/Sydney")," (timezone ID of ",(0,s.mdx)("inlineCode",{parentName:"p"},"47"),"). Use the ",(0,s.mdx)("inlineCode",{parentName:"p"},"reportsuites/reportsuites/timezones")," endpoint to obtain all timezone IDs."),(0,s.mdx)("pre",null,(0,s.mdx)("code",{parentName:"pre",className:"language-json"},'{\n  "name": "Timezone Override Example",\n  "parentRsid": "examplersid",\n  "segmentList": [],\n  "dataSchema": "Cache",\n  "timezone" : 47\n}\n')),(0,s.mdx)("h2",{id:"curated-components"},"Curated components"),(0,s.mdx)("p",null,"Creates a virtual report suite that curates the browser dimension and visits metric:"),(0,s.mdx)("pre",null,(0,s.mdx)("code",{parentName:"pre",className:"language-json"},'{\n  "name": "Curated Components Example",\n  "parentRsid": "exampleRsid",\n  "segmentList": [],\n  "description": "Curated Components Example description",\n  "curatedComponents": [{\n    "componentId": "variables/browser",\n    "componentType": "dimension",\n    "curatedName": "Curated dimension example"\n    },\n    {\n    "componentId": "metrics/visits",\n    "componentType": "metric",\n    "curatedName": "Curated metric example"\n  }]\n}\n')),(0,s.mdx)("h2",{id:"cross-device-analytics"},"Cross-Device Analytics"),(0,s.mdx)("p",null,"Creates a virtual report suite that has ",(0,s.mdx)("a",{parentName:"p",href:"https://experienceleague.adobe.com/docs/analytics/components/cda/overview.html"},"CDA")," enabled (once you correctly configure the parent report suite):"),(0,s.mdx)("pre",null,(0,s.mdx)("code",{parentName:"pre",className:"language-json"},'{\n  "name": "CDA Example",\n  "parentRsid": "examplersid",\n  "segmentList": [],\n  "dataSchema": "Stitched",\n  "description": "CDA Example description"\n}\n')),(0,s.mdx)("h2",{id:"custom-session-timeout"},"Custom session timeout"),(0,s.mdx)("p",null,"Creates a virtual report suite which overrides the session timeout rules so a new visit starts after 30 minutes of inactivity or when an order event is fired:"),(0,s.mdx)("pre",null,(0,s.mdx)("code",{parentName:"pre",className:"language-json"},'{\n  "name": "Custom Session Timeout Example",\n  "parentRsid": "examplersid",\n  "segmentList": [],\n  "dataSchema": "CacheAndMid",\n  "sessionDefinition": [{\n    "numPeriods": 30,\n    "func": "inactivity",\n    "granularity": "minute"\n    }, {\n    "func": "beforeEvents",\n    "events": ["metrics/orders"]\n  }]\n}\n')))}l.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-guides-endpoints-vrs-examples-md-a5764d14dfa60d7bac11.js.map