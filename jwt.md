# JWT Authentication

In order to create a JWT integration in the Adobe I/O Console, you need to have System Admin or Developer rights for your organization.

Instructions for creating the JWT client and generating the JWT token can be found [here](https://www.adobe.io/authentication/auth-methods.html#!adobeio/adobeio-documentation/master/auth/JWTAuthenticationQuickStart.md)

**Note:** As part of the process of creating your JWT client you will select product profiles to be associated with your integration. You will need to ensure that the product profiles have the correct Adobe Analytics permissions set to be able to access the Adobe Analytics APIs.

Once your integration has been added to a product profile an Analytics user will be created in your Adobe Analytics Login Company. The user will have a unique ID for the first name that will match the first part of the email address generated for the technical account. The last name of the user will be `techacct.adobe.com`. It is important to note that all API calls through this integration will be associated with this technical account user in Analytics. Assets such as Segments and Calculated Metrics created through the API using this integration will be owned by this technical account user. If you desire to allow other users to have access to assets created by this API user you will need to use the share feature in Adobe Analytics.
