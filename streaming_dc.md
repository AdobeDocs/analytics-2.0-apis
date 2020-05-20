# Analytics Streaming Data Collection API User's Guide

**VERSION 1.0.0**

## Overview

The Streaming Data Collection API (SDC API) is an Adobe Analytics capability allowing customers to upload server call data in batches of files as opposed to using client-side JavaScript (e.g., tags on web pages or other APIs embedded in application code). The server calls in these batch files can be either current (live) data or historical data. The concept is similar to the long-available Analytics Data Insertion API. In fact, batch ingestion can be thought of as a different interface to this very scalable service.

Streaming collection solves several problems for a variety of use cases. Some examples include:

- A new customer wishes to ingest historical data from a previous analytics system.

- A customer may have an internal analytics collection system that makes it unfeasible to use Adobe’s “client-side” collection code. The customer can use ETL processes to extract and transform data into batch files and, finally, use SDC to upload them to Adobe Analytics.

- A customer may collect data from devices that have only intermittent connectivity to the Internet. These devices store up the interactions until they receive a connection and then they can upload the historical data all at once via SDC.

Using the Data Insertion API can solve all of the above use cases; however, the customer must then build software that processes the server calls, inserts them in the correct order, responds to errors, and uses sufficient concurrency to achieve the desired ingestion volume. 

The SDC API removes this burden from customers by providing a productized system that scales, handles errors, and addresses the finer details of inserting data into Adobe Analytics.

## Limitations

- SDC can only send data to report suites that are configured as "Timestamp enabled" or "Timestamp optional."
- Historical data for a visitor grouping must be ingested before any current data can be processed, unless Timestamp Optional report suites are being used and visitor continuity is not possible or not desirable.
- The amount of server calls that can be processed in a given time are dependent on throttle limits and allocated resources for that customer. Spikes in server calls must be reported to Client Care in the same ways that normal data collection dictates.

## Batch Files

When using SDC, server calls are sent in batch files. These files are in a specific CSV format where each row of the file defines the details of a server call. Each row, or server call, must specify an identifier for a visitor as well as a timestamp for when the interaction occurred. The server calls must be ordered chronologically by their timestamps, from earliest to latest, in the batch files (this is a requirement of the underlying Analytics system). Each batch file must also be compressed.

### Batch File Requirements

