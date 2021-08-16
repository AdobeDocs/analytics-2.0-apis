---
title: Troubleshoot bulk data insertion uploads
description: Learn potential errors you can get and how to resolve them.
---

# Troubleshoot bulk data insertion uploads

Use the following possible solutions to help determine why an upload failed.

**IMPORTANT:** Adobe highly encourages you to use the [Validate](validate.md) endpoint when establishing a BDIA workflow. If you do not first validate a file, you could end up with a combination of invalid and valid hits. The valid hits are processed, while the invalid hits are discarded. If you repair the file and upload it again, the originally valid hits are counted twice.

## File Not in GZIP Format

If a file is not in proper GZIP format, it results in the state of "File Error" and no rows are processed. Adobe recommendeds that the file creation process is checked to ensure that it properly compresses files.

```json
{
  "file_id":"3ae262c5-cdea-4bdb-a41c-fbd2c2004c4d",
  ...
  "status_code":"REJECTED",
  "processing_log":"An error occurred: Not in GZIP format",
  "error":"No hits were found in the file."
}
```

## Does not contain a required header column

Each hit requires at least one identifier:

* VisitorID
* MarketingCloudVisitorID
* IPAddress
* CustomerID

```json
{
  "file_id":"3ae262c5-cdea-4bdb-a41c-fbd2c2004c4d",
  ...
  "status_code":"REJECTED",
  "processing_log":"No visitor ID found in the file header.  There must be one of VisitorID, MarketingCloudVisitorID, IPAddress, or CustomerID defined...",
  "error":"No valid rows were found in the file."
}
```

## Missing timestamp

Each hit must have an associated timestamp.

```json
{
  "file_id":"3ae262c5-cdea-4bdb-a41c-fbd2c2004c4d",
  ...
  "status_code":"REJECTED",
  "processing_log":"No timestamp field found in the file header. Processing complete: 0 rows will be submitted. 5000 rows were invalid.",
  "error":"No valid rows were found in the file."
}
```

## Some rows missing values

If some rows have missing required values, those hits are skipped.

```json
{
  "file_id":"3ae262c5-cdea-4bdb-a41c-fbd2c2004c4d",
  ...
  "status_code":"UPLOADED",
  "processing_log":"On row: 1, missing 'UserAgent'. This row will not be submitted. On row: 57, missing 'ReportSuiteId'. This row will not be submitted. Processing complete: 4998 rows will be submitted. 2 rows were invalid."
}
```

## Inconsistent column count

If some rows have the wrong number of columns, those hits are skipped.

```json
{
  "file_id":"3ae262c5-cdea-4bdb-a41c-fbd2c2004c4d",
  ...
  "status_code":"UPLOADED",
  "processing_log":"On row: 1, inconsistent column count. Expected 5 columns, but found 6. On row: 3, inconsistent column count.  Expected 5 columns, but found 4. Processing complete: 4998 rows will be submitted.  2 rows were invalid."
}
```

## Product availability

BDIA is built with redundancy and safeguards to ensure that issues due to unexpected system failures are rare. If it occurs, Adobe's monitoring alerts on-call staff to address the availability issue as quickly as possible. All files received are stored safely server-side for ingestion once the system stabilizes.
