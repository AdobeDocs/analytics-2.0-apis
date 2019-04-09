## Creating an OAuth Client

To work with Analytics 2.0 APIs on the Adobe I/O Console, you need to have System Admin rights or [developer permissions](https://helpx.adobe.com/enterprise/using/manage-developers.html) for your organization. You will receive notification of these rights when granted.

To create an OAuth client:

1. Navigate to the following URL: https://console.adobe.io/integrations.

2. Click the `New Integration` button.

3. Select the `Access an API` option and then click `Continue`.

4. Under the Experience Cloud section select `Adobe Analytics` and then select `OAuth integration` and then click `Continue`.

5. Select `New integration` and then click `Continue`.

6. Fill out the name, description, redirect URIs and then click `Create Integration`.


*The **Default redirect URI** is the location that Adobe I/O redirects after successful login and authorization. Use only HTTPS-based locations*

*The **Redirect URI pattern** is a list of URIs that specify the location that Adobe I/O redirects after successful login and authorization. This field should contain, at the least, the URI specified in the previous **Default redirect URI**. Use only HTTPS-based location.*

Your client is now created. Notice your client has an `Client ID (API Key)` and a `Client Secret`. These will be needed to get your auth code and to generate access tokens.

