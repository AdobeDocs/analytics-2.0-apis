---
title: Date range parameters
description: Parameters that you can include in GET date range API calls.
---

# Date range parameters

Parameters that you can include in `GET` date range API calls to refine results. You can include multiple query strings using an ampersand (`&`).

## Expansion

A query string that allows you to obtain additional information around a date range. You can include multiple expansions, separated by a comma.

`GET https://analytics.adobe.io/api/examplecompany/dateranges?expansion=reportSuiteName,ownerFullName,modified,tags,definition`

* **`reportSuiteName`**: The report suite that the date range was created under.
* **`ownerFullName`**: The full name of the user that created the date range.
* **`modified`**: The date that the date range was last modified.
* **`tags`**: The tags applied to the date range.
* **`definition`**: The date range definition.

## IncludeType

A query string that allows results to include additional date ranges not owned by the user.

`GET https://analytics.adobe.io/api/examplecompany/dateranges?includeType=all,shared,templates`

* **`all`**: Include all date ranges in the company that the user can access. Typically used by product admins.
* **`shared`**: Include all date ranges that are shared to the user.
* **`templates`**: Include all date range templates.

## filterByIds

A query string that only retrieves date ranges matching the included date range IDs. You can include multiple IDs, separated by a comma.

`GET https://analytics.adobe.io/api/examplecompany/dateranges?filterByIds={ID}`

## curatedRsid

Include the `curatedItem` status for a given report suite ID.

`GET https://analytics.adobe.io/api/examplecompany/dateranges?curatedRsid={RSID}`

## Locale

A query string that returns strings localized by Adobe into the desired language. This parameter typically applies to date range templates, as user-defined names and descriptions are not localized by Adobe.

`GET https://analytics.adobe.io/api/examplecompany/dateranges?locale=en_US`

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

You can paginate date range API calls so the result is not too large to use.

`GET https://analytics.adobe.io/api/examplecompany/dateranges?limit=10&page=2`

* **`limit`**: An integer that represents the number of results per page.
* **`page`**: An integer that represents which page to return results. The first page is `0`. The API supports up to 1000 pages.
