# Segment Definition Data Structure
The segment definition data structure is used to communicate segment rules to the API. This data structure defines the raw logic that is used to isolate the segment data. The segment definition is a hierarchical data structure of containers, functions, and boolean logic that is used to define the segment. The segment tool in the Adobe Analytics UI follows these rules and can be a useful tool for understanding how the data structure looks.

## Terms

The following terms are used in segment definitions:

* Schema - Refers to a report suite's configuration. Identifies which dimensions and metrics are available for use within the segment.
* Attribute - An entity in the schema. For example, `page` or `evar1`.
* Context - Defines the level that the segment logic should operate on. Valid values are `visitors`, `visits`, and `hits`.
* Row - A single record of data in a segment. Depending on the context, this can either be a record containing a visitor (contains all hits in all visits for a visitor), a single visit (contains all hits in a visit), or a single hit.
* Container - A collection of rows
* Container Set - Identifies the relationship between containers using boolean expressions.
* Data Set - A group of collections that comprises all of the data being operated on.

Let's use the following segment example to provide more detail on what each of these terms mean and how they are used.

```json
{
    "definition":{
        "func":"segment",
        "container":{
            "func":"container",
            "context":"hits",
            "pred":{
                "func":"exists",
                "description":"Page",
                "val":{
                    "func":"attr",
                    "name":"variables/page"
                }
            }
        },
        "version":[1,0,0]
    }
}
```

### Schema
This is a reflection of the Adobe Analytics implementation. In other words, it defines the configuration for the enabled evars, props, events, etc.

### Attributes
An attribute is an entity from the schema. In the above example, `variables/page` is an attribute.

### Context
The rules in a segment have a context that specify the level of operation. The context can be `visitors`, `visits` or `hits`.
As an example, let's build a segment rule where revenue is greater than 0 (meaning a purchase took place) and change the context to see how things change.

If the context is set to `visitors`, the segment includes all hits from visitors that have a purchase of some kind during a visit. This is useful in analyzing customer behavior in visits leading up to a purchase and possibly behavior after a purchase.

If the context is set to `visits`, the segment includes all hits from visits where a purchase occurred. This is useful for seeing the behavior of a visitor in immediate page views leading up to the purchase.

If the context is set to `hit`, the segment only includes hits where a purchase occurred, and no other hits. This is useful in seeing which products were most popular.

In the above example, the context for the container listed is `hits`. This means that the container only evaluates data at the hit level, (in contrast to visit or visitor level). The rows in the container are also at the hit level.

### Row
A row is a single record inside of a container. The information stored in a row depends on the context setting for the container. For example, if the context is set to `visitor`, the row in the container contains all information about the visitor spanning all hits from all visits. To contrast, if the context is set to 'hits', the row only contains information related to the individual qualifying hits in the segment logic.

In the above example, the container is set to a `hit` context. The container's logic states that it will only include hits that have a `page` variable set. Therefore, the container only stores rows of hit records where a page was set.

### Container
A container groups the segment logic and context together for use in calculating the rows that will be assigned to the container.

A container has three properties:

* `func`
* `context`
* `pred`

In the above example, the container's context is set to `hits` and a rule that only includes hits where the `page` attribute is set.

### Container Set
A `container set` groups containers and creates cartesian relationships between them using boolean expressions. For example, you may have a container that groups visitors that have a purchase, and a second container that groups visitors who came to the website via a specific banner ad. The container set could link these two containers with an AND condition. The result would be a segment containing visitors who belong in both containers, i.e., visitors who made a purchase who also came to the website via a specific banner ad. It would not include visitors who came to the website via the banner ad who never purchased anything.

In the above example, there is only one container, so no container set is needed.

### Data Set
A data set is the collection of all records used across containers and container sets to calculate the population of the segment.

## Schema Functions
**Table 1 - Attribute Function**

|Function|Description|Parameters|
|---|---|---|
| attr | References an attribute in the schema. For example, `evar1`. |`name` contains the name of the attribute in the schema. |


**Table 2 - Event Functions**

|Function|Description|Parameters|
|---|---|---|
|event|References an event from the schema. For example, `event1` or `revenue`. To use this, an aggregation function like 'total' must also be used.|`name` contains the name of the attribute in the schema. |
|total|Sums an event across the context resulting in a value that can be used in comparisons.|`evt` contains the event to be summed. |
|event-exists|Checks for the existence of the event in the context.|`evt` contains the event to be checked.|
|not-event-exists|Checks for the lack of the event in the context.|`evt` contains the event to be checked.|

**Table 3 - Grouping Functions**

|Function|Description|Parameters|
|---|---|---|
|segment |Holds the definition of the segment. It is the top level object.|`version` contains an array of three numbers that describes the version to use. `container` is a child function that contains the definition of the segment.
|container |Identifies the context and defines segment logic.|`context` Contains the context. Valid values are `visitors`, `visits`, `hits`. `pred` Contains the logic for this container.
|and |Groups multiple `container` objects together. |`preds` Contains an array of containers that define the segment logic and performs a boolean `AND` operation on them.
|or |Groups multiple `container` objects together. |`preds` Contains an array of containers that define the segment logic and performs a boolean `OR` operation on them.
|without | Performs a boolean `NOT` on the container provided in the `pred` parameter.|`pred` The container to perform a `NOT` operation on.
|sequence | A group of conditions that must occur in the provided order.|`stream` A list of ordered containers that define conditions for the segment.
|sequence-prefix | A list of conditions that must occur before a certain event.|`stream` A list of container objects defining the logic for this part of the segment. `context`
|sequence-suffix | A list of conditions that must occur after a certain event.|`stream`  A list of container objects defining the logic for this part of the segment. `context`
|sequence-and | A group of unordered conditions that _must all_ occur.|`checkpoints` A list of container objects that define the conditions.
|sequence-or | A group of unordered conditions. Any individual condition (or more) must occur.|`checkpoints` A list of containers that define conditions for the segment.|

