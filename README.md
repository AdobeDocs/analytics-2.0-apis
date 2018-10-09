# Analytics 2.0 APIs
Documentation for the analytics 2.0 APIs

This documentation provides instructions for Adobe Analytics 2.0 APIs. For working with Analytics 1.4 APIs, see [Analytics 1.4 API Documentation](https://github.com/AdobeDocs/analytics-1.4-apis).

The Adobe Analytics APIs are a collection of APIs that power Adobe Analytics products like Analysis Workspace. The APIs allow for the creation of data rich user interfaces that you can use to manipulate and integrate data. You can also create reports to explore, get insights, or answer important questions about your data.  


_CONTRIBUTING: We encourage you to participate in our open documentation initiative, if you have suggestions, corrections, additions or deletions for this documentation, check out the source from [this github repo](https://github.com/AdobeDocs/analytics-2.0-apis), and submit a pull request with your contribution. For more information, refer to the [Contributing](https://github.com/AdobeDocs/analytics-2.0-apis/blob/master/CONTRIBUTING.md) page._

<<<<<<< HEAD
It is assumed that you have an understanding of the Adobe Analytics product, its features and capabilities and that you know how to use the product. Thus an introduction to Adobe Analytics is outside of the scope of this documentation. For more information about the Adobe Analytics product, refer to the [Adobe Analytics documentation](https://marketing.adobe.com/resources/help/en_US/analytics/getting-started/).

This documentation includes the following sections:

1. [Getting Started](#getstart)

1. [Swagger Endpoint Descriptions](#endpoints)

1. [Reporting API Guide](#reporting)

1. [Segments API Guide](#segments)

1. [Using Calculated Metrics](#calcmet)

1. [Creating Virtual Report Suites](#virtual)

1. [Migrating from 1.3/1.4 APIs to 2.0 APIs](#migration)


## <a name="getstart">Getting Started</a>
To get started with Analytics 2.0 APIs:

1. Create an [OAuth client on the Adobe I/O Console](create-oauth-client.md).

2. Use [cURL for OAuth authentication](oauth-curl.md).

OR

2. Use [Postman for OAuth authentication](oauth-postman.md).


## <a name="endpoints">Swagger Endpoint Descriptions</a>
The Analytics 2.0 API endpoints and methods are described on our [Swagger UI](https://adobedocs.github.io/analytics-2.0-apis/). It currently only supports Adobe ID authentication.

## <a name="reporting">Reporting API Guide</a>
The [Reporting API Guide](reporting-guide.md) provides configuration guidance and best practices for the ```/reports``` endpoint.

## <a name="segments">Segments API Guide</a>
The [Segments API Guide](https://github.com/AdobeDocs/analytics-2.0-apis/blob/master/reporting-guide.md) provides configuration guidance and best practices for the ```/segments``` endpoint.


## <a name="calcmet">Using Calculated Metrics</a>
The following examples show how to retrieve calculated metrics information:

## <a name="virtual">Using Calculated Metrics</a>
The following example shows an example request body to create a virtual report suite:


## <a name="getstart">Migrating from 1.4 APIs to 2.0 APIs</a>
For help migrating from the 1.3/1.4 versions of the Analytics API to the newer and more capable ```/reports``` API, refer to the [migration guide](migration-guide.md).
=======
We recommend using our [Swagger UI](https://adobedocs.github.io/analytics-2.0-apis/) to learn how to use the APIs.

* Getting Started
  * [Creating an OAuth Client](create-oauth-client.md)
  * [OAuth using cURL](oauth-curl.md) - Example OAuth authentication flow using cURL commands
  * [OAuth using POSTMAN](oauth-postman.md)
  * JWT Authentication is coming soon
* [Reporting API Guide](reporting-guide.md)
* [Migration Guide](migration-guide.md) - Help for users migrating from the 1.3/1.4 APIs
* [Calculated Metrics](calculatedmetrics.md)
* [Virtual Report Suites](virtualreportsuites.md)
>>>>>>> upstream/master
