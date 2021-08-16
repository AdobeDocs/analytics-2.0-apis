---
title: Data Repair API FAQ
description: Frequently asked questions for the Data Repair API.
---

# Data Repair API FAQ

Frequently asked questions for the Data Repair API.

## If I accidentally delete incorrect data, is there a way to get it back?

No. Data removed by this API is permanently and not retrievable. Make sure that your API calls are correct before running them for large date ranges.

## What is the best approach to minimize accidental deletion or alteration of data?

The following workflow provides multiple checkpoints to minimize the risk of accidental data deletion. Review the data after each step to confirm the data repair job completes as expected.
 
Create a repair job in the following:

1. A **development** Report Suite for **one day** of data.
1. A **development** Report Suite for **one month** of data.
1. A **production** Report Suite for **one day** of data.
1. A **production** Report Suite for **one month** of data.
1. Once all testing and validation is complete, then proceed with the **full date range** of the data repair for **production** data.

## How long does a data repair job take?

The amount of time a job takes depends on the number of days processed, and how many hits a report suite gets per day. Jobs typically complete in hours, but can take multiple days for large report suites with extended date ranges.

## What happens when I access reports in Adobe Analytics while a data repair job is running?

If you run a report in Adobe Analytics referencing a dimension and date range processed by the Data Repair API, it can return `Unspecified`. Once the Data Repair job is complete, the values returned by Adobe Analytics (and not removed by the Data Repair process) display normally.

## How does expiration and allocation work when repairing data?

An eVar value can exist across multiple hits or visits depending on the expiration of the eVar.  Consequently, when repairing an eVar, it is important to check the expiration setting (and potentially use the "Reset" option for that eVar) to avoid historical data "re-populating" the variable. See [Conversion Variables](https://docs.adobe.com/content/help/en/analytics/admin/admin-tools/conversion-variables/conversion-var-admin.html) in the Adobe Analytics Admin user guide for more information on eVar expiration and resetting persisted values.

## What are some limitations of using this tool?

* The Data Repair API job date ranges cannot include the current month.  They must start within the last 36 months and end prior to the current month.
* Report suites with [Cross-Device Analytics](https://experienceleague.adobe.com/docs/analytics/components/cda/overview.html) are not supported.
* Dimensions with [Merchandising enabled](https://experienceleague.adobe.com/docs/analytics/components/dimensions/evar-merchandising.html) are not supported.
* Only one job at a time can run per report suite.
