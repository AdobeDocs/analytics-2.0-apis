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