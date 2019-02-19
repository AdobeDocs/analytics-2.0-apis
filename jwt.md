# JWT Authentication

One advantage of JSON Web Token (JWT) authentication is that you can use it for situations requiring server-to-server, service-token, or other long-running authentications.

In order to create a JWT integration on the Adobe I/O Console, you need to have System Admin or Developer rights for your organization. More information about the developer role and managing developers can be found in [Managing Developers Documentation](https://helpx.adobe.com/enterprise/using/manage-developers.html).

Instructions for creating the JWT client and generating the JWT token can be found in [JWT Authentication Quick Start Guide](https://www.adobe.io/authentication/auth-methods.html#!adobeio/adobeio-documentation/master/auth/JWTAuthenticationQuickStart.md).

**Note:** As part of the process of creating your JWT client, you need to select product profiles to be associated with your integration. Be sure that the product profiles have the correct Adobe Analytics permissions to access the Adobe Analytics APIs.

Once your integration is added to a product profile, an Analytics user is created in your Adobe Analytics Login Company. The user has a unique ID for the first name that matches the first part of the email address generated for the technical account. The last name of the user is `techacct.adobe.com`. All API calls through this integration are associated with this technical account user in Analytics. Assets such as Segments and Calculated Metrics created through the API using this integration are owned by this technical account user. If you desire to allow other users to have access to assets created by this API user, you need to use the share feature in Adobe Analytics.

## Example Code

[Java example](https://github.com/AdobeDocs/analytics-2.0-apis/tree/master/examples/jwt/java)
