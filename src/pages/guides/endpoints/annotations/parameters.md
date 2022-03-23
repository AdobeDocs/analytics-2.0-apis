---
title: Annotation parameters
description: Parameters that you can include in GET annotation API calls.
---

# Annotation parameters

Parameters that you can include in `GET` annotation API calls to refine results. You can include multiple query strings using an ampersand (`&`).

## Expansion

A query string that allows you to obtain additional information around an annotation. You can include multiple expansions, separated by a comma.

`GET https://analytics.adobe.io/api/examplecompany/annotations?expansion=name,description,dateRange,color`

* **`name`**:
* **`description`**:
* **`dateRange`**:
* **`color`**:
* **`applyToAllReports`**:
* **`scope`**:
* **`deleted`**:
* **`internal`**:
* **`createdDate`**:
* **`modifiedDate`**:
* **`modifiedById`**:
* **`owner`**:
* **`companyId`**:
* **`rsid`**:
* **`approved`**:
* **`favorite`**:
* **`shares`**:
* **`sharesFullName`**:
* **`tags`**:
* **`usageSummary`**:
* **`useSummaryWithRelevancyScore`**:
* **`ownerFullName`**:
* **`reportSuiteName`**:

## IncludeType

By default, results only include annotations that the user owns. You can add this query string which allows results to include additional annotations not owned by the user.

`GET https://analytics.adobe.io/api/examplecompany/annotations?includeType=all,shared`

* **`all`**: Returns all annotations that the user can access. Typically used by product admins.
* **`shared`**: Returns all annotations shared with the user.

## Locale

A query string that returns strings localized by Adobe into the desired language. Localization does not apply to user-defined fields, such as annotation names.

`GET https://analytics.adobe.io/api/examplecompany/annotations?locale=en_US`

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

`GET https://analytics.adobe.io/api/examplecompany/annotations?filterByModifiedAfter=YYYY-09-28T11%3A09%3A43&filterByDateRange=YYYY-09-16T00%3A00%3A00%2FYYYY-09-20T00%3A00%3A00%`

* **`filterByModifiedAfter`**: Returns only annotations that were modified after the desired date. Date format is `[YYYY]-[MM]-[DD]T[HH]%3A[MM]%3A[SS]` (URL encoded ISO 8601 format).
* **`filterByDateRange`**: Returns only annotations that fully reside within the desired date range. Date format is `[YYYY]-[MM]-[DD]T[HH]%3A[MM]%3A[SS]` (URL encoded ISO 8601 format).

## Pagination

You can paginate annotation API calls so the result is not too large to use.

`GET https://analytics.adobe.io/api/examplecompany/annotations?limit=10&page=2`

* **`limit`**: An integer that represents the number of results per page.
* **`page`**: An integer that represents which page to return results. The first page is `0`. The API supports up to 1000 pages.
