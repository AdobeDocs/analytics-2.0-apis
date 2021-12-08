---
title: Data Repair API
description: Delete or edit Adobe Analytics data.
---

# Data Repair API

The Data Repair API provides you with a way to delete or edit Adobe Analytics data.  Repair requests are made by submitting a job definition to the Data Repair API, which includes the report suite, date range, variables and actions to be applied to the data.

<InlineAlert variant="warning" slots="text"/>

Use of the Data Repair API permanently deletes existing Adobe Analytics data. Adobe recommends a careful approach to executing the repair to minimize accidental deletion. Read through all pages of this guide before using the Data Repair API.

## Prerequisites

Before using this API, make sure that all the following are met:

* Confirm that your contract includes the use of the Data Repair API. Use of this API is a paid service. Reach out to your Adobe Account Manager for details and confirmation of your status.
* You successfully authenticate with the API using JWT. OAuth is not supported. See [Getting started](../../index.md) to make sure that you have the correct permissions, create an API client on Adobe I/O, and that you successfully authenticate. Make sure that you include the "Data Repair API" permission item when creating a product profile in the Adobe Admin Console.

   ![data repair permission](../../../images/data-repair-permission.png)

## Workflow

There are three steps to successfully execute a data repair job:

1. **Estimate repair size**: The Data Repair API incurs charges based on how many rows it repairs. The `/serverCallEstimate` endpoint is a required step to help you estimate the cost of a repair. It returns a count of the server call volume for the report suite date range. The endpoint also returns a `validationToken`, which is required for the next step.

1. **Create a repair job**: To create a data repair job, use the `/job` endpoint. This endpoint requires a Report Suite, date range, `validationToken` (from `/serverCallEstimate`), and a job definition, which specifies the variables to be repaired. A Job ID is returned when a repair job is created.

1. **Monitor progress**: Use the `/job/{JOB_ID}` endpoint to monitor the status of a job at any point after job submission. Completion time of a repair job depends on its size; small jobs can complete within hours while large jobs can take multiple days.
