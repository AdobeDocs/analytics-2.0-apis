## OAuth Authentication using OAuth 2.0 Playground


Open your console integration and add `https://runtime\\.adobe\\.io` as the Redirect URI pattern and click on `Update`.


![Playground Oauth Step 1](/images/playground-oauth2-step1.png)


Open [OAuth 2.0 Playground](https://adobeioruntime.net/api/v1/web/io-solutions/adobe-oauth-playground/oauth.html) in browser.


Copy `API Key (Client ID)` and `Client secret` from Adobe I/O Console integration to OAuth 2.0 Playground.


Enter `openid,AdobeID,read_organizations,additional_info.projectedProductContext,additional_info.job_function` in Scopes.


![Playground Oauth Step 2](/images/playground-oauth2-step2.png)


Click on `Generate Tokens`.


Enter your Adobe ID credential to login.

![Playground Oauth Step 3](/images/playground-oauth2-step3.png)


Your `access token` is generated and ready to use.

![Playground Oauth Step 4](/images/playground-oauth2-step4.png)





