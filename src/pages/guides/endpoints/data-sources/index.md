---
title: Data Sources API
description: Use Analytics Data Sources APIs to upload data and manage accounts.
---

# Data Sources API

The Analytics 2.0 Data Sources API endpoints provide methods for you to create, view, delete, and upload to Data Sources accounts. See the [Data Sources overview](https://experienceleague.adobe.com/en/docs/analytics/import/data-sources/overview) for more information regarding Data Sources services and functions.

The endpoints described in this guide are routed through `analytics.adobe.io`. To use them, you must first create a client with access to the Adobe Developer Console. For more information, see [Getting started with the Analytics API](https://developer.adobe.com/analytics-apis/docs/2.0/guides/) for more information.

**Data Sources Accounts**

These endpoints provide methods for viewing, creating, and deleting Data Sources accounts:

* [GET all accounts](#get-all-accounts): Retrieves all Data Sources accounts for a given rsid
* [GET a single account](#get-a-single-account): Retrieves a single Data Sources account by ID
* [POST an account](#post-an-account): Create a Data Sources account
* [DELETE account](#delete-account): Deletes a Data Sources account

**Data Sources Jobs**

Use Data Sources Jobs endpoints to upload and view data to a Data Sources account:

* [POST data](#post-data): Uploads a file to a Data Sources account
* [GET all jobs](#get-all-jobs): Retrieves all jobs associated with a Data Sources account
* [GET a single job](#get-a-single-job): Retrieves a single job by ID

<InlineAlert variant="info" slots="text" />

Adobe may add optional request and response members (name/value pairs) to existing API objects at any time and without notice or changes in versioning. Adobe recommends that you refer to the API documentation of any third-party tool you integrate with our APIs so that such additions are ignored in processing if not understood. If implemented properly, such additions are non-breaking changes for your implementation. Adobe will not remove parameters or add required parameters without first providing standard notification through release notes.

## GET all accounts

Use this endpoint to list all Data Sources accounts for a given report suite ID. For more information regarding Data Sources accounts, see the [Getting started with data sources](https://experienceleague.adobe.com/en/docs/analytics/import/data-sources/getting-started) guide.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/datasources/account/{REPORT_SUITE_ID}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/datasources/account/examplersid" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" 
```

#### Response

```json
[
  {
    "name": "Example Location 1",
    "email": "john@example.com",
    "data_source_id": 2,
    "type": "generic",
    "date_created": "YYYY-03-19",
    "ftp_hostname": "ftp4.omniture.com",
    "ftp_username": "examplersid_4685934",
    "ftp_password": "example_password"
  },
  {
    "name": "Example Location 2",
    "email": "john@example.com",
    "data_source_id": 308,
    "type": "generic",
    "date_created": "YYYY-08-08",
    "ftp_hostname": "ftp4.omniture.com",
    "ftp_username": "examplersid_4217476",
    "ftp_password": "example_password"
  },
  {
    "name": "Example Location 3",
    "email": "john@example.com",
    "data_source_id": 404,
    "type": "generic",
    "date_created": "YYYY-04-16",
    "ftp_hostname": "ftp4.omniture.com",
    "ftp_username": "examplersid_01883528",
    "ftp_password": "example_password"
  },
  {
    "name": "Example Location 4",
    "email": "john@example.com",
    "data_source_id": 405,
    "type": "generic",
    "date_created": "YYYY-04-23",
    "ftp_hostname": "ftp4.omniture.com",
    "ftp_username": "examplersid_211487109",
    "ftp_password": "example_password"
  }
]
```

#### Request example details

The example above requests all Data Sources accounts for the `examplersid` report suite ID.

#### Response example details

The example above lists four Data Sources accounts with the following details:

* In this case, each account name represents a data source location.
* A `data_source_id` is provided for working with specific accounts.
* An email contact for the account.
* A date for the account creation.
* Each account has an `ftp_username` and `ftp_password` for use in the [Data Sources manager](https://experienceleague.adobe.com/en/docs/analytics/import/data-sources/manage). By default, FTP accounts are created with each Data Sources account.

### Request Parameters

The GET all accounts endpoint includes the following request parameter:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `rsid` | required | string | The report suite ID to retrieve Data Sources accounts for |

### Response Parameters

The following table describes the GET all accounts response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `name` | string | The name of the Data Sources account |
| `email` | string | The email address to receive notifications regarding this Data Sources account |
| `data_source_id` | integer | The ID of the data source |
| `type` | string | The type of data associated with the account |
| `ftp_hostname` | string | The FTP host address |
| `ftp_username` | string | The FTP username |
| `ftp_password` | string | The FTP password |

## GET a single account

Use this endpoint to retrieve information about a single Data Sources account. For more information regarding Data Sources accounts, see the [Getting started with data sources](https://experienceleague.adobe.com/en/docs/analytics/import/data-sources/getting-started) guide.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/datasources/account/{REPORT_SUITE_ID}/{DATA_SOURCE_ID}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_sources/account/examplersid/621" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" 
```

#### Response

```json
{
  "name": "Example Location 2",
  "email": "john@example.com",
  "data_source_id": 621,
  "type": "generic",
  "date_created": "YYYY-08-08",
  "ftp_hostname": "ftp4.omniture.com",
  "ftp_username": "examplersid_4217476",
  "ftp_password": "example_password"
}
```

#### Request example details

The example above requests the Data Sources account associated with the ID `621`.

#### Response example details

The example above returns the account `621` with the following details:

* The account is named `Example Location 2`.
* The `data_source_id` is `621`.
* The FTP account information associated with this Data Sources account. For more information see the [Data Sources manager](https://experienceleague.adobe.com/en/docs/analytics/import/data-sources/manage).

### Request Parameters

The following table describes the GET a single Data Sources account request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `rsid` | required | string | The report suite ID associated with the Data Sources account |
| `data_source_id` | required | string | The Data Source ID of the account to retrieve |

### Response Parameters

The following table describes the GET a single Data Sources account response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `name` | string | The name of the Data Sources account |
| `email` | string | The email address to receive notifications regarding this Data Sources account |
| `data_source_id` | integer | The data source ID |
| `type` | string | The type of data associated with the account |
| `ftp_hostname` | string | The FTP host address |
| `ftp_username` | string | The FTP username |
| `ftp_password` | string | The FTP password |

## POST an account

Use this endpoint to create a Data Sources account. For more information regarding Data Sources accounts, see the [Getting started with data sources](https://experienceleague.adobe.com/en/docs/analytics/import/data-sources/getting-started) guide.

`POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/datasources/account/{REPORT_SUITE_ID}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'POST' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/datasources/account/examplersid?type=generic&name=Test_Account&email=john%40example.com" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" 
```

#### Response

```json
{
  "name": "Test_Account",
  "email": "john@example.com",
  "data_source_id": 741,
  "type": "generic",
  "date_created": "YYYY-08-08",
  "ftp_hostname": "ftp4.omniture.com",
  "ftp_username": "examplersid_4217476",
  "ftp_password": "example_password"
}
```

#### Request example details

The account details are specified as query parameters, including the required `rsid`. The example above creates an account with the following details:

* The account `type` is `generic`. For more information see [Data Sources manager](https://experienceleague.adobe.com/en/docs/analytics/import/data-sources/manage).
* The account `name` is `Test_Account`.
* The `email` notifications adress is specified as `john%40example.com`. Note that query parameters cannot contain true `@` characters, and must be replaced with `%40` as shown in the example.

#### Response example details

The successful example above responds with the following details:

* The account `name` is confirmed as `Test_Account`.
* The `data_source_id` is `741`.
* An FTP account was created with the Data Sources account. The FTP account details include an `ftp_hostname`, an `ftp_username`, and an `ftp_password`. For more information see the [Data Sources manager](https://experienceleague.adobe.com/en/docs/analytics/import/data-sources/manage).

### Request Parameters

The following table describes the create a Data Sources account request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `rsid` | required | string | The report suite ID associated with the Data Sources account |
| `type` | optional | string | The type of data associated with the account |
| `name` | optional | string | The name of the Data Sources account |
| `email` | optional | string | The email address to receive notifications regarding this Data Sources account |

### Response Parameters

The following table describes the create a Data Sources account response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `name` | string | The name of the Data Sources account |
| `email` | string | The email address to receive notifications regarding this Data Sources account |
| `data_source_id` | integer | The data source ID |
| `type` | string | The type of data associated with the account |
| `ftp_hostname` | string | The FTP host address |
| `ftp_username` | string | The FTP username |
| `ftp_password` | string | The FTP password |

## DELETE account

Use this endpoint to delete a Data Sources account. This action cannot be undone. For more information regarding Data Sources accounts, see the [Getting started with data sources](https://experienceleague.adobe.com/en/docs/analytics/import/data-sources/getting-started) guide.

`DELETE https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/datasources/account/{REPORT_SUITE_ID}/{DATA_SOURCE_ID}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'DELETE' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/data_sources/account/examplersid/741" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" 
```

#### Response

```json
{
  "success": true,
  "message": "Account deleted"
}
```

#### Request example details

The example above requests to `DELETE` the Data Sources account with the `741` ID.

#### Response example details

The example above responds the deletion was successful.

### Request Parameters

The following table describes the DELETE Data Sources account request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `rsid` | required | string | The report suite ID associated with the Data Sources account |
| `data_source_id` | required | string | The data source ID of the account to delete |

### Response Parameters

The following table describes the DELETE Data Sources account response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `success` | boolean | Whether the delete succeeded |
| `message` | string | Indicates the action of the operation |

## POST data

Use this endpoint to upload a data file to an existing Data Sources account. For more information on data uploads, see the [Upload data sources file to Adobe](https://experienceleague.adobe.com/en/docs/analytics/import/data-sources/file-upload) guide.

`POST https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/datasources/job/{REPORT_SUITE_ID}/{DATA_SOURCE_ID}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl  -X POST \
  'https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/datasources/job/examplersid/621' \
  --H 'Accept: application/json' \
  --H 'x-api-key: {CLIENT_ID}' \
  --H 'Authorization: Bearer {ACCESS_TOKEN}' \
  --F 'file="@/home/user/documents/example_upload.txt"'
```

#### Response

```json
{
  "filename": "example_upload.txt",
  "rows": 3,
  "job_id": 33376793,
  "status": "uploaded",
  "uploaded_date": "YYYY-10-25 13:22:31",
  "started_processing_date": null,
  "finished_processing_date": null
}
```

#### Request example details

The example above requests the following:

* To upload the file `example_upload.txt` to the Data Sources account with the ID `621`.
* The file to be uploaded is specified in the `--F` section of the request. A `file=` precedes the file path, which is specified by an `@` and contained within quotation marks. For more information on what files can be uploaded to Adobe, see the [File Format](https://experienceleague.adobe.com/en/docs/analytics/import/data-sources/file-format) guide.

#### Response example details

The example response above contains the following details:

* The file upload is associated with a `job_id`: `33376793`.
* The successful upload is indicated by `status`: `uploaded`.
* Adobe performs a processing operation associated with the `job_id`. This is indicated by a `started_processing_date` and a `finished_processing_date`. These parameters are shown in the response as `null` because the job may take a few minutes to commence.

### Request Parameters

The following table describes the upload data request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `rsid` | required | string | The report suite ID associated with the Data Sources account |
| `data_source_id` | required | string | The Data Source ID of the account to receive the file |
| `file` | required | string | The file path of the file to be uploaded. An `@` symbol must precede the location to ensure the request is properly sent. Certain API clients such as Postman have features that will automatically format your call to include the file upload details. In these cases, refer to the client documentation for specific formatting. |

### Response Parameters

The following table describes the upload data response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `filename` | string | The filename of the file ingested by the Data Sources job |
| `rows` | integer | The number of rows successfully processed by the Data Sources job |
| `job_id` | integer | The data source job ID |
| `status` | string | The status of the data source job |
| `uploaded_date` | string | The creation date of the data source job |
| `started_processing_date` | string | The date the data source job begins processing |
| `finished_processing_date` | string | The date the data source job finishes processing |

## GET all jobs

Use this endpoint to retrieve all jobs associated with a Data Sources account. Jobs are automatically created with each file upload.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/datasources/job/{REPORT_SUITE_ID}/{DATA_SOURCE_ID}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/job/examplersid/15?status=success" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" 
```

#### Response

```json
{
  "page": 1,
  "jobs": [
    {
      "filename": "uploaddata_for_october.tab",
      "rows": 3,
      "job_id": 33376779,
      "status": "success",
      "uploaded_date": "YYYY-10-25 13:22:31",
      "started_processing_date": "YYYY-10-25 13:23:01",
      "finished_processing_date": "YYYY-10-25 13:23:03"
    },
    {
      "filename": "uploaddata_for_november.tab",
      "rows": 3,
      "job_id": 33376787,
      "status": "success",
      "uploaded_date": "YYYY-11-25 11:41:21",
      "started_processing_date": "YYYY-11-25 11:42:01",
      "finished_processing_date": "YYYY-11-25 11:42:03"
    }
  ],
  "total_pages": 1
}
```

#### Request example details

The example above requests the following:

* The jobs belonging to the Data Sources account ID `15`.
* Return only jobs filtered for `success` status.

#### Response example details

The example above returns the following:

* Two jobs have the `success` status that belong to this account: `uploaddata_for_october.tab` and `uploaddata_for_november.tab`.
* The respective `job_id` for the jobs: `uploaddata_for_october.tab` and `uploaddata_for_november.tab`.

### Request Parameters

The following table describes the GET all jobs request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `rsid` | required | string | The report suite ID associated with the Data Sources account |
| `data_source_id` | required | string | The Data Sources account ID |
| `status` | required | string | Filters search by job status. Possible statuses are `uploaded`, `processing`, `success`, `failure`, and `deleted`. |
| `start_date` | optional | string | The beginning search date. It must be earlier than `end_date`. The default date is one month prior to the current date. Format as "yyyy-mm-dd hh:mm:ss". |
| `end_date` | optional | string | The ending search date. It must be more recent than `start_date`. It defaults to today. Format as "yyyy-mm-dd hh:mm:ss". |
| `page` | optional | string | Which page of the results to retrieve. Page `1` is the first page. If this value exceeds the available pages, no results will be returned. |

### Response Parameters

The following table describes the GET all jobs response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `page` | integer | Which page of the results was retrieved. Page `1` is the first page. |
| `jobs` | container | The job information retrieved in the search. Contains the `filename`, `rows`, `job_id`, `status`, `uploaded_date`, `started_processing_date`, and `finished_processing_date` parameters. |
| `filename` | string | The filename of the file ingested by the Data Sources job |
| `rows` | integer | The number of rows successfully processed by the Data Sources job |
| `job_id` | integer | The data source job ID |
| `status` | string | The status of the data source job |
| `uploaded_date` | string | The date the data source job is created |
| `started_processing_date` | string | The date the data source job begins processing |
| `finished_processing_date` | string | The date the data source job finishes processing |
| `total_pages` | integer | The total number of pages returned by the search |

## GET a single job

Use this endpoint to retrieve information regarding a single job by its job ID.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/datasources/job/{REPORT_SUITE_ID}/{DATA_SOURCE_ID}/{JOB_ID}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X 'GET' \
  "https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/job/examplersid/15/33376779" \
  -H "accept: application/json" \
  -H "x-api-key: {CLIENT_ID}" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" 
```

#### Response

```json
{
  "filename": "uploaddata_for_october.tab",
  "rows": 3,
  "job_id": 33376779,
  "status": "success",
  "uploaded_date": "YYYY-10-25 13:22:31",
  "started_processing_date": "YYYY-10-25 13:23:01",
  "finished_processing_date": "YYYY-10-25 13:23:03"
}
```

#### Request example details

The example above requests information regarding the job `33376779`.

#### Response example details

The example above returns the following:

* The `filename` of the job is `uploaddata_for_october.tab`.
* The `status` of the job is `success`.

### Request Parameters

The following table describes the GET a single job request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `rsid` | required | string | The report suite ID associated with the Data Sources account |
| `data_source_id` | required | string | The Data Sources account ID |
| `job_id` | required | string | The data source job ID |

### Response Parameters

The following table describes the GET a single job response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `filename` | string | The filename of the file ingested by the Data Sources job |
| `rows` | integer | The number of rows successfully processed by the Data Sources job |
| `job_id` | integer | The data source job ID |
| `status` | string | The status of the data source job |
| `uploaded_date` | string | The date the data source job is created |
| `started_processing_date` | string | The date the data source job begins processing |
| `finished_processing_date` | string | The date the data source job finishes processing |

## Status codes

Each API request returns an HTTP status code that reflects the result, as follows:

| HTTP code | Meaning | Description |
| --- | --- | --- |
| 200 | Success | The request is successful. |
| 400 | Bad Request | The request was improperly constructed, missing key information, and/or contained incorrect syntax. This error code could indicate a problem such as a missing required parameter or the supplied data did not pass validation. |
| 401 | Authentication failed | The request did not pass an authentication check. Your access token may be missing or invalid. Similarly, you may have attempted to access an object that requires administrator permissions. |
| 403 | Forbidden | The resource was found, but you do not have the right credentials to view it. You might not have the required permissions to access or edit the resource for reasons not applicable to status code 401. |
| 404 | Not found | The requested resource could not be found on the server. The resource may have been deleted, or the requested path was entered incorrectly. |
| 500 | Internal server errors | This is a server-side error. If you are making many simultaneous calls, you may be reaching the API limit and need to filter your results. Try your request again in a few minutes, and contact your administrator if the problem persists. |

For more information, or for trouble-shooting help, see the following:

* [Data sources overview](https://experienceleague.adobe.com/en/docs/analytics/import/data-sources/overview).
* [API Status Codes](https://experienceleague.adobe.com/en/docs/experience-platform/landing/troubleshooting#api-status-codes).
* [API request error headers](https://experienceleague.adobe.com/en/docs/experience-platform/landing/troubleshooting#request-header-errors).
