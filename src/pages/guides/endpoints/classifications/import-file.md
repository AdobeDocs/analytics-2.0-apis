---
title: Import API classifications by uploading files
description: Import Analytics classification APIs through file uploads.
---

# Import API Classifications by uploading files

This guide includes instructions for importing JSON classification datasets that are larger than 50 MB, or that include a .tsv or .tab file. With this method, a dataset is uploaded as a file with the POST request. Alternatively, your dataset can be imported as a JSON body of the POST request if it is smaller than 50MB. For more information on this alternative, see the [Analytics classifications APIs guide](classifications/index.md)

Additionally, using these endpoints requires your global company ID in each request. You can find your global company ID by using the [Discovery API](../discovery.md)

To import an API classification by uploading a file, you follow a three-step process:

1. Create an import job with the [POST create job](#post-create-job) endpoint.
2. Upload a file using the [PUT upload file](#put-upload-file) endpoint.
3. Commit your upload using the [POST commit job](#post-commit-job) endpoint.

The endpoints described in this guide are routed through analytics.adobe.io. To use them, you will need to first create a client with access to the Adobe Developer Console. For more information, refer to [Getting started with the Analytics API](src/pages/guides/endpoints/classifications/index.md).

## POST create job

Use this endpoint to create an import job for a classification dataset. Creating an import job is required to produce a job ID that can be associated with an uploaded dataset file. For more information on classification jobs, see [Classification set jobs manager](https://experienceleague.adobe.com/docs/analytics/components/classifications/sets/job-manager.htm).

`POST https://analytics.adobe.io/api/{GLOBALCOMPANYID}/classification/job/import/createApiJob/{DATASET_ID}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X POST "https://analytics.adobe.io/api/{GLOBALCOMPANYID}/classification/job/import/createApiJob/6449b63563c1e069c6159415" \
     -H "x-api-key: {CLIENT_ID}" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer {ACCESS_TOKEN}" \
     -d '{
            "dataFormat": "tsv",
            "encoding": "UTF8",
            "jobName": "testsuite evar1 classifications",
            "notifications": [
                {
                "method": "email",
                "state": "completed",
                "recipients": [
                    john@example.com
                ]
                }
            ],
            "listDelimiter": ",",
            "source": "Direct API Upload",
            "keyOptions": {
                "byte_length": 0,
                "type": "string"
            }
         }'
```

#### Response

```JSON
{
  "api_job_id": "a6fc824c-4d6f-45f9-8f55-456f918e0b41",
  "dataset_id": "6449b63563c1e069c6159415",
  "ims_org_id": "0DFE76D95967D5B50A494010@AdobeOrg",
  "api_job_status": "CREATED",
  "job_options": {
    "dataFormat": "tsv",
    "encoding": "utf8",
    "jobName": "testsuite evar1 classifications",
    "fileBasename": null,
    "notifications": [
      {
        "method": "email",
        "state": "completed",
        "recipients": [
          "john@example.com"
        ]
      }
    ],
    "statesWithQueuedNotifications": [],
    "listDelimiter": ",",
    "pipelineTag": "",
    "source": "Direct API Upload",
    "dataUri": null,
    "originalDataUri": null,
    "keyOptions": {
      "byte_length": 255,
      "type": "string"
    },
    "notification_extras": [
      {
        "key": "Report Suite",
        "value": "testsuite"
      }
    ]
  }
}
```

### Request example details

The example request above creates an import job with the following specifications:

* the `dataFormat` for the classification as `tsv`.
* the `jobName` to be `testsuite evar1 classifications`.
* the notification will be delivered by `email` to `john@example.com` when the state is `completed`.
* the data source is `Direct API Upload`.

### Response example details

The example response above shows the following job creation information:

* the `api_job_id` is `a6fc824c-4d6f-45f9-8f55-456f918e0b41`. This ID is necessary to both upload and commit the dataset with the other endpoints in this guide.
* the notification details, including its `completed` state.

### Request Parameters

The following table describes the POST create job request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `dataFormat` | required | string | The data format options. Includes `tsv`, `tab`, or `json`. |
| `encoding` | optional | string | The encoding for data. The default value is `UTF-8`. |
| `jobName` | optional | string | The name of the job |
| `fileBasename` | optional | string | The name of the file currently being read, without path or extension |
| `notifications` | optional | container | Contains the notification information. Includes the `method`, `state`, and `recipients` parameters. |
| `method` | optional | string | The method by which the notification is sent. This includes the enums `email` and `rabbit`. |
| `state` | optional | string | The state of the notification. Includes the following enums: `created`, `queued`, `validated`, `failed_validation`, `processing`, `done_processing`, `failed_processing`, and `completed`. |
| `recipients` | optional | string | The recipients of the notification |
| `statesWithQueuedNotifications` | optional | string | Notifications for queued states |
| `listDelimiter` | optional | string | Specifies the data delimiter for the list. Default delimiter is `,` (comma) |
| `pipelineTag` | optional | string | Pipeline tag |
| `source` | optional | string | The data source. Default value is `Direct API Upload`. |
| `dataUri` | optional | string | The data URI |
| `originalDataUri` | optional | string | The original data URI |
| `keyOptions` | optional | container | Contains the `byte_length`, `type`, and `overwrite` parameters |
| `byte_length` | optional | integer | The byte length of the job |
| `type` | optional | string | The type of the job |
| `overwrite` | optional | boolean | Whether or not the import will overwrite. |
| `notification_extras` | optional | container | Extra options for notifications. Contains the `key`, and `value` parameters. |
| `key` | optional | string | The field or column name associated with key value |
| `value` | optional | string | The actual value of the key (as in a field or column name)  |

### Response Parameters

The following table describes the POST create job response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `api_job_status` | string | The staus of the API job |
| `dataset_id` | string | Classification dataset ID |
| `api_job_id` | string | The API Job ID for uploading the file |
| `ims_org_id` | string | The ID associated with the analytics company of the user |
| `taxonomist_job_id` | string | Job ID for taxonomist |
| `job_options` | container | Contains the options for jobs. Includes the `dataFormat`, `encoding`, `jobName`, `fileBasename`, and `notifications` parameters as shown in the following five rows. |
| `dataFormat` | string | The data format options. Includes `tsv`, `tab`, or `json`. |
| `encoding` | string | The encoding for data. The default value is `UTF-8`. |
| `jobName` | string | The name of the job |
| `fileBasename` | string | The name of the file currently being read, without path or extension |
| `notifications` | container | Contains the notification information. Includes the `method`, `state`, and `recipients` parameters. |
| `method` | string | The method by which the notification is sent. This includes the enums `email` and `rabbit`. |
| `state` | string | The state of the notification. Includes the following enums: `created`, `queued`, `validated`, `failed_validation`, `processing`, `done_processing`, `failed_processing`, and `completed`. |
| `recipients` | string | The recipients of the notification |
| `statesWithQueuedNotifications` | string | Notifications for queued states |
| `listDelimiter` | string | Specifies the data delimiter for the list. Default delimiter is `,` (comma) |
| `pipelineTag` | string | Pipeline tag |
| `source` | string | The data source. Default value is `"Direct API Upload"`. |
| `dataUri` | string | The data URI |
| `originalDataUri` | string | The original data URI |
| `keyOptions` | container | Contains the `byte_length` `type` and `overwrite` parameters |
| `byte_length` | integer | The byte length of the job |
| `type` | string | The type of the job |
| `overwrite` | boolean | Whether or not the import will overwrite. |
| `notification_extras` | container | Extra options for notifications. Contains the `key`, and `value` parameters. |
| `key` | string | The field or column name associated with key value |
| `value` | string | The actual value of the key (as in a field or column name) |

## PUT upload file

Use this endpoint to upload a file that will be associated with the job ID created with the POST create job endpoint. This file can be tsv, tab, or JSON. For more information on how to structure your classification files, see [Classification data files](https://experienceleague.adobe.com/docs/analytics/components/classifications/classifications-importer/c-saint-data-files.html)

`PUT https://analytics.adobe.io.api/{GLOBAL_COMPANY_ID}/classification/job/import/uploadFile/{API_JOB_ID}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X PUT "https://analytics.adobe.io.api/{GLOBAL_COMPANY_ID}/classification/job/import/uploadFile/a6fc824c-4d6f-45f9-8f55-456f918e0b41"
     -H "x-api-key: {CLIENT_ID}" \
     -H "Authorization: Bearer {ACCESS_TOKEN}" \
     -H "Content-Type: multipart/form-data" \
     -d '{
        "Key": "example_file.tsv",
        "Value": "/files/examples/example_file.tsv"
         }' 
```

#### Response

```json
{
    "api_job_id": "a6fc824c-4d6f-45f9-8f55-456f918e0b41",
    "status": "success"
}
```

### Request example details

The example above shows a cURL request with the following:

* the `Key` parameter specified as the file name `example_file.tsv`
* the `Value` parameter specified as the file path `/files/examples/example_file.tsv`

### Response example details

The example response above shows a successful status for the upload.

### Request Parameters

The following table describes the PUT upload file request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `api_job_id` | required | string | The API job ID for uploading the file. This ID was provided with the response of the POST create job endpoint. |
| `Key` | required | string | The name of the uploaded file |
| `Value` | required | string | The location of the uploaded file |

### Response Parameters

The following table describes the PUT upload file response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `api_job_id` | string | The API job ID for uploading the file. This ID was provided with the response of the POST create job endpoint. |
| `status` | string | The status of the API job |

## POST commit job

Use this endpoint to commit the changes of a specified job ID. This endpoint finalizes the file uploading process. For more information on classification jobs, see [Classification set jobs manager](https://experienceleague.adobe.com/docs/analytics/components/classifications/sets/job-manager.htm).

`POST https://analytics.adobe.io.api/{GLOBAL_COMPANY_ID}/classification/job/import/commitApiJob/{API_JOB_ID}`

### Request and Response Examples

Click the **Request** tab in the following example to see a cURL request for this endpoint. Click the **Response** tab to see a successful JSON response for the request.

<CodeBlock slots="heading, code" repeat="2" languages="CURL,JSON"/>

#### Request

```sh
curl -X POST "https://analytics.adobe.io.api/{GLOBAL_COMPANY_ID}/classification/job/import/commitApiJob/a6fc824c-4d6f-45f9-8f55-456f918e0b41" \
     -H "x-api-key: {CLIENT_ID}" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer {ACCESS_TOKEN}"
```

#### Response

```json
{
  "import_job_id": "e11671f1-d352-4b34-bb95-3a26775ef334",
  "api_job_id": "a6fc824c-4d6f-45f9-8f55-456f918e0b41"
}
```

### Request example details

The example above shows a cURL request to commit the job associated with the `api_job_id` of `a6fc824c-4d6f-45f9-8f55-456f918e0b41`.

### Response example details

The example above shows the successful response for committing the job, including the `import_job_id` and `api_job_id`.

### Request Parameters

The following table describes the POST commit job request parameters:

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `api_job_id` | required | string | The API job ID for uploading the file. This ID was provided with the response of the POST create job endpoint. |

### Response Parameters

The following table describes the POST commit job response parameters:

| Name | Type | Description |
| --- | --- | --- |
| `import_job_id` | string | The ID of the import job |
| `api_job_id` | string | The API job ID for uploading the file. This ID was provided with the response of the POST create job endpoint. |

After importing your classification datasets you can export them to other applications. See the [Analytics classification APIs guide](classifications/index.md) for more information.

## API status codes

For a description of API status codes and tips for troubleshooting, see the [Platform FAQ and troubleshooting guide](https://experienceleague.adobe.com/docs/experience-platform/landing/troubleshooting.html#api-status-codes).
