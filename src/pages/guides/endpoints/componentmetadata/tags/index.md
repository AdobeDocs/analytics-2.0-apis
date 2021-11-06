---
title: Tags API
description: Create, edit, or delete tags using the API.
---

# Tags API

The Analytics 2.0 Tags APIs allow you to retrieve, update, or create tags and their association with components programmatically through Adobe I/O. The APIs use the same data and methods that are used when working with tags in the UI. See [examples](examples.md) for example API calls that you can make to each endpoint.

## Retrieve multiple tags

Retrieve a list of tags for the organization.

`GET https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags`

You can paginate results by using the `limit` and `page` query strings.

* **`limit`**: An integer that represents the number of results per page.
* **`page`**: An integer that represents which page to return results.

## Retrieve a single tag

Retrieves information around the specified tag ID.

`GET https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/{ID}`

## Retrieve a list of components by tag

Retrieve all components of specific type associated with tag names.

`GET https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/tagnames?tagNames={TAGNAMES}`

This API call requires the `tagNames` query string. Query string values include a comma-separated list of tag names to search.

## Retrieve all tags for one or more components

Retrieve a list of tags tied to one or more components.

`GET https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/search?componentId={ID}&componentType={TYPE}`

This API call requires two query string parameters:

* **`componentId`**: The ID of the component(s). Separate multiple ID's with a comma.
* **`componentType`**: The type of the component. Valid component types include:
  * `segment`
  * `dashboard`
  * `bookmark`
  * `calculatedMetric`
  * `project`
  * `dateRange`
  * `metric`
  * `dimension`
  * `virtualReportSuite`
  * `scheduledJob`
  * `alert`
  * `classificationSet`

## Update tags for multiple components

Updates one or more tags with desired values.

`POST https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/component/search`

This API call requires a JSON request body to determine how to update each component. For example:

```json
{
  "componentType": "project",
  "componentIds": [
    "component-id-556"
  ]
}
```

## Create a tag

Creates tags for use with components.

`POST https://analytics.adobe.io/api/{COMPANY_ID}/componentmetadata/tags`

This API call requires a JSON request body so it can create the desired tag. For example:

```json
[
   {
      "name":"Tag name",
      "description":"Description",
      "components":[
         {
            "componentType":"project",
            "componentId":"component-id-1"
         }
      ]
   }
]
```

## Delete a tag

Deletes a tag. It also untags all components associated with the tag.

`DELETE https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/{TAG_ID}`

## Remove all tags from component(s)

Removes all tags from list of components.

`DELETE https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags?componentId={ID}&componentType={TYPE}`

This API call requires two query string parameters:

* **`componentId`**: The ID of the component(s). Separate multiple ID's with a comma.
* **`componentType`**: The type of the component. Valid component types include:
  * `segment`
  * `dashboard`
  * `bookmark`
  * `calculatedMetric`
  * `project`
  * `dateRange`
  * `metric`
  * `dimension`
  * `virtualReportSuite`
  * `scheduledJob`
  * `alert`
  * `classificationSet`

## Overwrite tags for components

Set the tags for one or more components. This endpoint overwrites all existing tags for the component, meaning that existing tags are removed.

`PUT https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/tags/tagitems`

This API call requires a JSON request body that contains the components to update and the tags to set. For example:

```json
[
   {
      "componentType":"project",
      "componentId":"component-id-1",
      "tags":[
         {
            "name":"marketing-1",
            "description":"marketing 1"
         },
         {
            "name":"marketing-2",
            "description":"marketing 2"
         }
      ]
   }
]
```
