---
title: Analytics 2.0 API FAQ
description: Frequently asked questions for the Analytics 2.0 APIs.
---

# Analytics 2.0 API FAQ

Frequently asked questions for the Analytics 2.0 APIs.

## What is the timeout for API requests?

Requests submitted through adobe.io currently time out at **60 seconds**.

## What is the rate limit for API calls?

The enforced rate limit for API calls is **12 requests every 6 seconds** per user (or approximately 120 requests per minute). When you exceed this rate limit, API calls return a `429` HTTP response code with the following response body:

```json
{"error_code":"429050","message":"Too many requests"}
```

## What are some best practices and guidelines when using the APIs?

Adobe recommends adhering to the following guidelines:

* Make multiple, smaller requests instead of a large, single request.
* Request data once and cache it.
* Do not poll for new data faster than a 30 minute interval.
* Pull historical data and increment it regularly instead of requesting the entire data set.

Adobe recommends avoiding the following:

* Requesting as much data as possible in a single request
* Requesting one year of data at day granularity everyday - just request the new day and merge it
* Driving a web page with a site performance widget by making an API request every time the web page is loaded
* Requesting a full year of day-level data every day to get a rolling 12-month window
