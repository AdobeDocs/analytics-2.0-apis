
<a name="paths"></a>
## Resources

<a name="approvals_resource"></a>
### Approvals
Operations on approvals


<a name="save"></a>
#### Marks an item as approved
```
POST /approvals
```


##### Description
Takes an array of components and marks them all as "Approved"


##### Body parameter
Array containing a list of Component objects to be marked as "Approved"

*Name* : body  
*Flags* : optional  
*Type* : < [Approval](#approval) > array


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[Approval](#approval)|
|**400**|Invalid JSON input|No Content|
|**403**|Insufficient access to perform operation; only admins can approve components|No Content|
|**500**|Internal Server Error; unable to create approvals for the specified components|No Content|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="findallforcurrentuser"></a>
#### Returns a list of approval objects for the current user. Response is paged based on the provided paging criteria.
```
GET /approvals
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**limit**  <br>*optional*|Number of results per page|integer|`10`|
|**Query**|**page**  <br>*optional*|Page number (base 0 - first page is "0")|integer|`0`|
|**Query**|**userid**  <br>*optional*|The user ID to return details for. Only admins may use this query parameter.|integer (int32)||


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< [Approval](#approval) > array|
|**400**|Invalid JSON input|No Content|
|**403**|Insufficient access to perform operation|No Content|
|**500**|Internal Server Error; unable to retrieve approvals|No Content|


##### Produces

* `application/json`


<a name="deletebyitemids"></a>
#### Un-approve the specified components (delete approvals)
```
DELETE /approvals
```


##### Description
Only Admins can create and delete approvals.


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Query**|**componentIds**  <br>*optional*|Comma-delimited list of componentIds for which to remove approvals|string|
|**Query**|**componentType**  <br>*required*|Type of component|enum (segment, dashboard, bookmark, calculatedMetric, project, dateRange, metric, dimension, virtualReportSuite, scheduledJob, alert, classificationSet)|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< < string, object > map > array|
|**400**|Invalid JSON input|No Content|
|**403**|Insufficient access to perform operation; only admins can un-approve a segment|No Content|
|**500**|Internal Server Error; unable to delete approvals for the specified components|No Content|


##### Produces

* `application/json`


<a name="findone"></a>
#### Retrieves an approval object by its id
```
GET /approvals/{id}
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**id**  <br>*required*|The approval ID to be returned|integer (int64)|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[Approval](#approval)|
|**403**|Insufficient access to perform operation|No Content|
|**404**|The specified approvalId could not be found|No Content|
|**500**|Internal Server Error; unable to retrieve the specified approval|No Content|


##### Produces

* `application/json`


<a name="deletebyapprovalid"></a>
#### Deletes the approval with the given id
```
DELETE /approvals/{id}
```


##### Description
Only admins can create and delete approvals


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**id**  <br>*required*|The approval ID to be deleted|integer (int64)|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< string, object > map|
|**403**|Insufficient access to perform operation; user does not have access to delete the approval.|No Content|
|**404**|The specified approval does not exist|No Content|
|**500**|Internal Server Error; unable to delete the specified approval|No Content|


##### Produces

* `application/json`


<a name="calculatedmetrics_resource"></a>
### Calculatedmetrics

<a name="calculatedmetrics_createcalculatedmetric"></a>
#### Create a new Calculated Metric
```
POST /calculatedmetrics
```


##### Description
Creates a new calculated metric. The following attributes are available when creating a calculated metric:

IMPORTANT: Required Fields: name, definition, rsid

Optional fields: description

Example definition for use in testing API below ("Page exists"):

```json

{"definition":{},"version":[1,0,0]}
```

A calculated metric response will always include these default items:* id, name, description, rsid, owner* 

Other attributes can be optionally requested through the 'expansion' field as defined/documented in the GET endpoints (see GET "/calculatedmetrics" or GET "/calculatedmetrics/{id}" for more documentation).


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional calculated metric metadata fields to include on response.|< enum (reportSuiteName, siteTitle, ownerFullName, modified, isDeleted, approved, favorite, shares, tags, sharesFullName, usageSummary, usageSummaryWithRelevancyScore, definition, authorization, compatibility, warning) > array(multi)||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|


##### Body parameter
JSON-formatted Object containing key/value pairs for calculated metric creation.

*Name* : body  
*Flags* : optional  
*Type* : [AnalyticsCalculatedMetric](#analyticscalculatedmetric)


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsCalculatedMetric](#analyticscalculatedmetric)|
|**400**|Invalid input; name, rsid, and definition are all required. Definition must be formatted as a JSON Object.|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|
|**500**|External API error; Calculated metric create or retrieval failed|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="findcalculatedmetrics"></a>
#### Retrieve many calculated metrics
```
GET /calculatedmetrics
```


##### Description
A calculated metric response will always include these default items: *id, name, description, rsid, owner* 

Other attributes can be optionally requested through the 'expansion' field:

* *modified*: Date that the metric was last modified (ISO 8601)
* *definition*: Calculated metric definition as JSON object
* *compatibility*: Products that the metric is compatible with
* *reportSuiteName*: Also return the friendly Report Suite name for the RSID
* *favorite*: True if calculated metric has been marked as a 'Favorite'
* *tags*: Gives all existing tags associated with the calculated metric
* *approved*: True if calculated metric has been marked as 'Approved'
* *shares*: Gives all existing shares for the calculated metric
* *sharesFullName*: Give 'shares', but also include the shared-to user's friendly login name as 'shareToDisplayName' in each share object
* *ownerFullName*: Add friendly full login name (string) to the 'owner' object


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**approved**  <br>*optional*|Filter list to only include calculated metrics that are approved|boolean||
|**Query**|**calculatedMetricFilter**  <br>*optional*|Filter list to only include calculated metrics in the specified list (comma-delimited list of IDs)|string||
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional calculated metric metadata fields to include on response.|< enum (reportSuiteName, siteTitle, ownerFullName, modified, isDeleted, approved, favorite, shares, tags, sharesFullName, usageSummary, usageSummaryWithRelevancyScore, definition, authorization, compatibility, warning) > array(multi)||
|**Query**|**favorite**  <br>*optional*|Filter list to only include calculated metrics that are favorites|boolean||
|**Query**|**filterByIds**  <br>*optional*|Filter list to only include calculated metrics in the specified list (comma-delimited list of IDs) (this is the same as calculatedMetricFilter, and is overwritten by calculatedMetricFilter|string||
|**Query**|**filterByModifiedAfter**  <br>*optional*|Filter list to only include calculated metrics modified since this date (ISO8601 format)|string||
|**Query**|**limit**  <br>*optional*|Number of results per page|integer|`10`|
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|
|**Query**|**name**  <br>*optional*|Filter list to only include calculated metrics that contains the Name|string||
|**Query**|**ownerId**  <br>*optional*|Filter list to only include calculated metrics owned by the specified loginId|integer (int32)||
|**Query**|**page**  <br>*optional*|Page number (base 0 - first page is "0")|integer|`0`|
|**Query**|**pagination**  <br>*optional*|return paginated results|enum (true, false)|`"false"`|
|**Query**|**rsids**  <br>*optional*|Filter list to only include calculated metrics tied to specified RSID list (comma-delimited)|string||
|**Query**|**tagNames**  <br>*optional*|Filter list to only include calculated metrics that contains one of the tags|string||


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< [AnalyticsCalculatedMetric](#analyticscalculatedmetric) > array|
|**400**|Unable to retrieve list of calculated metrics shared with user|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|
|**401**|Owner filter error; user specified is not in the same company as the requesting user|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|
|**403**|Requesting non-shared calculated metrics for other users is restricted to admin users|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|
|**500**|External API error; Calculated metric retrieval failed|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|


##### Produces

* `application/json`


<a name="getcalculatedmetricfunctions"></a>
#### Retrieve calculated metric functions
```
GET /calculatedmetrics/functions
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< [CalcMetricFunction](#calcmetricfunction) > array|
|**500**|External API error; Calculated metric functions retrieval failed|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|


##### Produces

* `application/json`


<a name="getcalculatedmetricfunction"></a>
#### Retrieve a calculated metric function by id
```
GET /calculatedmetrics/functions/{id}
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**id**  <br>*required*|The function ID to retrieve|string||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[CalcMetricFunction](#calcmetricfunction)|
|**404**|Calculated metric function not found|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|
|**500**|External API error; Calculated metric function retrieval failed|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|


##### Produces

* `application/json`


<a name="findonecalculatedmetric"></a>
#### Retrieve a single calculated metric by id
```
GET /calculatedmetrics/{id}
```


##### Description
A calculated metric response will always include these default items: *id, name, description, rsid, owner* 

Other attributes can be optionally requested through the 'expansion' field:

* *modified*: Date that the metric was last modified (ISO 8601)
* *definition*: Calculated metric definition as JSON object
* *compatibility*: Products that the metric is compatible with
* *reportSuiteName*: Also return the friendly Report Suite name for the RSID
* *favorite*: True if calculated metric has been marked as a 'Favorite'
* *tags*: Gives all existing tags associated with the calculated metric
* *approved*: True if calculated metric has been marked as 'Approved'
* *shares*: Gives all existing shares for the calculated metric
* *sharesFullName*: Give 'shares', but also include the shared-to user's friendly login name as 'shareToDisplayName' in each share object
* *ownerFullName*: Add friendly full login name (string) to the 'owner' object


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**id**  <br>*required*|The calculated metric ID to retrieve|string||
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional calculated metric metadata fields to include on response.|< enum (reportSuiteName, siteTitle, ownerFullName, modified, isDeleted, approved, favorite, shares, tags, sharesFullName, usageSummary, usageSummaryWithRelevancyScore, definition, authorization, compatibility, warning) > array(multi)||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsCalculatedMetric](#analyticscalculatedmetric)|
|**403**|Requesting non-shared calculated metrics for other users is restricted to admin users|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|
|**500**|External API error; calculated metric retrieval failed|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|


##### Produces

* `application/json`


<a name="updatecalculatedmetric"></a>
#### Update an existing calculated metric
```
PUT /calculatedmetrics/{id}
```


##### Description
The following fields can be modified through this endpoint: <br><b>name, description, definition, owner, rsid</b>Example "defintion" for use in testing API below ("Page exists"):<br>"definition":{},"version":[1,0,0]}<br><br>Response will be the newly modified calculated metric object after the update request completes.<br><br><b><span style="text-decoration: underline;">CalculatedMetricResponse</span></b><br>A calculated metric response will always include these default items:* id, name, description, rsid, owner* 

Other attributes can be optionally requested through the 'expansion' field as defined/documented in the GET endpoints (see GET "/calculatedmetrics" or GET "/calculatedmetrics/{id}" for more documentation).


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**id**  <br>*required*|Calculated Metric ID to be updated|string||
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional calculated metric metadata fields to include on response.|< enum (reportSuiteName, siteTitle, ownerFullName, modified, isDeleted, approved, favorite, shares, tags, sharesFullName, usageSummary, usageSummaryWithRelevancyScore, definition, authorization, compatibility, warning) > array(multi)||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|


##### Body parameter
JSON-formatted Object containing key/value pairs to be updated.

*Name* : body  
*Flags* : optional  
*Type* : [AnalyticsCalculatedMetric](#analyticscalculatedmetric)


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsCalculatedMetric](#analyticscalculatedmetric)|
|**400**|Definition must be formatted as a JSON Object|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|
|**401**|Company mismatch; calculated metric ownership can only be transferred within the same organization|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|
|**403**|User does not have permission to update this calculated metric|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|
|**500**|External API error; Calculated metric update or retrieval failed|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="deletecalculatedmetric"></a>
#### Deletion of Calculated Metrics by Id
```
DELETE /calculatedmetrics/{id}
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**id**  <br>*required*|The calculated metric ID to be deleted|string||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[DeleteResponse](#deleteresponse)|
|**500**|External API error; Calculated metric delete failed|[CalculatedMetricErrorStatus](#calculatedmetricerrorstatus)|


##### Produces

* `application/json`


<a name="classifications_resource"></a>
### Classifications

<a name="createclassificationset"></a>
#### Creates a classification set.
```
POST /classifications/dataset
```


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[ClassificationSet](#classificationset)|


##### Produces

* `application/json`


<a name="getclassificationsets"></a>
#### Retrieves all classification sets.
```
GET /classifications/dataset
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Query**|**limit**  <br>*optional*|Documents per page|integer (int32)|
|**Query**|**page**  <br>*optional*|Page|integer (int32)|
|**Query**|**sortField**  <br>*optional*|Sort field|enum (name, modified, created)|
|**Query**|**sortOrder**  <br>*optional*|Sort order|enum (asc, desc)|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< [ClassificationSet](#classificationset) > array|


##### Produces

* `application/json`


<a name="searchclassificationsets"></a>
#### Retrieves classification sets based on search criteria.
```
POST /classifications/dataset/search
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Query**|**limit**  <br>*optional*|Documents per page|integer (int32)|
|**Query**|**page**  <br>*optional*|Page|integer (int32)|
|**Query**|**sortField**  <br>*optional*|Sort field|enum (name, modified, created)|
|**Query**|**sortOrder**  <br>*optional*|Sort order|enum (asc, desc)|


##### Body parameter
JSON-formatted Object containing key/value pairs for search.

*Name* : body  
*Flags* : optional  
*Type* : [ClassificationSetFilterArgs](#classificationsetfilterargs)


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< [ClassificationSet](#classificationset) > array|


##### Produces

* `application/json`


<a name="getclassificationset"></a>
#### Retrieves a single classification set.
```
GET /classifications/dataset/{id}
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**id**  <br>*required*|The id for which to retrieve information|string|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[ClassificationSet](#classificationset)|


##### Produces

* `application/json`


<a name="updateclassificationset"></a>
#### Updates a classification set.
```
PUT /classifications/dataset/{id}
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**id**  <br>*required*|The id for the classification set to update|string|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[ClassificationSet](#classificationset)|


##### Produces

* `application/json`


<a name="deleteclassificationset"></a>
#### Deletes a classification set.
```
DELETE /classifications/dataset/{id}
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**id**  <br>*required*|The id for the classification set to delete|string|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[ClassificationSet](#classificationset)|


##### Produces

* `application/json`


<a name="exportjob"></a>
#### Creates an export job for a classification set.
```
POST /classifications/dataset/{id}/export
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**id**  <br>*required*|The id for the classification set for which to import data|string|


##### Body parameter
Job export options

*Name* : body  
*Flags* : optional  
*Type* : [JobExportOptions](#jobexportoptions)


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[ClassificationJob](#classificationjob)|


##### Produces

* `application/json`


<a name="getjobs"></a>
#### Retrieves classification jobs.
```
GET /classifications/jobs
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Query**|**datasetId**  <br>*optional*|ClassificationSetId filter|string|
|**Query**|**limit**  <br>*optional*|Documents per page (minimum limit is 10)|integer (int32)|
|**Query**|**page**  <br>*optional*|Page|integer (int32)|
|**Query**|**sortField**  <br>*optional*|Sort field|enum (type, name)|
|**Query**|**sortOrder**  <br>*optional*|Sort order|enum (asc, desc)|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< [ClassificationJob](#classificationjob) > array|


##### Produces

* `application/json`


<a name="getjob"></a>
#### Retrieves a single classification job.
```
GET /classifications/jobs/{id}
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**id**  <br>*required*|The job id for which to retrieve information|string|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[ClassificationJob](#classificationjob)|


##### Produces

* `application/json`


<a name="getfirstartifact"></a>
#### Retrieves info about the first artifact for a given job id.
```
GET /classifications/jobs/{id}/artifact
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**id**  <br>*required*|The job id for which to retrieve information|string|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[JobArtifactResponse](#jobartifactresponse)|


##### Produces

* `application/json`


<a name="getartifact"></a>
#### Retrieves the artifact for a given job and artifact id.
```
GET /classifications/jobs/{id}/artifact/{artifactId}
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**artifactId**  <br>*required*|The artifact id for which to retrieve information|string|
|**Path**|**id**  <br>*required*|The job id for which to retrieve information|string|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**default**|successful operation|No Content|


<a name="rununclassifiedvaluesreport"></a>
#### Runs an oberon report to get unclassifed values for the given classification set.
```
GET /classifications/unclassified/{classificationSetId}
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**classificationSetId**  <br>*required*|The id for which to retrieve information|string||
|**Query**|**allowRemoteLoad**  <br>*optional*|Controls if Oberon should remote load data.  Default behavior is true with fallback to false if remote data does not exist|enum (true, false, default)|`"default"`|
|**Query**|**dateRange**  <br>*optional*|Format: YYYY-MM-DD/YYYY-MM-DD|string||
|**Query**|**dimension**  <br>*required*|Dimension to run the report against|string||
|**Query**|**endDate**  <br>*optional*|Format: YYYY-MM-DD|string||
|**Query**|**includeOberonXml**  <br>*optional*|Controls if Oberon XML should be returned in the response - DEBUG ONLY|enum (true, false)|`"false"`|
|**Query**|**rsid**  <br>*required*|RSID to run the report against|string||
|**Query**|**startDate**  <br>*optional*|Format: YYYY-MM-DD|string||


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[RankedReportData](#rankedreportdata)|


##### Produces

* `application/json`


<a name="collections_resource"></a>
### Collections
Analytics Collections


<a name="findall"></a>
#### Retrieves report suites that match the given filters.
```
GET /collections/suites
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional metadata fields to include on response.|< enum (name, parentRsid, numGroups, currency, calendarType, currentTimezoneOffset, timezoneZoneinfo) > array(multi)||
|**Query**|**limit**  <br>*optional*|Number of results per page|integer|`10`|
|**Query**|**page**  <br>*optional*|Page number (base 0 - first page is "0")|integer|`0`|
|**Query**|**rsidContains**  <br>*optional*|Filter list to only include suites whose rsid contains rsidContains.|string||
|**Query**|**rsids**  <br>*optional*|Filter list to only include suites in this RSID list (comma-delimited)|string||
|**Query**|**userGroupId**  <br>*optional*|Filter list to only include suites that are in the given userGroupId|integer (int32)||


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[SuiteCollectionItem](#suitecollectionitem)|
|**500**|Unexpected error; report suite retrieval failed|No Content|


##### Produces

* `application/json`


<a name="findone"></a>
#### Retrieves report suite by id
```
GET /collections/suites/{rsid}
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**rsid**  <br>*required*|The rsid of the suite to return|string|
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional metadata fields to include on response.|< enum (name, parentRsid, numGroups, currency, calendarType, currentTimezoneOffset, timezoneZoneinfo) > array(multi)|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[SuiteCollectionItem](#suitecollectionitem)|
|**500**|Unexpected error; report suite retrieval failed|No Content|


##### Produces

* `application/json`


<a name="companies_resource"></a>
### Companies
Analytics Company Service


<a name="getusercompany"></a>
#### Retrieves information about the login company for the current user.
```
GET /companies/me
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of company expansions.|< enum (validEmails, allowAdobeEmails, companySecurity, billingTabAccess) > array(multi)|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[Company](#company)|
|**500**|Unexpected error; company retrieval failed|No Content|


##### Produces

* `application/json`


<a name="gettrackingserver"></a>
#### Retrieves the tracking server for the login company of the current user.
```
GET /companies/me/trackingserver
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Query**|**rsid**  <br>*required*|The rsid to use if this company does not require namespace use.|string|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsTrackingServer](#analyticstrackingserver)|
|**500**|Unexpected error; tracking server retrieval failed|No Content|


##### Produces

* `application/json`


<a name="dimensions_resource"></a>
### Dimensions
Dimensions service


<a name="dimensions_getdimensions"></a>
#### Returns a list of dimensions for a given report suite.
```
GET /dimensions
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**classifiable**  <br>*optional*|Only include classifiable dimensions.|enum (true)||
|**Query**|**dataGovernanceLabels**  <br>*optional*|Filter the response based on data governance labels. Search for multiple lables using a comma-delimited string format. Any metric/dimension containing one or more of the provided labels will be returned.|< string > array(multi)||
|**Query**|**dataGovernanceNamespaces**  <br>*optional*|Filter the response based on data governance namespaces. Search for multiple namespaces using a comma-delimited string format. Any dimension containing one or more of the provided namespaces will be returned.|< string > array(multi)||
|**Query**|**expansion**  <br>*optional*|Add extra metadata to items (comma-delimited list)|< enum (tags, approved, favorite, usageSummary, attributes) > array(multi)||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|
|**Query**|**reportTimeAttribution**  <br>*optional*|Only include dimensions that support reportTimeAttribution.|enum (true)||
|**Query**|**reportable**  <br>*optional*|Only include dimensions that are valid within a report.|enum (true)||
|**Query**|**rsid**  <br>*required*|A Report Suite ID|string||
|**Query**|**segmentable**  <br>*optional*|Only include dimensions that are valid within a segment.|enum (true)||
|**Query**|**support**  <br>*optional*|Comma-delimited list of products to filter the dimension list by. Possible values are 'oberon' and 'dataWarehouse'.|< enum (oberon, dataWarehouse) > array(multi)||
|**Query**|**supportsDataGovernance**  <br>*optional*|Only include dimensions that contain dataGovernance attribute.|enum (true)||
|**Query**|**useCache**  <br>*optional*|Enable caching for faster requests.|boolean|`"true"`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< [AnalyticsDimension](#analyticsdimension) > array|
|**400**|Invalid JSON input|No Content|
|**401**|User does not have access to this report suite|No Content|
|**500**|Unexpected internal server error|No Content|


##### Produces

* `application/json`


<a name="listdatagovernancenamespaces"></a>
#### Get all gdpr namespaces for a user's ims org
```
GET /dimensions/datagovernance/namespaces
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**useCache**  <br>*optional*|Enable caching|boolean|`"true"`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Success status|< string > array|


##### Produces

* `application/json`


<a name="dimensions_getdimensionvalues"></a>
#### Returns the names of the dimension items listed in the post body.
```
POST /dimensions/values
```


##### Description
Given a dimension name and an itemId, this endpoint returns the text value for that itemId


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**dateRange**  <br>*optional*|Optionally supply the date range for filtering dimension values (default is last 90 days). Example format: 2014-06-01/2014-06-30 (gives June 2014)|string||
|**Query**|**locale**  <br>*optional*|Locale to use when returning dimension information.|string|`"en_US"`|
|**Query**|**rsid**  <br>*required*|The report suite ID|string||


##### Body parameter
Array of dimensionItem objects where each element contains key-value pairs for "dimension" and "itemId"

*Name* : body  
*Flags* : required  
*Type* : < [DimensionItem](#dimensionitem) > array


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< [DimensionItem](#dimensionitem) > array|
|**400**|Invalid JSON input|No Content|
|**403**|Insufficient access to perform operation|No Content|
|**500**|Unexpected internal server error|No Content|


##### Produces

* `application/json`


<a name="dimensions_getdimension"></a>
#### Returns a dimension for the given report suite
```
GET /dimensions/{dimensionId}
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**dimensionId**  <br>*required*|The dimension ID. For example a valid id is a value like 'evar1'|string||
|**Query**|**expansion**  <br>*optional*|Add extra metadata to items (comma-delimited list)|< enum (tags, approved, favorite, usageSummary, attributes) > array(multi)||
|**Query**|**locale**  <br>*optional*|The locale to use for returning system named dimensions.|string|`"en_US"`|
|**Query**|**rsid**  <br>*required*|The report suite ID.|string||


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsDimension](#analyticsdimension)|
|**401**|User Doesn't have sufficient privileges|No Content|


##### Produces

* `application/json`


<a name="favorites_resource"></a>
### Favorites
Operations on managing favorites on components


<a name="favorites_save"></a>
#### Creates 'favorite' records for a given component
```
POST /favorites
```


##### Description
Accepts an array of Favorite objects to allow creation of one or many 'favorite' records in a single call.


##### Body parameter
JSON-formatted ARRAY containing a list of favorite objects

*Name* : body  
*Flags* : required  
*Type* : < [Favorite](#favorite) > array


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[Favorite](#favorite)|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="favorites_findallforcurrentuser"></a>
#### Returns a list of favorite objects for the current user meeting the paging restriction
```
GET /favorites
```


##### Description
Returns an array of all of the favorites objects tied to the company. Setting a very large page size will return the list in a single request, but it may be more data than you expect and you may experience performance issues.


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**componentIds**  <br>*optional*|Comma-delimited list of componentIds to filter on. Must also pass componentType.|string||
|**Query**|**componentType**  <br>*optional*|The component type to filter on. Required if also using componentIds filter.|enum (segment, dashboard, bookmark, calculatedMetric, project, dateRange, metric, dimension, virtualReportSuite, scheduledJob, alert, classificationSet)||
|**Query**|**limit**  <br>*optional*|Number of results per page|integer|`10`|
|**Query**|**page**  <br>*optional*|Page number (base 0 - first page is "0")|integer|`0`|
|**Query**|**userid**  <br>*optional*|The user ID to return details for. Only admins may use this option.|integer (int32)||


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< [Favorite](#favorite) > array|


##### Produces

* `application/json`


<a name="favorites_deletebyitemids"></a>
#### Deletes favorites by componentId. Accepts a list of componentIds and deletes any "Favorites" associated with them
```
DELETE /favorites
```


##### Description
Deletes favorites based on componentIds.


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Query**|**componentIds**  <br>*required*|A comma separated list of component Ids|string|
|**Query**|**componentType**  <br>*required*|The component type to operate on.|enum (segment, dashboard, bookmark, calculatedMetric, project, dateRange, metric, dimension, virtualReportSuite, scheduledJob, alert, classificationSet)|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< < string, object > map > array|


##### Produces

* `application/json`


<a name="favorites_findone"></a>
#### Retrieve a 'favorite' record by id
```
GET /favorites/{id}
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**id**  <br>*required*|The id of the "Favorite" record to return|integer (int64)|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[Favorite](#favorite)|


##### Produces

* `application/json`


<a name="favorites_deletebyfavoriteid"></a>
#### Deletes the "Favorite" with the given id
```
DELETE /favorites/{id}
```


##### Description
Deletes by favoriteId.


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**id**  <br>*required*|The id of the favorite|integer (int64)|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< string, object > map|
|**400**|Attempting to remove a favorite by id that does not exist|No Content|
|**403**|Attempting to remove a favorite for a user other than the authenticated user|No Content|


##### Produces

* `application/json`


<a name="metrics_resource"></a>
### Metrics
Retrieves a List of Metrics for the Given Report Suite


<a name="getmetrics"></a>
#### Returns a list of metrics for the given report suite
```
GET /metrics
```


##### Description
This returns the metrics list primarily for the Analytics product. The platform identity API Returns a list of all possible metrics for the supported systems.


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**expansion**  <br>*optional*|Add extra metadata to items (comma-delimited list)|< enum (tags, approved, favorite, usageSummary, attributes) > array(multi)||
|**Query**|**locale**  <br>*optional*|Locale that system named metrics should be returned in|string|`"en_US"`|
|**Query**|**rsid**  <br>*required*|ID of desired report suite ie. sistr2|string||
|**Query**|**segmentable**  <br>*optional*|Filter the metrics by if they are valid in a segment.|boolean|`"false"`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsMetric](#analyticsmetric)|
|**400**|Invalid JSON input|No Content|
|**403**|Insufficient access to perform operation|No Content|
|**500**|Unexpected internal server error|No Content|


##### Produces

* `application/json`


<a name="getmetric"></a>
#### Returns a metric for the given report suite
```
GET /metrics/{id}
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**id**  <br>*required*|The id of the metric for which to retrieve info. Note ids are values like pageviews, not metrics/pageviews|string||
|**Query**|**expansion**  <br>*optional*|Add extra metadata to items (comma-delimited list)|< enum (tags, approved, favorite, usageSummary, attributes) > array(multi)||
|**Query**|**includeHidden**  <br>*optional*|Whether to include variables that are hidden in the UI or that the user doesn't have permission to.|boolean|`"false"`|
|**Query**|**locale**  <br>*optional*|Locale that system named metrics should be returned in|string|`"en_US"`|
|**Query**|**rsid**  <br>*required*|ID of desired report suite ie. sistr2|string||


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsMetric](#analyticsmetric)|
|**400**|Invalid JSON input|No Content|
|**403**|Insufficient access to perform operation|No Content|
|**500**|Unexpected internal server error|No Content|


##### Produces

* `application/json`


<a name="reports_resource"></a>
### Reports
Ranked reports service


<a name="runreport"></a>
#### Runs a report for the request in the post body
```
POST /reports
```


##### Description
See the [Reporting Interface wiki page](https://wiki.corp.adobe.com/display/scservices/Reporting+Interface) for details.


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**allowRemoteLoad**  <br>*optional*|Controls if Oberon should remote load data.  Default behavior is true with fallback to false if remote data does not exist|enum (true, false, default)|`"default"`|
|**Query**|**includeOberonXml**  <br>*optional*|Controls if Oberon XML should be returned in the response - DEBUG ONLY|enum (true, false)|`"false"`|
|**Query**|**includePlatformPredictiveObjects**  <br>*optional*|Controls if platform Predictive Objects should be returned in the response. Only available when using Anomaly Detection or Forecasting- DEBUG ONLY|enum (true, false)|`"false"`|
|**Query**|**useCache**  <br>*optional*|Use caching for faster requests (Use cached dimensions to speed up permission checks - This does not do any report caching)|boolean|`"true"`|
|**Query**|**usesCatalogIdentities**  <br>*optional*|Whether this ranked request uses Catalog identities (true) or usual Analytics identities (false). Uses server default (host specific) when not passed.|boolean||


##### Body parameter
*Name* : body  
*Flags* : optional  
*Type* : [RankedRequest](#rankedrequest)


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[RankedReportData](#rankedreportdata)|
|**400**|Invalid input; name, rsid, and definition are all required. Definition must be formatted as a JSON Object.|[ReportErrorStatus](#reporterrorstatus)|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="runrankedreport"></a>
#### Runs a ranked report for the report in the post body
```
POST /reports/ranked
```


##### Description
See the [Reporting Interface wiki page](https://wiki.corp.adobe.com/display/scservices/Reporting+Interface) for details.


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**allowRemoteLoad**  <br>*optional*|Controls if Oberon should remote load data.  Default behavior is true with fallback to false if remote data does not exist|enum (true, false, default)|`"default"`|
|**Query**|**includeOberonXml**  <br>*optional*|Controls if Oberon XML should be returned in the response - DEBUG ONLY|enum (true, false)|`"false"`|
|**Query**|**includePlatformPredictiveObjects**  <br>*optional*|Controls if platform Predictive Objects should be returned in the response. Only available when using Anomaly Detection or Forecasting- DEBUG ONLY|enum (true, false)|`"false"`|
|**Query**|**useCache**  <br>*optional*|Use caching for faster requests (Use cached dimensions to speed up permission checks - This does not do any report caching)|boolean|`"true"`|
|**Query**|**usesCatalogIdentities**  <br>*optional*|Whether this ranked request uses Catalog identities (true) or usual Analytics identities (false). Uses server default (host specific) when not passed.|boolean||


##### Body parameter
*Name* : body  
*Flags* : optional  
*Type* : [RankedRequest](#rankedrequest)


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[RankedReportData](#rankedreportdata)|
|**400**|Invalid input; name, rsid, and definition are all required. Definition must be formatted as a JSON Object.|[ReportErrorStatus](#reporterrorstatus)|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="runsegmentsummaryreport"></a>
#### Returns a segment summary report for the segment definition in the post body
```
POST /reports/segmentSummary
```


##### Description
Requires rsid and definition. Used to validate a segment definition and return basic reporting metrics for that definition. 


The response contains products that the definition is compatible with, as well as a series of totals that represent how many Page Views, Visits, and Visitors the segment includes.

Format for the order of Totals in response:


1) Number of Page Views that the segment includes for the given time period

2) Number of Visits that the segment includes for the given time period

3) Number of Unique Visitors that the segment includes for the given time period

4) Total number of Page Views for the time period (non-segmented)

5) Total number of Visits for the time period (non-segmented)

6) Total number of Unique Visitors for the time period (non-segmented)


The overall totals (3-6) can be used with the segment totals (1-3) to determine the percentage of the segment's audience for each metric.

Example definition for use in testing API below ("Page exists"):


```

{
	"func": "segment",
	"container": {
		"func": "container",
		"context": "hits",
		"pred": {
			"func": "exists",
			"description": "Page",
			"val": {
				"func": "attr",
				"name": "variables/page"
			}
		}
	},
	"version": [1, 0, 0]
}


```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**allowRemoteLoad**  <br>*optional*|Controls if Oberon should remote load data.  Default behavior is true with fallback to false if remote data does not exist|enum (true, false, default)|`"default"`|
|**Query**|**dateRange**  <br>*optional*|Format: YYYY-MM-DD/YYYY-MM-DD|string||
|**Query**|**endDate**  <br>*optional*|Format: YYYY-MM-DD|string||
|**Query**|**includeOberonXml**  <br>*optional*|Controls if Oberon XML should be returned in the response - DEBUG ONLY|enum (true, false)|`"false"`|
|**Query**|**includeVisitorsMcvisid**  <br>*optional*|Controls if Visitors with Experience Cloud ID should be returned in the response|enum (true, false)|`"false"`|
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|
|**Query**|**rsid**  <br>*required*|RSID to run the report against|string||
|**Query**|**startDate**  <br>*optional*|Format: YYYY-MM-DD|string||


##### Body parameter
Segment definition

*Name* : body  
*Flags* : required  
*Type* : string


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[SegmentSummaryResponse](#segmentsummaryresponse)|
|**400**|Bad JSON input; request not formatted correctly|No Content|
|**403**|User does not have access to run this report|No Content|
|**500**|Unexpected error; failed to run report|No Content|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="runtopitemsreport"></a>
#### Returns a top items report for the given dimension
```
GET /reports/topItems
```


##### Description
Get the top X items (based on paging restriction) for the specified dimension and rsid. Defaults to last 90 days.

Search Clause examples:
contains test: 'test'

 contains test or test1: 'test' OR 'test1'

contains test and test1: 'test' AND 'test1'

contains test and not (test1 or test2): 'test' AND NOT ('test1' OR 'test2')

does not contain test: NOT 'test'


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**allowRemoteLoad**  <br>*optional*|Controls if Oberon should remote load data.  Default behavior is true with fallback to false if remote data does not exist|enum (true, false, default)|`"default"`|
|**Query**|**dateRange**  <br>*optional*|Format: YYYY-MM-DD/YYYY-MM-DD|string||
|**Query**|**dimension**  <br>*required*|Dimension to run the report against. Example: "variables/page"|string||
|**Query**|**endDate**  <br>*optional*|Format: YYYY-MM-DD|string||
|**Query**|**includeOberonXml**  <br>*optional*|Controls if Oberon XML should be returned in the response - DEBUG ONLY|enum (true, false)|`"false"`|
|**Query**|**limit**  <br>*optional*|Number of results per page|integer|`10`|
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|
|**Query**|**page**  <br>*optional*|Page number (base 0 - first page is "0")|integer|`0`|
|**Query**|**rsid**  <br>*required*|RSID to run the report against|string||
|**Query**|**search-clause**  <br>*optional*|General search string; wrap with single quotes. Example: 'PageABC'|string||
|**Query**|**searchAnd**  <br>*optional*|Search terms that will be AND-ed together. Space delimited.|string||
|**Query**|**searchNot**  <br>*optional*|Search terms that will be treated as NOT including. Space delimited.|string||
|**Query**|**searchOr**  <br>*optional*|Search terms that will be OR-ed together. Space delimited.|string||
|**Query**|**searchPhrase**  <br>*optional*|A full search phrase that will be searched for.|string||
|**Query**|**startDate**  <br>*optional*|Format: YYYY-MM-DD|string||


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[UnhashReportData](#unhashreportdata)|
|**403**|User does not have access to run this report|No Content|
|**500**|Unexpected error; failed to run report|No Content|


##### Produces

* `application/json`


<a name="reportsuites_resource"></a>
### Reportsuites
Analytics Report Suite Service


<a name="findall"></a>
#### Retrieves report suites that match the given filters.
```
GET /reportsuites
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional report suite metadata fields to include on response.|< enum (calendarType, reportSuiteName, baseUrl, defaultPage, currency, calendarAnchorDate, timezone, timezoneZoneinfo) > array(multi)||
|**Query**|**limit**  <br>*optional*|Number of results per page|integer|`10`|
|**Query**|**page**  <br>*optional*|Page number (base 0 - first page is "0")|integer|`0`|
|**Query**|**rsidContains**  <br>*optional*|Filter list to only include suites whose rsid contains rsidContains.|string||
|**Query**|**rsidOrNameContains**  <br>*optional*|Filter list to only include suites whose rsid or report suite name contains rsidOrNameContains.|string||
|**Query**|**rsids**  <br>*optional*|Filter list to only include suites in this RSID list (comma-delimited)|string||


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsReportSuite](#analyticsreportsuite)|
|**500**|Unexpected error; report suite retrieval failed|No Content|


##### Produces

* `application/json`


<a name="findcalendartype"></a>
#### Retrieves calendar type for a single report suite.
```
GET /reportsuites/{rsid}/calendartype
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**rsid**  <br>*required*|rsid|string|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[CalendarType](#calendartype)|
|**500**|Unexpected error; retrieval of report suite calendar type failed due to an internal error|No Content|


##### Produces

* `application/json`


<a name="segments_resource"></a>
### Segments
These operations manage Adobe Analytics Segments. Segments are used to isolate interesting groups of visitors, visits, or hits.


<a name="segments_createsegment"></a>
#### Creates Segment
```
POST /segments
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional segment metadata fields to include on response.|< enum (reportSuiteName, siteTitle, ownerFullName, modified, approved, favorite, shares, tags, sharesFullName, usageSummary, compatibility, definition) > array(multi)||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|
|**Query**|**version**  <br>*optional*|Decides the version of segment service|enum (old, new)|`"old"`|


##### Body parameter
JSON-formatted Object containing key/value pairs for segment creation.

*Name* : body  
*Flags* : optional  
*Type* : < string, object > map


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsSegmentResponseItem](#analyticssegmentresponseitem)|
|**400**|Invalid input; name, rsid, and definition are all required. Definition must be formatted as a JSON Object.|No Content|
|**500**|External API error; Segment create or retrieval failed|No Content|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="segments_getsegments"></a>
#### Retrieve All Segments
```
GET /segments
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**curatedRsid**  <br>*optional*|Include the curatedItem status for given report suite ID|string||
|**Query**|**dataGroup**  <br>*optional*|Filter list to only include segments with the given data group|string||
|**Query**|**dataType**  <br>*optional*|Filter list to only include segments compatible with the specified product|enum (dw, oberon)||
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional segment metadata fields to include on response.|< enum (reportSuiteName, siteTitle, ownerFullName, modified, approved, favorite, shares, tags, sharesFullName, usageSummary, compatibility, definition) > array(multi)||
|**Query**|**filterByIds**  <br>*optional*|Filter list to only include segments in the specified list (comma-delimited list of IDs) (this is the same as segmentFilter, and is overwritten by segmentFilter|string||
|**Query**|**filterByModifiedAfter**  <br>*optional*|Filter list to only include segments modified since this date (ISO8601 format)|string||
|**Query**|**includeType**  <br>*optional*|Include additional segments not owned by user. The "all" option takes precedence over "shared"|< enum (shared, all, templates, deleted, internal, curatedItem) > array(multi)||
|**Query**|**limit**  <br>*optional*|Number of results per page|integer|`10`|
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|
|**Query**|**name**  <br>*optional*|Filter list to only include segments that contains the Name|string||
|**Query**|**ownerId**  <br>*optional*|Filter list to only include segments owned by the specified loginId|integer (int32)||
|**Query**|**page**  <br>*optional*|Page number (base 0 - first page is "0")|integer|`0`|
|**Query**|**pagination**  <br>*optional*|Return paginated results|enum (true, false)|`"false"`|
|**Query**|**reportTimeAttribution**  <br>*optional*|Filter list to only include segments by reportTimeAttribution|boolean||
|**Query**|**rsids**  <br>*optional*|Filter list to only include segments tied to specified RSID list (comma-delimited)|string||
|**Query**|**segmentFilter**  <br>*optional*|Filter list to only include segments in the specified list (comma-delimited list of IDs)|string||
|**Query**|**tagNames**  <br>*optional*|Filter list to only include segments that contains one of the tags|string||
|**Query**|**toBeUsedInRsid**  <br>*optional*|Required when reportTimeAttribution != null or expansion=reportTimeAttribution|string||
|**Query**|**version**  <br>*optional*|Decides the version of segment service|enum (old, new)|`"old"`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsSegmentResponseItem](#analyticssegmentresponseitem)|
|**400**|Unable to retrieve list of segments shared with user|No Content|
|**401**|Owner filter error; user specified is not in the same company as the requesting user|No Content|
|**403**|Requesting non-shared segments for other users is restricted to admin users|No Content|
|**500**|External API error; Segment retrieval failed|No Content|


##### Produces

* `application/json`


<a name="segments_aamstatus"></a>
#### AAM Status
```
GET /segments/aamstatus
```


##### Description
Checks the provided report suite to see if it is configured to allow segment sharing with Adobe Audience Manager.


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**rsid**  <br>*required*|Report suite ID to check status for|string||
|**Query**|**version**  <br>*optional*|Decides the version of segment service|enum (old, new)|`"old"`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|object|
|**500**|External API error; failed to check status for given RSID|No Content|


##### Produces

* `application/json`


<a name="segments_getsegment"></a>
#### Get a Single Segment
```
GET /segments/{id}
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**id**  <br>*required*|The segment ID to retrieve|string||
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional segment metadata fields to include on response.|< enum (reportSuiteName, siteTitle, ownerFullName, modified, approved, favorite, shares, tags, sharesFullName, usageSummary, compatibility, definition) > array(multi)||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|
|**Query**|**toBeUsedInRsid**  <br>*optional*|Evaluate the reportTimeAttribution/customerJourney compatibility for the provided report suite ID|string||
|**Query**|**version**  <br>*optional*|Decides the version of segment service|enum (old, new)|`"old"`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsSegmentResponseItem](#analyticssegmentresponseitem)|
|**403**|Requesting non-shared segments for other users is restricted to admin users|No Content|
|**500**|External API error; segment retrieval failed|No Content|


##### Produces

* `application/json`


<a name="segments_updatesegment"></a>
#### Update a Segment
```
PUT /segments/{id}
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**id**  <br>*required*|Segment ID to be updated|string||
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional segment metadata fields to include on response.|< enum (reportSuiteName, siteTitle, ownerFullName, modified, approved, favorite, shares, tags, sharesFullName, usageSummary, compatibility, definition) > array(multi)||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|
|**Query**|**version**  <br>*optional*|Decides the version of segment service|enum (old, new)|`"old"`|


##### Body parameter
JSON-formatted Object containing key/value pairs to be updated.

*Name* : body  
*Flags* : optional  
*Type* : < string, object > map


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsSegmentResponseItem](#analyticssegmentresponseitem)|
|**400**|Definition must be formatted as a JSON Object|No Content|
|**401**|Company mismatch; segment ownership can only be transferred within the same organization|No Content|
|**403**|User does not have permission to update this segment|No Content|
|**500**|External API error; Segment update or retrieval failed|No Content|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="segments_deletesegment"></a>
#### Delete Segment
```
DELETE /segments/{id}
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**id**  <br>*required*|The segment ID to be deleted|string||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|
|**Query**|**version**  <br>*optional*|Decides the version of segment service|enum (old, new)|`"old"`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|string|
|**500**|External API error; Segment delete failed|No Content|


##### Produces

* `application/json`


<a name="tags_resource"></a>
### Tags
Operations on tags


<a name="savetaglist"></a>
#### Saves the given tag(s) for the current user's company
```
POST /tags
```


##### Description
Allows creation of a new tag and applies that new tag to the passed component


##### Body parameter
JSON-formatted array of Tag objects containing key-value pairs

*Name* : body  
*Flags* : optional  
*Type* : < [Tag](#tag) > array


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< [Tag](#tag) > array|
|**500**|Unable to save list of tags.|No Content|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="findallforcompany"></a>
#### Returns a list of tags for the current user's company
```
GET /tags
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**limit**  <br>*optional*|Number of results per page|integer|`10`|
|**Query**|**page**  <br>*optional*|Page number (base 0 - first page is "0")|integer|`0`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< [Tag](#tag) > array|
|**500**|Unable to retrieve list of tags for user.|No Content|


##### Produces

* `application/json`


<a name="deletetagitems"></a>
#### Disassociates all tags from the given components
```
DELETE /tags
```


##### Description
Removes all tags from the passed componentIds. Note that currently this is done in a single DB query, so there is a single combined response for the entire operation.


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Query**|**componentIds**  <br>*required*|Comma-separated list of componentIds to operate on.|string|
|**Query**|**componentType**  <br>*required*|The component type to operate on.|enum (segment, dashboard, bookmark, calculatedMetric, project, dateRange, metric, dimension, virtualReportSuite, scheduledJob, alert, classificationSet)|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< string, object > map|
|**400**|Invalid component type.|No Content|
|**500**|Unable to remove tags for given components.|No Content|


##### Produces

* `application/json`


<a name="gettaglistbycomponentidandcomponenttype"></a>
#### Retrieves a tags for a given component by componentId and componentType
```
GET /tags/search
```


##### Description
Given a componentId, return all tags associated with that component


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Query**|**componentId**  <br>*required*|The componentId to operate on. Currently this is just the segmentId.|string|
|**Query**|**componentType**  <br>*required*|The component type to operate on.|enum (segment, dashboard, bookmark, calculatedMetric, project, dateRange, metric, dimension, virtualReportSuite, scheduledJob, alert, classificationSet)|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< [Tag](#tag) > array|
|**400**|Invalid component type.|No Content|
|**500**|Unable to retrieve tags for given component.|No Content|


##### Produces

* `application/json`


<a name="savetagcomponentlist"></a>
#### Tag a component with one or many tags at once. WARNING: Authoritative; deletes/overwrites all pre-existing associations
```
PUT /tags/tagitems
```


##### Description
This endpoint allows many tags at once to be created/deleted. Any tags passed to this endpoint will become the *only* tags for that componentId (all other tags will be removed).


##### Body parameter
JSON-formatted object containing key-value pairs that conform to the schema

*Name* : body  
*Flags* : optional  
*Type* : < [TaggedComponent](#taggedcomponent) > array


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< [TaggedComponent](#taggedcomponent) > array|
|**500**|Unable to save tag list.|No Content|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="gettagbyid"></a>
#### Retrieves an tag by its id
```
GET /tags/{id}
```


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**id**  <br>*required*|Tag ID to be retrieved|integer (int32)|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[Tag](#tag)|
|**404**|Unable to find a tag with the given ID|No Content|
|**500**|Unexpected server error while trying to retrieve tag|No Content|


##### Produces

* `application/json`


<a name="deletetag"></a>
#### Removes the tagId and all associations from that tag to any components
```
DELETE /tags/{id}
```


##### Description
Delete by tagId. Will un-tag any/all components that were associated with the passed tagId.


##### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**id**  <br>*required*|The tagId to be deleted|integer (int32)|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< string, object > map|
|**404**|The given tagId does not exist|No Content|
|**500**|Unable to delete the given tagId.|No Content|


##### Produces

* `application/json`


<a name="timezones_resource"></a>
### Timezones
Timezone Operations


<a name="gettimezones"></a>
#### Retrieves timezones available to be used in Adobe Analytics.
```
GET /timezones
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|< [Timezone](#timezone) > array|
|**500**|Unexpected error; timezone retrieval failed|No Content|


##### Produces

* `application/json`


<a name="virtualreportsuites_resource"></a>
### Virtualreportsuites
Operations on virtual report suites


<a name="virtualreportsuites_createvirtualreportsuite"></a>
#### Creates a new virtual report suite
```
POST /virtualreportsuites
```


##### Description
Creates a virtual report suite. The following attributes are available when creating a virtual report suite:
Required: name, parentRsid


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional virtual report suite metadata fields to include on response.|< enum (globalCompanyKey, parentRsid, parentRsidName, timezone, timezoneZoneinfo, currentTimezoneOffset, segmentList, description, modified, isDeleted, approved, favorite, tags, ownerFullName, compatibility) > array(multi)||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|


##### Body parameter
JSON-formatted Object containing key/value pairs for virtual report suite creation.

*Name* : body  
*Flags* : optional  
*Type* : [AnalyticsVirtualReportSuite](#analyticsvirtualreportsuite)


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsVirtualReportSuite](#analyticsvirtualreportsuite)|
|**400**|Invalid input; name and parentRsid are required.|No Content|
|**500**|External API error; Virtual report suite create or retrieval failed|No Content|


##### Consumes

* `application/json`


##### Produces

* `application/json`


<a name="getvirtualreportsuites"></a>
#### Retrieves virtual report suites accessible to the current user.
```
GET /virtualreportsuites
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional virtual report suite metadata fields to include on response.|< enum (globalCompanyKey, parentRsid, parentRsidName, timezone, timezoneZoneinfo, currentTimezoneOffset, segmentList, description, modified, isDeleted, approved, favorite, tags, ownerFullName, compatibility) > array(multi)||
|**Query**|**filterByModifiedAfter**  <br>*optional*|Filter list to only include virtual report suites modified since this date (ISO8601 format)|string||
|**Query**|**idContains**  <br>*optional*|Filter list to only include suites whose id contains idContains.|string||
|**Query**|**limit**  <br>*optional*|Number of results per page|integer|`10`|
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|
|**Query**|**page**  <br>*optional*|Page number (base 0 - first page is "0")|integer|`0`|
|**Query**|**rsids**  <br>*optional*|Filter list to only include suites in this RSID list (comma-delimited)|string||


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsVirtualReportSuite](#analyticsvirtualreportsuite)|
|**500**|Unexpected error; virtual report suite retrieval failed|No Content|


##### Produces

* `application/json`


<a name="getvirtualreportsuite"></a>
#### Retrieves a single virtual report suite by ID.
```
GET /virtualreportsuites/{id}
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**id**  <br>*required*|The vrsid to retrieve|string||
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional virtual report suite metadata fields to include on response.|< enum (globalCompanyKey, parentRsid, parentRsidName, timezone, timezoneZoneinfo, currentTimezoneOffset, segmentList, description, modified, isDeleted, approved, favorite, tags, ownerFullName, compatibility) > array(multi)||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsVirtualReportSuite](#analyticsvirtualreportsuite)|
|**500**|Unexpected error; virtual report suite retrieval failed|No Content|


##### Produces

* `application/json`


<a name="updatevirtualreportsuite"></a>
#### Updates configuration for a virtual report suite.
```
PUT /virtualreportsuites/{id}
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**id**  <br>*required*|The vrsid to update|string||
|**Query**|**expansion**  <br>*optional*|Comma-delimited list of additional virtual report suite metadata fields to include on response.|< enum (globalCompanyKey, parentRsid, parentRsidName, timezone, timezoneZoneinfo, currentTimezoneOffset, segmentList, description, modified, isDeleted, approved, favorite, tags, ownerFullName, compatibility) > array(multi)||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|


##### Body parameter
JSON-formatted Object containing virtual report suite keys/value pairs to be updated.

*Name* : body  
*Flags* : optional  
*Type* : [AnalyticsVirtualReportSuite](#analyticsvirtualreportsuite)


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[AnalyticsVirtualReportSuite](#analyticsvirtualreportsuite)|


##### Produces

* `application/json`


<a name="deletevirtualreportsuite"></a>
#### Delete a virtual report suite by ID
```
DELETE /virtualreportsuites/{id}
```


##### Parameters

|Type|Name|Description|Schema|Default|
|---|---|---|---|---|
|**Path**|**id**  <br>*required*|The virtual report suite ID to be deleted|string||
|**Query**|**locale**  <br>*optional*|Locale|string|`"en_US"`|


##### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|successful operation|[DeleteResponse](#deleteresponse)|
|**500**|External API error; Virtual report suite delete failed|No Content|


##### Produces

* `application/json`



