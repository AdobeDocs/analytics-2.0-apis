# JWT Authentication

One advantage of JSON Web Token (JWT) authentication is that you can use it for situations requiring server-to-server, service-token, or other long-running authentications.

In order to create a JWT integration on the Adobe I/O Console, you need to have System Admin or Developer rights for your organization. More information about the developer role and managing developers can be found in [Managing Developers Documentation](https://helpx.adobe.com/enterprise/using/manage-developers.html).

Instructions for creating the JWT client and generating the JWT token can be found in [JWT Authentication Guide](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/JWT/JWT.md).

## Permissions

The amount of access to an integration has is governed by the product profiles associated with it. Product profiles have Analytics-specific permissions that can be managed to adjust the integration access to reporting features and data.

Product profiles have five permission groups for configuring granular access for the integration:
* Report Suites - Include relevant report suites that will be used by the integration
* Metrics - Include the metrics that the integration will be using
* Dimensions - Include the dimensions that the integration will be using
* Report Suite Tools - Include relevant report suite tools for automating report suite management
* Analytics Tools - Include relevant tools for automating common analytics-related tasks

> At a bare minimum, the Report Suites, Metrics, and Dimensions permission groups need to be configured for an integration to function.

More information on creating profiles and managing permissions can be found in [Manage Products and Profiles](https://helpx.adobe.com/enterprise/using/manage-products-and-profiles.html) and [Manage Permissions and Roles](https://helpx.adobe.com/enterprise/using/manage-permissions-and-roles.html).

## Technical Account User Information

Once your integration is added to a product profile, an Analytics user is created in your Adobe Analytics Login Company. The user has a unique ID for the first name that matches the first part of the email address generated for the technical account. The last name of the user is `techacct.adobe.com`. All API calls through this integration are associated with this technical account user in Analytics. Assets such as Segments and Calculated Metrics created through the API using this integration are owned by this technical account user. If you desire to allow other users to have access to assets created by this API user, you need to use the share feature in Adobe Analytics.

## Example Code

[Java example](https://github.com/AdobeDocs/analytics-2.0-apis/tree/master/examples/jwt/java)
