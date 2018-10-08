## OAuth Authentication using POSTMAN

Create a New Tab and Under the `Authorization` section change the Type to `OAuth 2.0`


![Postman Oauth Step 1](/images/postman-oauth2-step1.png)


Click on `Get New Access Token`


![Postman Oauth Step 2](/images/postman-oauth2-step2.png)


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



![Postman Oauth Step 3](/images/postman-oauth2-step3.png)

Click `Request Token`. You will be prompted to login and then you will get your access token on the next screen


![Postman Oauth Step 4](/images/postman-oauth2-step4.png)

Click on the `Available Tokens` dropdown and select your newly generated access token

![Postman Oauth Step 5](/images/postman-oauth2-step5.png)

* Click the `Headers` tab
* You should see a grayed out header with a key of `Authorization` and a value that starts with `Bearer eyJ4...`
* Add the path to the API you wish to call. In the above example we are calling the /users API. `https://analytics.adobe.io/api/YOUR_GLOBAL_COMPANY_ID_HERE/users?limit=10&page=0` NOTE: You will need to put the global company id of your company in the API path.
* Add another header key called `x-proxy-global-company-id` and enter you global company id as the value
* Add one more header called `x-api-key` and enter your client id as the value
* Click the `Send` button and you should get back an API response with the first 10 users for your Analytics Company


