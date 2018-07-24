# Classifications User Guide

## Overview

The Classifications API provides access to management tools that administer classifications settings within a login company. For more information about what classifications are and how they can be useful, please see the [implementation guide](https://experiencecloud.adobe.com/resources/help/en_US/reference/classifications.html).

## Definitions
  - `column` - A list of values that map to a key. For example, if grouping product skus by category, a `column` would provide a mapping between the sku and category.
  - `subscription` - Associates a dimension/report suite to a `classification set`. This allows a user to upload classification data once and have it apply to multiple dimensions across multiple report suites.
  - `classification set` - A collection of `subscription` records containing classification columns.
  - `job` - When classifications tasks are performed, a `job` is created to document the task and provide status.
  - `artifact` - An object that contains classification data. Usually accessed via an artifact id.

## Creating a Classification

Two steps are required when creating a classification. A `classification set` must be created in order to define the classification and associate it with the correct dimensions and report suites. Once created, classification data must be imported.

### Create a Classification Set

The `POST /classifications/dataset/` endpoint can be used to create a new classification set and will return a new `classificationSetId`. This call will also create a `subscription` and `column` record.

``` bash
$ curl -X POST --header "Content-Type: application/json" --header "Accept: application/json" --header "Authorization: Bearer [ACCESSTOKEN]" -d '{"name":"Product Categories","description":"Groups product SKUs together into categories.","columns":[{"name":"col1","displayName":"Category"}],"subscriptions":[{"rsid":"[RSID]","dimension":"variables/product"}]}' "[analytics_services_base_url]/classifications/dataset/"
```

This will do three things:

1.  Create a `classification set`
2.  Create a `column` and link it to the `classification set`
3.  Create a `subscription` that associates this column to a dimension and report suite and links it to the `classification set`

The `subscription` is what indicates to the classification system which dimensions and report suites to apply the classification to.

> **Note**
> 
> If you use the `PUT /classifications/dataset/` and provide a request body with an empty `columns` or `subscriptions` parameter, existing columns or subscriptions will be deleted. If you’d like to make a request that does not update these parameters, leave them blank. If updating columns or subscriptions, set them exactly as you would like them to be after the operation.

### Import Data

Data can be imported two ways - via the API or via a batch upload. This guide will cover the API import.

Let’s use the following classification data as an example:

    key,col1
    sku1,Category 1
    sku2,Category 1
    sku3,Category 2
    sku4,Category 3
    sku5,Category 3
    sku6,Category 2
    sku7,Category 1

When constructing our request, there are a few things to keep in mind: \* A trailing new line in the import payload will cause the import to fail. \* Because this data is formatted using commas, the `dataFormat` parameter should be set to `csv`. \* Notifications can be sent when the job changes state. For that reason, we’ll configure the job to notify `noreply@adobe.com`. \* The import payload must be base64 encoded and set to the `dataUri` parameter. \* The `dataUri` parameter requires a preamble that indicates how the data is formatted. Since we’re using `csv`, the preamble will be `data:text/csv;base64,`.

> **Note**
> 
> We’re using the `col1` `name` in our request instead of the friendlier `Category` `displayName`. For imports and export filters, the `name` value should always be used. The `displayName` is only used in the UI to make it easier to identify classifications.

``` bash
$ curl -X POST --header "Content-Type: application/json" --header "Accept: application/json" --header "Authorization: Bearer [ACCESSTOKEN]" -d '{"dataFormat":"csv","encoding":"utf8","jobName":"Import Category Information","notifications":[{"method":"email","recipients":["noreply@adobe.com"]}],"dataUri":"data:text/csv;base64,a2V5LGNvbDENCnNrdTEsQ2F0ZWdvcnkgMQ0Kc2t1MixDYXRlZ29yeSAxDQpza3UzLENhdGVnb3J5IDINCnNrdTQsQ2F0ZWdvcnkgMw0Kc2t1NSxDYXRlZ29yeSAzDQpza3U2LENhdGVnb3J5IDINCnNrdTcsQ2F0ZWdvcnkgMQ=="}' "[analytics_services_base_url]/classifications/dataset/[DATASETID]/import"
```

#### Checking Import Status

Instead of waiting for notifications, the status of a job can be queried:

``` bash
$ curl --header "Content-Type: application/json" --header "Accept: application/json" --header "Authorization: Bearer [ACCESSTOKEN]" "[analytics_services_base_url]/classifications/jobs/[JOBID]"
```

This API can be used to check the status of an export request as well if data is being exported to an FTP site.

A job has several states:
  - created - The request has been captured
  - queued - The request has been added to the job queue for validation
  - validated - The request has been successfully validated and will await processing
  - failed\_validation - The job has failed as a result of failed validation
  - processing - The job is currently being processed
  - failed\_processing - The job has failed processing
  - completed - The job has been completed

## Getting Classification Data

The API also allows a client to retrieve all information about the current classification configuration.

### Get Current Classification Sets

You can use the API to get the current `classification set`, `column` and `subscription` information.

``` bash
$ curl --header "Content-Type: application/json" --header "Accept: application/json" --header "Authorization: Bearer [ACCESSTOKEN]" "[analytics_services_base_url]/classifications/dataset"
```

Or, to get a specific `classification set`:
``` bash
$ curl --header "Content-Type: application/json" --header "Accept: application/json" --header "Authorization: Bearer [ACCESSTOKEN]" "[analytics_services_base_url]/classifications/dataset/[DATASETID]"
```

### Export Data

The export workflow has a few steps:
  - Create an Export Job
  - Check the Status
  - Fetch the Artifact ID
  - Request the Data

#### Create an Export Job

``` bash
$ curl -X POST --header "Content-Type: application/json" --header "Accept: application/json" --header "Authorization: Bearer [ACCESSTOKEN]" -d '{"dataFormat":"csv","encoding":"latin1","jobName":"Export Category Data"}' "[analytics_services_base_url]/classifications/dataset/[DATASETID]/export"
```

This will create an export job. This can take quite a while to complete if the requested data is large. Use filters in the request body to limit the data that comes back.

#### Fetch the Status

``` bash
$ curl --header "Content-Type: application/json" --header "Accept: application/json" --header "Authorization: Bearer [ACCESSTOKEN]" "[analytics_services_base_url]/classifications/jobs/[JOBID]"
```

This will provide information about the status of the export job. When the returned status is `completed` you can call the artifact endpoint to retrieve an artifact ID.

#### Fetch the Artifact ID

``` bash
$ curl --header "Content-Type: application/json" --header "Accept: application/json" --header "Authorization: Bearer [ACCESSTOKEN]" "[analytics_services_base_url]/classifications/jobs/[JOBID]/artifact"
```

This will return an artifact object containing the artifact ID. The artifact ID will be a string that represents a file in the classifications system. This ID will be used to retrieve the data.

#### Request the Data

``` bash
$ curl --header "Content-Type: application/json" --header "Accept: application/json" --header "Authorization: Bearer [ACCESSTOKEN]" "[analytics_services_base_url]/classifications/jobs/[JOBID]/artifact/[ARTIFACTID]"
```

The response will be the requested classification data. If the data format provided when the job was created was 'json', the data will be streamed in a JSON streaming format.

> **Note**
> 
> More information about JSON Streaming is available [here](https://en.wikipedia.org/wiki/JSON_streaming). Most JSON parsers will throw an exception if the entire response payload is decoded. Instead, provide, one line at a time to the parser.

## Unclassified Values

## Migrating From Saint

The new classifications system makes some fundamental changes to the way classifications are handled.
  - The new Job API provides current status on import and export jobs
  - Campaign dates are gone
  - Numeric and date classifications are gone
  - A `classification set` can be used to apply a single classification to multiple dimensions across multiple report suites. This makes managing classifications much easier.
  - Bulk APIs for managing classification data are available
  - Imported classifications are applied within minutes vs. days
