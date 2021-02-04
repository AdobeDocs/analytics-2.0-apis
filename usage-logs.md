# Usage Logs API Guide
The following guide provides information about the Usage Log API. We recommend using the [Reporting APIs in the Swagger UI](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Reporting%20APIs) to learn how to make this API call.

## Authorization and authentication

For information on authenticating, see the [Getting Started Guide for 2.0 APIs](https://www.adobe.io/apis/experiencecloud/analytics/docs.html#!AdobeDocs/analytics-2.0-apis/master/create-oauth-client.md).

### Usage Log Schema
| Attribute | Type | Description | Possible Value|
| --- | --- | ---------- | ----- |
| startDate | string | Start date for the maximum of a 3 month period.| 2020-12-01T00:00:00-07 |
| endDate | string | End date for the maximum of a 3 month period. | 2020-12-15T14:32:33-07 |
| login | string | The login value of the user you want to filter logs by. This filter functions as an exact match. | User defined |
| ip | string | The IP address you want to filter logs by. This filter supports a partial match.| 10.0|
| rsid | string | The report suite ID you want to filter logs by. | User defined|
| eventType | string | The numeric id for the event type you want to filter logs by. Please reference the lookup table below. | 3 |
| event | string |  The event description you want to filter logs by. No wildcards are permitted, but this filter is case insensitive and supports partial matches.| User defined |
| limit | integer | Number of results per page. | 10 |
| page | integer | Page number (base 0 - first page is "0")| 0 |


### Event Type Lookup Table

By default, all event types will be included when you make a request to get usage logs. To apply a filter for a specific event type, the ID can be used in the API request. These event types are the same fields available in the Analytics UI.

| ID | Event Type
| --- | --- 
| 0 | No Category |
| 1 | Login failed |
| 2 | Login successful |
| 3 | Admin Action |
| 4 | Security setting change |
| 5 | Report viewed |
| 6 | Report downloaded |
| 7 | Alert sent |
| 8 | User Action |
| 9 | Tool viewed |
| 10 | Omniture Action |
| 11 | Password Recovery |
| 12 | Bookmarks |
| 13 | Dashboards |
| 14 | Alerts  |
| 15 | Calendar Events |
| 16 | Targets |
| 17 | Report Settings |
| 18 | Scheduled Reports |
| 19 | Exclude By IP |
| 20 | Name Pages |
| 21 | Classifications |
| 22 | Data Sources |
| 23 | Workspace Project |
| 24 | Segment |
| 25 | Calculated Metric |
| 26 | Date Range |
| 27 | Virtual Report Suite |
| 28 | Contribution Analysis |
| 29 | Excel Data Block Request |
| 30 | Excel Login Failure |
| 31 | Excel Login Success |
| 32 | Mobile Login Failure |
| 33 | Mobile Login Success |
| 34 | Api Method |
    		

### cURL Request Example
```
curl -X GET “https://analytics.adobe.io/api/[yourGlobalCompanyId]/auditlogs/usage?startDate=2021-01-01T00%3A00%3A00-07&endDate=2021-01-15T14%3A32%3A33-07&limit=10” -H “x-api-key: [yourOAuthClientAPIKey]” -H “x-proxy-global-company-id: [yourGlobalCompanyId]” -H “Authorization: Bearer [ims user token]” -H “Accept: application/json”
```

### Example Response
```
{
  "content": [
    {
      "eventType": null,
      "eventDescription": "Created Successfully",
      "ipAddress": "10.27.55.130",
      "login": "user@adobe.com",
      "rsid": null,
      "dateCreated": "2021-01-13T23:20:41.000+00:00"
    },
    {
      "eventType": "23",
      "eventDescription": "Project Viewed: Name=AS PROJ 09 03 Project Id=5fd02d65b00cb97e4762a20f",
      "ipAddress": "10.27.55.131",
      "login": "user@adobe.com",
      "rsid": "N/A",
      "dateCreated": "2021-01-13T23:20:30.000+00:00"
    },
    {
      "eventType": "2",
      "eventDescription": "Successful Login - Experience Cloud",
      "ipAddress": "10.178.33.74",
      "login": "user@adobe.com",
      "rsid": "N/A",
      "dateCreated": "2021-01-13T23:20:10.000+00:00"
    },
    {
      "eventType": "3",
      "eventDescription": "Viewed Logs:Index in the Administration Console.",
      "ipAddress": "10.179.134.242",
      "login": "user@adobe.com",
      "rsid": "N/A",
      "dateCreated": "2021-01-13T18:45:42.000+00:00"
    },
    {
      "eventType": "3",
      "eventDescription": "Viewed Logs:GetUsageLogUI in the Administration Console.",
      "ipAddress": "10.179.134.242",
      "login": "user@adobe.com",
      "rsid": "N/A",
      "dateCreated": "2021-01-13T18:38:33.000+00:00"
    },
    {
      "eventType": "3",
      "eventDescription": "Viewed Logs:GetUsageLogUI in the Administration Console.",
      "ipAddress": "10.179.134.242",
      "login": "user@adobe.com",
      "rsid": "N/A",
      "dateCreated": "2021-01-13T18:09:16.000+00:00"
    },
    {
      "eventType": "3",
      "eventDescription": "Viewed Logs:GetUsageLogUI in the Administration Console.",
      "ipAddress": "10.179.134.242",
      "login": "user@adobe.com",
      "rsid": "N/A",
      "dateCreated": "2021-01-13T18:09:10.000+00:00"
    },
    {
      "eventType": "3",
      "eventDescription": "Viewed Logs:GetReportSuiteLog in the Administration Console.",
      "ipAddress": "10.179.134.242",
      "login": "user@adobe.com",
      "rsid": "N/A",
      "dateCreated": "2021-01-13T18:08:54.000+00:00"
    },
    {
      "eventType": "3",
      "eventDescription": "Viewed Logs:GetUsageLogUI in the Administration Console.",
      "ipAddress": "10.179.134.242",
      "login": "user@adobe.com",
      "rsid": "N/A",
      "dateCreated": "2021-01-13T18:08:26.000+00:00"
    },
    {
      "eventType": "3",
      "eventDescription": "Viewed Logs:Index in the Administration Console.",
      "ipAddress": "10.179.134.242",
      "login": "user@adobe.com",
      "rsid": "N/A",
      "dateCreated": "2021-01-13T18:06:09.000+00:00"
    }
  ],
  "totalElements": 159,
  "lastPage": false,
  "numberOfElements": 10,
  "totalPages": 16,
  "firstPage": true,
  "sort": null,
  "size": 10,
  "number": 0
}
```


### cURL Example Request With Filters Applied
The following request contains query string parameters to filter the logs by eventType, IP and event.

```
curl -X GET “https://analytics.adobe.io/api/[yourGlobalCompanyId]/auditlogs/usage?startDate=2021-01-01T00%3A00%3A00-07&endDate=2021-01-15T14%3A32%3A33-07&ip=10&eventType=5&event=viewed&limit=10” -H “x-api-key: [yourOAuthClientAPIKey]” -H “x-proxy-global-company-id: [yourGlobalCompanyId]” -H “Authorization: Bearer [ims user token]” -H “Accept: application/json”
```

### Example Response
```
{
  "content": [
    {
      "eventType": "5",
      "eventDescription": "Pages Report viewed",
      "ipAddress": "10.178.63.58",
      "login": "user@adobe.com",
      "rsid": "examplersid",
      "dateCreated": "2021-01-11T19:30:46.000+00:00"
    }
  ],
  "totalElements": 1,
  "lastPage": true,
  "numberOfElements": 1,
  "totalPages": 1,
  "firstPage": true,
  "sort": null,
  "size": 10,
  "number": 0
}
```
