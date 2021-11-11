---
title: Projects endpoint FAQ
description: Frequently asked questions around the Projects endpoint.
---

# Projects endpoint FAQ

Frequently asked questions around the Projects endpoint.

### What are some best practices that I can follow around the projects endpoint?

* Make multiple, smaller requests instead of a large, single request.
* Request data once and cache it.
* Use caution when updating a project so that you do not alter the original project used by others.
* Avoid creating duplicate projects with the same definition. Creating many projects can affect performance for your company in some situations.

### What is the best way to create a project using the API?

If possible, use the Analytics UI for creating projects from scratch. The product UI offers significant advantages for managing and optimizing the complexity of this task. If you need to create projects programmatically, it is usually easier to create a template project in the UI and then have your application change only small portions of the project definition.

If you do choose to use the API to create projects, keep in mind that certain fields cannot be supplied to the projects endpoint using a `POST` API call. For example, tags are not stored within a project and is ignored if included in a `POST` API call. You can modify a project's tags using the [Tags API](../componentmetadata/tags.md).

See [Project definition](definition.md) for more information around creating a project using the API.
