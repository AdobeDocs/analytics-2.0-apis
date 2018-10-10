# Analytics 2.0 APIs
Documentation for the analytics 2.0 APIs

This documentation provides instructions for Adobe Analytics 2.0 APIs. For working with Analytics 1.4 APIs, see [Analytics 1.4 API Documentation](https://github.com/AdobeDocs/analytics-1.4-apis).

The Adobe Analytics APIs are a collection of APIs that power Adobe Analytics products like Analysis Workspace. The APIs allow for the creation of data rich user interfaces that you can use to manipulate and integrate data. You can also create reports to explore, get insights, or answer important questions about your data.  


_CONTRIBUTING: We encourage you to participate in our open documentation initiative, if you have suggestions, corrections, additions or deletions for this documentation, check out the source from [this github repo](https://github.com/AdobeDocs/analytics-2.0-apis), and submit a pull request with your contribution. For more information, refer to the [Contributing](https://github.com/AdobeDocs/analytics-2.0-apis/blob/master/CONTRIBUTING.md) page._

It is assumed that you have an understanding of the Adobe Analytics product, its features and capabilities and that you know how to use the product. Thus an introduction to Adobe Analytics is outside of the scope of this documentation. For more information about the Adobe Analytics product, refer to the [Adobe Analytics documentation](https://marketing.adobe.com/resources/help/en_US/analytics/getting-started/).

This documentation includes the following sections:

* [Getting Started](#getstart)

* [Swagger Endpoint Descriptions](#endpoints)

* [Reporting API Guide](#reporting)

* [Segments API Guide](#segments)

* [Using Calculated Metrics](#calcmet)

* [Creating Virtual Report Suites](#virtual)

* [Migrating from 1.3/1.4 APIs to 2.0 APIs](#migration)


## <a name="getstart">Getting Started</a>
To get started with Analytics 2.0 APIs:

* Create an [OAuth client on the Adobe I/O Console](create-oauth-client.md).

* Use [cURL for OAuth authentication](oauth-curl.md).

* Use [Postman for OAuth authentication](oauth-postman.md).

_Note: JWT Authentication is coming soon._

## <a name="endpoints">Swagger Endpoint Descriptions</a>
The Analytics 2.0 API endpoints and methods are described on our [Swagger UI](https://adobedocs.github.io/analytics-2.0-apis/). It currently only supports Adobe ID authentication.

## <a name="reporting">Reporting API Guide</a>
The [Reporting API Guide](reporting-guide.md) provides configuration guidance and best practices for the ```/reports``` endpoint.

## <a name="segments">Segments API Guide</a>
The [Segments API Guide](https://github.com/AdobeDocs/analytics-2.0-apis/blob/master/segments.md) provides configuration guidance and best practices for the ```/segments``` endpoint.

## <a name="virtual">Create a Virtual Report Suite</a>
View examples of requests to [create report suites](virtualreportsuites.md).

## <a name="getstart">Migrating from 1.4 APIs to 2.0 APIs</a>
For help migrating from the 1.3/1.4 versions of the Analytics API to the newer and more capable ```/reports``` API, refer to the [migration guide](migration-guide.md).
