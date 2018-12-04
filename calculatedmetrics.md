
# Calculated Metrics

## Example Request

The following example requests all the metrics to which your profile has access:

```
curl -X GET "https://analytics.adobe.io/api/{COMPANY ID}/calculatedmetrics?rsids={RSID}&locale=en_US&limit=10&page=0" -H  "x-api-key: {API KEY}" -H  "x-proxy-global-company-id: {COMPANY ID}" -H  "Authorization: {BEARER TOKEN}  -H  "Accept: application/json" -H  "Content-Type: application/json"
```
