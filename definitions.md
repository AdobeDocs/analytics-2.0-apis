
<a name="definitions"></a>
## Definitions

<a name="adcloudconfiguration"></a>
### AdCloudConfiguration

|Name|Schema|
|---|---|
|**cidUrlParam**  <br>*optional*|string|
|**dataSourcesId**  <br>*optional*|integer (int32)|
|**secondaryRel**  <br>*optional*|integer (int32)|


<a name="alternatevariablenames"></a>
### AlternateVariableNames

|Name|Schema|
|---|---|
|**baseName**  <br>*optional*|string|
|**curatedName**  <br>*optional*|string|
|**name**  <br>*optional*|string|


<a name="analyticscalculatedmetric"></a>
### AnalyticsCalculatedMetric

|Name|Description|Schema|
|---|---|---|
|**approved**  <br>*optional*||boolean|
|**authorization**  <br>*optional*||[CalculatedMetricAuthorization](#calculatedmetricauthorization)|
|**created**  <br>*optional*  <br>*read-only*|Calculated metric creation date|string (date-time)|
|**definition**  <br>*required*|Calculated metric definition object|[CalculatedMetricDef](#calculatedmetricdef)|
|**description**  <br>*optional*||string|
|**favorite**  <br>*optional*||boolean|
|**id**  <br>*optional*  <br>*read-only*|System generated id|string|
|**isDeleted**  <br>*optional*||boolean|
|**modified**  <br>*optional*||string (date-time)|
|**name**  <br>*optional*||string|
|**owner**  <br>*optional*||[Owner](#owner)|
|**polarity**  <br>*optional*|Set metric polarity, which indicates whether it's good or bad if a given metric goes up. Default=positive|enum (positive, negative)|
|**precision**  <br>*optional*|Number of decimal places to include in calculated metric result|integer (int32)|
|**reportSuiteName**  <br>*optional*  <br>*read-only*|The report suite name for which the component was created/updated|string|
|**rsid**  <br>*optional*|The report suite id for which the component was created/updated|string|
|**shares**  <br>*optional*||< [Share](#share) > array|
|**siteTitle**  <br>*optional*||string|
|**tags**  <br>*optional*||< [Tag](#tag) > array|
|**template**  <br>*optional*||boolean|
|**type**  <br>*optional*||enum (CURRENCY, TIME, DECIMAL, PERCENT)|
|**usageSummary**  <br>*optional*||[SummarizedUsageItem](#summarizedusageitem)|
|**warning**  <br>*optional*||[MetricsWarning](#metricswarning)|


<a name="analyticsclassificationcolumn"></a>
### AnalyticsClassificationColumn

|Name|Description|Schema|
|---|---|---|
|**classifiedBy**  <br>*optional*|An optional classification dataset id, whose dataset classifies this column's data.|string|
|**displayName**  <br>*required*|The display name for this given data column. Mutable. Can be any valid UTF-8 string.|string|
|**id**  <br>*optional*  <br>*read-only*|A UUID that will be generated when a column is created.|string|
|**identityName**  <br>*optional*||string|
|**name**  <br>*required*|The name for this given data column. Immutable after column creation. Can be any valid UTF-8 string.|string|
|**numericId**  <br>*optional*||string|
|**tags**  <br>*optional*|Internal column tags. Used to store info (like div nums) to support taxonomist migration.|< string > array|
|**type**  <br>*optional*|Defaults to 'text'. Immutable after column creation.|enum (text, integer, float, list[string])|


<a name="analyticscuratedcomponent"></a>
### AnalyticsCuratedComponent

|Name|Schema|
|---|---|
|**componentId**  <br>*required*|string|
|**componentType**  <br>*optional*|string|
|**curatedName**  <br>*optional*|string|


<a name="analyticsdatagovernancelabels"></a>
### AnalyticsDataGovernanceLabels

|Name|Schema|
|---|---|
|**allowedEmpty**  <br>*optional*|boolean|
|**defaultLabels**  <br>*optional*|< string > array|
|**editable**  <br>*optional*|boolean|
|**labels**  <br>*optional*|< string > array|
|**usesDefault**  <br>*optional*|boolean|


<a name="analyticsdatagovernancesettings"></a>
### AnalyticsDataGovernanceSettings

|Name|Schema|
|---|---|
|**auth**  <br>*optional*|[AnalyticsDataGovernanceLabels](#analyticsdatagovernancelabels)|
|**gdprAccess**  <br>*optional*|[AnalyticsDataGovernanceLabels](#analyticsdatagovernancelabels)|
|**gdprDelete**  <br>*optional*|[AnalyticsDataGovernanceLabels](#analyticsdatagovernancelabels)|
|**identifiability**  <br>*optional*|[AnalyticsDataGovernanceLabels](#analyticsdatagovernancelabels)|
|**namespace**  <br>*optional*|string|
|**sensitivity**  <br>*optional*|[AnalyticsDataGovernanceLabels](#analyticsdatagovernancelabels)|


<a name="analyticsdimension"></a>
### AnalyticsDimension

|Name|Schema|
|---|---|
|**aliasId**  <br>*optional*|string|
|**alternateVariableNames**  <br>*optional*|[AlternateVariableNames](#alternatevariablenames)|
|**approved**  <br>*optional*|boolean|
|**attributes**  <br>*optional*|< string > array|
|**attributionModel**  <br>*optional*|< string, object > map|
|**breakdownAttributionModel**  <br>*optional*|< string, object > map|
|**category**  <br>*optional*|string|
|**curatedItem**  <br>*optional*|boolean|
|**customerJourney**  <br>*optional*|boolean|
|**dataGovernance**  <br>*optional*|[AnalyticsDataGovernanceSettings](#analyticsdatagovernancesettings)|
|**dataGroup**  <br>*optional*|string|
|**description**  <br>*optional*|string|
|**extraTitleInfo**  <br>*optional*|string|
|**favorite**  <br>*optional*|boolean|
|**fragRelId**  <br>*optional*|string|
|**hidden**  <br>*optional*|boolean|
|**id**  <br>*optional*|string|
|**isEntryOrExit**  <br>*optional*|boolean|
|**name**  <br>*optional*|string|
|**noAccess**  <br>*optional*|boolean|
|**parent**  <br>*optional*|string|
|**pathable**  <br>*optional*|boolean|
|**reportTimeAttribution**  <br>*optional*|boolean|
|**reportable**  <br>*optional*|< string > array|
|**segmentable**  <br>*optional*|boolean|
|**shares**  <br>*optional*|< [Share](#share) > array|
|**support**  <br>*optional*|< string > array|
|**supportsDataGovernance**  <br>*optional*|boolean|
|**tags**  <br>*optional*|< [Tag](#tag) > array|
|**title**  <br>*optional*|string|
|**type**  <br>*optional*|enum (STRING, INT, DECIMAL, CURRENCY, PERCENT, TIME, ENUM, ORDERED_ENUM)|
|**usageSummary**  <br>*optional*|[SummarizedUsageItem](#summarizedusageitem)|


<a name="analyticsmcassociation"></a>
### AnalyticsMcAssociation

|Name|Schema|
|---|---|
|**createTimestamp**  <br>*optional*|string (date-time)|
|**createUser**  <br>*optional*|string|
|**createdBySystem**  <br>*optional*|boolean|
|**dataCenter**  <br>*optional*|string|
|**dataSourceId**  <br>*optional*|integer (int32)|
|**imsOrgId**  <br>*optional*|string|
|**partnerId**  <br>*optional*|integer (int32)|
|**rsid**  <br>*optional*|string|
|**updateTimestamp**  <br>*optional*|string (date-time)|


<a name="analyticsmcaudiences"></a>
### AnalyticsMcAudiences

|Name|Schema|
|---|---|
|**enabled**  <br>*optional*|boolean|


<a name="analyticsmcclusterconfiguration"></a>
### AnalyticsMcClusterConfiguration

|Name|Description|Schema|
|---|---|---|
|**dataSourceId**  <br>*optional*|the dpid|string|


<a name="analyticsmcestimatedclusters"></a>
### AnalyticsMcEstimatedClusters

|Name|Schema|
|---|---|
|**coopEnabled**  <br>*optional*|boolean|
|**estimatedPeople**  <br>*optional*|[AnalyticsMcClusterConfiguration](#analyticsmcclusterconfiguration)|
|**mcAssociation**  <br>*optional*|[AnalyticsMcAssociation](#analyticsmcassociation)|
|**rsid**  <br>*optional*|string|


<a name="analyticsmetric"></a>
### AnalyticsMetric

|Name|Schema|
|---|---|
|**aliasId**  <br>*optional*|string|
|**allocation**  <br>*optional*|boolean|
|**alternateVariableNames**  <br>*optional*|[AlternateVariableNames](#alternatevariablenames)|
|**approved**  <br>*optional*|boolean|
|**attributes**  <br>*optional*|< string > array|
|**calculated**  <br>*optional*|boolean|
|**category**  <br>*optional*|string|
|**curatedItem**  <br>*optional*|boolean|
|**customerJourney**  <br>*optional*|boolean|
|**dataCollectionType**  <br>*optional*|string|
|**dataGovernance**  <br>*optional*|[AnalyticsDataGovernanceSettings](#analyticsdatagovernancesettings)|
|**dataGroup**  <br>*optional*|string|
|**description**  <br>*optional*|string|
|**extraTitleInfo**  <br>*optional*|string|
|**favorite**  <br>*optional*|boolean|
|**helpLink**  <br>*optional*|string|
|**hidden**  <br>*optional*|boolean|
|**id**  <br>*optional*|string|
|**metricViews**  <br>*optional*|< [AnalyticsMetricView](#analyticsmetricview) > array|
|**name**  <br>*optional*|string|
|**noAccess**  <br>*optional*|boolean|
|**polarity**  <br>*optional*|enum (positive, negative)|
|**precision**  <br>*optional*|integer (int32)|
|**reportTimeAttribution**  <br>*optional*|boolean|
|**segmentable**  <br>*optional*|boolean|
|**shares**  <br>*optional*|< [Share](#share) > array|
|**support**  <br>*optional*|< string > array|
|**supportsDataGovernance**  <br>*optional*|boolean|
|**tags**  <br>*optional*|< [Tag](#tag) > array|
|**title**  <br>*optional*|string|
|**type**  <br>*optional*|enum (STRING, INT, DECIMAL, CURRENCY, PERCENT, TIME, ENUM, ORDERED_ENUM)|
|**usageSummary**  <br>*optional*|[SummarizedUsageItem](#summarizedusageitem)|
|**visibility**  <br>*optional*|enum (visibleEverywhere, builderOnly, hiddenEverywhere)|
|**warning**  <br>*optional*|[MetricsWarning](#metricswarning)|


<a name="analyticsmetricview"></a>
### AnalyticsMetricView

|Name|Schema|
|---|---|
|**description**  <br>*optional*|string|
|**id**  <br>*optional*|string|
|**name**  <br>*optional*|string|


<a name="analyticsreportsuite"></a>
### AnalyticsReportSuite

|Name|Description|Schema|
|---|---|---|
|**active**  <br>*optional*||boolean|
|**baseUrl**  <br>*optional*||string|
|**calendarAnchorDate**  <br>*optional*||string (date-time)|
|**calendarType**  <br>*optional*||[CalendarType](#calendartype)|
|**companyId**  <br>*optional*||integer (int32)|
|**currency**  <br>*optional*||string|
|**currentTimezoneOffset**  <br>*optional*||number (float)|
|**dataCurrentAsOf**  <br>*optional*||string (date-time)|
|**defaultPage**  <br>*optional*||string|
|**ipObfuscationEnabled**  <br>*optional*||boolean|
|**isBlocked**  <br>*optional*||boolean|
|**isDeleted**  <br>*optional*||boolean|
|**lastModified**  <br>*optional*||string (date-time)|
|**localizationEnabled**  <br>*optional*||boolean|
|**numGroups**  <br>*optional*||integer (int32)|
|**parentRsid**  <br>*optional*|Parent report suite id for virtual report suite|string|
|**relatedCompanies**  <br>*optional*||< [RelatedCompany](#relatedcompany) > array|
|**reportSuiteName**  <br>*optional*|Friendly report suite name|string|
|**rsid**  <br>*optional*|report suite id|string|
|**signedUpDate**  <br>*optional*||string (date-time)|
|**timezone**  <br>*optional*||integer (int32)|
|**timezoneZoneinfo**  <br>*optional*|Suite friendly timezone name|string|


<a name="analyticsreportsuitedataretentionsettings"></a>
### AnalyticsReportSuiteDataRetentionSettings

|Name|Schema|
|---|---|
|**fragKeyMonths**  <br>*optional*|integer (int32)|
|**fragMonths**  <br>*optional*|integer (int32)|
|**fragNonKeyMonths**  <br>*optional*|integer (int32)|
|**fragSubRelMonths**  <br>*optional*|integer (int32)|
|**getdWMonths**  <br>*optional*|integer (int32)|
|**retentionMessage**  <br>*optional*|string|
|**retentionStatus**  <br>*optional*|string|


<a name="analyticssegmentresponseitem"></a>
### AnalyticsSegmentResponseItem

|Name|Description|Schema|
|---|---|---|
|**aamStatus**  <br>*optional*|AAM/Raven publishing status (cross-product segment sharing). A segment can be published to AAM, and this flag indicates whether the segment has been published to AAM.|< string, object > map|
|**alternateVariableNames**  <br>*optional*||[AlternateVariableNames](#alternatevariablenames)|
|**approved**  <br>*optional*|Whether or not the segment has been marked approved.|boolean|
|**asiInUse**  <br>*optional*|Whether or not the segment currently in use in an ASI (old version of VSR) slot.|boolean|
|**compatibility**  <br>*optional*|Analytics products that the segment is compatible with|< string, object > map|
|**created**  <br>*optional*||string (date-time)|
|**curatedItem**  <br>*optional*||boolean|
|**customerJourney**  <br>*optional*||boolean|
|**dataGroup**  <br>*optional*|The data group of the segment|string|
|**definition**  <br>*optional*|The segment definition as a JSON object|< string, object > map|
|**description**  <br>*optional*|A description of the segment.|string|
|**dwInUse**  <br>*optional*|Whether or not the segment currently in use in a Data Warehouse request. A Data Warehouse request is another type of report that clients can run based on their raw data|boolean|
|**favorite**  <br>*optional*|Whether or not the segment has been marked as a favorite.|boolean|
|**id**  <br>*optional*|Id of the segment.|string|
|**isDeleted**  <br>*optional*|Whether or not the segment is 'Deleted' (deleted segments are only returned if requested by id)|boolean|
|**legacyId**  <br>*optional*|Legacy segment id from old segment database (only exists if the segment was migrated from the old segment DB)|string|
|**modified**  <br>*optional*||string (date-time)|
|**name**  <br>*optional*|A name for the segment.|string|
|**organization**  <br>*optional*||string|
|**owner**  <br>*optional*|The owner of the segment as an Owner object.|[Owner](#owner)|
|**reportSuiteName**  <br>*optional*|The friendly name for the report suite id.|string|
|**reportTimeAttribution**  <br>*optional*||boolean|
|**rsid**  <br>*optional*|The report suite id.|string|
|**shares**  <br>*optional*|Existing shares for the segment.|< [Share](#share) > array|
|**siteTitle**  <br>*optional*|A name for the report suite.  This is deprecated and should use the report suite name instead.|string|
|**tags**  <br>*optional*|All existing tags associated with the segment.|< [Tag](#tag) > array|
|**template**  <br>*optional*|Whether or not the segment is a template.  A template is a predefined segment that can be used by all customers and can not be edited|boolean|
|**usageSummary**  <br>*optional*|How frequently the user uses this segment.|[SummarizedUsageItem](#summarizedusageitem)|
|**version**  <br>*optional*||string|
|**virtualReportSuites**  <br>*optional*|A list of all Virtual Report Suites that are using this segment.|< [AnalyticsVirtualReportSuite](#analyticsvirtualreportsuite) > array|


<a name="analyticstrackingserver"></a>
### AnalyticsTrackingServer

|Name|Description|Schema|
|---|---|---|
|**trackingServer**  <br>*optional*|The server to which a company's tracking data is sent|string|


<a name="analyticsvrscompatibility"></a>
### AnalyticsVRSCompatibility

|Name|Schema|
|---|---|
|**message**  <br>*optional*|string|
|**supported_products**  <br>*optional*|< string > array|
|**valid**  <br>*optional*|boolean|
|**validator_version**  <br>*optional*|string|


<a name="analyticsvirtualreportsuite"></a>
### AnalyticsVirtualReportSuite

|Name|Description|Schema|
|---|---|---|
|**alternateVariableNames**  <br>*optional*||[AlternateVariableNames](#alternatevariablenames)|
|**approved**  <br>*optional*||boolean|
|**axleConfig**  <br>*optional*||[ReportSuiteAxleConfig](#reportsuiteaxleconfig)|
|**calendarType**  <br>*optional*||[CalendarType](#calendartype)|
|**compatibility**  <br>*optional*||[AnalyticsVRSCompatibility](#analyticsvrscompatibility)|
|**created**  <br>*optional*||string (date-time)|
|**curatedComponents**  <br>*optional*||< [AnalyticsCuratedComponent](#analyticscuratedcomponent) > array|
|**curationEnabled**  <br>*optional*||boolean|
|**currency**  <br>*optional*||string|
|**currentTimezoneOffset**  <br>*optional*||number (float)|
|**darkSessionsEnabled**  <br>*optional*||boolean|
|**dataCurrentAsOf**  <br>*optional*||string (date-time)|
|**dataSchema**  <br>*optional*||string|
|**description**  <br>*optional*||string|
|**discoverUiEnabled**  <br>*optional*||boolean|
|**enabledSolutions**  <br>*optional*||< string > array|
|**favorite**  <br>*optional*||boolean|
|**globalCompanyKey**  <br>*optional*||string|
|**groups**  <br>*optional*||< [UserGroup](#usergroup) > array|
|**id**  <br>*optional*|System generated virtual report suite id|string|
|**isBlocked**  <br>*optional*||boolean|
|**isDeleted**  <br>*optional*||boolean|
|**modified**  <br>*optional*||string (date-time)|
|**name**  <br>*optional*||string|
|**numGroups**  <br>*optional*||integer (int32)|
|**numericRsid**  <br>*optional*||integer (int32)|
|**owner**  <br>*optional*||[Owner](#owner)|
|**parentRsid**  <br>*optional*|Parent report suite id for virtual report suite|string|
|**parentRsidName**  <br>*optional*|Parent report suite name|string|
|**remoteLoading**  <br>*optional*||boolean|
|**reportSuiteName**  <br>*optional*  <br>*read-only*|The report suite name for which the component was created/updated|string|
|**rsid**  <br>*optional*|The report suite id for which the component was created/updated|string|
|**segmentList**  <br>*optional*|List of segments applied to this virtual report suite|< string > array|
|**sessionDefinition**  <br>*optional*||[JsonNode](#jsonnode)|
|**shares**  <br>*optional*||< [Share](#share) > array|
|**siteTitle**  <br>*optional*||string|
|**tags**  <br>*optional*||< [Tag](#tag) > array|
|**taxonomist**  <br>*optional*||boolean|
|**timezone**  <br>*optional*||integer (int32)|
|**timezoneZoneinfo**  <br>*optional*|Suite friendly timezone name|string|
|**usageSummary**  <br>*optional*||[SummarizedUsageItem](#summarizedusageitem)|


<a name="approval"></a>
### Approval

|Name|Description|Schema|
|---|---|---|
|**approvalId**  <br>*optional*  <br>*read-only*|A system generated approval id|integer (int64)|
|**approvalTimestamp**  <br>*optional*  <br>*read-only*|The timestamp for when this approval was last updated|string (date-time)|
|**companyId**  <br>*required*|The Analytics company id for which this approval was created|integer (int32)|
|**componentId**  <br>*required*|The id of the component for which to create an approval|string|
|**componentType**  <br>*required*|The component type|enum (segment, dashboard, bookmark, calculatedMetric, project, dateRange, metric, dimension, virtualReportSuite, scheduledJob, alert, classificationSet)|
|**componentTypeId**  <br>*optional*|The component type id which is determined by the componentType|integer (int32)|
|**userId**  <br>*required*|The Analytics user id of the user that created this approval|integer (int32)|


<a name="attributionmodel"></a>
### AttributionModel

|Name|Schema|
|---|---|
|**context**  <br>*optional*|string|
|**expiration**  <br>*optional*|[ExpirationSettings](#expirationsettings)|
|**firstWeight**  <br>*optional*|integer (int32)|
|**func**  <br>*optional*|enum (ALLOCATION_FIRST_TOUCH, ALLOCATION_LAST_TOUCH, ALLOCATION_INSTANCE, ALLOCATION_LAST_KNOWN, ALLOCATION_LEGACY, ALLOCATION_LINEAR, ALLOCATION_PARTICIPATION, ALLOCATION_POSITION_BASED, ALLOCATION_TIME_DECAY, ALLOCATION_U_SHAPED, ALLOCATION_J_SHAPED, ALLOCATION_REVERSE_J_SHAPED)|
|**halfLifeGranularity**  <br>*optional*|string|
|**halfLifeNumPeriods**  <br>*optional*|integer (int32)|
|**lastWeight**  <br>*optional*|integer (int32)|
|**merchandising**  <br>*optional*|[MerchandisingSettings](#merchandisingsettings)|
|**middleWeight**  <br>*optional*|integer (int32)|


<a name="batchdatagovernancesettings"></a>
### BatchDataGovernanceSettings

|Name|Schema|
|---|---|
|**auth**  <br>*optional*|[AnalyticsDataGovernanceLabels](#analyticsdatagovernancelabels)|
|**gdprAccess**  <br>*optional*|[AnalyticsDataGovernanceLabels](#analyticsdatagovernancelabels)|
|**gdprDelete**  <br>*optional*|[AnalyticsDataGovernanceLabels](#analyticsdatagovernancelabels)|
|**identifiability**  <br>*optional*|[AnalyticsDataGovernanceLabels](#analyticsdatagovernancelabels)|
|**namespace**  <br>*optional*|string|
|**sensitivity**  <br>*optional*|[AnalyticsDataGovernanceLabels](#analyticsdatagovernancelabels)|
|**status**  <br>*optional*|[DataGovernanceBatchOperationStatus](#datagovernancebatchoperationstatus)|
|**variableId**  <br>*optional*|string|


<a name="calcmetriccompatibility"></a>
### CalcMetricCompatibility

|Name|Schema|
|---|---|
|**functions**  <br>*optional*|< string > array|
|**identityDimensions**  <br>*optional*|< string > array|
|**identityMetrics**  <br>*optional*|< [IdentityMetric](#identitymetric) > array|
|**message**  <br>*optional*|string|
|**segments**  <br>*optional*|< string > array|
|**supported_products**  <br>*optional*|< string > array|
|**supported_schema**  <br>*optional*|< string > array|
|**valid**  <br>*optional*|boolean|
|**validator_version**  <br>*optional*|string|


<a name="calcmetricfunction"></a>
### CalcMetricFunction

|Name|Schema|
|---|---|
|**category**  <br>*optional*|string|
|**definition**  <br>*optional*|[CalcMetricFunctionDef](#calcmetricfunctiondef)|
|**description**  <br>*optional*|string|
|**example**  <br>*optional*|string|
|**exampleKey**  <br>*optional*|string|
|**id**  <br>*optional*|string|
|**name**  <br>*optional*|string|
|**namespace**  <br>*optional*|string|
|**persistable**  <br>*optional*|boolean|


<a name="calcmetricfunctiondef"></a>
### CalcMetricFunctionDef

|Name|Schema|
|---|---|
|**formula**  <br>*optional*|< string, object > map|
|**func**  <br>*optional*|string|
|**parameters**  <br>*optional*|< [CalcMetricFunctionParameter](#calcmetricfunctionparameter) > array|
|**version**  <br>*optional*|< integer (int32) > array|


<a name="calcmetricfunctionparameter"></a>
### CalcMetricFunctionParameter

|Name|Schema|
|---|---|
|**default-value**  <br>*optional*|object|
|**descKey**  <br>*optional*|string|
|**description**  <br>*optional*|string|
|**friendlyName**  <br>*optional*|string|
|**friendlyNameKey**  <br>*optional*|string|
|**func**  <br>*optional*|string|
|**name**  <br>*optional*|string|
|**type**  <br>*optional*|string|


<a name="calculatedmetricauthorization"></a>
### CalculatedMetricAuthorization

|Name|Schema|
|---|---|
|**authorized**  <br>*optional*|boolean|
|**unAuthorizedMetricIdentities**  <br>*optional*|< string > array|
|**unAuthorizedSegmentIds**  <br>*optional*|< string > array|


<a name="calculatedmetricdef"></a>
### CalculatedMetricDef
*Type* : object


<a name="calculatedmetricerrorstatus"></a>
### CalculatedMetricErrorStatus

|Name|Schema|
|---|---|
|**errorCode**  <br>*optional*|enum (no_feature_access_to_advanced_calculated_metrics, invalid_metric_access, method_not_allowed, resource_conflict, invalid_access, resource_temporarily_unavailable, external_api_failure, resource_already_exists, invalid_state, invalid_json_input, invalid_parameters, invalid_dimension_access, unsupported_data_type, resource_not_found, insufficient_access, health_check_error, invalid_data, unexpected_error, external_api_error, unsupported_resource, io_error, invalid_request, invalid_client_id, unauthorized, authorization_error, invalid_token, insufficient_scope)|
|**errorDescription**  <br>*optional*|string|
|**errorDetails**  <br>*optional*|< string, object > map|
|**errorId**  <br>*optional*|string|


<a name="calendartype"></a>
### CalendarType

|Name|Schema|
|---|---|
|**anchorDate**  <br>*optional*|string (date-time)|
|**rsid**  <br>*optional*|string|
|**type**  <br>*optional*|enum (gregorian, nrf, qrs, custom_454, custom_445, modified_gregorian)|


<a name="classificationjob"></a>
### ClassificationJob

|Name|Description|Schema|
|---|---|---|
|**datasetId**  <br>*optional*||string|
|**history**  <br>*optional*||< [JobHistory](#jobhistory) > array|
|**imsOrgId**  <br>*optional*||string|
|**jobId**  <br>*optional*||string|
|**jobOptions**  <br>*optional*|see POST /classifications/dataset/{id}/jobs/import and POST /classifications/dataset/{id}/jobs/export for details on this data model|object|
|**jobSize**  <br>*optional*||integer (int64)|
|**name**  <br>*optional*||string|
|**setName**  <br>*optional*||string|
|**state**  <br>*optional*||string|
|**totalLines**  <br>*optional*||integer (int32)|
|**type**  <br>*optional*||string|


<a name="classificationowner"></a>
### ClassificationOwner

|Name|Schema|
|---|---|
|**email**  <br>*optional*|string|
|**name**  <br>*optional*|string|


<a name="classificationset"></a>
### ClassificationSet

|Name|Description|Schema|
|---|---|---|
|**columns**  <br>*optional*|A list of classification column definitions. Column definitions are not required at the time of creation but no data will be classified until at least one column definition exists.|< [AnalyticsClassificationColumn](#analyticsclassificationcolumn) > array|
|**defaultEncoding**  <br>*optional*|Default encoding for jobs. Defaults to UTF-8.|enum (utf8, latin1)|
|**defaultListDelimiter**  <br>*optional*|Default delimiter for list column types. Defaults to "," (comma). If you have no list columns this field does not apply.|string|
|**description**  <br>*optional*|A long description for the purpose of this classification set.|string|
|**editable**  <br>*optional*  <br>*read-only*|Flag to indicate if the classification set is editable by the current user based on report suite permissions.|boolean|
|**ftpSettings**  <br>*optional*|Ftp settings for the classification set.|[FtpSettings](#ftpsettings)|
|**id**  <br>*optional*  <br>*read-only*|This value will be auto generated by the system on creation. This value will be a id in the form of an ObjectId.|string|
|**imsOrgId**  <br>*optional*  <br>*read-only*|This value will be looked up based on the analytics company of the user.|string|
|**lastModifiedBy**  <br>*optional*|Email address of the last person that modified the classification set.|string|
|**lastModifiedDate**  <br>*optional*|Last modified date/time of the classification set.|string|
|**name**  <br>*required*|A human readable display name for users to be able to easily identify this classification definition.|string|
|**notifications**  <br>*optional*|List of notifications to be sent for all imports and exports that occur.|< [Notification](#notification) > array|
|**owner**  <br>*optional*|Contact information for a person responsible for the classification definition and/or data.|[ClassificationOwner](#classificationowner)|
|**ruleInitialLookback**  <br>*optional*||integer (int32)|
|**ruleMode**  <br>*optional*||string|
|**ruleState**  <br>*optional*||string|
|**ruleTestKeys**  <br>*optional*||< string > array|
|**subscriptions**  <br>*optional*|A list of classification subscriptions. Subscriptions are not required at the time of creation but no data will be classified until at least one subscription exists.|< [ClassificationSubscription](#classificationsubscription) > array|
|**tags**  <br>*optional*||< [Tag](#tag) > array|
|**type**  <br>*optional*||enum (standard, lookup)|


<a name="classificationsetfilterargs"></a>
### ClassificationSetFilterArgs

|Name|Schema|
|---|---|
|**dimensions**  <br>*optional*|< string > array|
|**ids**  <br>*optional*|< string > array|
|**rsids**  <br>*optional*|< string > array|
|**tagNames**  <br>*optional*|string|
|**type**  <br>*optional*|enum (standard, lookup)|


<a name="classificationsubscription"></a>
### ClassificationSubscription

|Name|Description|Schema|
|---|---|---|
|**dimension**  <br>*required*|The dimension identity you would like to be classified. Should be prefixed with variables/ i.e. variables/page|string|
|**editable**  <br>*optional*  <br>*read-only*|Flag to indicate if the subscription is editable by the current user based on report suite permissions.|boolean|
|**rsid**  <br>*required*|The report suite id for which you would like to subscribe to a classification set.|string|


<a name="column"></a>
### Column

|Name|Schema|
|---|---|
|**id**  <br>*optional*|string|
|**segmentIds**  <br>*optional*|< string > array|
|**title**  <br>*optional*|string|
|**type**  <br>*optional*|enum (DIMENSION, METRIC)|


<a name="company"></a>
### Company

|Name|Description|Schema|
|---|---|---|
|**accessType**  <br>*optional*||enum (pointProducts, standard, premium, mobile, premiumPredictive, premiumAttribution, premiumCustomer, core, essentialsDps, foundation, select, prime, ultimate)|
|**adminLogin**  <br>*optional*|Login of the main user responsible for the login company|string|
|**allowAdobeEmails**  <br>*optional*||boolean|
|**apiRateLimitPolicy**  <br>*optional*||string|
|**billingCustomerId**  <br>*required*|Id for the company that is used by the billing system|integer (int64)|
|**billingTabAccess**  <br>*optional*||boolean|
|**companyPrefix**  <br>*optional*||string|
|**companySecurity**  <br>*optional*||[CompanySecurity](#companysecurity)|
|**companyid**  <br>*optional*||integer (int32)|
|**description**  <br>*required*||string|
|**disabled**  <br>*optional*||boolean|
|**featureAccessOverrides**  <br>*optional*||< string, < string, string > map > map|
|**globalCompanyKey**  <br>*required*|System generated cross data-center unique company id|string|
|**imsOrgid**  <br>*required*|Id of the IMS Organization that owns the company|string|
|**name**  <br>*required*||string|
|**namespace**  <br>*required*|System generated namespace|string|
|**permissionAuthority**  <br>*optional*||enum (ims, both)|
|**validEmails**  <br>*optional*|List of allowed email address domains for users in the company|< string > array|


<a name="companysecurity"></a>
### CompanySecurity

|Name|Schema|
|---|---|
|**emailRestrictions**  <br>*optional*|boolean|
|**ipRestrictions**  <br>*optional*|boolean|
|**passwordExpiration**  <br>*optional*|boolean|
|**passwordRecovery**  <br>*optional*|boolean|
|**strongPasswords**  <br>*optional*|boolean|


<a name="customreportsuitefiltergroup"></a>
### CustomReportSuiteFilterGroup

|Name|Schema|
|---|---|
|**customGroupId**  <br>*optional*|integer (int32)|
|**customGroupName**  <br>*optional*|string|


<a name="datagovernancebatchoperationstatus"></a>
### DataGovernanceBatchOperationStatus

|Name|Schema|
|---|---|
|**error**  <br>*optional*|[ErrorStatus](#errorstatus)|
|**success**  <br>*optional*|boolean|
|**variableIdSavedAs**  <br>*optional*|string|
|**variableIdTranslationMessage**  <br>*optional*|string|


<a name="deleteresponse"></a>
### DeleteResponse

|Name|Schema|
|---|---|
|**message**  <br>*optional*|string|
|**result**  <br>*optional*|string|


<a name="dimensionitem"></a>
### DimensionItem

|Name|Schema|
|---|---|
|**dimension**  <br>*optional*|string|
|**itemId**  <br>*optional*|string|
|**value**  <br>*optional*|string|


<a name="errorstatus"></a>
### ErrorStatus

|Name|Schema|
|---|---|
|**errorCode**  <br>*optional*|enum (invalid_metric_access, method_not_allowed, resource_conflict, invalid_access, resource_temporarily_unavailable, external_api_failure, resource_already_exists, invalid_state, invalid_json_input, invalid_parameters, invalid_dimension_access, unsupported_data_type, resource_not_found, insufficient_access, health_check_error, invalid_data, unexpected_error, external_api_error, unsupported_resource, io_error, invalid_request, invalid_client_id, unauthorized, authorization_error, invalid_token, insufficient_scope)|
|**errorDescription**  <br>*optional*|string|
|**errorDetails**  <br>*optional*|< string, object > map|
|**errorId**  <br>*optional*|string|


<a name="expirationsettings"></a>
### ExpirationSettings

|Name|Schema|
|---|---|
|**context**  <br>*optional*|string|
|**events**  <br>*optional*|< string > array|
|**func**  <br>*optional*|enum (afterEvents, beforeEvents, inactivity, container)|
|**granularity**  <br>*optional*|string|
|**numPeriods**  <br>*optional*|integer (int32)|


<a name="favorite"></a>
### Favorite

|Name|Schema|
|---|---|
|**companyId**  <br>*optional*|integer (int32)|
|**componentId**  <br>*optional*|string|
|**componentType**  <br>*optional*|string|
|**componentTypeId**  <br>*optional*|integer (int32)|
|**favoriteId**  <br>*optional*|integer (int64)|
|**favoriteTimestamp**  <br>*optional*|string (date-time)|
|**userId**  <br>*optional*|integer (int32)|


<a name="ftpsettings"></a>
### FtpSettings

|Name|Schema|
|---|---|
|**hostName**  <br>*optional*|string|
|**password**  <br>*optional*|string|
|**userName**  <br>*optional*|string|


<a name="identitymetric"></a>
### IdentityMetric

|Name|Schema|
|---|---|
|**allocationModel**  <br>*optional*|enum (ALLOCATION_FIRST_TOUCH, ALLOCATION_LAST_TOUCH, ALLOCATION_INSTANCE, ALLOCATION_LAST_KNOWN, ALLOCATION_LEGACY, ALLOCATION_LINEAR, ALLOCATION_PARTICIPATION, ALLOCATION_POSITION_BASED, ALLOCATION_TIME_DECAY, ALLOCATION_U_SHAPED, ALLOCATION_J_SHAPED, ALLOCATION_REVERSE_J_SHAPED)|
|**dimensionView**  <br>*optional*|enum (LINEAR_ALLOCATION, PARTICIPATION_ALLOCATION, LAST_TOUCH_ALLOCATION, MC_FIRST_TOUCH_ALLOCATION, MC_LAST_TOUCH_ALLOCATION)|
|**identity**  <br>*optional*|string|


<a name="imsorgidsfromrelatedcompanies"></a>
### ImsOrgIdsFromRelatedCompanies

|Name|Schema|
|---|---|
|**owningImsOrgId**  <br>*optional*|string|
|**relatedImsOrgIds**  <br>*optional*|< string > array|


<a name="jsonobject"></a>
### JSONObject
*Type* : object


<a name="jobartifactresponse"></a>
### JobArtifactResponse

|Name|Schema|
|---|---|
|**artifactId**  <br>*optional*|string|
|**fileType**  <br>*optional*|string|
|**lastModifiedTime**  <br>*optional*|string|


<a name="jobexportoptions"></a>
### JobExportOptions

|Name|Schema|
|---|---|
|**columns**  <br>*optional*|< string > array|
|**dataFormat**  <br>*optional*|string|
|**dataUri**  <br>*optional*|string|
|**dateFilterEnd**  <br>*optional*|string|
|**dateFilterStart**  <br>*optional*|string|
|**encoding**  <br>*optional*|string|
|**exactMatch**  <br>*optional*|< string, object > map|
|**jobName**  <br>*optional*|string|
|**keyRegex**  <br>*optional*|string|
|**keys**  <br>*optional*|< string > array|
|**listDelimiter**  <br>*optional*|string|
|**notifications**  <br>*optional*|< [Notification](#notification) > array|
|**offset**  <br>*optional*|integer (int32)|
|**regexMatch**  <br>*optional*|< string, object > map|
|**rowLimit**  <br>*optional*|integer (int32)|
|**source**  <br>*optional*|string|


<a name="jobhistory"></a>
### JobHistory

|Name|Schema|
|---|---|
|**host**  <br>*optional*|string|
|**jobState**  <br>*optional*|enum (created, queued, validated, failed_validation, processing, done_processing, failed_processing, completed)|
|**message**  <br>*optional*|string|
|**pid**  <br>*optional*|integer (int32)|
|**tag**  <br>*optional*|string|
|**timestamp**  <br>*optional*|integer (int64)|


<a name="jobimportoptions"></a>
### JobImportOptions

|Name|Schema|
|---|---|
|**dataFormat**  <br>*optional*|string|
|**dataUri**  <br>*optional*|string|
|**encoding**  <br>*optional*|string|
|**jobName**  <br>*optional*|string|
|**listDelimiter**  <br>*optional*|string|
|**notifications**  <br>*optional*|< [Notification](#notification) > array|
|**source**  <br>*optional*|string|


<a name="jsonnode"></a>
### JsonNode

|Name|Schema|
|---|---|
|**array**  <br>*optional*|boolean|
|**bigDecimal**  <br>*optional*|boolean|
|**bigInteger**  <br>*optional*|boolean|
|**binary**  <br>*optional*|boolean|
|**boolean**  <br>*optional*|boolean|
|**containerNode**  <br>*optional*|boolean|
|**double**  <br>*optional*|boolean|
|**float**  <br>*optional*|boolean|
|**floatingPointNumber**  <br>*optional*|boolean|
|**int**  <br>*optional*|boolean|
|**integralNumber**  <br>*optional*|boolean|
|**long**  <br>*optional*|boolean|
|**missingNode**  <br>*optional*|boolean|
|**nodeType**  <br>*optional*|enum (ARRAY, BINARY, BOOLEAN, MISSING, NULL, NUMBER, OBJECT, POJO, STRING)|
|**null**  <br>*optional*|boolean|
|**number**  <br>*optional*|boolean|
|**object**  <br>*optional*|boolean|
|**pojo**  <br>*optional*|boolean|
|**short**  <br>*optional*|boolean|
|**textual**  <br>*optional*|boolean|
|**valueNode**  <br>*optional*|boolean|


<a name="locale"></a>
### Locale

|Name|Schema|
|---|---|
|**country**  <br>*optional*|string|
|**displayCountry**  <br>*optional*|string|
|**displayLanguage**  <br>*optional*|string|
|**displayName**  <br>*optional*|string|
|**displayScript**  <br>*optional*|string|
|**displayVariant**  <br>*optional*|string|
|**extensionKeys**  <br>*optional*|< string > array|
|**iso3Country**  <br>*optional*|string|
|**iso3Language**  <br>*optional*|string|
|**language**  <br>*optional*|string|
|**script**  <br>*optional*|string|
|**unicodeLocaleAttributes**  <br>*optional*|< string > array|
|**unicodeLocaleKeys**  <br>*optional*|< string > array|
|**variant**  <br>*optional*|string|


<a name="merchandisingbindingcriteria"></a>
### MerchandisingBindingCriteria

|Name|Schema|
|---|---|
|**bindingEvents**  <br>*optional*|< string > array|
|**func**  <br>*optional*|enum (always, events)|


<a name="merchandisingsettings"></a>
### MerchandisingSettings

|Name|Schema|
|---|---|
|**bindingCriteria**  <br>*optional*|[MerchandisingBindingCriteria](#merchandisingbindingcriteria)|
|**func**  <br>*optional*|enum (nonMerchandising, forced, auto)|


<a name="metricswarning"></a>
### MetricsWarning

|Name|Schema|
|---|---|
|**helpLink**  <br>*optional*|string|
|**text**  <br>*optional*|string|
|**title**  <br>*optional*|string|


<a name="notification"></a>
### Notification

|Name|Schema|
|---|---|
|**method**  <br>*optional*|enum (email, rabbit)|
|**recipients**  <br>*optional*|< string > array|
|**state**  <br>*optional*|enum (created, queued, validated, failed_validation, processing, done_processing, failed_processing, completed)|


<a name="owner"></a>
### Owner

|Name|Description|Schema|
|---|---|---|
|**id**  <br>*required*|the login id of the owner|integer (int32)|
|**login**  <br>*optional*|the friendly full login name of the owner, included when the expansion parameter ownerFullName is true|string|
|**name**  <br>*optional*|the friendly full login name of the owner, included when the expansion parameter ownerFullName is true|string|


<a name="pageable"></a>
### Pageable

|Name|Schema|
|---|---|
|**offset**  <br>*optional*|integer (int32)|
|**pageNumber**  <br>*optional*|integer (int32)|
|**pageSize**  <br>*optional*|integer (int32)|
|**sort**  <br>*optional*|[Sort](#sort)|


<a name="predictivesettings"></a>
### PredictiveSettings

|Name|Schema|
|---|---|
|**highAnomalies**  <br>*optional*|boolean|
|**lowAnomalies**  <br>*optional*|boolean|
|**trainingPeriods**  <br>*optional*|integer (int32)|


<a name="rankedcolumnerror"></a>
### RankedColumnError

|Name|Schema|
|---|---|
|**columnId**  <br>*optional*|string|
|**errorCode**  <br>*optional*|enum (unauthorized_metric, unauthorized_dimension, unauthorized_dimension_global, anomaly_detection_failure_unexpected_item_count, anomaly_detection_failure_tsa_service, not_enabled_metric, not_enabled_dimension, not_enabled_dimension_global)|
|**errorDescription**  <br>*optional*|string|
|**errorId**  <br>*optional*|string|


<a name="rankedcolumnmetadata"></a>
### RankedColumnMetaData

|Name|Schema|
|---|---|
|**columnErrors**  <br>*optional*|< [RankedColumnError](#rankedcolumnerror) > array|
|**columnIds**  <br>*optional*|< string > array|
|**dimension**  <br>*optional*|[ReportDimension](#reportdimension)|


<a name="rankedreportdata"></a>
### RankedReportData

|Name|Schema|
|---|---|
|**columns**  <br>*optional*|[RankedColumnMetaData](#rankedcolumnmetadata)|
|**firstPage**  <br>*optional*|boolean|
|**lastPage**  <br>*optional*|boolean|
|**message**  <br>*optional*|string|
|**number**  <br>*optional*|integer (int32)|
|**numberOfElements**  <br>*optional*|integer (int32)|
|**oberonRequestXML**  <br>*optional*|< string > array|
|**oberonResponseXML**  <br>*optional*|< string > array|
|**predictiveRequestObjects**  <br>*optional*|< string > array|
|**predictiveResponseObjects**  <br>*optional*|< string > array|
|**reportId**  <br>*optional*|string|
|**request**  <br>*optional*|[RankedRequest](#rankedrequest)|
|**rows**  <br>*optional*|< [Row](#row) > array|
|**summaryData**  <br>*optional*|[RankedSummaryData](#rankedsummarydata)|
|**totalElements**  <br>*optional*|integer (int32)|
|**totalPages**  <br>*optional*|integer (int32)|


<a name="rankedrequest"></a>
### RankedRequest

|Name|Schema|
|---|---|
|**anchorDate**  <br>*optional*|string|
|**dimension**  <br>*optional*|string|
|**globalFilters**  <br>*optional*|< [ReportFilter](#reportfilter) > array|
|**globalPredictiveSettings**  <br>*optional*|[PredictiveSettings](#predictivesettings)|
|**locale**  <br>*optional*|[Locale](#locale)|
|**metricContainer**  <br>*optional*|[ReportMetrics](#reportmetrics)|
|**rowContainer**  <br>*optional*|[ReportRows](#reportrows)|
|**rsid**  <br>*optional*|string|
|**search**  <br>*optional*|[ReportSearch](#reportsearch)|
|**settings**  <br>*optional*|[RankedSettings](#rankedsettings)|
|**statistics**  <br>*optional*|[RankedStatistics](#rankedstatistics)|


<a name="rankedsettings"></a>
### RankedSettings

|Name|Schema|
|---|---|
|**countRepeatInstances**  <br>*optional*|boolean|
|**darkSessionsEnabled**  <br>*optional*|boolean|
|**dataSchema**  <br>*optional*|string|
|**dimensionSort**  <br>*optional*|string|
|**includeAnomalyDetection**  <br>*optional*|boolean|
|**includeLatLong**  <br>*optional*|boolean|
|**includePercentChange**  <br>*optional*|boolean|
|**limit**  <br>*optional*|integer (int32)|
|**page**  <br>*optional*|integer (int32)|
|**reflectRequest**  <br>*optional*|boolean|
|**sessionExpiration**  <br>*optional*|< [SessionExpirationSettings](#sessionexpirationsettings) > array|
|**suiteReportingContext**  <br>*optional*|enum (DEVICE, TROMMEL_COMBINED)|


<a name="rankedstatistics"></a>
### RankedStatistics

|Name|Schema|
|---|---|
|**functions**  <br>*optional*|< string > array|
|**ignoreZeroes**  <br>*optional*|boolean|


<a name="rankedsummarydata"></a>
### RankedSummaryData
*Type* : object


<a name="relatedcompany"></a>
### RelatedCompany

|Name|Schema|
|---|---|
|**companyId**  <br>*optional*|integer (int32)|
|**name**  <br>*optional*|string|


<a name="reportdimension"></a>
### ReportDimension

|Name|Schema|
|---|---|
|**id**  <br>*optional*|string|
|**type**  <br>*optional*|enum (STRING, INT, DECIMAL, CURRENCY, PERCENT, TIME, ENUM, ORDERED_ENUM)|


<a name="reporterrorstatus"></a>
### ReportErrorStatus

|Name|Schema|
|---|---|
|**errorCode**  <br>*optional*|enum (invalid_segment_ids_found, invalid_metric_access, method_not_allowed, resource_conflict, invalid_access, resource_temporarily_unavailable, external_api_failure, resource_already_exists, invalid_state, invalid_json_input, invalid_parameters, invalid_dimension_access, unsupported_data_type, resource_not_found, insufficient_access, health_check_error, invalid_data, unexpected_error, external_api_error, unsupported_resource, io_error, invalid_request, invalid_client_id, unauthorized, authorization_error, invalid_token, insufficient_scope)|
|**errorDescription**  <br>*optional*|string|
|**errorDetails**  <br>*optional*|< string, object > map|
|**errorId**  <br>*optional*|string|


<a name="reportfilter"></a>
### ReportFilter

|Name|Schema|
|---|---|
|**allocationModel**  <br>*optional*|[AttributionModel](#attributionmodel)|
|**dateRange**  <br>*optional*|string|
|**dimension**  <br>*optional*|string|
|**excludeItemIds**  <br>*optional*|< integer > array|
|**id**  <br>*optional*|string|
|**itemId**  <br>*optional*|string|
|**itemIds**  <br>*optional*|< string > array|
|**segmentDefinition**  <br>*optional*|< string, object > map|
|**segmentId**  <br>*optional*|string|
|**type**  <br>*optional*|enum (DATE_RANGE, BREAKDOWN, SEGMENT, EXCLUDE_ITEM_IDS)|


<a name="reportmetric"></a>
### ReportMetric

|Name|Schema|
|---|---|
|**allocationModel**  <br>*optional*|[AttributionModel](#attributionmodel)|
|**allocationType**  <br>*optional*|string|
|**columnId**  <br>*optional*|string|
|**filters**  <br>*optional*|< string > array|
|**id**  <br>*optional*|string|
|**metricDefinition**  <br>*optional*|< string, object > map|
|**metricView**  <br>*optional*|string|
|**predictive**  <br>*optional*|[ReportMetricPredictiveSettings](#reportmetricpredictivesettings)|
|**sort**  <br>*optional*|string|


<a name="reportmetricpredictivesettings"></a>
### ReportMetricPredictiveSettings

|Name|Schema|
|---|---|
|**anomalyConfidence**  <br>*optional*|number (double)|


<a name="reportmetrics"></a>
### ReportMetrics

|Name|Schema|
|---|---|
|**metricFilters**  <br>*optional*|< [ReportFilter](#reportfilter) > array|
|**metrics**  <br>*optional*|< [ReportMetric](#reportmetric) > array|


<a name="reportrow"></a>
### ReportRow

|Name|Schema|
|---|---|
|**filters**  <br>*optional*|< string > array|
|**rowId**  <br>*optional*|string|


<a name="reportrows"></a>
### ReportRows

|Name|Schema|
|---|---|
|**rowFilters**  <br>*optional*|< [ReportFilter](#reportfilter) > array|
|**rows**  <br>*optional*|< [ReportRow](#reportrow) > array|


<a name="reportsearch"></a>
### ReportSearch

|Name|Schema|
|---|---|
|**clause**  <br>*optional*|string|
|**empty**  <br>*optional*|boolean|
|**excludeItemIds**  <br>*optional*|< integer > array|
|**includeSearchTotal**  <br>*optional*|boolean|
|**itemIds**  <br>*optional*|< integer > array|


<a name="reportsuiteaxleconfig"></a>
### ReportSuiteAxleConfig

|Name|Schema|
|---|---|
|**axleData**  <br>*optional*|boolean|
|**axleStart**  <br>*optional*|string|


<a name="reportsuitehateoasreferences"></a>
### ReportSuiteHateoasReferences

|Name|Schema|
|---|---|
|**billingCustomerUrl**  <br>*optional*|string|
|**companyUrl**  <br>*optional*|string|


<a name="row"></a>
### Row

|Name|Schema|
|---|---|
|**data**  <br>*optional*|< number (double) > array|
|**dataAnomalyDetected**  <br>*optional*|< boolean > array|
|**dataExpected**  <br>*optional*|< number (double) > array|
|**dataLowerBound**  <br>*optional*|< number (double) > array|
|**dataUpperBound**  <br>*optional*|< number (double) > array|
|**itemId**  <br>*optional*|string|
|**latitude**  <br>*optional*|number (double)|
|**longitude**  <br>*optional*|number (double)|
|**percentChange**  <br>*optional*|< number (double) > array|
|**rowId**  <br>*optional*|string|
|**value**  <br>*optional*|string|


<a name="rowitem"></a>
### RowItem

|Name|Schema|
|---|---|
|**itemId**  <br>*optional*|string|
|**value**  <br>*optional*|string|


<a name="segmentcompatibility"></a>
### SegmentCompatibility

|Name|Schema|
|---|---|
|**message**  <br>*optional*|string|
|**supported_features**  <br>*optional*|< string > array|
|**supported_products**  <br>*optional*|< string > array|
|**supported_schema**  <br>*optional*|< string > array|
|**valid**  <br>*optional*|boolean|
|**validator_version**  <br>*optional*|string|


<a name="segmentpublishingconfig"></a>
### SegmentPublishingConfig

|Name|Schema|
|---|---|
|**dataSourceId**  <br>*optional*|integer (int32)|
|**segmentFolderId**  <br>*optional*|integer (int32)|
|**traitFolderId**  <br>*optional*|integer (int32)|


<a name="segmentsummaryresponse"></a>
### SegmentSummaryResponse

|Name|Schema|
|---|---|
|**compatibility**  <br>*optional*|< string > array|
|**detailMsg**  <br>*optional*|string|
|**oberonRequestXml**  <br>*optional*|string|
|**oberonResponseXml**  <br>*optional*|string|
|**report**  <br>*optional*|[TotalsReportData](#totalsreportdata)|
|**supportedEngines**  <br>*optional*|< string > array|


<a name="sessionexpirationsettings"></a>
### SessionExpirationSettings

|Name|Schema|
|---|---|
|**containerName**  <br>*optional*|string|
|**events**  <br>*optional*|< string > array|
|**func**  <br>*optional*|enum (afterEvents, inactivity, container, beforeEvents)|
|**granularity**  <br>*optional*|string|
|**numPeriods**  <br>*optional*|integer (int32)|


<a name="share"></a>
### Share

|Name|Schema|
|---|---|
|**componentId**  <br>*required*|string|
|**componentType**  <br>*optional*|string|
|**shareId**  <br>*optional*|integer (int64)|
|**shareToDisplayName**  <br>*optional*|string|
|**shareToId**  <br>*required*|integer (int64)|
|**shareToLogin**  <br>*optional*|string|
|**shareToType**  <br>*required*|string|


<a name="sort"></a>
### Sort
*Type* : object


<a name="subscriptionvalidationresponse"></a>
### SubscriptionValidationResponse

|Name|Schema|
|---|---|
|**dimension**  <br>*optional*|string|
|**dimensionName**  <br>*optional*|string|
|**errorCode**  <br>*optional*|enum (invalid_rsid, dimension_not_classifiable, taxonomist_not_enabled_for_rsid, multiple_subscription_rsids)|
|**rsid**  <br>*optional*|string|
|**valid**  <br>*optional*|boolean|


<a name="suitecollectionitem"></a>
### SuiteCollectionItem

|Name|Description|Schema|
|---|---|---|
|**axleConfig**  <br>*optional*||[ReportSuiteAxleConfig](#reportsuiteaxleconfig)|
|**calendarType**  <br>*optional*||[CalendarType](#calendartype)|
|**collectionItemType**  <br>*optional*|Suite type|enum (reportsuite, virtualreportsuite)|
|**currency**  <br>*optional*||string|
|**currentTimezoneOffset**  <br>*optional*||number (float)|
|**dataCurrentAsOf**  <br>*optional*||string (date-time)|
|**dataSchema**  <br>*optional*||string|
|**discoverUiEnabled**  <br>*optional*||boolean|
|**enabledSolutions**  <br>*optional*||< string > array|
|**isBlocked**  <br>*optional*||boolean|
|**isDeleted**  <br>*optional*||boolean|
|**name**  <br>*optional*||string|
|**numGroups**  <br>*optional*||integer (int32)|
|**numericRsid**  <br>*optional*||integer (int32)|
|**parentRsid**  <br>*optional*|Parent report suite id for virtual report suite|string|
|**remoteLoading**  <br>*optional*||boolean|
|**rsid**  <br>*optional*  <br>*read-only*||string|
|**taxonomist**  <br>*optional*||boolean|
|**timezoneZoneinfo**  <br>*optional*|Suite friendly timezone name|string|


<a name="summarizedusageitem"></a>
### SummarizedUsageItem

|Name|Schema|
|---|---|
|**count**  <br>*optional*|integer (int32)|
|**itemId**  <br>*optional*|string|
|**mostRecentTimestamp**  <br>*optional*|string (date-time)|
|**relevancyScore**  <br>*optional*|number (float)|


<a name="tag"></a>
### Tag
Tag Model


|Name|Description|Schema|
|---|---|---|
|**components**  <br>*optional*|the list of components that have been tagged with this tag|< [TaggedComponent](#taggedcomponent) > array|
|**description**  <br>*optional*|the tag description|string|
|**id**  <br>*optional*|the tag id|integer (int32)|
|**name**  <br>*optional*|the tag name|string|


<a name="taggedcomponent"></a>
### TaggedComponent

|Name|Schema|
|---|---|
|**componentId**  <br>*optional*|string|
|**componentType**  <br>*optional*|string|
|**tags**  <br>*optional*|< [Tag](#tag) > array|


<a name="timezone"></a>
### Timezone

|Name|Schema|
|---|---|
|**id**  <br>*optional*|integer (int32)|
|**name**  <br>*optional*|string|


<a name="tntconfig"></a>
### TntConfig

|Name|Schema|
|---|---|
|**tnt**  <br>*optional*|boolean|
|**tntA4tDateEnabled**  <br>*optional*|boolean|
|**tntAllocationType**  <br>*optional*|integer (int32)|
|**tntClientCode**  <br>*optional*|string|
|**tntExpirePeriods**  <br>*optional*|integer (int32)|
|**tntExpireType**  <br>*optional*|integer (int32)|


<a name="totalsreportdata"></a>
### TotalsReportData

|Name|Schema|
|---|---|
|**columns**  <br>*optional*|< [Column](#column) > array|
|**message**  <br>*optional*|string|
|**reportId**  <br>*optional*|string|
|**totals**  <br>*optional*|< [RowItem](#rowitem) > array|


<a name="unhashreportdata"></a>
### UnhashReportData

|Name|Schema|
|---|---|
|**firstPage**  <br>*optional*|boolean|
|**lastPage**  <br>*optional*|boolean|
|**message**  <br>*optional*|string|
|**number**  <br>*optional*|integer (int32)|
|**numberOfElements**  <br>*optional*|integer (int32)|
|**oberonRequestXML**  <br>*optional*|string|
|**oberonResponseXML**  <br>*optional*|string|
|**reportId**  <br>*optional*|string|
|**rows**  <br>*optional*|< [RowItem](#rowitem) > array|
|**searchAnd**  <br>*optional*|string|
|**searchNot**  <br>*optional*|string|
|**searchOr**  <br>*optional*|string|
|**searchPhrase**  <br>*optional*|string|
|**totalElements**  <br>*optional*|integer (int32)|
|**totalPages**  <br>*optional*|integer (int32)|


<a name="user"></a>
### User

|Name|Schema|
|---|---|
|**admin**  <br>*optional*|boolean|
|**companyid**  <br>*optional*|integer (int32)|
|**email**  <br>*optional*|string|
|**firstName**  <br>*optional*|string|
|**fullName**  <br>*optional*|string|
|**imsUserId**  <br>*optional*|string|
|**lastName**  <br>*optional*|string|
|**login**  <br>*optional*|string|
|**loginId**  <br>*optional*|integer (int32)|


<a name="usergroup"></a>
### UserGroup

|Name|Schema|
|---|---|
|**allRsids**  <br>*optional*|boolean|
|**created**  <br>*optional*|string (date-time)|
|**description**  <br>*optional*|string|
|**groupId**  <br>*optional*|integer (int32)|
|**imsPlcId**  <br>*optional*|string|
|**imsPlcIdOrphaned**  <br>*optional*|boolean|
|**loginIds**  <br>*optional*|< integer (int32) > array|
|**modified**  <br>*optional*|string (date-time)|
|**name**  <br>*optional*|string|
|**oids**  <br>*optional*|< integer (int32) > array|
|**rsids**  <br>*optional*|< string > array|
|**tokens**  <br>*optional*|< string > array|



