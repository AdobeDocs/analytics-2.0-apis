# Analytics 2.0 APIs
Documentation for the analytics 2.0 APIs

This documentation provides instructions for Adobe Analytics 2.0 APIs. For working with Analytics 1.4 APIs, see [Analytics 1.4 API Documentation](https://github.com/AdobeDocs/analytics-1.4-apis).

The Adobe Analytics APIs are a collection of APIs that power Adobe Analytics products like Analysis Workspace. The APIs allow for the creation of data rich user interfaces that you can use to manipulate and integrate data. You can also create reports to explore, get insights, or answer important questions about your data.  


_CONTRIBUTING: We encourage you to participate in our open documentation initiative, if you have suggestions, corrections, additions or deletions for this documentation, check out the source from [this github repo](https://github.com/AdobeDocs/analytics-2.0-apis), and submit a pull request with your contribution. For more information, refer to the [Contributing](https://github.com/AdobeDocs/analytics-2.0-apis/blob/master/CONTRIBUTING.md) page._

It is assumed that you have an understanding of the Adobe Analytics product, its features and capabilities and that you know how to use the product. Thus an introduction to Adobe Analytics is outside of the scope of this documentation. For more information about the Adobe Analytics product, refer to the [Adobe Analytics documentation](https://marketing.adobe.com/resources/help/en_US/analytics/getting-started/).


## Getting Started
To get started with Analytics 2.0 APIs you must first decide whether your application will need an OAuth client or a JWT client.

### Authentication 
There multiple types of authentication for authenticating with the analytics APIs. General information about authenticating with Adobe's APIs is located [here](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/AuthenticationOverview/AuthenticationGuide.md). Specific information related to authenticating with the analytics APIs is available in the sections below.

#### OAuth

Use an OAuth client if you are creating an application that requires an end user to authenticate before calling the Adobe Analytics APIs. The OAuth tokens expire after 24 hours and the end user must then re-authenticate before they will be able to call the APIs. To authenticate with an OAuth client, you first create an [OAuth client on the Adobe I/O Console](create-oauth-client.md). You can then use either method below with your client:

* Use [cURL for OAuth authentication](oauth-curl.md).

* Use [Postman for OAuth authentication](oauth-postman.md).

**Note:** Refresh tokens are not supported with OAuth for the Adobe Analytics APIs

#### JWT

A JWT client is best if you are creating an application that needs to programmatically authenticate calls to the Adobe Analytics APIs. A new JWT token can be generated whenever the old one is about to expire so your application can continue to make API calls. 

For more information see [JWT authentication](jwt.md).

## Try Now
Try the Analytics 2.0 API in seconds. Use our [Swagger UI](https://adobedocs.github.io/analytics-2.0-apis/) to explore APIs, make calls and get a response. Our Swagger UI also includes the full endpoint descriptions. 

## Discovery API
The [Discovery API](discovery.md) returns information necessary to make other Adobe Analytics API calls.

## Reporting API Guide
The [Reporting API Guide](reporting-guide.md) provides configuration guidance and best practices for the ```/reports``` endpoint.
Please also refer to the [Reporting Tricks Guide](reporting-tricks.md) to learn how to use analysis workspace to build and validate your API requests.

## Segments API Guide
The [Segments API Guide](segments-guide.md) provides configuration guidance and best practices for the ```/segments``` endpoint.

## Migrating from 1.4 APIs to 2.0 APIs
For help migrating from the 1.3/1.4 versions of the Analytics API to the newer and more capable ```/reports``` API, refer to the [migration guide](migration-guide.md).

## API Request Timeouts
The timeout for API requests through adobe.io is currently **60 seconds**.

## Rate Limiting
The default rate limit for an Adobe Analytics Company is **120 requests per minute**. (The limit is enforced as **12 requests every 6 seconds**). When rate limiting is being enforced you will get `429` HTTP response codes with the following response body: ```{"error_code":"429050","message":"Too many requests"}```
