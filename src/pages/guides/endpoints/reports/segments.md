---
title: Segments
description: Use segments in Reporting API calls.
---

# Segments

*This help page describes how to use segments in the Reporting API. For more information around how to use the segments endpoint, see [Segments](../segments/index.md) in the Segments API guide.*

You can include a segment in your report by adding it to the `globalFilters` property.

```json
   ...
   "globalFilters":[
      {
         "type":"dateRange",
         "dateRange":"2014-06-01T00:00/2014-06-21T00:00"
      },
      {
         "type":"segment",
         "segmentId":"53adb46be4b0a2a175bf38c4"
      }
   ],
   ...
```
