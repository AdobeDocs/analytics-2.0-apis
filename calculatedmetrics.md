
## Calculated Metrics

### Example 1

The following example creates a new calculated metric called Average Visits per Visitor by dividing metrics `visits` by `visitors`

```bash
curl -X POST --header "Content-Type: application/json" --header "Accept: application/json" --header "Authorization: Bearer [ACCESSTOKEN]" -d "{
  \"name\": \"Average Visits per Visitor\",
  \"description\": \"Visits divided by Visitors\",
  \"rsid\": \"sistr2\",
  \"owner\": {
    \"id\": 82365
  },
  \"polarity\": \"positive\",
  \"precision\": 0,
  \"type\": \"decimal\",
  \"definition\": {
    \"formula\": {
      \"col1\": {
        \"name\": \"metrics/visits\",
        \"func\": \"metric\"
      },
      \"col2\": {
        \"name\": \"metrics/visitors\",
        \"func\": \"metric\"
      },
      \"func\": \"divide\"
    },
    \"func\": \"calc-metric\",
    \"version\": [1,0,0]
  }
}" "https://analytics.adobe.io/calculatedmetrics?locale=en_US"
```

### Example 2

The following is an example that creates a new calculated metric that divides `visits` by `visitors` and then adds `page views`
```bash
curl -X POST --header "Content-Type: application/json" --header "Accept: application/json" --header "Authorization: Bearer [ACCESSTOKEN]" -d "{
  \"name\": \"Average Visits per Visitor plus Page Views\",
  \"description\": \"Visits divided by Visitors plus Page Views\",
  \"rsid\": \"sistr2\",
  \"owner\": {
    \"id\": 82365
  },
  \"polarity\": \"positive\",
  \"precision\": 0,
  \"type\": \"decimal\",
  \"definition\": {
    \"func\": \"calc-metric\",
    \"formula\": {
      \"func\": \"add\",
      \"col1\": {
        \"func\": \"divide\",
        \"col1\": {
          \"func\": \"metric\",
          \"name\": \"metrics/visits\"
        },
        \"col2\": {
          \"func\": \"metric\",
          \"name\": \"metrics/visitors\"
        }
      },
      \"col2\": {
        \"func\": \"metric\",
        \"name\": \"metrics/pageviews\"
      }
    },
    \"version\": [1,0,0]
  }
}" "https://analytics.adobe.io/calculatedmetrics?locale=en_US"
```
