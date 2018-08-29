## OAuth Authentication using POSTMAN

Create a New Tab and Under the `Authorization` section change the Type to `OAuth 2.0`


![](https://github.com/AdobeDocs/analytics-2.0-apis/blob/master/images/postman-oauth2-step1.png)


Click on `Get New Access Token`


![](https://github.com/AdobeDocs/analytics-2.0-apis/blob/master/images/postman-oauth2-step2.png)


Enter the following on the GET NEW ACCESS TOKEN screen:

|Parameter|Value|
|---|---|
|Token Name|Enter any name you would like|
|Grant Type|Authorization Code|
|Callback URL|Your OAuth client redirect URL|
|Auth URL|https://ims-na1.adobelogin.com/ims/authorize/v1|
|Access Token URL|https://ims-na1.adobelogin.com/ims/token/v1|
|Client ID|Enter your client id here|
|Client Secret|Enter your client secret here|
|Scope|openid AdobeID read_organizations additional_info.projectedProductContext additional_info.job_function|
|State|Can be left empty|
|Client Authentication|Send client credentials in body|



![](https://github.com/AdobeDocs/analytics-2.0-apis/blob/master/images/postman-oauth2-step3.png)

Click `Request Token`. You will be prompted to login and then you will get your access token on the next screen
