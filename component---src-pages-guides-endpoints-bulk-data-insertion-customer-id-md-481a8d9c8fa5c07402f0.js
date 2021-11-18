(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[649],{61568:function(e,t,n){"use strict";n.r(t),n.d(t,{_frontmatter:function(){return s},default:function(){return c}});var i,o=n(22122),a=n(19756),r=(n(15007),n(64983)),d=n(99536),m=["components"],s={},l=(i="InlineAlert",function(e){return console.warn("Component "+i+" was not imported, exported, or provided by MDXProvider as global scope"),(0,r.mdx)("div",e)}),u={_frontmatter:s},p=d.Z;function c(e){var t=e.components,n=(0,a.Z)(e,m);return(0,r.mdx)(p,(0,o.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.mdx)("h1",{id:"customer-id-and-experience-cloud-visitor-id-seeds"},"Customer ID and Experience Cloud Visitor ID seeds"),(0,r.mdx)(l,{variant:"info",slots:"text",mdxType:"InlineAlert"}),(0,r.mdx)("p",null,"Before using this feature, the Adobe BDIA team must coordinate with the Adobe Audience Manager team to configure the report suite for ECID auto-generation. Contact your Adobe consultant or Account Manager to initiate this process."),(0,r.mdx)("p",null,"BDIA provides a way for a customer ID to be specified which Adobe will use as a seed to automatically generate an Experience Cloud Visitor ID. This functionality simplifies the process of generating your own ECID, which would require a separate server call for every visitor. Providing your own customer ID as a seed for an ECID is done by adding a column to specify a ",(0,r.mdx)("inlineCode",{parentName:"p"},"customerID.[customerIDType].id")," and another boolean column, ",(0,r.mdx)("inlineCode",{parentName:"p"},"customerID.[customerIDType].ismcseed")," to denote which customer ID should be used as the seed. Other columns can be used to further define the customer ID as well. See the table below for more information about the available columns."),(0,r.mdx)("h2",{id:"customer-id-columns-and-query-string-parameters"},"Customer ID columns and query string parameters"),(0,r.mdx)("p",null,"When specifying a ",(0,r.mdx)("inlineCode",{parentName:"p"},"customerID")," column, you must choose a ",(0,r.mdx)("inlineCode",{parentName:"p"},"customerIDType")," to correlate the columns to each other. The ",(0,r.mdx)("inlineCode",{parentName:"p"},"customerIDType"),' can be any alpha-numeric string, and is case sensitive. If using Audience Manager, your "Integration Code" is your ',(0,r.mdx)("inlineCode",{parentName:"p"},"customerIDType"),"."),(0,r.mdx)("p",null,"For example, you have two ways that your site can identify a visitor: a user ID and an e-mail address. If a visitor logs in using their user ID, then you would set ",(0,r.mdx)("inlineCode",{parentName:"p"},"customerID.userIdent.authState")," to ",(0,r.mdx)("inlineCode",{parentName:"p"},"AUTHENTICATED")," and set ",(0,r.mdx)("inlineCode",{parentName:"p"},"customerID.userIdent.id")," to their user ID. If a visitor logs in using their email address, then you would set ",(0,r.mdx)("inlineCode",{parentName:"p"},"customerID.userEmail.authState")," to ",(0,r.mdx)("inlineCode",{parentName:"p"},"AUTHENTICATED")," and set ",(0,r.mdx)("inlineCode",{parentName:"p"},"customerID.userEmail.id")," to their email address."),(0,r.mdx)("p",null,"See ",(0,r.mdx)("a",{parentName:"p",href:"file-format.md"},"File format")," f"),(0,r.mdx)("h2",{id:"customer-id-validation-rules"},"Customer ID Validation Rules"),(0,r.mdx)("p",null,"The following validation rules are applicable to the Customer ID columns:"),(0,r.mdx)("ul",null,(0,r.mdx)("li",{parentName:"ul"},"The ",(0,r.mdx)("inlineCode",{parentName:"li"},"customerIDType")," cannot be empty"),(0,r.mdx)("li",{parentName:"ul"},"The ",(0,r.mdx)("inlineCode",{parentName:"li"},"authState")," and ",(0,r.mdx)("inlineCode",{parentName:"li"},"isMCSeed")," must be one of the valid values stated in the table above."),(0,r.mdx)("li",{parentName:"ul"},"At least one of the following Visitor IDs must be provided in each row:",(0,r.mdx)("ul",{parentName:"li"},(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("inlineCode",{parentName:"li"},"customerID.[customerIDType].id")," with ",(0,r.mdx)("inlineCode",{parentName:"li"},"customerID.[customerIDType].isMCSeed")," set to ",(0,r.mdx)("inlineCode",{parentName:"li"},"true")),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("inlineCode",{parentName:"li"},"VisitorID")),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("inlineCode",{parentName:"li"},"MarketingCloudVisitorID")),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("inlineCode",{parentName:"li"},"ipAddress")))),(0,r.mdx)("li",{parentName:"ul"},"If ",(0,r.mdx)("inlineCode",{parentName:"li"},"isMCSeed")," is ",(0,r.mdx)("inlineCode",{parentName:"li"},"true"),", ",(0,r.mdx)("inlineCode",{parentName:"li"},"customerID")," cannot be empty"),(0,r.mdx)("li",{parentName:"ul"},"There can only be ONE field specified as the ",(0,r.mdx)("inlineCode",{parentName:"li"},"isMCSeed")," per IMS Organization. This field name must be communicated to Adobe's BDIA team for provisioning before use.")))}c.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-guides-endpoints-bulk-data-insertion-customer-id-md-481a8d9c8fa5c07402f0.js.map