#### Format
Batch files are CSV files that conform to the [RFC-4180 standard](https://tools.ietf.org/html/rfc4180) with one change: empty lines are ignored.

Each file consists of a header row (the first row in the file) and subsequent data rows. Rows appear on lines, terminated by a line break (CRLF or LF).

Rows are fields separated by commas. If a comma is needed inside of a field (e.g., comma separated list of events), the field can be quoted. For example: field1,"list,of,things",field3. If a field must contain a double-quote, use two double-quotes in succession to represent this. For example: field1,"this is ""double-quotes"" inside a field",field3. This would result in this is "double-quotes" being passed into Analytics.

The header row (first row) defines the columns found in the subsequent rows. Each header field is separated by a comma. A trailing comma is not permitted. Some headers/columns are required (see below), but other columns are defined depending on what data is being passed to Bulk Ingestion. See "CSV Column Reference" below for a full list of supported columns.

Data rows must have the same number of columns defined as the header row. If a row does not contain data in a particular column, the field is left empty but the comma is not omitted (e.g. ,, or ,"",).

The last field in a row must not be followed by a comma.

The last record in the file may or may not have a line break (CRLF or LF).

#### Required Columns
Each header row must contain the following required columns:
- At least one of:
  -  "marketingCloudVisitorID"
  - "IPAddress"
  - customerID.[customerIDType].id with customerID.[customerIDType].isMCSeed set to TRUE (see below for more information)
- At least one of:
  - "pageURL"
  - "pageName"
  - "pe"
  - "queryString" (NOTE: If only "queryString" is used, at least one of pageURL, pageName, or pe must be specified in the "queryString" as a query parameter)
- "reportSuiteID"
- "timestamp"
- "userAgent"

> The "reportSuiteID" column is a list of one or more report suite IDs, delimited by commas.
> The "timestamp" column supports the following formats:
>* POSIX/Epoch Time (e.g., 1486769029)
>* ISO-8601 (e.g., 2017-02-10T16:23:49-07:00)

#### Other Columns
When specifying other columns in the CSV file, please take note of the following rules:
- If a column header is duplicated in a file, only the first instance of the column and its corresponding data fields are used; the duplicates are ignored.
- Column header names are case-insensitive.
- A column header unrecognized by SDC will be ignored.
- Columns can appear in any order in the CSV file

#### Row Order
All rows in a batch file for any given visitor must be sorted in chronological order by timestamp, from earliest to latest; this ensures that visitor events represented in the server calls occur in order. Sorting is crucial for proper purchase attribution, analyzing visitor behavior, etc. Adobe does not guarantee the integrity of data processed by SDC if this order requirement is not strictly observed.

#### Compression
All batch files must be compressed using gzip compression.

#### Size Restrictions
Compressed files can be up to 100 MB.  Uncompressed file size is limited to 1 GB.

#### Naming
The SDC API does not place any restrictions on file names. When submitted via an API call, a file identifier is returned that can be used to track the file. The name of the uploaded file is preserved, however, in the system so that customers have a "friendly" reference point when viewing information about files.

## Query String vs. Column-Based Row

Each row in a file can specify the server call data in one of two ways: using the “queryString” column or specifying server call attributes in individual columns. Any parameters in the "queryString" will be overwritten by columns representing the same data.

For example, if a "queryString" specifies pageName as X, but there is a "pageName" column specified that sets it to Y, then the server row will be passed in as Y into Analytics.

**The other "Required Columns" reportSuiteID, timestamp, and userAgent should NOT be present in the queryString. SDC will add the necessary attributes to the queryString request based on the Required Columns. Other required columns (like pageName, pageURL, or pe) must either be present as a column or as a parameter in the queryString.**

Both Query String and Column-based Rows will result in identical server calls being ingested as long as the same data is represented correctly in both cases.

Some customers prefer the Query String method because they are adapting an existing data collection system to Analytics and already have processes that generate query strings. Changing this process is easier for them as opposed to creating a new extraction system that will generate CSV files in a new format. Other customers have tools that can more easily generate CSV files.

### Query String Format

The *"queryString"* column must have the values in its key/value pairs be fully URL encoded. This includes any multibyte characters included in the field. Its contents will be used in a URI GET or POST call to Analytics. When SDC submits a queryString row to Adobe Analytics, it will add the following param values if they are not present:
- AQB=1 (Start of server call params)
- AQE=1 (End of server call params)
- ce=UTF-8 (Character Encoding of UTF-8)

## Visitor Groups
The visitor groups concept is extremely important to understand. Visitor groups allow customers to upload files that can be processed in parallel, thus increasing the overall ingestion throughput. **Each file uploaded must be tagged with a visitor group via an HTTP header.** There are important rules that must be followed when categorizing batch files into visitor groups.

A visitor group is a set of visitor IDs that are disjoint from any other visitor group set. This affects which server calls can be batched into which files. Because each file belongs to a single visitor group, two files that belong to different visitor groups must always have separate visitor IDs in them--there can be no overlap between visitor IDs across groups.

For example, if a customer has decided to divide their integer visitor IDs into two visitor groups, group A might contain all odd visitor IDs and group B might contain all even visitor IDs. **The method of categorizing them isn’t important as long as a visitor ID in group A will not appear in any of the files uploaded with a group B visitor group tag.**

Customers can split up their visitor IDs and therefore files into any number of visitor groups to increase parallelism and throughput (up to their set throttle limit). The same batch file requirements regarding size, ordering of the timestamps in the files, and the order in which files are uploaded, still apply for each visitor group.

> Another way to think of visitor groups is to view them as separate processing pipelines. Each visitor group creates a separate processing pipeline for files associated with that visitor group. Each pipeline processes files concurrently with other processing pipelines.

### Additional Visitor Group Example
Suppose a set of server calls has integer visitor IDs, 1-100, and we want to create three disjoint visitor group sets. We can use the mathematical MOD operation to organize these visitors into 3 groups. Server calls where “visitor ID MOD 3 = 0” go into visitor group “0”. Server calls where “visitor ID MOD 3 = 1” go into visitor group “1”, and so forth. Server calls are batched into files and ordered by timestamp, per their visitor group, and are then uploaded with that visitor group specified in the header of the API request. Since the visitors in these files are all disjoint, the SDC system can process them in parallel without risking any calls for a visit being processed out of order.

![note visitor group diagram](/images/bia-visitor_groups.jpg)

### Changing Visitor Groups
Customers may wish to change how they divide their visitor IDs into groups over time. This is possible as long as all files using previously named visitor groups completely finish ingestion before files with new visitor group assignments are uploaded. This ensures that there will be no visitor ID overlap between the new groups and old groups.

### Uploading Files in Order
Internally, files have a requirement for timestamp order. Multiple files have the same restriction. For example, if server calls for Visitor A exist over a long period of time, they may be present in multiple batch files. This is supported but the files must be uploaded in chronological order such that server calls for Visitor A are uploaded, even across files, in order. In other words, the server calls for a visitor in a file must not only be sorted chronologically, but the files must also be uploaded chronologically per their server call contents.

When uploading a file via the REST API, it is important to understand that the files will be processed in the order they are received (per visitor group). If you try to upload two files at once for the same visitor group, whichever REST call receives a “200 OK” first will be processed by the system first. Because of possible race conditions, it is important to upload files within a visitor group one at a time, waiting for a “200 OK” from the server that a file has been successfully uploaded before uploading another.

### Number of Visitor Groups, File Size and Send Frequency Recommendations
Streaming Data Collection was designed to run optimally with larger file sizes. We recommend a pattern of larger files uploaded less frequently rather than small files uploaded more frequently.

For an implementation guideline, we offer the following recommendations:
- Ingestion of 2000 rows per second per visitor group
- No more than 1 API call per second per visitor group

Using these guidelines, you can anticipate how many visitor groups to utilize.  For example, suppose your company anticipates submitting 1 billion hits per day.  At a rate of 2000 rows per second, a single visitor group could support about 173 million rows per 24 hours.  Dividing 1 billion (anticipated rows) by 173 million yields 5.7.  So an implementation of at least 6 visitor groups would be appropriate.  To account for visitor groups of unequal size, it may be safer to bump the estimate up.  There would be no harm in using 8-10 visitor groups in this example.

If you used 10 visitor groups, that would result in about 100 million rows per day/per group, or 1160 rows per second.  As far as send frequency, you could choose to send 1 file per visitor group every second (with about 1160 rows), you could send a file of about 5800 rows every 5 seconds, or a file of 11,600 rows every 10 seconds, and so forth.

File size will vary according to the average size of each row.  While we recommend larger files to reduce latency, we can only handle compressed files of up to 100 MB.  However, files of this size should usually be reserved for historical ingest scenarios, as it will increase latency when hits are allowed to build-up this long on the client side.  Existing clients tend to send files with rows between 3,000 and 50,000 rows, and sizes of 500k up to 20 MB.

## Customer ID and Experience Cloud Visitor ID Seeds
SDC provides a way for a customer ID to be specified which Adobe will use as a seed to automatically generate an Experience Cloud Visitor ID (ecid, formerly called Marketing Cloud Visitor ID or mid). This functionality simplifies the process of generating your own ecid, which would require a separate server call for every visitor. Providing your own customer ID as a seed for an ecid is done by adding a column to specify a "customerID.[customerIDType].id" and another boolean column, "customerID.[customerIDType].ismcseed" to denote which customer ID should be used as the seed. Other columns can be used to further define the customer ID as well. See the table below for more information about the available columns.

### Customer ID Columns and Query String Parameters
When specifying a customerID column, you must choose a customerIDType to correlate the columns to each other. The customerIDType can be any alphanumeric string, but it should be considered case-sensitive. For example, if there was a user ID and also an e-mail that an Analytics customer wanted to send into Analytics, they could choose "userIdent" and "userEmail," respectively, for the two customerIDTypes. If the end-user logs in using their user ID then a customer could specify "customerID.userIdent.authState" set to "AUTHENTICATED" in the data field for a user that is logged in, and "customerID.userIdent.id" would be set to their user ID.

|Header/Column Name|Query String Parameter Equivalent|Field Description|
|--|--|--|
| customerID.[customerIDType].id | cid.[customerIDType].id | The customer ID to use. |
| customerID.[customerIDType].authState | cid.[customerIDType].as | The authenticated state of the visitor. Supported values are: '0', '1', '2', 'UNKNOWN', 'AUTHENTICATED', 'LOGGED_OUT', or '' (case insensitive). Two consecutive single quotes ('') causes the value to be omitted from the query string which translates to 0 when the rows is processed. Please note the supported authState numeric values denote the following: 0 = UNKNOWN, 1 = AUTHENTICATED, 2 = LOGGED_OUT. |
| customerID.[customerIDType].isMCSeed | cid.[customerIDType].ismcseed | Whether or not this is the seed for the Marketing Cloud Visitor ID. Supported values are: '0' (for false) and '1' (for true).  Using '0' or two consecutive single quotes ('') causes the value to be omitted from the query string. |

### Customer ID Validation Rules
The following validation rules are applicable to the Customer ID columns:
- The customerIDType may not be empty
- The authState and isMCSeed must be one of the valid values stated in the table above.
- At least one of the following Visitor IDs must be provided in each row:
  - customerID.[customerIDType].id with a true customerID.[customerIDType].isMCSeed
  - VisitorID
  - MarketingCloudVisitorID
  - ipAddress
- If isMCSeed is set to true, the customerID may not be empty
- There can only be ONE field specified as the isMCSeed per IMS Organization.  This field name must be communicated before use to the SDC team for provisioning on the back-end.

## Throttle Limits
Before using Streaming Data Collection, a customer must provide an expected volume of ingestion. From the expected volume, a per-second throttle limit is configured within our system. This configuration throttles the number per-second ingestion server calls. If the system detects the throttle limit may be exceeded, it will process uploaded files more slowly to stay within the limit.

These limits help ensure a timely processing and availability of data for Adobe Analytics reporting. They also help protect the system from becoming overwhelmed before proper capacity has been provisioned for a sharp increase in call volume.

## Processing Times
When using client-side server call collection methods there is a period of time, between 20-50 minutes, before segmentable Analytics reports are fully available. Some real-time statistics, such as page views, can be available within sub-minute timeframes. The time before reports are available is called “latency.”

## Failure Scenarios 
There are two reasons that a file may fail to successfully ingest all of its rows: 
* Something is wrong with the file and its format
* There is an irrecoverable error inside of SDC due to an unexpected system failure

### Internal System Failure 
The SDC API has been built with redundancy and safeguards to ensure that issues due to unexpected system failures are rare. If it does occur, Adobe's monitoring will alert our on-call support staff to help address the system failure as quickly as possible. All files received are stored safely server-side for ingestion once the system stabilizes.

### Malformed File 
When a file fails because something is wrong with the file, this is likely due to a change or a bug in the process that generates the files. On initial implementation, or following a reconfiguration of your generated files, we encourage users to validate their files using the validate API endpoint before submitting them to SDC to ensure that nothing is wrong with the file format. This validation is identical to the validation that occurs when a file is being processed. It is a helpful tool while testing and developing your file generation process.

Once an automated process is established to generate and submit files to SDC, most customers should not experience errors due to malformed files.

#### File Not in GZIP Format
If a file is not in the proper GZIP format, it will result in the state of "File Error" and no rows will be processed. It is recommended that the file creation process be checked to ensure that it is properly compressing files.

#### Entire File Fails: No Valid Rows
If the entire file fails, regardless of the size of the file, it is recommended to figure out why the file has problems, make adjustments to the file creation process, and re-create and re-upload the file. This will not result in any duplicate data, because none of the data rows were ingested into Analytics. A customer can look at the "invalid_rows" and "rows" field in the API response message to determine if all of the rows failed. If "invalid_rows" is equal to "rows," then no rows were successfully ingested.

#### Mostly Valid Rows
If a file with a large amount of rows is submitted, but a small percentage of those rows fail, it is probably best to not re-submit the file. If you re-submit a file, but most of the rows were successfully ingested during its initial processing, the majority of the rows will result in duplicated data in Analytics. Accepting that a small amount of rows were lost is typically better than duplicating a larger amount of data.

#### Mostly Invalid Rows
If a file is submitted, and a large percentage of the rows have failed, then it might make sense to repair the rows and re-submit the file, resulting in minimal duplicate hits. This should only be done, however, when the missed server calls are individually significant and the pipeline of hits can be stalled long enough to investigate and repair the error. Otherwise, we recommend fixing the file generation process and not trying to re-submit the file. 

## REST API Details
Customers use Streaming Data Collection by interacting with a set of REST APIs over SSL/TLS. This section details each API operation and gives examples of how to interact with the REST API.

### URI Host
Regardless of which data center your report-suite resides in, SDC calls can be directed to a single global host name for most clients. However, if you are legally required to have your data processed in a specific part of the world, we also make available direct access to regional hosts to ensure your data is processed where it needs to be. This hostname value will be referred to as <SDC_HOST> in this document.
|Location| Hostname| Comment |
|--|--|--|
| Global | https://analytics-collection.adobe.io | Auto-routing |
| US Processing | https://analytics-collection-va7.adobe.io | Regional |
| European Processing | https://analytics-collection-nld2.adobe.io | Regional |


### Authentication
SDC uses Adobe's Identity Management Service (IMS) to facilitate authentication.  This process consists of registering with our Adobe/IO API console to gain credentials, packaging those credentials as a JSON Web Token (JWT), exchanging the JWT for an expirable access token, then passing that access token in with your SDC API requests. Detailed inforation on JWT Authentication can be found [here](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/JWT/JWT.md)

### File ID Value
Every file ingest transaction will receive a GUID to uniquely identify that ingest event.  Our system can auto-assign this GUID and return it with the initial upload response.  Alternatively, the client has the option to pass in their own identifier with each request. This is done through use of the "x-adobe-fileid" header field. See the Operations section below for examples.

### Response Codes
The following response codes are returned by the REST API and should be handled by clients interfacing with the API:

| HTTP_Response | Description |
|--|--|
| 100 - Continue | This is used when uploading a file. This is sent to a client after authentication is checked and the HTTP request headers are validated. This signals to the client that they can begin to upload the large file. For example, if a client waits for this response code before sending a file, it can avoid uploading an entire file before learning that a visitor group ID was not specified.
| 400 - Bad Request | Required headers are missing or the uploaded file is missing critical information or is malformed
| 401 - Unauthorized | The API key or user token used to interact with the API is not valid.
| 403 - Forbidden | Occurs when attempting to perform an action that is not currently allowed.
| 404 - Not Found | Occurs when attempting to call an undefined endpoint
| 413 - Payload Too Large | Returned when the file being uploaded is larger than the permitted size.
| 429 - Too Many Requests | Occurs when the number of API calls exceeds the system limits.
| 500 - Internal Error | Occurs when the API encounters an unexpected internal error that it is unable to recover from.

### File Info Response Details
With a file ingest POST request, a file object will be returned in the response.  That file object may contain any or all of the following fields listed below.

|Field|Datatype|Description|
|--|--|--|
| file_id | string | Unique identifier for the file upload transaction (auto-assigned during transaction or pre-selected by client and passed in with request as "x-adobe-fileid" header) |
| visitor_group | string | Name of the visitor group submitted in the 'x-adobe-vgid' header field |
| size | long | Size, in bytes, of the uploaded file |
| received_date | long | Timestamp (unix epoch time) when file upload was received |
| processing_start_date | long | Timestamp (unix epoch time) when file processing began |
| file_reader_complete_date | long | Timestamp (unix epoch time) when file read step completed. |
| processing_end_date | long | Timestamp (unix epoch time) when file processing completed |
| rows | integer | Number of rows contained in file |
| invalid_rows | integer | Number of invalid rows identified in the file |

## Operations
### File
| | |
|:--|:--|
| Title | Upload File for Processing
| Method | POST
| URL | `/aa/collect/v1/events`
| Headers | **x-adobe-vgid**: *REQUIRED* - Visitor Group ID. A visitor group represents the name of the processing pipeline to use when processing the file. This can be any name you choose. Files uploaded to different visitor groups should have disjoint visitor IDs.|
||**x-api-key**: *REQUIRED* - "Client ID" string issued upon integration with the API through the Adobe.IO console. Found under the "Service Account (JWT)" credentials in the console.
||**x-adobe-fileid**: *OPTIONAL* - File ID. This can be generated by the client and passed in with the request, or alternatively if not received, SDC will generate its own and return it with the response.
| Multipart/Form Data Fields | **file**: *REQUIRED* - The file contents to be uploaded via multipart/form-data. Send a gzip compressed file.

#### Success Response
| HTTP Code| JSON Response|
|--|:--|
| 200 Success |  See *File Info Response Details* above |

#### Error Responses

| HTTP Code | JSON Response |
|--|:--|
| 400 Bad Request | {"error": "Request is missing required header 'x-adobe-vgid' " } |
| 400 Bad Request | {"error": "CSV file missing required header timestamp." } |
| 401 Unauthorized | {"error": "Token validation failed" } |

#### Sample Call
```curl -X POST -F file=@/tmp/newfile_1489183489.gz -H "x-adobe-vgid:prod-18" -H "x-adobe-fileid:a00ce559-2489-497d-9b52-acfa33fe692b" -H "Authorization: Bearer <IMS_ACCESS_TOKEN>" "https://<SDC_HOST>/aa/collect/v1/events" ```

### Validation
|||
|--|:--|
| Title| Validate File
| Description | This endpoint primarily exists for new clients that would like to test out their file format before submitting files for processing. Files uploaded to this endpoint will not be stored on the server nor processed. This API is synchronous and will return an immediate reply if the file passes validation. If not, information about why validation fails is returned. *Note that the same validate functionality is automatically run anytime a file is submitted to the `/events` endpoint.*
| Method | POST
| URL | `/aa/collect/v1/events/validate`
| Headers | **x-api-key**: *REQUIRED* - "Client ID" string issued upon integration with the API through the Adobe.IO console. Found under the "Service Account (JWT)" credentials in the console. |
| Multipart/Form Data Fields | **file**: *REQUIRED* - Send a gzip compressed file.

#### Success Response
| HTTP Code| JSON Response|
|--|:--|
| 200 Success |{"success": "file is valid"}

#### Error Responses
| HTTP Code| JSON Response|
|--|:--|
| 400 Range Error | {"error":"File has 2 rows that do not conform to the required CSV format! (Ex: row #59)"} |
| 401 Unauthorized | {"error" : "Token validation failed" }

#### Sample Call
```curl -X POST -H "Authorization: Bearer <IMS_ACCESS_TOKEN>" -F file=@/some/path/file.gz "https://<SDC_HOST>/aa/collect/v1/events/validate"```

## Error Handling
When processing files, problems may occur (see Failure Scenarios for more details). If rows are malformed, and skipped, the data for that visitor and visit may be corrupted. There is no way for Adobe to repair this corruption.  In light of this, we strongly encourage customers to validate file formats thoroughly before submitting for processing. We also recommend using a development report suite to test out changes to file generation and submission process.

Below are the list of possible errors and their results:
 
| Error Description | Result |
|:--|:--|
| File not in supported compression format | File is marked as failed |
**Sample JSON Response**
```
{
  "file_id": "7d7290b7-ee69-4332-8561-0c03251bed05",
  "upload_name": "1_bad_compression.gz",
  "status": "File format error"
}
```
| Error Description | Result |
|:--|:--|
| File does not contain the required header column list | File is marked as failed |
```
{
  "file_id": "ffd82ef7-3b6c-4e31-b3f5-4ff9b91e5b7d",
  "received_date": 1589931310,
  "processing_start_date": 1589931313,
  "processing_end_date": 1589931319,
  "visitor_group_id": "vg_10",
  "rows": 2,
  "size": "1847", 
  "invalid_rows": 2,
  "processing_log": "22:07:49.305 [main] ERROR - No ReportSuiteID found in the file header or in the file upload. This must be present in order to submit a hit.
22:07:49.307 [main] ERROR - No timestamp field found in the file header.
22:07:49.307 [main] ERROR - No user-agent found in the file header.
22:07:49.308 [main] WARN - Processing complete: 0 rows will be submitted. 2 rows were invalid.",
  "upload_name": "sample_file_1.gz",
  "status": "Ingest completed"
}
```
| Error Description | Result |
|:--|:--|
| A row does not specify the minimum number of required fields | The row is skipped, and the error count for the file is incremented.
```
{
  "file_id": "e9ecfcea-815c-4691-83c2-575b2338dce4",
  "received_date": 1589931310,
  "processing_start_date": 1589931313,
  "processing_end_date": 1589931319,
  "visitor_group_id": "vg_10",
  "rows": 1258,
  "size": "157850", 
  "invalid_rows": 1,
  "processing_log": "22:13:23.428 [main] WARN - On row: 17, missing 'ReportSuiteId'. This row will not be submitted.
22:13:23.428 [main] WARN - Processing complete: 1257 rows will be submitted. 1 rows were invalid.",
  "upload_name": "sample_file_2.gz",
  "status": "Ingest completed"
}

```
| Error Description | Result |
|:--|:--|
|A row is malformed CSV and cannot be parsed | The row is skipped, and the error count for the file is incremented.|
```
{
  "file_id": "7d7fe5ac-dd43-4a67-aabf-f94f4d8fb239",
  "received_date": 1589931310,
  "processing_start_date": 1589931313,
  "processing_end_date": 1589931319,
  "visitor_group_id": "vg_10",
  "rows": 100,
  "size": "12873", 
  "invalid_rows": 2,
  "processing_log": "22:17:01.649 [main] WARN - On row: 72, inconsistent column count. Expected 5 columns, but found 6.
22:17:01.649 [main] WARN - On row: 75, inconsistent column count. Expected 5 columns, but found 4.
22:17:01.649 [main] WARN - Processing complete: 98 rows will be submitted. 2 rows were invalid.",
  "upload_name": "sample_file_3.gz",
  "status": "Ingest completed"
}
```

## Removing Data from Analytics
If incorrect or sensitive data (PII) is ingested via Streaming Data Collection, there is no productized method to remove this data. Engineering Services can assist customers in removing data that was accidentally inserted, but that will require a separate service engagement per incident.



## CSV Column and Query String Reference
The following columns are supported in the SDC file format.

Header/Column Name | Query String Param Equivalent | Field Description
--|--|--
aamlh | aamlh | Adobe Audience Manager location hint. See valid ID values in the AAM region listing table below.
browserHeight | bh | Browser height in pixels (For example, 768).
browserWidth | bw | Browser width in pixels (For example, 1024).
campaign | v0 | The campaign tracking code associated with the page.
channel | ch | The page title or bread crumb.
colorDepth | c | Monitor color depth in bits (For example, 24).
connectionType | ct | Visitor's connection type ("lan" or "modem").
contextData.key | c.[key] | Key-values pairs are specified in by naming the header "contextData.product" or "contextData.color".
cookiesEnabled | k | Whether the visitor supports first party session cookies (`Y` or `N`).
currencyCode | cc | Revenue currency code For example, USD.
customerID.[customerIDType].id | cid.[customerIDType].id | The customer ID to use. The customerIDType can be any alphanumeric string, but should be considered case-sensitive.
customerID.[customerIDType].authState | cid.[customerIDType].as | The authenticated state of the visitor. Supported values are: `0`, `1`, `2`, `UNKNOWN`, `AUTHENTICATED`, `LOGGED_OUT`, or '' (case insensitive). Two consecutive single quotes ('') causes the value to be omitted from the query string which translates to 0 when the hit is made. Please note the supported authState numeric values denote the following: `0 = UNKNOWN`, `1 = AUTHENTICATED`, `2 = LOGGED_OUT`. The customerIDType can be any alphanumeric string, but should be considered case-sensitive.
customerID.[customerIDType].isMCSeed | cid.[customerIDType].ismcseed | Whether or not this is the seed for the Marketing Cloud Visitor ID. Supported values are: `0`, `1`, `TRUE`, `FALSE`, '' (case insensitive). Using `0`, `FALSE`, or two consecutive single quotes ('') causes the value to be omitted from the query string. The customerIDType can be any alphanumeric string, but should be considered case-sensitive.
eVar# For example, eVar2. | v# For example, v2. | Analytics eVar.
events | events | A list of Analytics events. Multiple events are separated by a comma in each data row field.
hiern For example, hier2. | h# For example, h2 | A hierarchy string.
homePage | hp | Whether the current page is the visitor's homepage (`Y` or `N`).
ipaddress | N/A (Can only be supplied via column header) | The visitor's IP address.
javaEnabled | v | Whether the visitor has Java enabled (`Y` or `N`).
javaScriptVersion | j | JavaScript version. For example, 1.3.
language | N/A (Can only be supplied via column header)	 | The browser's supported language. For example, "en-us".
linkName | pev2 | Name of link.
linkType | pe | Type of link (`d`, `e`, or `o`).
linkURL | pev1 | The link's HREF. For custom links, page values are ignored.
listn For example, list2. | l# | A delimited list of values that are passed into a variable, then reported as individual line items for reporting.
pageName | pageName | The Web page name.
pageType | pageType | The Web page type. This is only used on 404 error pages. Set pageType to "Error Page" for when a 404 error is detected.
pageURL | g | The Web page URL For example, http://www.mysite.com/index.html.
plugins | p | Semicolon separated list of Netscape plug-in names.
products | products | List of all products on the page. Separate products with a comma. For example: Sports;Ball;1;5.95,Toys; Top;1:1.99.
propn For example, prop2. | c# | For example, c2 | Analytics property name.
purchaseID | purchaseID | Purchase ID number.
referrer | r | The URL of the page referrer.
reportSuiteID | Contained in the URL. See HTTP GET Sample. | Specifies the report suites where you want to submit data. Separate multiple report suite IDs with a comma.
resolution | s | Monitor resolution For example, 1280x1024.
server | server | The Web server serving the page.
state | state | The visitor's U.S. state.
timestamp | ts | The time and date on which the data was collected.
~~timezone~~ | Not supported at this time. | |
tnta | tnta | Target data payload, for use with A4T integrations
~~trackingServer~~ | N/A | *Can only be supplied via column header*
transactionID | xact | Common value used to tie multi-channel user activities together for reporting purposes. For more information, see the Data Sources User Guide.
~~userAgent~~ | N/A | *Can only be supplied via column header*
visitorID | vid | Visitor's Analytics ID. See Visitor Identification.
marketingCloudVisitorID | mid | Marketing Cloud ID. See Visitor Identification and the Marketing Cloud Visitor ID Service.
zip | zip | The visitor's zip code.


### Adobe Audience Manager Regions (for use with aamlh parameter)
AAMLH | Location |AAM Endpoint
:--:|--|--
6 | Amsterdam | irl1.demdex.net
8 | Australia | apse2.demdex.net
7 | AWS US East | use.demdex.net
9 | California | usw2.demdex.net
3 | Hong Kong | apse.demdex.net
6 | London | irl1.demdex.net
9 | Oregon | usw2.demdex.net
3 | Singapore | apse.demdex.net
7 | Texas | use.demdex.net
11 | Tokyo | tyo3.demdex.net
7 | Virginia | use.demdex.net


### Batch File Examples
##### Batch File with Query String:
```
timestamp,visitorid,reportsuiteid,querystring,useragent
1492191617,44444445,rsidfake,AQB=1&pageName=PIGINI&v2=Var21&v3=Var31&c1=val11
&c2=val21&c3=val31&bh=1000&bw=999&c=1024&j=3.41&k=1&p=1&s=1111&v=1&channel=TonyChannel
&pev1=https%3A%2F%2Fwww.adobe.com%2Fwho%3Fq%3Dwhoisit&state=UT&zip=84005&cc=USD
&events=prodView%2Cevent2&AQE=1,"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) 
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36"
1492191627,44444445,rsidfake,AQB=1&pageName=PIGINI&v2=Var22&v3=Var32&c1=val12
&c2=val22&c3=val32&bh=1000&bw=999&c=1024&j=3.41&k=1&p=1&s=1111&v=1&channel=TonyChannel
&pev1=https%3A%2F%2Fwww.adobe.com%2Fwho%3Fq%3Dwhoisit&state=UT&zip=84005&cc=USD
&events=prodView%2Cevent2&AQE=1,"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) 
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36"
```
##### Batch File (Column-based) with Quotes in User Agent:
```
pageName,timestamp,reportSuiteID,visitorID,userAgent,campaign,contextData.color,contextData.frame,pageURL,prop1,channel
中文网站,1495483797,bogus.smaple.rsid,238915514,"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1 ""Special
 Build""",Summer,Red,Titanium,http://somedomain.org/path?param=val&param2=val2,p2,Mobile
中文网站,1495483797,bogus.smaple.rsid,142805255,"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1 ""Special
 Build""",Summer,Gray,Carbon,http://somedomain.org/path?param=val&param2=val2,p2,Mobile
```

## Document Versioning
As changes are made to the SDC API and its documentation, we will summarize the changes below.
Version | Date | Change Details
--|--|--
1.0.0| 5/1/20| General Availability version of the SDC API released.  First public documentation published.

