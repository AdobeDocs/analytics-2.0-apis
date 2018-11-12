# OAuth in POSTMAN

## What's Needed

For OAuth authentication in Postman, you will need the following:

* The **Client ID**, **Client Secret**, and **Default Redirect URI** from your [integration on the Adobe I/O console](create-oauth-client.md).
* Your **Global Company ID**. If you do not know your Global Company ID, you can find it in the request URL for the `users/me` endpoint on the Swagger UI. After logging into the [Swagger UI](https://adobedocs.github.io/analytics-2.0-apis), expand the `users` endpoint and then click the **GET users/me** button. Click the **Try it out** and **Execute** buttons. Note your Global Company ID shown in the Request URL immediately preceding the `users/me` endpoint.


![note company id](/images/note company id.png)


## Configure the Request

To configure the OAuth authentication request:

1.  Click the **Authorization** tab on the Request screen.
2.  In the **TYPE** dropdown, select **OAuth 2.0**.
3.  Click the **Get New Access Token** button.

![configure Postman request 1](/images/configure Postman request 1.png)

4.  On the **GET NEW ACCESS TOKEN** form, provide the following values:

| Parameter                 | Value                                                                                                          |
| ------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Token Name            | Specify a name                                                                                                 |
| Grant Type            | Select **Authorization Code** from the dropdown                                                                               |
| Callback URL          | Enter your OAuth client default redirect URI                                                                   |
| Auth URL              | <https://ims-na1.adobelogin.com/ims/authorize/v1>                                                              |
| Access Token URL      | <https://ims-na1.adobelogin.com/ims/token/v1>                                                                  |
| Client ID             | Enter your Client ID from Adobe I/O                                                                                          |
| Client Secret         | Enter your Client Secret from Adobe I/O                                                                                        |
| Scope                 | Enter `openid AdobeID read_organizations additional_info.projectedProductContext additional_info.job_function` |
| Client Authentication | Select **Send client credentials in body** from the dropdown                                                                     |

![Postman Oauth Step 3](/images/postman-oauth2-step3.png)

5.  Click **Request Token**. You will be prompted to login. Click the **Use Token** button at the bottom of the resulting pop up screen. The token automatically populates the **Available Token** field.

6. Enter the request URI path you want to call, including your Global Company ID as shown below, and then click the **Preview Request** button. This updates the request header with the token value.

 ![Postman Oauth Step 4](/images/postman-oauth2-step4.png)

[!NOTE] If you have already requested other tokens in Postman, you can select them from the **Available Tokens** dropdown.

7. Specify the method from the Postman request dropdown. Click the **Headers** tab. In the Postman Headers table, the **Authorization** KEY contains a corresponding **Bearer** token VALUE.

8. On the next row, add the header KEY `x-proxy-global-company-id` and enter you Global Company ID as the VALUE.

9. On the next row, add the header KEY `x-api-key` and enter your Client ID as the VALUE.

  ![Postman Oauth Step 5](/images/postman-oauth2-step5.png)

10. Click the **Send** button. The response includes the first 10 users for your Analytics Company
