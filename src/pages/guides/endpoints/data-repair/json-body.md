---
title: JSON body reference
description: Supported variables, actions, and filters when using the Data Repair API.
---

# JSON body reference

A JSON request body is required when creating a Data Repair API job. This page provides a full list of variables, actions, and filters that you can include to create a valid JSON request body.

## Structure

A request body consists of one or more variables with the desired action for each variable. You can also optionally include a filter for a given variable.

```json
{
  "variables": {
    "{VARIABLE_1}": {
      "action": "{ACTION_1}",
      "filter": {"condition":  "{CONDITION_1}"}
    },
    "{VARIABLE_2}": {
      "action": "{ACTION_2}"
    }
  }
}
```

## Variables

The Data Repair API supports the following variables, with their supported actions.

Variable | Supported actions | Description
--- | --- | ---
`campaign` | `set`<br/>`delete`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | The [Tracking code](https://experienceleague.adobe.com/docs/analytics/components/dimensions/tracking-code.html) dimension. Adobe recommends [resetting](https://experienceleague.adobe.com/docs/analytics/admin/admin-tools/conversion-variables/conversion-var-admin.html) this dimension before a repair job so values persisted by visitors do not reappear after a repair job is complete.
`entrypage` | `set`<br/>`delete`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | The [Entry page](https://experienceleague.adobe.com/docs/analytics/components/dimensions/entry-dimensions.html) dimension.
`sitesections` | `set`<br/>`delete`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | The [Site section](https://experienceleague.adobe.com/docs/analytics/components/dimensions/site-section.html) dimension.
`geodma` | `delete` | The [US DMA](https://experienceleague.adobe.com/docs/analytics/components/dimensions/us-dma.html) dimension.
`geocity` | `delete` | The [Cities](https://experienceleague.adobe.com/docs/analytics/components/dimensions/cities.html) dimension.
`geocountry` | `delete` | The [Countries](https://experienceleague.adobe.com/docs/analytics/components/dimensions/countries.html) dimension.
`geolatitude` | `delete` | N/A
`geolongitude` | `delete` | N/A
`georegion` | `delete` | The [Regions](https://experienceleague.adobe.com/docs/analytics/components/dimensions/regions.html) dimension.
`geozip` | `delete` | The [Zip code](https://experienceleague.adobe.com/docs/analytics/components/dimensions/zip-code.html) dimension collected through geolocation.
`ipaddress` | `delete` | The IP address of the visitor.
`latitude` | `delete` | N/A
`longitude` | `delete` | N/A
`zip` | `delete` | The [Zip code](https://experienceleague.adobe.com/docs/analytics/components/dimensions/zip-code.html) dimension collected through the `zip` variable (not geosegmentation).
`page` | `set`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | The [Page](https://experienceleague.adobe.com/docs/analytics/components/dimensions/page.html) dimension.
`pageeventvar1` | `set`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | The [`linkURL`](https://experienceleague.adobe.com/docs/analytics/implementation/vars/config-vars/linkurl.html) implementation variable.
`pageeventvar2` | `set`<br/>`deleteQueryString`<br/>`deleteQueryStringParameters` | The [Download link](https://experienceleague.adobe.com/docs/analytics/components/dimensions/download-link.html), [Exit link](https://experienceleague.adobe.com/docs/analytics/components/dimensions/exit-link.html), or [Custom link](https://experienceleague.adobe.com/docs/analytics/components/dimensions/custom-link.html), depending on the type of link.
<!-- continue on pageurl-->