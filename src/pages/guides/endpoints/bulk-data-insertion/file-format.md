---
title: BDIA file format
description: Create a file in the correct format so Adobe can ingest it.
---

# BDIA file format

The Bulk Data Insertion API ingests data into Adobe Analytics using batch files. These files are in a specific CSV format where each row of the file contains details of a server call. Each row, or server call, must specify an identifier for a visitor as well as a timestamp for when the interaction occurred. The server calls must be ordered chronologically by their timestamps, from earliest to latest, in the batch files. Each batch file must also be compressed.

## Batch file requirements

Batch files must conform to all of the following requirements:

* The file format is in CSV, conforming to the [RFC-4180 standard](https://datatracker.ietf.org/doc/html/rfc4180) with one exception; empty lines are ignored.
* The file consists of a header row (the first row in the file) and subsequent data rows.
* Header columns and fields are delimited by commas. If you have commas in values, surround the value in double quotes (`"`). If you also have double quotes in values, use double quotes inside the value. For example, `field1,"Value with ""quotes"", and a comma.",field3` The value that appears in reporting would be `Value with "quotes", and a comma.`
* Adobe supports both `CRLF` and `LF` line breaks to separate rows. A line break at the end of a data file is optional.
* Every row must have the same number of columns as the header row. If you want to omit a column from a row, leave the field empty or pass an empty string. For example, `field1,,field3` or `field1,"",field3`.
* Trailing commas for header rows or data rows are not permitted.
* All rows in a batch file for any given visitor must be sorted in chronological order by `timestamp` from earliest to latest. Following this rule is crucial for attribution and analyzing visitor behavior. Adobe does not guarantee the integrity of data processed by this API if this rule is not strictly observed.
* All batch files must be compressed using gzip compression.
* Compressed file sizes are limited to 100 MB. Uncompressed file sizes are limited to 1 GB.

## Required columns

Every row must contain the following five data points:

* At least one of:
  * `marketingCloudVisitorID`
  * `IPAddress`
  * `visitorID`
  * `customerID.[customerIDType].id` with `customerID.[customerIDType].isMCSeed` set to `true`. See [Customer ID and Experience Cloud Visitor ID seeds](customer-id.md) for more information.
* At least one of:
  * `pageURL`
  * `pageName`
  * `linkType` (Also include `linkURL` and/or `linkName`)
  * `queryString` that includes `pageURL`, `pageName`, or `linkType` as query string parameters with values
* `reportSuiteID`
* `timestamp`
* `userAgent`

## Query string or column-based row

Adobe offers two ways to populate rows with data.

* **Use column headers**: Use a separate column for each variable.
* **Use the `queryString` column**: Include most data in the `queryString` column. This method is particularly helpful for implementations that use data directly from AppMeasurement. You can include the image request's entire query string in this column with minimal adjustments. Other columns, such as `timestamp` and `reportSuiteID`, are not included in `queryString` and are still required as column headers.

You can combine both of these methods in any amount to fill out rows with data. If a variable is present as both a query string and its column header, the column header value takes priority. For example, if the `pageName` column is `"Column header example"` and the `queryString` column contains `"pageName=Query string example"`, the value that Adobe uses is `"Column header example"`.

## CSV and query string column reference

Adobe supports the following columns when using this API.

Header/Column Name | Query String Param Equivalent | Field Description
--|--|--
`aamlh` | `aamlh` | Integer that represents the Adobe Audience Manager location hint. Valid values include:<br/>**`3`**: Hong Kong/Singapore (`apse.demdex.net`)<br/>**`6`**: Amsterdam/London (`irl1.demdex.net`)<br/>**`7`**: US Central/East (`use.demdex.net`)<br/>**`8`**: Australia (`apse2.demdex.net`)<br/>**`9`**: US West (`usw2.demdex.net`)<br/>**`11`**: Tokyo (`tyo3.demdex.net`)
`browserHeight` | `bh` | The [Browser height](https://experienceleague.adobe.com/docs/analytics/components/dimensions/browser-height.html) dimension.
`browserWidth` | `bw` | The [Browser width](https://experienceleague.adobe.com/docs/analytics/components/dimensions/browser-width.html) dimension.
`campaign` | `v0` | The [Tracking code](https://experienceleague.adobe.com/docs/analytics/components/dimensions/tracking-code.html) dimension.
`channel` | `ch` | The [Site section](https://experienceleague.adobe.com/docs/analytics/components/dimensions/site-section.html) dimension.
`colorDepth` | `c` | The [Color depth](https://experienceleague.adobe.com/docs/analytics/components/dimensions/color-depth.html) dimension.
`connectionType` | `ct` | The [Connection type](https://experienceleague.adobe.com/docs/analytics/components/dimensions/connection-type.html) dimension.
`contextData.key` | `c.[key]` | [`contextData`](https://experienceleague.adobe.com/docs/analytics/implementation/vars/page-vars/contextdata.html) implementation variables.
`cookiesEnabled` | `k` | The [Cookie support](https://experienceleague.adobe.com/docs/analytics/components/dimensions/cookie-support.html) dimension.
`currencyCode` | `cc` | The [`currencyCode`](https://experienceleague.adobe.com/docs/analytics/implementation/vars/config-vars/currencycode.html) implementation variable.
`customerID.[customerIDType].id` | `cid.[customerIDType].id` | The customer ID to use. See [Customer ID and Experience Cloud Visitor ID seeds](customer-id.md).
`customerID.[customerIDType].authState` | `cid.[customerIDType].as` | The authenticated state of the visitor. See [Customer ID and Experience Cloud Visitor ID seeds](customer-id.md).
`customerID.[customerIDType].isMCSeed` | `cid.[customerIDType].ismcseed` | Whether this is the seed for the Marketing Cloud Visitor ID. See [Customer ID and Experience Cloud Visitor ID seeds](customer-id.md).
`eVar1` - `eVar250` | `v1` - `v250` | [eVar](https://experienceleague.adobe.com/docs/analytics/components/dimensions/evar.html) dimensions.
`events` | `events` | The [`events`](https://experienceleague.adobe.com/docs/analytics/implementation/vars/page-vars/events/events-overview.html) implementation variable.
`hier1` - `hier5` | `h1` - `h5` | [Hierarchy variables](https://experienceleague.adobe.com/docs/analytics/implementation/vars/page-vars/hier.html).
`ipaddress` | N/A (Only available with column header) | The visitor's IP address.
`javaEnabled` | `v` | The [Java enabled](https://experienceleague.adobe.com/docs/analytics/components/dimensions/java-enabled.html) dimension.
`language` | N/A (Only available with column header) | The [Language](https://experienceleague.adobe.com/docs/analytics/components/dimensions/language.html) dimension.
`linkName` | `pev2` | The [Download link](https://experienceleague.adobe.com/docs/analytics/components/dimensions/download-link.html), [Exit link](https://experienceleague.adobe.com/docs/analytics/components/dimensions/exit-link.html), or [Custom link](https://experienceleague.adobe.com/docs/analytics/components/dimensions/custom-link.html) dimension, depending on the value in the `linkType` column. If this column contains a value, `pageName` is ignored.
`linkType` | N/A (Only available with column header) | The type of link. Defaults to `o` if this field is empty and `linkName` contains a value. Valid values include:<br/> **`d`**: Download link<br/>**`e`**: Exit link<br/>**`o`**: Custom link
`linkURL` | `pev1` | The link URL.
`list1` - `list3` | `l1` - `l3` | [List variables](https://experienceleague.adobe.com/docs/analytics/implementation/vars/page-vars/list.html).
`pageName` | `pageName` | The [Page](https://experienceleague.adobe.com/docs/analytics/components/dimensions/page.html) dimension.
`pageType` | `pageType` | The [`pageType`](https://experienceleague.adobe.com/docs/analytics/implementation/vars/page-vars/pagetype.html) implementation variable. Set to the string value `"errorPage"` on any error pages, such as a 404 or 503 error.
`pageURL` | `g` | The [Page URL](https://experienceleague.adobe.com/docs/analytics/components/dimensions/page-url.html) dimension.
`products` | `products` | The [`products`](https://experienceleague.adobe.com/docs/analytics/implementation/vars/page-vars/products.html) implementation variable.
`prop1` - `prop75` | `c1` - `c75` | [Prop](https://experienceleague.adobe.com/docs/analytics/components/dimensions/prop.html) dimensions.
`purchaseID` | `purchaseID` | The [`purchaseID`](https://experienceleague.adobe.com/docs/analytics/implementation/vars/page-vars/purchaseid.html) implementation variable.
`queryString` | This column provides information for this field. | Key/value pairs that provide an alternative to using individual columns. This column must be fully URL encoded, including any multi-byte characters. Adobe encodes the query string in UTF-8 by default, unless you add the `ce` query string parameter.
`referrer` | `r` | The [`referrer`](https://experienceleague.adobe.com/docs/analytics/implementation/vars/page-vars/referrer.html) implementation variable.
`reportSuiteID` | N/A (Only available with column header) | Specifies the report suites where you want to submit data. Separate multiple report suite IDs with a comma.
`resolution` | `s` | The [Monitor resolution](https://experienceleague.adobe.com/docs/analytics/components/dimensions/monitor-resolution.html) dimension.
`server` | `server` | The [Server](https://experienceleague.adobe.com/docs/analytics/components/dimensions/server.html) dimension.
`timestamp` | `ts` | The date and time that the data was collected. [Unix Time](https://en.wikipedia.org/wiki/Unix_time) and [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) are supported. Milliseconds are not allowed.
`tnta` | `tnta` | Target data payload. Used with [Analytics for Target](https://experienceleague.adobe.com/docs/target/using/integrate/a4t/a4t.html) integrations.
`trackingServer` | N/A (Only available with column header) | The [`trackingServer`](https://experienceleague.adobe.com/docs/analytics/implementation/vars/config-vars/trackingserver.html) implementation variable.
`transactionID` | `xact` | The [`transactionID`](https://experienceleague.adobe.com/docs/analytics/implementation/vars/page-vars/transactionid.html) variable.
`userAgent` | N/A (Only available with column header) | The device's user agent string.
`visitorID` | `vid` | The [`visitorID`](https://experienceleague.adobe.com/docs/analytics/implementation/vars/config-vars/visitorid.html) implementation variable.
`marketingCloudVisitorID` | `mid` | The unique identifier used with the [Adobe Experience Cloud Identity Servce](https://experienceleague.adobe.com/docs/id-service/using/home.html).
`zip` | `zip` | The [Zip code](https://experienceleague.adobe.com/docs/analytics/components/dimensions/zip-code.html) dimension.
