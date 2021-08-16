# Report Suite API Guide
The report suite APIs provide a way to retrieve and modify configurations for report suites and virtual report suites.

## Collections APIs
The `/collections/suites` APIs provide a way to retrieve report suites and virtual report suites to which a user has access in a single response. The suite `name`, `id` and `type` are returned by default and additional attributes can be requested by using the `expansion` query parameter. 

**NOTE**: Expansions should only be requested if they are going to be used. It is not a best pratice to simply request every available expansion. Requesting many expansions at the same time, especially when making a GET Many API call, will reduce performance. 

## Virtual Report Suite APIs
The `/virtualreportsuites` provide a way to create, update, delete and retrieve configuration settings for Virtual Report Suites. For more information about these APIs see the [Virtual Report Suite API Guide](vrs.md).
