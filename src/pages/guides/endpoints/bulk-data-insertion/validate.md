---
title: Bulk data insertion validation
description: Validate BDIA calls before ingesting them into Adobe Analytics.
---

# Validation

Adobe offers a way to validate API calls without ingesting them into Adobe Analytics. This endpoint is valuable when establishing a BDIA process so you can validate and troubleshoot files without permanently ingesting files that have partially valid data. Files uploaded to this endpoint are not stored on the server or processed.

`POST https://analytics-collection.adobe.io/aa/collect/v1/events/validate/`

This endpoint's requirements are identical to BDIA in general.

## Success response

If the file is valid and contains no errors, you get the following response:

```json
{"success": "file is valid"} 
```

## Error responses

If the file is not valid or authentication is not configured correctly, you get a response stating why the file failed:

| HTTP Code | JSON Response |
|--|:--|
| 400 Range Error | `{"error": "File has 2 rows that do not conform to the required CSV format! (Ex: row #59)"}` |
| 400 Bad Request | `{"error": "Request is missing required header 'x-adobe-vgid'"` |
| 400 Bad Request | `{"error": "CSV file missing required header timestamp." }` |
| 401 Unauthorized | `{"error": "Token validation failed" }` |

See also [Troubleshooting](troubleshooting.md) for additional failed responses.

## Sample cURL Call

```sh
curl -X POST -H "Authorization: Bearer <IMS_ACCESS_TOKEN>" -H "x-api-key:<CLIENT_ID>" -F file=@/tmp/ingest_file.gz "https://<BDIA_HOST>/aa/collect/v1/events/validate"
```
