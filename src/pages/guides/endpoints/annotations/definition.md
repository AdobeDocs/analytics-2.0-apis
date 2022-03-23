---
title: Annotation definition data structure
description: See an example of how an annotation's data structure looks.
---

# Annotation definition data structure

The annotation definition data structure is used to communicate an annotation's structure to the API.

* **`id`**:
* **`name`**:
* **`description`**:
* **`dateRange`**:
* **`color`**:
* **`applyToAllReports`**:
* **`scope`**:
* **`deleted`**:
* **`internal`**:
* **`createdDate`**:
* **`modifiedDate`**:
* **`modifiedById`**:
* **`tags`**:
* **`shares`**:
* **`approved`**:
* **`favorite`**:
* **`usageSummary`**:
* **`owner`**:
* **`companyId`**:
* **`reportSuiteName`**:
* **`rsid`**:

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
  "deleted": true,
  "internal": true,
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
