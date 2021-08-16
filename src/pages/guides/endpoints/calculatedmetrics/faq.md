---
title: Calculated metrics API FAQ
description: Frequently asked questions for the Calculated metrics APIs.
---

# Calculated metrics API FAQ

Frequently asked questions for the Calculated metrics APIs.

## What are some best practices I can follow around submitting calculated metrics API calls?

Adobe recommends the following practices:

*  Make multiple requests, each one limited to 1000 calculated metrics or fewer when retrieving them. Avoid making a large, single request for all possible calculated metrics.
*  Request data once and cache it.
*  Avoid creating duplicate calculated metrics with the same definition. Creating many calculated metrics can eventually affect product performance.

## How can I create complex calculated metrics using the API?

Creating a calculated metric from scratch can be difficult without familiarity of the definition terms. You can use the Analysis Workspace UI for to create a calculated metric, then use the [Debugger]. Then use this API to retrieve the calculated metric and modify the definition to match what you want to do programmatically. Then we recommend that you `POST` that calculated metric with the modified definition back to this API.