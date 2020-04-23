# Data Repair API

> NOTE: This page contains beta documentation that is subject to change before the final product release. 

The Data Repair API provides a mechanism to submit data repair jobs for deleting or editing existing Adobe
Analytics data.

The API supports the following actions:

* Deleting Activity Map data (beta)
  
> WARNING: Use of the Data Repair API will permanently delete or edit existing Adobe Analytics data.
> Proceed with caution.

## Accessing the Data Repair API

To begin using the Data Repair API follow these steps:

#### 1. Purchase the Data Repair API

Access to the Data Repair API requires a sales order.  Using the Data Repair API will incur fees based on the total
number of Server Calls scanned during the job.  To predict the costs associated with using this service, a required step
for every repair process is to scope the size of the repair job prior to starting the repair.

Work with the Adobe account team to complete a sales order for access to the Data Repair API.  Only one sales order is
needed to cover all future data repair jobs.  Check with the Adobe account team for current status. 

#### 2.	Create a Service Account Integration within Adobe I/O

Follow the Adobe I/O instructions to
[create a Service Account Integration](https://github.com/AdobeDocs/adobeio-auth/blob/stage/AuthenticationOverview/ServiceAccountIntegration.md).
Take note of the `API Key / Client ID` associated with the Integration.  This
will be used when accessing the Data Repair API.

#### 3.	Grant the Data Repair API permission to the new Service Account Integration in the Experience Cloud

Adobe Experience Cloud Admin Console product profiles control access to a product integration. Product profiles have
Analytics-specific permissions for managing integration access to reporting features and data.

The Data Repair API permission can be found under the Adobe Analytics Report Suite Tools permission group.

![data repair permission](images/data-repair-permission.png)
 
For more information on creating profiles and managing permissions, see
[Manage Products and Profiles](https://helpx.adobe.com/enterprise/using/manage-products-and-profiles.html) and
[Manage Permissions and Roles](https://helpx.adobe.com/enterprise/using/manage-permissions-and-roles.html).
 
#### 4.	Create a JWT Authentication access token

In order to establish a secure service-to-service Adobe I/O API session, create a JSON Web Token (JWT) that encapsulates
the identity of the product integration, and then exchange it for an access token.  Every request to an Adobe service
must include the access token in the `Authorization` header, along with the `API Key / Client ID` associated with the 
Service Account Integration.

[JWT Authentication](https://github.com/AdobeDocs/adobeio-auth/blob/stage/JWT/JWT.md)

> NOTE: A new access token will need to be created prior to each use of the Data Repair API.

## Submitting a data repair job

To submit a data repair job follow these steps:

#### 1. Estimate Job Size

The Data Repair API incurs charges based on usage.  To aide in estimating the cost of a data repair job, the Data Repair
API includes the `/serverCallEstimate` endpoint, which returns a count of the Server Call volume estimate for the data
repair job.  It also returns `validationToken`, which is required for the job creation call.

#### 2. Create Job

To create a data repair job, use the `/job` endpoint.  This endpoint requires a Report Suite, date range,
`validationToken` (from `/serverCallEstimate`), and a job definition, which will specify the variables to be repaired.

#### 3. Monitor Job

When a repair job is created, a Job ID will be returned.  The `/job/{JOB_ID}` endpoint can be used to monitor the status
of a job at any point after job submission.  The `serverCalls` value in the job status response will be used for final
billing of Data Repair API usage.  


## Recommended Workflow

The Data Repair API permanently deletes or edits existing data.  We recommend a careful approach to executing the
repair to minimize accidental data deletion.  The following workflow provides multiple checkpoints and is highly
recommended.  Review the data after each step to confirm the data repair job completes as expected.  All usage of the
Data Repair API, including testing, will be represented in the monthly invoice.

1.	Test the data repair job logic in a __development__ Report Suite for __one day__ of data.  Review the data after the
test data repair job is complete.
2.	Test the data repair job logic in a __development__ Report Suite for __one month__ of data.  Review the data after the
test data repair job is complete.
3.	Test the data repair job logic in a __production__ Report Suite for __one day__ of data.  Review the data after the
date repair job is complete.
4.	Test the data repair job logic in a __production__ Report Suite for __one month__ of data. Review the data after the
data repair job is complete.
5.	Once all testing and validation is complete, then proceed with the __full date range__ of the data repair for
__production__ data.

## Server Call Estimate

The `/serverCallEstimate` endpoint calculates the number of Server Calls for the given Report Suite and date
range provided.  It also returns `validationToken`, which is will be passed to `/job` in the
`x-validation-token` header.

The Server Call volume can be multiplied by the CPMM rate found in the Data Repair API Sales Order.  This will
provide an estimate of the cost of the data repair job. 

The date range is specified in days and is based on the time zone of the Report Suite.  The date range is inclusive of
the start and end dates for estimates and repairs.

#### Example Request
```bash
curl -X GET -H "accept: application/json" -H "x-proxy-global-company-id: {ANALYTICS_GLOBAL_COMPANY_ID}" \
    -H "Authorization: Bearer {ACCESS_TOKEN}" -H "x-api-key: {API_KEY/CLIENT_ID}" \
    "https://analytics.adobe.io/api/{ANALYTICS_GLOBAL_COMPANY_ID}/datarepair/v1/{REPORT_SUITE_ID}/serverCallEstimate?dateRangeStart={YYYY-MM-DD}&dateRangeEnd={YYYY-MM-DD}"
```

#### Example Response
```json
{
    "dateRangeEnd": "2019-03-28",
    "dateRangeStart": "2019-03-28",
    "reportSuiteId": "sample.reportsuite",
    "serverCallEstimate": 150000,
    "validationToken": "gAAAAABee777APCKafp7zDu-I3kFIEq_4AoeZSIap8wt0RhgNHmVdjnlrKCjPOo_PW74uj0qvDPG9B_SiYOe4p1Rg6Um1vCpL7dLwtkBX7i8wNheVPhb2j4nAapE-k6WPVcdP7FXNdjKvogMwHBEvGpAz6uO6TmpxwZUa3LMixaeN65BOFZW3i9ZnzZ400oCHte6XAX6Mo7QF-PyZZ6D--693K0cO_oUYg=="
}
```

## Job Creation

The `/job` endpoint creates the data repair job.  A JSON-formatted Job Definition is passed in as the POST body and a
job id is returned.

`/serverCallEstimate` returns `validationToken`, which must be passed to `/job` in the 
`x-validation-token` header. `/job` will use `validationToken` to confirm that its parameters are the same as those
passed to `/serverCallEstimate`.  If the parameters do not match or the Server Call volumne has changed significantly
between the call to `/serverCallEstimate` and the call to `/job`, the Data Repair API will return an error.

If the scope of the data repair job changes, re-run the `/serverCallEstimate` endpoint to generate a new
`validationToken`.

> WARNING: Use of the Data Repair API will permanently delete or edit existing Analtyics data. Follow the recommended
> workflow for testing and validation prior to applying any data repair jobs to production data.

#### Job Definition

The job definition is used to specify the variables to be repaired and what actions to take on those variables. 
In general, it is of the form:

```json
{
  "variables": {
    "{VARIABLE_1}": {
      "action": "{ACTION_1}"
    },
    "{VARIABLE_2}": {
      "action": "{ACTION_2}"
    },
    ...
  }
}
```

#### Activity Map

The Activity Map variable includes `clickmappage`, `clickmaplink`, and the context data used to populate those
variables.  To delete Activity Map data, use the following job definition:

```json
{
  "variables": {
    "activitymap": {
      "action": "delete"
    }
  }
}
``` 

#### Example Request
```bash
curl -X POST -H "accept: application/json" -H "x-proxy-global-company-id: {ANALYTICS_GLOBAL_COMPANY_ID}" \
    -H "Authorization: Bearer {ACCESS_TOKEN}" -H "x-api-key: {API_KEY/CLIENT_ID}" \
    -H "x-validation-token: {VALIDATION_TOKEN}" -d '{REPAIR_JOB_DEFINITION}' \
    "https://analytics.adobe.io/api/{ANALYTICS_GLOBAL_COMPANY_ID}/datarepair/v1/{REPORT_SUITE_ID}/job?dateRangeStart={YYYY-MM-DD}&dateRangeEnd={YYYY-MM-DD}"
```

#### Example Response
```json
{
  "jobId": 24
}
```

## Job Status

The `/job/{JOB_ID}` endpoint is called to check on the progress of a data repair job.  Following submission of a job,
`status` will report as `processing` and `progress` will be a number between `0` and `100`.  Once complete, `status` will
report as `complete` and `serverCalls` will be set to the actual number of records scanned during the data repair job.
This `serverCalls` value will be included in the monthly invoice.

#### Example Request
```bash
curl -X GET -H "accept: application/json" -H "x-proxy-global-company-id: {ANALYTICS_GLOBAL_COMPANY_ID}" \
    -H "Authorization: Bearer {ACCESS_TOKEN}" -H "x-api-key: {API_KEY/CLIENT_ID}" \
    "https://analytics.adobe.io/api/{ANALYTICS_GLOBAL_COMPANY_ID}/datarepair/v1/{REPORT_SUITE_ID}/job/{JOB_ID}"
```

#### Example Response
```json
{
    "dateRangeEnd": "2019-03-28",
    "dateRangeStart": "2019-03-28",
    "jobCompleteTime": "2020-03-24T10:13:51+00:00",
    "jobCreateTime": "2020-03-24T09:02:59+00:00",
    "jobDefinition": {
        "variables": {
            "activitymap": {
                "action": "delete"
            }
        }
    },
    "jobId": "24",
    "progress": 100,
    "reportSuiteId": "sample.reportsuite",
    "serverCalls": 2,
    "status": "complete"
}
```