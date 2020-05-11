# Analytics Bulk Ingestion API User's Guide 2.0

**VERSION 1.0.0**

## Overview

The Analytics Bulk Ingestion API is an Adobe Analytics capability allowing customers to upload server call data in batches of files as opposed to using client-side JavaScript (e.g., as tags on for web pages or other APIs embedded in application code). The server calls in these batch files can be either current (live) data or historical data. The concept is similar to the long-available Analytics Data Insertion API. In fact, Bulk Ingestion can be thought of as a different interface to this very scalable service.

Bulk Ingestion solves several problems in a variety of use cases. Some examples include:

    - A new customer wishes to ingest historical data from a previous analytics system.

    - A customer may have an internal analytics collection system that makes it infeasible to use Adobe’s “client-side” collection code. The customer can use ETL processes to extract and transform data into batch files and, finally, use Bulk Ingestion to upload them to Adobe Analytics.

    - A customer may collect data from devices that have only intermittent connectivity to the Internet. These devices store up the interactions until they receive a connection and then they can upload the historical data all at once via Bulk Ingestion.

Using the Data Insertion API can solve all of the above use cases; however, the customer must then build software that processes the server calls, inserts them in the correct order, responds to errors, and uses sufficient concurrency to achieve the desired ingestion volume. For very large amount of data, it is not unusual a customer to need dozens of hosts with sufficient Internet bandwidth to handle the required number of server calls.

The Analytics Bulk Ingestion API removes this burden from customers by providing a productized system that scales, handles errors, and addresses the finer details of inserting data into Adobe Analytics.

## Limitations

- Bulk Ingestion can only send data to report suites that are "Timestamp enabled" or "Timestamp optional."
- Historical data for a visitor grouping must be ingested before any current data can be processed, unless Timestamp Optional report suites are being used and visitor continuity is not possible or not desirable.
- The amount of server calls that can be processed in a given time are dependent on throttle limits and allocated resources for that customer. Spikes in server calls must be reported to Client Care in the same ways that normal data collection dictates.

## Batch Files

When using Bulk Ingestion, server calls are sent in batch files. These files are in a specific CSV format where each row of the file defines the details of a server call. Each row, or server call, must specify an identifier for a visitor as well as a timestamp for when the interaction occurred. The server calls must be ordered chronologically by their timestamps, from earliest to latest, in the batch files (this is a requirement of the underlying Analytics system). Each batch file must also be compressed.

### Batch File Requirements

#### Format

Batch files are CSV files that conform to the RFC-4180 standard (https://tools.ietf.org/html/rfc4180) with one change: empty lines are ignored.
