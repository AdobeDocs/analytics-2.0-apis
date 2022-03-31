---
title: Annotation parameters
description: Parameters that you can include in GET annotation API calls.
---

# Annotation parameters

Parameters that you can include in `GET` annotation API calls to refine results. You can include multiple query strings using an ampersand (`&`).

## Expansion

A query string that allows you to obtain additional information around an annotation. You can include multiple expansions, separated by a comma.

`GET https://analytics.adobe.io/api/exampleco/annotations?expansion=name,description,dateRange,color`

* **`name`**: The name of the annotation.
* **`description`**: The annotation's description.
* **`dateRange`**: The date range of the annotation.
* **`color`**: An enum representing the annotation's color. Supported values include `STANDARD1` through `STANDARD9`.
* **`applyToAllReports`**: A boolean that determines if the annotation applies to all report suites.
* **`scope`**: An object including the `metrics` and `filters` that the annotation uses.
* **`createdDate`**: The date that the annotation was created.
* **`modifiedDate`**: The date that the annotation was last modified.
* **`modifiedById`**: The ID of the user who last modified the annotation.
* **`tags`**: The tags applied to the annotation.
* **`shares`**: The shares applied to the annotation.
* **`approved`**: A boolean that determines if the annotation is approved by an admin.
* **`favorite`**: A boolean that determines if the user has this annotation favorited (starred).
* **`usageSummary`**: An object that shows where this annotation is used.
* **`owner`**: An object showing the ID, name, and login of the user that created the annotation.
* **`companyId`**: The login company ID of the annotation.
* **`reportSuiteName`**: The report suite's friendly name.
* **`rsid`**: The report suite ID.

## IncludeType

By default, results only include annotations that the user owns. You can add this query string which allows results to include additional annotations not owned by the user.

`GET https://analytics.adobe.io/api/exampleco/annotations?includeType=all,shared`

* **`all`**: Returns all annotations that the user can access. Typically used by product admins.
* **`shared`**: Returns all annotations shared with the user.

## Locale

A query string that returns strings localized by Adobe into the desired language. Localization does not apply to user-defined fields, such as annotation names.

`GET https://analytics.adobe.io/api/exampleco/annotations?locale=en_US`

* **`en_US`**: English
* **`fr_FR`**: French
* **`ja_JP`**: Japanese
* **`de_DE`**: German
* **`es_ES`**: Spanish
* **`ko_KR`**: Korean
* **`pt_PR`**: Brazilian Portuguese
* **`zh_CN`**: Simplified Chinese
* **`zh_TW`**: Traditional Chinese

## Filter

You can filter annotations by modification date or annotations in a specific date range.

`GET https://analytics.adobe.io/api/exampleco/annotations?filterByModifiedAfter=YYYY-MM-DDTHH:MM:SSZ&filterByDateRange=YYYY-MM-DDTHH:MM:SSZ/YYYY-MM-DDTHH:MM:SSZ`

* **`filterByModifiedAfter`**: An ISO 8601 date that returns only annotations that were modified after the desired date.
* **`filterByDateRange`**: Two ISO 8601 dates separated by a forward slash (`/`) that returns only annotations that fully reside within the desired date range.

## Pagination

You can paginate annotation API calls so that the result is not too large to use.

`GET https://analytics.adobe.io/api/exampleco/annotations?limit=10&page=2`

* **`limit`**: An integer that represents the number of results per page.
* **`page`**: An integer that represents which page to return results. The first page is `0`. The API supports up to 1000 pages.
