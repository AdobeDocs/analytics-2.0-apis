# JWT Authentication

You can use JSON Web Token (JWT) authentication for situations requiring server-to-server, service-token, or other long-running authentications.

In order to create a JWT integration on the Adobe Developer Console, you need System Admin or [Developer](https://helpx.adobe.com/enterprise/using/manage-developers.html) rights for your organization.

Instructions for creating the JWT client and generating the JWT token can be found in [JWT Authentication Guide](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/JWT/JWT.md).

## Permissions

The amount of access to an integration is governed by the product profiles associated with it. Product profiles have Analytics-specific permissions for managing integration access to reporting features and data.

Product profiles include five configurable permission groups for integration access:

* Report Suites - Include relevant report suites to be used by the integration
* Metrics - Include the metrics to be used by the integration
* Dimensions - Include the dimensions to be used by the integration
* Report Suite Tools - Include relevant report suite tools for automating report suite management
* Analytics Tools - Include relevant tools for automating common analytics-related tasks

*Note: For an integration to function, the Report Suites, Metrics, and Dimensions permission groups, at minimum, need to be configured.*

For more information on creating profiles and managing permissions, see [Manage Products and Profiles](https://helpx.adobe.com/enterprise/using/manage-products-and-profiles.html) and [Manage Permissions and Roles](https://helpx.adobe.com/enterprise/using/manage-permissions-and-roles.html).

## Technical Account User Information

Once your integration is added to a product profile, an Analytics user is created in your Adobe Analytics Login Company. The user has a unique ID for the first name that matches the first part of the email address generated for the technical account. The last name of the user is `techacct.adobe.com`. All API calls through this integration are associated with this technical account user in Analytics. Assets such as Segments and Calculated Metrics created through the API using this integration are owned by this technical account user. To allow other user access to assets created by this API user, use the share feature in Adobe Analytics.

## Example Code

* [Java example](https://github.com/AdobeDocs/analytics-2.0-apis/tree/main/resources/java/) on GitHub
* [Python example](https://github.com/AdobeDocs/analytics-2.0-apis/tree/main/resources/python/) on GitHub
