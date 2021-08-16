---
title: Use cURL with the Analytics 2.0 API
description: Send API calls to Adobe using a Client URL.
---

# Use cURL with the Analytics 2.0 API

To obtain Oauth authentication using cURL:

1. Get an auth code.
1. Generate an access token.
1. Test your access token.

## Get an auth code

Use the following model as a cURL request for an auth code: 

`https://ims-na1.adobelogin.com/ims/authorize?client_id={CLIENT ID}&redirect_uri={REDIRECT URI}&scope=openid,AdobeID,read_organizations,additional_info.job_function,additional_info.projectedProductContext&response_type=code`

To get an auth code:

1. Copy the Client ID from your OAuth client and paste it into the `{CLIENT ID}` placeholder in the URI above.
1. Replace `{REDIRECT URI}` with the redirect URI you specified when creating the client.
1. Paste the complete URI into your favorite browser.
1. After authenticating via IMS, copy the auth code query parameter in the URI (the parameter begins with `code=eyJ4...`).


## Generate an access token

Use the following model to generate an access token: 

```sh
curl --data "grant_type=authorization_code&client_id={CLIENT ID}&client_secret={CLIENT SECRET}&code={AUTH CODE QUERY PARAMETER}" https://ims-na1.adobelogin.com/ims/token/v1
```

To generate an access token:

1. Replace `{AUTH CODE QUERY PARAMETER}` with the auth code you copied from the previous step in the above cURL request.
1. Replace `{CLIENT ID}` in the above request with the Client ID from your Oauth client.
1. Replace `{CLIENT SECRET}` in the above request with the Client Secret from your Oauth client.
1. Run the cURL command. The response includes an `access_token` attribute, as shown below:

   ```json
   {
     "account_type": "type1",
     "utcOffset": "null",
     "preferred_languages": [
       "en-us"
     ],
     "projectedProductContext": [
       {
         "prodCtx": {
           "serviceCode": "dma_analytics",
           "global_company_id": "testco0",
           "login_company": "Test Company",
           ...
         }
       },
       ...
     ],
     "displayName": "James Ross",
     "last_name": "Ross",
     "token_type": "bearer",
     "userId": "JAMESROSS@AdobeID",
     "access_token": "eyJ4...TOKEN_OMITTED",
     "refresh_token": "eyJ4...TOKEN_OMITTED",
     "emailVerified": "true",
     "phoneNumber": null,
     "countryCode": "US",
     "name": "Bob Ross",
     "mrktPerm": "EMAIL:false",
     "mrktPermEmail": "false",
     "expires_in": 86399988,
     "first_name": "James",
     "email": "test@adobe.com",
     ...
   }
   ```

   *Note: If you have access to numerous product profiles, the response can be very large. If it is so large that the `access_token` is truncated from the response, you can write it to a file in order to find your access token. To write the response to a file, add ` >> output.json` to the end of your cURL request. The response is then written to a file named `output.json`.*

1. Copy the access token to test it in the following section.


## Test your access token by calling the Analytics APIs

To test your access token:

```sh
curl -X GET --header "Accept: application/json" --header "x-api-key: {CLIENT ID}" --header "Authorization: Bearer {ACCESS_TOKEN}" "https://analytics.adobe.io/discovery/me"
```

1. Replace `{ACCESS_TOKEN}` with the access token you copied from the previous step into the above cURL request.
1. Replace `{CLIENT ID}` in the above request with the client ID from your Oauth client.
1. Run the cURL command. The following JSON shows an example response:

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

1. Use the `globalCompanyId` value in your response (in the above example, it is shown as `testco0`) to test the `GET /users/me` endpoint. To do this, replace the `{GLOBAL COMPANY ID}` parameters in the following request with their corresponding values. Note that `{GLOBAL COMPANY ID}` occurs twice in the following request, once in the `x-proxy-company-global-company-id` header and another in the path:

   ```sh
   curl -X GET  --header "Authorization: Bearer {ACCESS_TOKEN}" --header "x-proxy-global-company-id: {COMPANY_ID}" --header "x-api-key: {CLIENT_ID}" "https://analytics.adobe.io/api/{COMPANY_ID}/users/me"
   ```

1. Replace `{ACCESS_TOKEN}` and `{CLIENT_ID}` in the above request with their respective values.
1. Run the cURL command. The response includes information about the analytics user.

Use your `access token`, `global company id` and `client ID` to make calls to the APIs. You can use the [API reference](../api.md) as an easy way to explore calling the Analytics APIs.
