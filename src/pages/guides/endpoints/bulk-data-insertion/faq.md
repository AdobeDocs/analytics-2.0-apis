---
title: Bulk data insertion FAQ
description: Frequently asked questions for the Bulk data insertion API.
---

# Bulk data insertion API FAQ

Get answers to common questions asked when using the Bulk data insertion API.

## General questions

### What is the difference between the BDIA and the Data Insertion API available in the 1.4 API?

The Data Insertion API and Bulk Data Insertion API are both methods to submit server-side data to Adobe Analytics. Data Insertion API calls are made one event at a time. Bulk Data Insertion API accepts CSV formatted files containing event data, one event per row. When considering a BDIA solution, the main determining factor is how often you plan to send files.  As a bulk service, BDIA is optimized for larger files sent less frequently, while DIA has no upper bound on the throughput rate.  If your use case would mandate sending more than 1 file per second, then opt for DIA.

### How long does it take for data to appear?

For data with timestamps less than 24 hours old, ingested data typically follows a standard [latency](https://experienceleague.adobe.com/docs/analytics/technotes/latency.html) of 20-50 minutes. Some data, such as page views, is available within minutes.

Data with timestamps older than 24 hours can take 2 hours or longer depending on the age of the data. See [Features that depend on latency](https://experienceleague.adobe.com/docs/analytics/technotes/latency.html#features-that-depend-on-latency) for more information.

### I accidentally put two of the same header columns in a file. How is that data ingested?

If a column header is duplicated in a file, we will mark the file as invalid and return an error response and note the duplicate column. Keep in mind that column headers are case-insensitive, so providing "Column1" and "column1" as 2 separate columns will be interpreted as duplicate and result in an invalid file.  Also remember that column headers are separate from querystring fields.  It is possible to send in a value in a column that is duplicated as a querystring field. In such case, the column value will be used.

### What is the throttle limit for API calls?

A cap of 1 request per second is enforced for all ingest API calls. If your BDIA implementation exceeds this limit, consolidate your data into fewer larger files so that your rate will stay under this cap.

## Responses and failures

### What are the response codes that I can get, and what do they mean?

The following response codes are returned by the API:

| HTTP_Response | Description |
|--|--|
| `100 - Continue` | This is used when uploading a file. This is sent to a client after authentication is checked and the HTTP request headers are validated. This signals to the client that they can begin to upload the large file. For example, if a client waits for this response code before sending a file, it can avoid uploading an entire file before learning that a visitor group ID was not specified. |
| `400 - Bad Request` | Required headers are missing or the uploaded file is missing critical information or is malformed. |
| `401 - Unauthorized` | The API key or user token used to interact with the API is not valid. |
| `403 - Forbidden` | Occurs when attempting to perform an action that is not currently allowed. |
| `404 - Not Found` | Occurs when attempting to call an undefined endpoint. |
| `413 - Payload Too Large` | Returned when the file being uploaded is larger than the permitted size. |
| `429 - Too Many Requests` | Occurs when the number of API calls exceeds the system limits. |
| `500 - Internal Error` | Occurs when the API encounters an unexpected internal error that it is unable to recover from. |

### I did not validate a file before uploading it, and the entire upload failed. What are my options?

If the entire file fails, use the [troubleshooting](troubleshooting.md) page to help determine the cause of the issue. You can then make adjustments to the file creation process, and recreate and reupload the file. These actions do not result in any duplicate data, because no data was ingested into Analytics. You can look at the `invalid_rows` and `rows` field in the API response message to determine if all of the rows failed. If `invalid_rows` is equal to `rows`, then no rows were successfully ingested.

### I did not validate a file before uploading it, and some hits were valid while others were not. What are my options?

Your best course of action depends on how many invalid rows exist:

* **Mostly valid rows**: If a file with a large amount of rows is submitted, but a small percentage of those rows fail, it is probably best to not resubmit the file. If you resubmit a file where most rows were successfully ingested during its initial processing, the majority of rows will result in duplicated data in Analytics. Accepting that a small amount of rows were lost is typically better than duplicating a larger amount of data.
* **Mostly invalid rows**: If a file is submitted, and a large percentage of the rows have failed, then it might make sense to repair the rows and resubmit the file. Only take this action if the number of duplicate hits is acceptable and the missed server calls are individually significant. Otherwise, Adobe recommends fixing the file generation process and not trying to resubmit the file.

### How do I remove data that was inadvertently uploaded?

**Data uploaded through the Bulk data insertion API is permanent.** In some cases, you can use the [Data Repair API](../data-repair/index.md), but Adobe strongly recommends that you validate uploads before ingesting them into Adobe Analytics. Adobe Engineering Services can also assist customers in removing undesired data through a paid service engagement. Contact your Adobe Account Manager for more information.
