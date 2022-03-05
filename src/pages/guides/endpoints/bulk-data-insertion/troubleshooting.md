---
title: Troubleshoot bulk data insertion uploads
description: Learn potential errors you can get and how to resolve them.
---

# Troubleshoot uploads

Use the following possible solutions to help determine why an upload failed.

<InlineAlert variant="warning" slots="text"/>

Adobe highly encourages you to use the [Validate](endpoints.md#validate) endpoint when establishing a BDIA workflow. If you do not first validate a file, you could end up with a combination of invalid and valid hits. The valid hits are processed, while the invalid hits are discarded. This scenario causes major issues with data quality, such as visit/visitor count and attribution.

This page is divided into three sections: **issues with the file**, **issues with individual rows**, and **product availability**. Courses of action depend on the root of the issue.

## Issues with the file

If Adobe encounters an issue with the file as a whole, the upload fails entirely and no rows are processed. You can fix the file and upload it again to successfully ingest it into Adobe Analytics.

### Not in GZIP Format

If a file is not in proper GZIP format, it results in the state of "File Error" and no rows are processed. Adobe recommends that the file creation process is checked to ensure that it properly compresses files.

```json
{
  "file_id":"3ae262c5-cdea-4bdb-a41c-fbd2c2004c4d",
  ...
  "status_code":"REJECTED",
  "processing_log":"An error occurred: Not in GZIP format",
  "error":"No hits were found in the file."
}
```

### Does not contain a visitor ID header column

A file must contain at least one visitor ID column. If you upload a file that does not contain any of the available visitor ID columns, the upload fails and no rows are processed. This error relates to missing column headers altogether, not individual rows missing required columns.

```json
{
  "file_id":"3ae262c5-cdea-4bdb-a41c-fbd2c2004c4d",
  ...
  "status_code":"REJECTED",
  "processing_log":"No visitor ID found in the file header.  There must be one of VisitorID, MarketingCloudVisitorID, IPAddress, or CustomerID defined...",
  "error":"No valid rows were found in the file."
}
```

### Missing timestamp

A file must contain the `timestamp` column. If you upload a file that does not contain the `timestamp` column, the upload fails and no rows are processed. This error relates to a missing column header, not individual rows missing a `timestamp` value.

```json
{
  "file_id":"3ae262c5-cdea-4bdb-a41c-fbd2c2004c4d",
  ...
  "status_code":"REJECTED",
  "processing_log":"No timestamp field found in the file header. Processing complete: 0 rows will be submitted. 5000 rows were invalid.",
  "error":"No valid rows were found in the file."
}
```

## Issues with individual rows

If Adobe encounters an issue with an individual row in an otherwise valid file, that row is skipped. Depending on the proportion of hits skipped, you face a difficult situation:

* If most rows are valid with a few skipped rows, you can leave the ingested data as-is and accept that the skipped rows are not in Adobe Analytics; or
* If most rows are skipped, you can fix the file and accept that previously valid rows are double counted.

Isolating skipped rows and uploading them in a separate API call is not advised because that means that visitor data is uploaded out of order. Data uploaded in the wrong order can cause issues with data quality. All of these scenarios are costly and can easily be avoided if you use the `validate` endpoint before ingesting data into Adobe Analytics.

### Some rows missing values

If some rows have missing required values, those hits are skipped.

```json
{
  "file_id":"3ae262c5-cdea-4bdb-a41c-fbd2c2004c4d",
  ...
  "status_code":"UPLOADED",
  "processing_log":"On row: 1, missing 'UserAgent'. This row will not be submitted. On row: 57, missing 'ReportSuiteId'. This row will not be submitted. Processing complete: 4998 rows will be submitted. 2 rows were invalid."
}
```

### Inconsistent column count

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
