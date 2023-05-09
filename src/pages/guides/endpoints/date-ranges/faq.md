---
title: Date ranges endpoint FAQ
description: Frequently asked questions around the date ranges endpoint.
---

# Date ranges API FAQ

Frequently asked questions around the date ranges endpoint.

### What are some best practices that I can follow around the date ranges endpoint?

* Make multiple requests, each one limited to 1000 date ranges or fewer when retrieving them. Avoid making a large, single request for all possible date ranges.
* Request data once and cache it.
* Avoid creating duplicate date ranges with the same definition. Creating too many date ranges can affect API performance for your company.
* Creating a date range from scratch can be difficult without familiarity of the definition specifications. Use the [debugger](../reports/debugger.md) inside Analysis Workspace to learn how Adobe formats API calls. You can then retrieve the date range definition using the API, modify it, then send a `POST` call with the modified definition.

### What is the difference between a predefined date range and a date range that I create?

Adobe provides predefined date range templates. Although original templates cannot be modified or deleted, you can create copies of them to modify. Predefined templates have the attribute `template: true`. You can use these date range templates in Workspace projects like any other type of date range.


### How do I refresh my authentication token? 

To refresh authentication tokens, see the [Authentication Guide.](https://developer.adobe.com/developer-console/docs/guides/authentication/UserAuthentication/IMS/#refreshing-access-tokens)
