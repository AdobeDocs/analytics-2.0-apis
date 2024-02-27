---
title: Project parameters
description: Parameters that you can include in GET project API calls.
---

# Project parameters

Parameters that you can include in `GET` project API calls to refine results. You can include multiple query strings using an ampersand (`&`).

<InlineAlert variant="info" slots="text" />

Adobe may add optional request and response members (name/value pairs) to existing API objects at any time and without notice or changes in versioning. Adobe recommends that you refer to the API documentation of any third-party tool you integrate with our APIs so that such additions are ignored in processing if not understood. If implemented properly, such additions are non-breaking changes for your implementation. Adobe will not remove parameters or add required parameters without first providing standard notification through release notes.

## Expansion

A query string that allows you to obtain additional information around a project. You can include multiple expansions, separated by a comma.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/projects?expansion=reportSuiteName,ownerFullName,modified,tags,accessLevel,externalReferences,definition`

* **`reportSuiteName`**: The name of the report suite.
* **`ownerFullName`**: The name of the owner of the project.
* **`modified`**: The date that the project was last modified.
* **`tags`**: Tags applied to the project.
* **`accessLevel`**: Access level that the current user has to a particular project. Valid values include `Edit`, `Duplicate`, or `View`.
* **`externalReferences`**: Analytics components, such as segments or calculated metrics, used in the project definition.
* **`definition`**: The [Project definition](definition.md).

## IncludeType

By default, results only include projects that the user owns. You can add this query string which allows results to include additional projects not owned by the user.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/projects?includeType=all,shared`

* **`all`**: Returns all projects that the user can access. Typically used by product admins.
* **`shared`**: Returns all projects shared with the user.

## Locale

A query string that returns strings localized by Adobe into the desired language. Localization does not apply to user-defined fields, such as project names.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/projects?locale=en_US`

* **`en_US`**: English
* **`fr_FR`**: French
* **`ja_JP`**: Japanese
* **`de_DE`**: German
* **`es_ES`**: Spanish
* **`ko_KR`**: Korean
* **`pt_PR`**: Brazilian Portuguese
* **`zh_CN`**: Simplified Chinese
* **`zh_TW`**: Traditional Chinese

## Pagination

You can paginate project API calls so the result is not too large to use.

`GET https://analytics.adobe.io/api/{GLOBAL_COMPANY_ID}/projects?limit=10&page=2`

* **`limit`**: An integer that represents the number of results per page.
* **`page`**: An integer that represents which page to return results. The first page is `0`. The API supports up to 1000 pages.
