# Shares APIs

The Analytics 2.0 Shares APIs allow you to retrieve, update, or create shares and their association with components programmatically through Adobe I/O. The APIs use the same data and methods that are used when working with shares in the UI.

## Authorization and authentication

To obtain authorization and authentication, see the [Getting Started Guide for 2.0 APIs](https://www.adobe.io/apis/experiencecloud/analytics/docs.html#!AdobeDocs/analytics-2.0-apis/master/readme.md).

## `/componentmetadata/shares` endpoint description

The `/componentmetadata/shares` endpoint description is shown in our [Swagger UI](https://adobedocs.github.io/analytics-2.0-apis/). Use the Swagger UI to see endpoint summaries, available methods, parameters, example values, models, and status codes, and to try out the API.

## Example creating shares

The following request example includes both a JSON message request body and a `curl` request to share a component with a group.

### JSON Request Message
```json={line-numbers="yes"}
{
  "componentId": "{COMPONENTID}",
  "componentType": "{COMPONENTTYPE}",
  "shareToId": "{groupId}",
  "shareToType": "group"
}
```

#### `curl` Request

```bash
curl -X POST \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/shares \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
  -d '{REQUESTJSON}'
```

### Example Response

```json
{
  "shareId": 12345,
  "componentId": "{COMPONENTID}",
  "componentType": "{COMPONENTTYPE}",
  "shareToId": "{groupId}",
  "shareToType": "group"
}
```

## Example deleting a share

The following request example includes a `curl` request to delete a share.

### `curl` Request

```bash
curl -X DELETE \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/shares/{SHARE_ID} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
```
The above curl command requests the following:
* Delete share with id `SHARE_ID` and its association with other users/groups

### Example Response

```json
{
  "shareId": {SHARE_ID},
  "status": {
    "success": true
  }
}
```

## Example retrieving list of shares for a company

The following request example includes a `curl` request to retrieve shares for current company.

### `curl` Request

```bash
curl -X GET \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/shares?page=0&limit=3 \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
```
The above curl command requests the following:
* Retrieve specific page with query param `page`
* Retrieve specific number of shares in a page with query param `limit`

### Example Response

```json
{
  "content": [
    {
      "shareId": 2085535,
      "shareToId": 622293,
      "shareToType": "user",
      "componentType": "segment",
      "componentId": "s300006186_590cb8b9e4b0ca84fe8152b9",
      "shareToDisplayName": null
    },
    {
      "shareId": 11684455,
      "shareToId": 239343,
      "shareToType": "group",
      "componentType": "segment",
      "componentId": "s300006186_5f4eb5bc3f56a12f743e1405",
      "shareToDisplayName": null
    },
    {
      "shareId": 11684456,
      "shareToId": 622291,
      "shareToType": "user",
      "componentType": "segment",
      "componentId": "s300006186_5f4eb5bb8aca3c5a990878e8",
      "shareToDisplayName": null
    }
  ],
  "totalPages": 38,
  "totalElements": 113,
  "number": 0,
  "numberOfElements": 3,
  "firstPage": true,
  "lastPage": false,
  "sort": null,
  "size": 3
}
```

## Example retrieve shares for multiple components

The following request example includes both a JSON message request body and a `curl` request to retrieve shares for multiple components of the same type.

### JSON Request Message
```json={line-numbers="yes"}
{
  "componentType": "segment",
  "componentIds": [
    "s300006186_5f4eb5bb8aca3c5a990878e8"
  ]
}
```

### `curl` Request

```bash
curl -X POST \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/shares/component/search?page=0&limit=3 \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
  -d '{REQUESTJSON}'
```

The JSON message requests the following:
* Retrieves all shares for component id `s300006186_5f4eb5bb8aca3c5a990878e8` of type `segment`
* Retrieve specific page with query param `page`
* Retrieve specific number of shares in a page with query param `limit`

### Example Response

```json
{
  "content": [
    {
      "componentType": "segment",
      "componentId": "s300006186_5f4eb5bb8aca3c5a990878e8",
      "shares": [
        {
          "shareId": 11684456,
          "shareToId": 622291,
          "shareToType": "user",
          "componentType": "segment",
          "componentId": "s300006186_5f4eb5bb8aca3c5a990878e8",
          "shareToDisplayName": null
        }
      ]
    }
  ],
  "totalPages": 1,
  "totalElements": 1,
  "number": 0,
  "numberOfElements": 1,
  "firstPage": true,
  "lastPage": true,
  "sort": null,
  "size": 10
}
```

## Example retrieving components using shared to the user

The following request example includes a `curl` request to retrieve a components of specific type associated with the user.

#### `curl` Request

```bash
curl -X GET \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/shares/sharedto/me?componentType={COMPONENT_TYPE} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
```

### Example Response

```json
[
  "s300006186_5f4eb5bb8aca3c5a990878e8"
]
```

## Example retrieving shares using id

The following request example includes a `curl` request to retrieve a share with id.

#### `curl` Request

```bash
curl -X GET \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/shares/{SHARE_ID} \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
```

### Example Response

```json
{
  "shareId": 11684455,
  "shareToId": 239343,
  "shareToType": "group",
  "componentType": "segment",
  "componentId": "s300006186_5f4eb5bc3f56a12f743e1405",
  "shareToDisplayName": null
}
```

## Update shares for components

The following request example includes both a JSON message request body and a `curl` request to create and delete multiple shares associated with components.

**Warning, this call is authoritative!  Any shares not included in the request body will be deleted permanently!**

### JSON Request Message
```json={line-numbers="yes"}
[
  {
    "componentType": "segment",
    "componentId": "s300006186_5f4eb5bb8aca3c5a990878e8",
    "shares": [
      {
        "shareId": 11684456,
        "shareToId": 622291,
        "shareToType": "user",
        "componentType": "segment",
        "componentId": "s300006186_5f4eb5bb8aca3c5a990878e8",
        "shareToDisplayName": null
      }
    ]
  }
]
```
The JSON message requests the following:
* create a share to segment `s300006186_5f4eb5bb8aca3c5a990878e8` for user `622291`
* if there are any preexisting shares associated with `s300006186_5f4eb5bb8aca3c5a990878e8` then remove these associations.

#### `curl` Request

```bash
curl -X PUT \
  https://analytics.adobe.io/api/{COMPANYID}/componentmetadata/shares \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer {ACCESSTOKEN}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: {APIKEY}' \
  -H 'x-proxy-global-company-id: {COMPANYID}' \
  -d '{REQUESTJSON}'
```

### Example Response

```json
[
  {
    "componentType": "segment",
    "componentId": "s300006186_5f4eb5bb8aca3c5a990878e8",
    "shares": [
      {
        "shareToId": 622291,
        "shareToType": "user",
        "accessLevel": null
      }
    ],
    "status": {
      "success": true
    }
  }
]
```
