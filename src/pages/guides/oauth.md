# OAuth Authentication

You can use OAuth authentication for situations requiring either user or server-to-server API authentication.

In order to create an integration on the Adobe Developer Console, you need System Admin or [Developer](https://helpx.adobe.com/enterprise/using/manage-developers.html) rights for your organization.

Instructions for using OAuth authentication and [refreshing access tokens](https://developer.adobe.com/developer-console/docs/guides/authentication/UserAuthentication/IMS/#refreshing-access-tokens) can be found in the [Authentication Guide](https://developer.adobe.com/developer-console/docs/guides/authentication/).

JWT authentication is deprecated and will only be supported until January 1, 2025. Current integrations using JWT will need to [migrate](https://developer.adobe.com/developer-console/docs/guides/authentication/ServerToServerAuthentication/migration/) to OAuth Server to Server prior to January 1, 2025.

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
