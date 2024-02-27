---
title: Annotation definition data structure
description: See an example of how an annotation's data structure looks.
---

# Annotation definition data structure

<InlineAlert variant="info" slots="text" />

Adobe may add optional request and response members (name/value pairs) to existing API objects at any time and without notice or changes in versioning. Adobe recommends that you refer to the API documentation of any third-party tool you integrate with our APIs so that such additions are ignored in processing if not understood. If implemented properly, such additions are non-breaking changes for your implementation. Adobe will not remove parameters or add required parameters without first providing standard notification through release notes.

The annotation definition data structure is used to communicate an annotation's structure to the API.

* **`name`**: The name of the annotation.
* **`description`**: The annotation's description.
* **`dateRange`**: The date range of the annotation.
* **`color`**: An enum representing the annotation's color. Supported values include `STANDARD1` through `STANDARD9`.
* **`applyToAllReports`**: A boolean that determines if the annotation applies to all report suites.
* **`scope`**: An object including the `metrics` and `filters` that the annotation uses.
* **`createdDate`**: The date that the annotation was created.
* **`modifiedDate`**: The date that the annotation was last modified.
* **`modifiedById`**: The ID of the user who last modified the annotation.
* **`tags`**: The tags applied to the annotation.
* **`shares`**: The shares applied to the annotation.
* **`approved`**: A boolean that determines if the annotation is approved by an admin.
* **`favorite`**: A boolean that determines if the user has this annotation favorited (starred).
* **`usageSummary`**: An object that shows where this annotation is used.
* **`owner`**: An object showing the ID, name, and login of the user that created the annotation.
* **`companyId`**: The login company ID of the annotation.
* **`reportSuiteName`**: The report suite's friendly name.
* **`rsid`**: The report suite ID.

## Example

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "dateRange": "string",
  "color": "STANDARD1",
  "applyToAllReports": true,
  "scope": {
    "metrics": [
      {
        "id": "string",
        "componentType": "string"
      }
    ],
    "filters": [
      {
        "id": "string",
        "operator": "string",
        "dimensionType": "string",
        "terms": [
          "string"
        ],
        "componentType": "string"
      }
    ]
  },
  "createdDate": "YYYY-03-23T01:51:28.686Z",
  "modifiedDate": "YYYY-03-23T01:51:28.686Z",
  "modifiedById": "string",
  "tags": [
    {
      "additionalProp1": {},
      "additionalProp2": {},
      "additionalProp3": {}
    }
  ],
  "shares": [
    {
      "additionalProp1": {},
      "additionalProp2": {},
      "additionalProp3": {}
    }
  ],
  "approved": true,
  "favorite": true,
  "usageSummary": {
    "additionalProp1": {},
    "additionalProp2": {},
    "additionalProp3": {}
  },
  "owner": {
    "id": 0,
    "imsUserId": "string"
  },
  "companyId": 0,
  "reportSuiteName": "string",
  "rsid": "string"
}
```
