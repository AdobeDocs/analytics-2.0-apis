# Discovery API

The `discovery/me` API is a simple API that returns information necessary to make other Adobe Analytics API calls. This API returns information about the end user that is making the API call by inspecting the `Access Token` that is sent in for authentication. 

## Example Request

```bash
curl -X GET --header "Accept: application/json" --header "x-api-key: {CLIENT_ID}" --header "Authorization: Bearer {ACCESS_TOKEN}" "https://analytics.adobe.io/discovery/me"
```

In order to call the `discovery/me` API you will need to provide your `Client ID` and an `Access Token`. If you aren't sure how to do this see the [Getting Started](https://github.com/AdobeDocs/analytics-2.0-apis#getting-started) section.

## Example Response

Once you successfully call the `discovery/me` API you will get a response like the following:

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
    },
    ...
  ]
}
```

| Attribute | Description |
|---|-----|
| imsUserId | The unique identifier for a user in the Adobe IMS system |
| imsOrgs | List of the IMS Organization for which the user has access |
| imsOrgId | The unique identifier for an IMS Organization |
| companies | List of companies for which the user has access within an IMS Organization |
| globalCompanyId | The globally unique identifier for an Analytics Company. This is needed as a path parameter to make API calls to the Adobe Analytics APIs. |
| companyName | The friendly name of the Analytics Company |
| apiRateLimitPolicy | The API rate limiting policy setting for the given Analytics Company. More information about rate limiting can be found [here](https://github.com/AdobeDocs/analytics-2.0-apis#rate-limiting). |
