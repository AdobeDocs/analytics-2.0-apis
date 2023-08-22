---
title: Import API classifications by uploading files
description: Import Analytics classification APIs through file uploads.
---
​
# Import API Classifications by uploading files
​
This guide includes instructions for importing JSON classification datasets that are larger than 50 MB, or that include a .tsv or tab file. With this method, a dataset is uploaded as a file with the POST request. Alternatively, your dataset can be imported as a JSON body of the POST request if it is smaller than 50MB. For more information on this alternative, see the [Analytics classifications APIs guide](classifications/index.md)
​
To import an API classification by uploading a file, you follow a three-step process:
​
1. Create an import job with the POST create job endpoint.
2. Upload a file using the PUT upload file endpoint.
3. Commit your upload using the POST commit job endpoint.
​
The endpoints described in this guide are routed through analytics.adobe.io. To use them, you will need to first create a client with access to the Adobe Developer Console. For more information, refer to [Getting started with the Analytics API](../../index.md).
​
## POST create job
​
Use this endpoint to create an import job for a classification dataset. Creating an import job is required to produce a job ID that can be associated with an uploaded dataset file.
​
`POST https://analytics.adobe.io/api/{GLOBALCOMPANYID}/classification/job/import/createApiJob/{DATASET_ID}`
​
### Request and Response Examples
​
Request and response examples
Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.
​
### Request example details
​
### Response example details
​
### Request Parameters
​
The following table describes the POST create job request parameters:
​
| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `dataFormat` | required | string | The data format options. Includes `tsv`, `tab`, or `json`. |
| `encoding` | optional | string | The encoding for data. The default value is `UTF-8`. |
| `jobName` | optional | string | The name of the job |
| `fileBasename` | optional | string |  |
| `notifications` | optional | container | Contains the notification information. Includes the `method`, `state`, and `recipients` parameters. |
| `method` | optional | string | The method by which the notification is sent. This includes the enums `email` and `rabbit`. |
| `state` | optional | string | The state of the notification. Includes the following enums: `created`, `queued`, `validated`, `failed_validation`, `processing`, `done_processing`, `failed_processing`, and `completed`. |
| `recipients` | optional | string | The recipients of the notification |
| `statesWithQueuedNotifications` | optional | string |  |
| `listDelimiter` | optional | string | Specifies the data delimiter for the list. Default delimiter is `,` (comma) |
| `pipelineTag` | optional | string |  |
| `source` | optional | string | The data source. Default value is `"Direct API Upload"`. |
| `dataUri` | optional | string | The data URI |
| `originalDataUri` | optional | string | The original data URI |
| `keyOptions` | optional | container | Contains the `byte_length`, `type`, and `overwrite` parameters |
| `byte_length` | optional | integer | The byte length of the job |
| `type` | optional | string | The type of the job |
| `overwrite` | optional | boolean | Whether or not the import will overwrite. |
| `notification_extras` | optional | container | Extra options for notifications. Contains the `key`, and `value` parameters. |
| `key` | optional | string |  |
| `value` | optional | string |  |
​
### Response Parameters
​
The following table describes the POST create job response parameters:
​
| Name | Type | Description |
| --- | --- | --- |
| `api_job_status` | string | The staus of the API job |
| `dataset_id` | string | Classification dataset ID |
| `api_job_id` | string | The API Job ID for uploading the file |
| `ims_org_id` | string | The ID associated with the analytics company of the user |
| `taxonomist_job_id` | string |  |
| `job_options` | container | Contains the options for jobs. Includes the `dataFormat`, `encoding`, `jobName`, `fileBasename`, and `notifications` parameters as shown in the following five rows. |
| `dataFormat` | string | The data format options. Includes `tsv`, `tab`, or `json`. |
| `encoding` | string | The encoding for data. The default value is `UTF-8`. |
| `jobName` | string | The name of the job |
| `fileBasename` | string |  |
| `notifications` | container | Contains the notification information. Includes the `method`, `state`, and `recipients` parameters. |
| `method` | string | The method by which the notification is sent. This includes the enums `email` and `rabbit`. |
| `state` | string | The state of the notification. Includes the following enums: `created`, `queued`, `validated`, `failed_validation`, `processing`, `done_processing`, `failed_processing`, and `completed`. |
| `recipients` | string | The recipients of the notification |
| `statesWithQueuedNotifications` | string |  |
| `listDelimiter` | string | Specifies the data delimiter for the list. Default delimiter is `,` (comma) |
| `pipelineTag` | string |  |
| `source` | string | The data source. Default value is `"Direct API Upload"`. |
| `dataUri` | string | The data URI |
| `originalDataUri` | string | The original data URI |
| `keyOptions` | container | Contains the `byte_length` `type` and `overwrite` parameters |
| `byte_length` | integer | The byte length of the job |
| `type` | string | The type of the job |
| `overwrite` | boolean | Whether or not the import will overwrite. |
| `notification_extras` | container | Extra options for notifications. Contains the `key`, and `value` parameters. |
| `key` | string |  |
| `value` | string |  |
​
## PUT upload file
​
Use this endpoint to upload a file that will be associated with a job ID. This file can be tsv, tab, or JSON.
​
`PUT https://analytics.adobe.io.api/{GLOBAL_COMPANY_ID}/classification/job/import/uploadFile/{API_JOB_ID}`
​
### Request and Response Examples
​
Request and response examples
Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.
​
### Request example details
​
### Response example details
​
### Request Parameters
​
The following table describes the PUT upload file request parameters:
​
| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `api_job_id` | required | string | The API Job ID for uploading the file |
​
### Payload Example
​
```JSON
Content-Type: multipart/form-data
Key: file
Value: file path
```
​
### Response Parameters
​
No response parameters are returned. A `200` status code indicates a successful upload.
​
## POST commit job