---
title: Discovery API
description: Retrieve information about your user profile and company for use in other API calls.
---

# Discovery API

The `discovery/me` API returns information on the user's company that is necessary for making other Adobe Analytics API calls. It returns information on who is making the call by inspecting the `Access Token` that is sent for authentication. 

For example, if you have multiple logins for various companies, you can use this API to return a list of the companies associated your Client ID. From the list you can then choose which company to call with other APIs.

`GET https://analytics.adobe.io/discovery/me`

## Example cURL Request

The following example requests the user's information for company logins:

```sh
curl -X GET --header "x-api-key: {CLIENT_ID}" --header "Authorization: Bearer {ACCESS_TOKEN}" "https://analytics.adobe.io/discovery/me"
```

## Example Response

The following example shows the response to the previous request by returning values for two companies: one with `globalCompanyId` value of `testco0` and another with `anothe0`:

```json
{
  "imsUserId": "1B..OMITTED..01@AdobeID",
  "imsOrgs": [
    {
      "imsOrgId": "EA..OMITTED..29@AdobeOrg",
      "companies": [
        {
          "globalCompanyId": "testco0",
          "companyName": "Test Company",
          "apiRateLimitPolicy": "aa_api_tier10_tp"
        },
        {
          "globalCompanyId": "anothe0",
          "companyName": "Another Test Company",
          "apiRateLimitPolicy": "aa_api_tier10_tp"
        }
      ]
    }
  ]
}
```

## Discovery Attributes

The following table provides descriptions for attributes commonly used with the `discovery/me` API:

| Attribute | Description |
|---|-----|
| `imsUserId` | The unique identifier for a user in the Adobe IMS system |
| `imsOrgs` | List of the IMS Organization for which the user has access |
| `imsOrgId` | The unique identifier for an IMS Organization |
| `companies` | List of companies for which the user has access within an IMS Organization |
| `globalCompanyId` | The globally unique identifier for an Analytics Company. This is needed as a path parameter to make API calls to the Adobe Analytics APIs. |
| `companyName` | The friendly name of the Analytics Company |
| `apiRateLimitPolicy` | The API rate limiting policy setting for the given Analytics Company. |
