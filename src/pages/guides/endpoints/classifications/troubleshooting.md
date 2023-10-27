---
title: Troubleshoot Classifications API
description: Common errors and status codes when using the Adobe Analytics Classifications API.
---
# Troubleshoot Classifications API

Reference this page if you encounter issues when using the classifications API. Common status codes and troubleshooting steps are provided.

## API status codes

Many classification API issues can be identified in the API response. See the [FAQ and troubleshooting guide](https://experienceleague.adobe.com/docs/experience-platform/landing/troubleshooting.html) in the Experience Platform API documentation. The Classifications API and the Experience Platform API share the root URI domain of `adobe.io`, so all status code messages are shared.

If you are unable to decipher the error messages or status codes returned from the Classification API, contact Adobe Customer Care. When contacting Adobe, provide the agent with the following information:

* The API request, preferably in curl format. Authentication headers can be omitted.
* The response from the Classification API, typically in text or JSON format.

Customer Care can validate the API request issue and escalate to engineering if needed.

## Troubleshoot classification data

If you receive successful API responses but see issues within the classification data itself, log in to Adobe Analytics and perform a manual browser export of the data. Observe each value in the downloaded file to see if it matches with expected classification data.

* If classification data is incorrect, attempt a manual browser upload that corrects the keys in question.
* If classification data is correct, wait 48 hours to make sure that classified values have had the opportunity to propagate to all servers processing your data.
* If you still see issues with classification data, contact Adobe Customer Care and include the following information:
  * The report suite
  * The dimension in question
  * Specific example keys with incorrect values

Customer care can validate the classification inconsistencies that you see and escalate to engineering if needed.
