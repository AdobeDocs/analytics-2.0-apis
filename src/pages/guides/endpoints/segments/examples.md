---
title: Example segment definitions
description: View example segment defintion JSON objects for use in API calls.
---

# Example segment definitions

Use the following examples to see how various segment features are formatted in API calls.

## Example 1

Test if an attribute has been set to any value across all of a visitor's activity.

```json
{
    "func":"segment",
    "version":[ 1, 0, 0 ],
    "container": {
        "func": "container",
        "context": "visitors",
        "pred": {
            "func": "exists",
            "val": {
                "func":"attr","name":"variables/page"
            }
        }
    }
}
```

## Example 2

Test if an attribute has been set to a specific value across all of a visitor's activity.

```json
{
    "func":"segment",
    "version":[ 1, 0, 0 ],
    "container": {
        "func": "container",
        "context": "visitors",
        "pred": {
            "func": "streq",
            "val": {
                "func":"attr","name":"variables/page"
            },
            "str": "Main Landing Page"
        }
    }
}
```

## Example 3

Test if an attribute has been set to a specific value, and then set to a different value.

```json
{
    "func":"segment",
    "version":[ 1, 0, 0 ],
    "container": {
        "func": "container",
        "context": "visitors",
        "pred": {
            "func": "sequence",
            "stream": [
                {
                    "func":"container",
                    "context":"hits",
                    "pred": {
                        "func": "streq",
                        "str": "Main Landing Page",
                        "val": {
                            "func":"attr", "name":"variables/page"
                        }
                    }
                },
                {
                    "func":"container",
                    "context":"hits",
                    "pred": {
                        "func": "streq",
                        "str": "Product Search",
                        "val": {
                            "func":"attr", "name":"variables/page"
                        }
                    }
                }
            ]
        }
    }
}
```

## Example 4

Test that both an attribute has been set to any value, and a different attribute has been set to a specific value.

```json
{
    "func":"segment",
    "version":[ 1, 0, 0 ],
    "container": {
        "func": "container",
        "context": "visitors",
        "pred": {
            "func": "and",
            "preds": [
                {
                    "func":"container",
                    "context":"hits",
                    "pred": {
                        "func": "exists",
                        "val": {
                            "func":"attr", "name":"variables/page"
                        }
                    }
                },
                {
                    "func":"container",
                    "context":"hits",
                    "pred": {
                        "func": "streq",
                        "str": "Main Landing Page",
                        "val": {
                            "func":"attr", "name":"variables/page"
                        }
                    }
                }
            ]
        }
    }
}
```

## Example 5

Test that both an attribute has been set to any value, and a different attribute has been set to a specific value within the same month.

```json
{
    "func":"segment",
    "version":[ 1, 0, 0 ],
    "container": {
        "func": "container",
        "context": "visitors",
        "pred": {
            "func": "sequence",
            "stream": [
                {
                    "func":"container",
                    "context":"hits",
                    "pred": {
                        "func": "streq",
                        "str": "Main Landing Page",
                        "val": {
                            "func":"attr", "name":"variables/page"
                        }
                    }
                },
                {
                    "func":"time-restriction",
                    "count":"1",
                    "limit":"within",
                    "unit":"month"
                },
                {
                    "func":"container",
                    "context":"hits",
                    "pred": {
                        "func": "streq",
                        "str": "Product Search",
                        "val": {
                            "func":"attr", "name":"variables/page"
                        }
                    }
                }
            ]
        }
    }
}
```

