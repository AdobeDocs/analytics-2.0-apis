---
title: Data Repair API FAQ
description: Frequently asked questions for the Data Repair API.
---

# Data Repair API FAQ

Frequently asked questions for the Data Repair API.

## If I accidentally delete incorrect data, is there a way to get it back?

No. **Data removed by the Data Repair API is permanently deleted and not retrievable.** Make sure that your Data Repair API calls are correct before running them for large date ranges.

## How long does a data repair job take?

The amount of time a data repair job takes depends on the number of days processed and how much traffic a Report Suite gets per day. Jobs typically complete in hours but can take multiple days for large Report Suites with extended date ranges.

## What happens when I access reports in Adobe Analytics while a data repair job is running?

If you run a report in Adobe Analytics referencing a dimension and date range processed by the Data Repair API, it can return `Unspecified`. Once the Data Repair job is complete, the values returned by Adobe Analytics (and not removed by the Data Repair API process) display normally.

## How does expiration and allocation work when repairing data?

An eVar value can exist across multiple hits or visits depending on the expiration of the eVar.  Consequently, when repairing an eVar, it is important that you check the expiration setting (and potentially use the "Reset" option for that eVar) to avoid historical data "re-populating" the variable. See [Conversion Variables](https://docs.adobe.com/content/help/en/analytics/admin/admin-tools/conversion-variables/conversion-var-admin.html) in the Adobe Analytics Admin user guide for more information on eVar expiration and resetting persisted values.

## How do late arriving hits work when repairing data?

If late arriving hits are passed in after a repair has run for the time period included in the repair, it is possible for repaired values to be reintroduced.  Ideally, avoid performing repairs on months that can change due to late arriving or timestamped hits.  However, if that can't be guaranteed, Adobe recommends resetting the variable. Note that this action expires the eVar for all visitors, not just those involved in a repair.

## Can I repair a disabled variable?  Or do I need to enable it first?

Data Repair will work on enabled or disabled variables.  You do not need to enable a variable in order for Data Repair to act on it.

## Why aren't my URL repairs updating data as expected?

When applying a URL operator (`deleteQueryString` or `deleteQueryStringParameters`), the Data Repair API makes sure that the value is a correctly formatted URL before taking any action. A common mistake for incorrectly formatted URLs is having unencoded characters, such as a space, in the URL.

## What are some limitations of using this tool?

* Data repair job date ranges cannot include the current month. A job must start within the last 60 months and end prior to the current month.
* Report Suites with [Cross-Device Analytics](https://experienceleague.adobe.com/docs/analytics/components/cda/overview.html) are not supported.
* Dimensions that have [Merchandising](https://experienceleague.adobe.com/docs/analytics/components/dimensions/evar-merchandising.html) currently enabled or was enabled historically are not supported. If you run a data repair job on a variable that has had merchandising enabled in the past, you may see unexpected attribution results.
* Only one data repair job at a time can run per Report Suite.
