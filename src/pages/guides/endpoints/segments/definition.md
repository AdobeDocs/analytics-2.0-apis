---
title: Segment definition data structure
description: All parameters you can include in a segment definition JSON object.
---

# Segment Definition Data Structure

The segment definition data structure is used to communicate segment rules to the API. This data structure defines the raw logic that is used to isolate the segment data. The segment definition is a hierarchical data structure of containers, functions, and boolean logic that is used to define the segment. The segment tool in the Adobe Analytics UI follows these rules and can be a useful tool for understanding how the data structure looks.

## Terms

The following terms are used in segment definitions:

* **Schema**: A report suite's configuration. Identifies which dimensions and metrics are available for use within the segment. It defines the configuration for the enabled eVars, props, events, etc.
* **Attribute**: An entity in the schema. For example, `variables/page` or `variables/evar1`.
* **Context**: The level that the segment logic operates on. Valid values are `visitors`, `visits`, and `hits`. See [Segment containers](https://experienceleague.adobe.com/docs/analytics/components/segmentation/seg-overview.html) in the Analytics Components guide for more information.
* **Row**: A single record of data in a segment. Depending on the context, this can either be a record containing a visitor (contains all hits in all visits for a visitor), a single visit (contains all hits in a visit), or a single hit. The information stored in a row depends on the context setting for the container. For example, if the context is set to `visitor`, the row in the container contains all information about the visitor spanning all hits from all visits. To contrast, if the context is set to `hits`, the row only contains information related to the individual qualifying hits in the segment logic.
* **Container**: A collection of rows. It groups the segment logic and context together for use in calculating the rows that are assigned to the container. A container has three properties: `func`, `context`,and  `pred`.
* **Container Set**: Groups containers and creates cartesian relationships between them using boolean expressions. For example, you have a container that groups visitors that have a purchase, and a second container that groups visitors who came to the website through a specific banner ad. The container set links these two containers with a boolean expression. If you use an `AND` condition, the visitor must match both expressions. If you use an `OR` condition, the visitor can match one or the other.
* **Data Set**: The collection of all records used across containers and container sets to calculate the population of the segment.

## Schema Functions

### Attribute functions

| Function | Description | Parameters |
|---|---|---|
| `attr` | References an attribute in the schema. For example, `evar1`. | `name` contains the name of the attribute in the schema. |

### Event functions

| Function | Description | Parameters |
|---|---|---|
| `event` | References an event from the schema. For example, `event1` or `revenue`. To use this, an aggregation function like 'total' must also be used.|`name` contains the name of the attribute in the schema. |
| `total` | Sums an event across the context resulting in a value that can be used in comparisons.| `evt` contains the event to be summed. |
| `event-exists` | Checks for the existence of the event in the context.| `evt` contains the event to be checked.|
| `not-event-exists` | Checks for the lack of the event in the context.| `evt` contains the event to be checked.|

### Grouping functions

| Function | Description | Parameters |
|---|---|---|
| `segment` |Holds the definition of the segment. It is the top level object.|`version` contains an array of three numbers that describes the version to use. `container` is a child function that contains the definition of the segment.
| `container` |Identifies the context and defines segment logic.|`context` Contains the context. Valid values are `visitors`, `visits`, `hits`. `pred` Contains the logic for this container.
| `and` |Groups multiple `container` objects together. |`preds` Contains an array of containers that define the segment logic and performs a boolean `AND` operation on them.
| `or` |Groups multiple `container` objects together. |`preds` Contains an array of containers that define the segment logic and performs a boolean `OR` operation on them.
| `without` | Performs a boolean `NOT` on the container provided in the `pred` parameter.| `pred` The container to perform a `NOT` operation on.
| `sequence` | A group of conditions that must occur in the provided order.|`stream` A list of ordered containers that define conditions for the segment.
| `sequence-prefix` | A list of conditions that must occur before a certain event.|`stream` A list of container objects defining the logic for this part of the segment. `context`
| `sequence-suffix` | A list of conditions that must occur after a certain event.|`stream`  A list of container objects defining the logic for this part of the segment. `context`
| `sequence-and` | A group of unordered conditions that _must all_ occur.|`checkpoints` A list of container objects that define the conditions.
| `sequence-or` | A group of unordered conditions. Any individual condition (or more) must occur.|`checkpoints` A list of containers that define conditions for the segment.|

## Available Data Comparison Functions

### String functions

| Function | Description | Parameters |
|---|---|---|
| `streq` |Equals|`val` contains a reference to the schema. `str` contains a literal value.|
| `not-streq` |Not Equals|`val` contains a reference to the schema. `str` contains a literal value.|
| `strlt` |Less Than|`val` contains a reference to the schema. `str` contains a literal value.|
| `strgt` |Greater Than|`val` contains a reference to the schema. `str` contains a literal value. |
| `strle` |Less Than or Equals|`val` contains a reference to the schema. `str` contains a literal value.|
| `strge` |Greater Than or Equals|`val` contains a reference to the schema. `str` contains a literal value.|
| `streq-in` |Match a string to any of the values in the parameter|`val` contains a reference to the schema. `list` contains an array of literal values.|
| `not-streq-in` |Ensure a string doesn't match any of the values in the parameter|`val` contains a reference to the schema. `list` contains an array of literal values.|
| `contains` |Ensure a string matches or contains the value in the parameter|`val` contains a reference to the schema. `str` contains a literal value.|
| `not-contains` |Ensure a string doesn't match or contains the value in the parameter|`val` contains a reference to the schema. `str` contains a literal value.|
| `contains-any-of` |Ensure a string contains any of the values in the parameter. Case-insensitive.|`val` contains a reference to the schema. `list` contains an array of literal values.|
| `contains-all-of` |Ensure a string contains all of the values in the parameter. Case-insensitive.|`val` contains a reference to the schema. `list` contains an array of literal values.|
| `not-contains-any-of` |Ensure a string doesn't contain at least one of the values in the parameter. Case-insensitive.|`val` contains a reference to the schema. `list` contains an array of literal values.|
| `not-contains-all-of` |Ensure a string doesn't contain any of the values in the parameter. Case-insensitive.|`val` contains a reference to the schema. `list` contains an array of literal values.|
| `starts-with` |Ensure a string starts with the value in the parameter. Case-insensitive.|`val` contains a reference to the schema. `str` contains a literal value. |
| `ends-with` |Ensure a string ends with the value in the parameter. Case-insensitive.|`val` contains a reference to the schema. `str` contains a literal value.|
| `not-starts-with` |Ensure a string doesn't start with the value in the parameter. Case-insensitive.|`val` contains a reference to the schema. `str` contains a literal value.|
| `not-ends-with` |Ensure a string doesn't end with the value in the parameter. Case-insensitive.|`val` contains a reference to the schema. `str` contains a literal value.|
| `matches` |Ensure a string matches the glob parameter. A glob parameter uses a '*' character to match any sequence of characters. A literal '*' is expressed with '\*'.|`val` contains a reference to the schema. `glob` contains a literal value.|
| `not-matches` |Ensure a string doesn't match the glob parameter. A glob parameter uses a '*' character to match any sequence of characters. A literal '*' is expressed with '\*'.|`val` contains a reference to the schema. `glob` contains a literal value.|

### Numeric functions

| Function | Description | Parameters |
|---|---|---|
| `eq` |Equals|`val` The attribute to compare. `num` The literal number being compared to.|
| `not-eq` |Not equals|`val` The attribute to compare. `num` The literal number being compared to.|
| `gt` |Greater than|`val` The attribute to compare. `num` The literal number being compared to.|
| `lt` |Less than|`val` The attribute to compare. `num` The literal number being compared to.|
| `ge` |Greater than or equal to|`val` The attribute to compare. `num` The literal number being compared to.|
| `le` |Less than|`val` The attribute to compare. `num` The literal number being compared to.|
| `eq-any-of` |Equal to any of the values provided|`val` The attribute to compare. `list` An array of numbers to use in the comparison.|
| `not-eq-any-of` |Not equal to any of the values provided|`val` The attribute to compare. `list` An array of numbers to use in the comparison.|

### Existence functions

| Function | Description | Parameters |
|---|---|---|
| `exists` |Tests if an attribute has been set to a value.|`val` The attribute to test.|
| `not-exists` |Tests if an attribute has never been set to a value.|`val` The attribute to test.|

### Temporal functions

| Function | Description | Parameters |
|---|---|---|
| `ime-restriction` |Used to determine if a checkpoint occurred within a given time frame.|`limit` Limits the event to a context. Valid values are `after` or `within`. `unit` A unit of time. Valid values are `minute`, `hour`, `day`, `week`, `month`, `quarter`, `year`. `count` The number of temporal units based on the `unit` parameter.|
| `container-restriction` |Used to determine if checkpoints described in other containers have happened in a specific sequence.|`limit` Limits the event to a context. Valid values are `after` or `within`. `count`  Specifies the number of events (page views, visits, days, months, etc) between two checkpoints.|
| `dimension-restriction` |Used between checkpoints to specify the activity can exist in sequence between them.|`limit` Limits the checkpoint to a context. Valid values are `after` or `within`. `count` Specifies the number of events (page views, visits, days, months, etc) between two checkpoints.|
| `exclude-next-checkpoint` |Ensures the next checkpoint doesn't happen between the preceding checkpoint and the subsequent checkpoint. If there is no subsequent checkpoint then the excluded checkpoint must not occur at any point after the preceding checkpoint. If there is no preceding checkpoint then the excluded checkpoint must not have occurred at any point preceding the subsequent checkpoint.|

See [Build sequential segments](https://experienceleague.adobe.com/docs/analytics/components/segmentation/segmentation-workflow/seg-sequential-build.html) in the Analytics Components user guide for more information.