## Available Data Comparison Functions
**Table 4 - String Functions**

|Function|Description|Parameters|
|---|---|---|
|streq|Equals|`val` contains a reference to the schema. `str` contains a literal value.|
|not-streq|Not Equals|`val` contains a reference to the schema. `str` contains a literal value.|
|strlt|Less Than|`val` contains a reference to the schema. `str` contains a literal value.|
|strgt|Greater Than|`val` contains a reference to the schema. `str` contains a literal value. |
|strle|Less Than or Equals|`val` contains a reference to the schema. `str` contains a literal value.|
|strge|Greater Than or Equals|`val` contains a reference to the schema. `str` contains a literal value.|
|streq-in|Match a string to any of the values in the parameter|`val` contains a reference to the schema. `list` contains an array of literal values.|
|not-streq-in|Ensure a string doesn't match any of the values in the parameter|`val` contains a reference to the schema. `list` contains an array of literal values.|
|contains|Ensure a string matches or contains the value in the parameter|`val` contains a reference to the schema. `str` contains a literal value.|
|not-contains|Ensure a string doesn't match or contains the value in the parameter|`val` contains a reference to the schema. `str` contains a literal value.|
|contains-any-of|Ensure a string contains any of the values in the parameter. Case-insensitive.|`val` contains a reference to the schema. `list` contains an array of literal values.|
|contains-all-of|Ensure a string contains all of the values in the parameter. Case-insensitive.|`val` contains a reference to the schema. `list` contains an array of literal values.|
|not-contains-any-of|Ensure a string doesn't contain at least one of the values in the parameter. Case-insensitive.|`val` contains a reference to the schema. `list` contains an array of literal values.|
|not-contains-all-of|Ensure a string doesn't contain any of the values in the parameter. Case-insensitive.|`val` contains a reference to the schema. `list` contains an array of literal values.|
|starts-with|Ensure a string starts with the value in the parameter. Case-insensitive.|`val` contains a reference to the schema. `str` contains a literal value. |
|ends-with|Ensure a string ends with the value in the parameter. Case-insensitive.|`val` contains a reference to the schema. `str` contains a literal value.|
|not-starts-with|Ensure a string doesn't start with the value in the parameter. Case-insensitive.|`val` contains a reference to the schema. `str` contains a literal value.|
|not-ends-with|Ensure a string doesn't end with the value in the parameter. Case-insensitive.|`val` contains a reference to the schema. `str` contains a literal value.|
|matches|Ensure a string matches the glob parameter. A glob parameter uses a '*' character to match any sequence of characters. A literal '*' is expressed with '\*'.|`val` contains a reference to the schema. `glob` contains a literal value.|
|not-matches|Ensure a string doesn't match the glob parameter. A glob parameter uses a '*' character to match any sequence of characters. A literal '*' is expressed with '\*'.|`val` contains a reference to the schema. `glob` contains a literal value.|

**Table 5 - Numeric Functions**

|Function|Description|Parameters|
|---|---|---|
|eq|Equals|`val` The attribute to compare. `num` The literal number being compared to.|
|not-eq|Not equals|`val` The attribute to compare. `num` The literal number being compared to.|
|gt|Greater than|`val` The attribute to compare. `num` The literal number being compared to.|
|lt|Less than|`val` The attribute to compare. `num` The literal number being compared to.|
|ge|Greater than or equal to|`val` The attribute to compare. `num` The literal number being compared to.|
|le|Less than|`val` The attribute to compare. `num` The literal number being compared to.|
|eq-any-of|Equal to any of the values provided|`val` The attribute to compare. `list` An array of numbers to use in the comparison.|
|not-eq-any-of|Not equal to any of the values provided|`val` The attribute to compare. `list` An array of numbers to use in the comparison.|

**Table 6 - Existence Functions**

|Function|Description|Parameters|
|---|---|---|
|exists|Tests if an attribute has been set to a value.|`val` The attribute to test.|
|not-exists|Tests if an attribute has never been set to a value.|`val` The attribute to test.|

**Table 7 - Temporal Functions**

|Function|Description|Parameters|
|---|---|---|
|time-restriction|Used to determine if a checkpoint occurred within a given time frame.|`limit` Limits the event to a context. Valid values are `after` or `within`. `unit` A unit of time. Valid values are `minute`, `hour`, `day`, `week`, `month`, `quarter`, `year`. `count` The number of temporal units based on the `unit` parameter.|
|container-restriction|Used to determine if checkpoints described in other containers have happened in a specific sequence.|`limit` Limits the event to a context. Valid values are `after` or `within`. `count`  Specifies the number of events (page views, visits, days, months, etc) between two checkpoints.|
|dimension-restriction|Used between checkpoints to specify the activity can exist in sequence between them.|`limit` Limits the checkpoint to a context. Valid values are `after` or `within`. `count` Specifies the number of events (page views, visits, days, months, etc) between two checkpoints.|
|exclude-next-checkpoint|Ensures the next checkpoint doesn't happen between the preceding checkpoint and the subsequent checkpoint. If there is no subsequent checkpoint then the excluded checkpoint must not occur at any point after the preceding checkpoint. If there is no preceding checkpoint then the excluded checkpoint must not have occurred at any point preceding the subsequent checkpoint.|

For more details, see the documentation published here:
https://experiencecloud.adobe.com/resources/help/en_US/analytics/segment/seg_sequential_build.html

## Segment Definition Examples

### Example 1
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

### Example 2
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

### Example 3
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

### Example 4
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

### Example 5
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

