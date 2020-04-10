# Data Repair API

The Data Repair API provides a mechanism to submit jobs for deleting or editing existing Adobe Analytics data and a
mechanism to monitor the size and status of submitted jobs.

> WARNING: Use of this API will result in invoiced charges based on the number of server calls scanned during the
> repair process.

> WARNING: Use of this API will permanently delete or edit existing data.  Proceed with caution.

## Accessing The API

#### Permissions
Product profiles are managed through the Adobe Experience Cloud Admin Console.  The amount of access to an integration
is governed by the product profiles associated with it.  Product profiles have Analytics-specific permissions for
managing integration access to reporting features and data.
 
The Data Repair API permission can be found under the Adobe Analytics Report Suite Tools permission group.
 
![data repair permission](images/data-repair-permission.png)
 
For more information on creating profiles and managing permissions, see
[Manage Products and Profiles](https://helpx.adobe.com/enterprise/using/manage-products-and-profiles.html) and
[Manage Permissions and Roles](https://helpx.adobe.com/enterprise/using/manage-permissions-and-roles.html).
 
#### Authentication
To establish a secure service-to-service Adobe I/O API session, you must create a JSON Web Token (JWT) that
encapsulates the identity of your integration, and then exchange it for an access token.  Every request to an Adobe
service must include the access token in the Authorization header, along with the API Key (Client ID) that was
generated when you created the Service Account Integration in the Adobe I/O Console.
 
[JWT Authentication](https://github.com/AdobeDocs/adobeio-auth/blob/stage/JWT/JWT.md)
 
## API Steps

#### 1. Estimate Job Size
Prior to submitting a repair job, it is critical to understand the costs associated with the request.  To aid you in
estimating final costs, the `/serverCallEstimate` API call will provide a count of the server call volume that will be
included in the job.  Working with your Analytics business owner the server call volume can be multiplied by the CPMM
rate found in your Data Repair API contract.  This will provide a full estimate of the cost of the repair. If the scope
of your repair changes after initial estimates, please re-run the `/serverCallEstimate` API call to recalculate the
cost.

#### 2. Create Job
An API call is made to `/job` to create a data repair job.  It will include the variables to be repaired and the
action to be taken to perform the repair.

#### 3. Monitor Job
API calls can be made to `/job/{JOB_ID}` to monitor the status of a job at any point after job submission.
    > Note:  The `serverCalls` value in the job status response will be used for final billing of Data Repair usage.

> WARNING:  Use of this API will permanently delete or edit existing data.  Proceed with caution.

## Recommended Workflow
1. Test the repair logic in a development report suite for **one day** of data.  Review the data after the repair.
2. Test the repair logic in a development report suite for **one month** of data.  Review the data after the repair.
3. Test the repair logic in a production report suite for **one day** of data. Review the data after the repair.
    > Note:  Consider testing with a day of data close to the end of the retention period if possible.
4. Test the repair logic in a production report suite for **one month** of data.  Review the data after the repair.
5. Once full testing and validation is done, then proceed with the full date range of the repair with production data.
 
> Note:  Complete an estimate of job size for each test, as well as each full production job. 


### Validation

`/serverCallEstimate` returns a `validationToken`, which represents the current request(date range, report suite id,
server call estimate).  This `validationToken` is passed as the header `x-validation-token` to `/job`.  `/job` will use
this `validationToken` to confirm that its parameters are the same as those passed to `/serverCallEstimate`.  If the
parameters do not match or the server count estimate has changed significantly between the call to `/serverCallEstimate`
and the call to `/job`, the API will return an error.

### Job Definition

In general, the job definition defines the variables to be repaired and the action to be taken to perform the repair.

For the initial release of this API, we will only support the deletion of ActivityMap data, which is represented by
the following job definition:

```json
{
    "variables": {
        "activitymap": {
            "action": "delete"
        }
    }
}
```


## Server Call Estimate

This endpoint calculates the number of server calls for the given report suite and date range.  It also returns 
`validationToken`, which is will be passed to `/job` in the `x-validation-header` header.

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

This endpoint creates a data repair job.  A JSON-formatted job definition is passed in as the POST body and a job id
is returned.

> WARNING: Use of this API will permanently delete or edit existing data.  Follow the recommended workflow for testing
> and validation prior to apply any jobs to production data.

#### Example Request
```bash
curl -X POST -H "accept: application/json" -H "x-proxy-global-company-id: {ANALYTICS_GLOBAL_COMPANY_ID}" \
    -H "Authorization: Bearer {ACCESS_TOKEN}" -H "x-api-key: {API_KEY/CLIENT_ID}" \
    -H "x-validation-token: {VALIDATION_TOKEN} -d '{REPAIR_JOB_DEFINITION} \
    "https://analytics.adobe.io/api/{ANALYTICS_GLOBAL_COMPANY_ID}/datarepair/v1/{REPORT_SUITE_ID}/job?dateRangeStart={YYYY-MM-DD}&dateRangeEnd={YYYY-MM-DD}"
```

#### Example Response
```json
{
  "jobId": 24
}
```

## Job Status

This endpoint is called to check on the progress of a job.  Following submission, the `status` will report as
`processing` and `progress` will be a number between `0` and `100`.  Once complete, `status` will report as `complete`
and `serverCalls` will be set to the actual number of records scanned during the repair.  The invoice will bill on the
aggregate `serverCalls` for the a given timeframe.

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


