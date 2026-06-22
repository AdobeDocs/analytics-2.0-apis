---
title: Search features
description: Use search features to return a subset of dimension items in reports.
---

# Search features

Use search features to return a subset of dimension items in reports.

To limit the data returned in reports, you can include search objects and fields in your Report API request body. This helps to find the relevant reports for specific dimension or metric characteristics among many records. You can also use search features to include, group, or present data in convenient formats, such as breakdown reports.

All of the search features described in this guide are specified in a request body to the following endpoint:

`https://analytics.adobe.io/api/{globalCompanyId}/reports`

To use Report API search features:

1. Specify the scope for filtering, such as date range and segment within the `globalFilters` array. This defines the overall data scope for reports. The following example shows a `globalFilters` array for a request body:

```json

   "rsid":"examplersid",
   "globalFilters":[
      {
         "type":"dateRange",
         "dateRange":"YYYY-01-31T00:00:00.000/YYYY-02-06T23:59:59.999"
      }
   ]
```  

2. Include one or more of the following search options:

* `itemId` - The identifier for a single dimension item (a specific value within a dimension). It is commonly used in breakdown reports inside a `metricFilters` array rather than as a `search` option.
* `itemIds` - A list of identifiers, or `itemIds`, to include in reports as part of a `search object`. Instead of one row value used in a breakdown report, it filters by several row values at once. 
* `excludeItemIds` - A list of identifiers, or `itemIds`, to exclude in reports.
* `clause` - A string inside the `search` object that specifies a text expression for filtering returned dimension items. It can also be used with boolean logic to 
* `clause` - A search clause to use when filtering dimensions
* `includeSearchTotal` - Includes a special element called 'searchTotals' in the response that contains the total of the filtered items. The default is `false`.

<InlineAlert variant="info" slots="text" />

Adobe may add optional request and response members (name/value pairs) to existing API objects at any time and without notice or changes in versioning. Adobe recommends that you refer to the API documentation of any third-party tool you integrate with our APIs so that such additions are ignored in processing if not understood. If implemented properly, such additions are non-breaking changes for your implementation. Adobe will not remove parameters or add required parameters without first providing standard notification through release notes.


## Example search requests

The following JSON examples show each search feature described above.


### `clause`

"search": {
  "clause": "'checkout' or 'cart'"
}





requests data only for campaigns "10" and "11" with the `search` parameter by using their itemIds (line 9). The response returns the data requested for the `itemId` associated with campaigns 10 and 11 (lines 18-21 and 25-28).

<CodeBlock slots="heading, code" repeat="2" languages="JSON,JSON"/>

#### Request body

```json
{
   "rsid":"examplersid",
   "globalFilters":[
      {
         "type":"dateRange",
         "dateRange":"YYYY-01-31T00:00:00.000/YYYY-02-06T23:59:59.999"
      }
   ],
   "search":{
      "itemIds":[743855946,511036305]
   },
   "metricContainer":{
      "metrics":[
         {
            "columnId":"0",
            "id":"metrics/pageviews",
            "filters":[
               "0"
            ]
         }
      ],
      "metricFilters":[
         {
            "id":"0",
            "type":"dateRange",
            "dateRange":"YYYY-01-31T00:00:00.000/YYYY-02-06T23:59:59.999"
         }
      ]
   },
   "dimension":"variables/evar1",
   "settings":{
      "dimensionSort":"asc",
      "limit":5
   }
}
```

#### Response

```json
{
   "totalPages":1,
   "firstPage":true,
   "lastPage":true,
   "numberOfElements":2,
   "number":0,
   "totalElements":2,
   "columns":{
      "dimension":{
         "id":"variables/evar1",
         "type":"string"
      },
      "columnIds":[
         "0"
      ]
   },
   "rows":[
      {
         "itemId":"511036305",
         "value":"11",
         "data":[
            1631.0
         ]
      },
      {
         "itemId":"743855946",
         "value":"10",
         "data":[
            2032.0
         ]
      }
   ],
   "summaryData":{
      "totals":[
         104310.0
      ]
   }
}
```

## Using `clause` Parameters

The `search` parameter also includes the `clause` option. The `clause` parameter provides a powerful tool for filtering data. To use it, follow these rules:

* It uses boolean operators `AND`, `OR`, and `NOT`.
* It uses operators `MATCH`, `CONTAINS`, `BEGINS-WITH`, and `ENDS-WITH`.
* It uses group conditions with parenthesis.
* Strings are contained in single quotes.
* Searches are case-insensitive.
* If no operator is specified, a 'contains' match is performed.
* Valid operators are 'match' and 'contains'.
* Glob expressions are evaluated. If a literal `*` is needed, use `\*`.

### Example Clause statements

* Only include results that match the string 'home page': `MATCH 'home page'`
* Include pages that do not contain 'home page': `NOT CONTAINS 'home page'`
* Include pages that do not contain 'home page' or 'about us', but do contain 'contact us': `(NOT CONTAINS 'home page' OR NOT CONTAINS 'about us') AND (CONTAINS 'contact us')`
* Include pages that contain 'home page' or start with 'landing': `CONTAINS 'home page' OR BEGINS-WITH 'landing'`
