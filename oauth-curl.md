## OAuth Authentication using cURL

### Get an auth code

```
https://ims-na1.adobelogin.com/ims/authorize?client_id=INSERT_CLIENT_ID_HERE&redirect_uri=INSERT_REDIRECT_URI_HERE&scope=openid,AdobeID,read_organizations,additional_info.job_function,additional_info.projectedProductContext&response_type=code
```

* Copy the `Client ID` from your OAuth client and replace `INSERT_CLIENT_ID_HERE` in the above URI with it
* Replace `INSERT_REDIRECT_URI_HERE` with your redirect URI you setup when creating the client
* Paste this URL into your favorite browser
* After authenticating via IMS there will be a code query parameter in the URI. (code=eyJ4...)
* Copy this code to your clip-board


### Generate an access token


```bash
curl  --data "grant_type=authorization_code&client_id=INSERT_CLIENT_ID_HERE&client_secret=INSERT_CLIENT_SECRET_HERE&code=INSERT_CODE_HERE" https://ims-na1.adobelogin.com/ims/token/v1
```

* Replace `INSERT_CODE_HERE` with the code you copied from the previous step in the above curl request
* Copy client id from newly created OAuth client and replace `INSERT_CLIENT_ID_HERE` in the curl request
* Copy client secret from newly created OAuth client and replace `INSERT_CLIENT_SECRET_HERE` in the curl request
* Run the curl command
* You will get a response with an `access_token` attribute in the response. Example response below:

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
  "displayName": "Bob Ross",
  "last_name": "Ross",
  "token_type": "bearer",
  "userId": "BOBROSS@AdobeID",
  "access_token": "eyJ4...TOKEN_OMITTED",
  "refresh_token": "eyJ4...TOKEN_OMITTED",
  "emailVerified": "true",
  "phoneNumber": null,
  "countryCode": "US",
  "name": "Bob Ross",
  "mrktPerm": "EMAIL:false",
  "mrktPermEmail": "false",
  "expires_in": 86399988,
  "first_name": "Bob",
  "email": "test@adobe.com",
  ...
}
```

**NOTE:** If you have access to a lot of Product Profiles the response when getting an access token can be very large. If the response is too large so that the `access_token` gets truncated in the response you can write the response to a file in order to get your access token. To write the response to a file you just need to add ` >> output.json` to the end of your cURL request and the response will be written to a file named `output.json`.


* Copy the access token to your clip-board


### Test your access token by calling the Analytics APIs


```bash
curl -X GET --header "Accept: application/json" --header "x-api-key: INSERT_CLIENT_ID_HERE" --header "Authorization: Bearer INSERT_ACCESS_TOKEN_HERE" "https://analytics.adobe.io/discovery/me"
```

* Replace `INSERT_ACCESS_TOKEN_HERE` with the access token you copied from the previous step into the above curl request
* Replace `INSERT_CLIENT_ID_HERE` with your client ID
* Run the curl command
* You should get back a response similar to the following:

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

* Locate the Company you would like to use to call the Analytics APIs


```bash
curl -X GET  --header "Authorization: Bearer INSERT_ACCESS_TOKEN_HERE" --header "x-proxy-global-company-id: INSERT_GLOBAL_COMPANY_ID_HERE" --header "x-api-key: INSERT_CLIENT_ID_HERE" "https://analytics.adobe.io/api/INSERT_GLOBAL_COMPANY_ID_HERE/users/me"
```

* Copy the `globalCompanyId` for the Company you would like to use and replace `INSERT_GLOBAL_COMPANY_ID_HERE` in the above curl request (NOTE: `INSERT_GLOBAL_COMPANY_ID_HERE` is included in two places in the request. #1 - In the `x-proxy-company-global-company-id` header and #2 - In the path)
* Replace `INSERT_ACCESS_TOKEN_HERE` with the access token you used in the previous request
* Replace `INSERT_CLIENT_ID_HERE` with your client ID
* Run the curl command
* You should get a response with information about your analytics user


Now you can use your `access token`, `global company id` and `client ID` to make calls to the APIs. The following Swagger UI provides an easy way to explore calling the various Analytics APIs: https://adobedocs.github.io/analytics-2.0-apis/


