---
title: Remove classification fields or keys
description: Remove cell values or delete a key from server data
---

# Remove classification fields or keys

You can remove classification fields or keys from the server with the following methods:

* [Remove a single field from a key](#Remove-a-single-field-from-a-key)
* [Delete a key](#Delete-a-key)

## Remove a single field from a key

To remove a single field from a key, include the the following object data list for each removal in your [POST import json dataset ID](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/classifications/#post-import-json-classification) request:

```json
            {
            "key": "<KEY>",
            "action": "delete-field",
            "data": {
                "<Column Name>": ""
            }
```

This action results in the following value for the cell: `~empty~`.

Make sure the include `action` in the data list above. Leaving it out will result in updating the **entire** column with the `~empty~` value.

### Remove cell value example

The following example shows a request payload to remove both the `Brand` and `Channel` values:

```json
{
    "dataFormat": "json",
    "encoding": "UTF8",
    "jobName": "prod report suite tracking code classification",
    "notifications": [
        {
            "method": "email",
            "state": "completed",
            "recipients": [
                "test_email@gap.com"
            ]
        }
    ],
    "listDelimiter": ",",
    "source": "Direct API Upload",
    "keyOptions": {
        "byte_length": 0,
        "type": "string"
    },
    "data": [
        {
            "key": "onaff998494",
            "action": "delete-field",
            "data": {
                "Brand": ""
            }
        },
        {
            "key": "onaff998494",
            "action": "delete-field",
            "data": {
                "Channel": ""
            }
        },
       
...
]
}
```

## Delete a key

To remove one key and all the classification values for this key, include the the following with your *[POST import json dataset ID](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/classifications/#post-import-json-classification) request:


```json
        {
            "key": "<KEY>",
            "action": "delete-key"
        }
```

This action results in the following value for the key: `~deletekey~`.

### Delete a key by uploading a file

To delete a column value in an uploaded file, use the [POST import upload file](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/classifications/import-file/) endpoint. The following shows a section of an uploaded `.tsv` file with an example change:

```
Key ColA ColB
key1 ~empty~
```

## Delete a dataset

To remove an entire classification dataset, use the [**DELETE dataset ID**](https://adobedocs.github.io/analytics-2.0-apis/?urls.primaryName=Classification%202.0%20APIs#/Classification%20Dataset/deleteDataset) endpoint.



