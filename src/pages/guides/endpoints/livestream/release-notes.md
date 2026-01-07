---
title: LiveStream release notes
descriptions: Updates to Adobe Analytics LiveStream data and endpoints.
---
# LiveStream release notes

Cumulative release notes for LiveStream data and endpoints.

## April 13, 2026

Contains numerous updates to data formatting for several fields. These updates provide better parity between data provided using LiveStream and data in other Adobe Analytics features, such as Analysis Workspace.

Field name | Change
---|---
**`evar1` - `eVar250`** | - Counter eVars set to a string value now return a value of `1.0` instead of the string.<br/>- Now truncates values to 255 bytes, matching what is stored in a report suite.
**`events`** | - Now supports counting multiple instances of the same event. For example, if the `events` variable contains `event1,event1`, two instances are now counted instead of just counting the first instance.<br/>- Setting an event to a value of `0` omits that event entirely instead of passing `eventX=0`.<br/>- Numeric and currency events that do not have an associated value are now omitted.<br/>- Any event that is assigned a non-numeric value is now omitted.<br/>- Event serialization is now truncated to 20 characters, matching what is stored in a report suite.
**`ip`** | Now uses the correct obfuscation characters when IP obfuscation is enabled.
**`language`** | Fixed an issue where some values were double-encoded.
**`mobileAudioSupport`**<br/>**`mobileVideoSupport`** | Fixed an issue that included only one supported format for devices that support multiple formats. Multiple values are separated by commas.
**`mvvar1` - `mvvar3`** | - The delimiter field now always specifies a comma (`44`) instead of the delimiter set in report suite settings. The field is now considered deprecated.<br/>- Now truncates individual values to 255 bytes each, matching what is stored in a report suite.<br/>- Now truncates the total length of the field (including delimiters) to 65,535 bytes.<br/>- Now omits duplicate entries in the same hit.<br/>-
**`products`** | - Incorrectly parsed product values are now truncated instead of erroneously creating multiple product values.<br/>- Now omits duplicate product entries in the same hit.<br/>- Product values missing a name are no longer included.<br/>- Omits events for product values if the `events` field does not also include that event.<br/>- If the same merchandising eVar appears in the same product value, the last eVar value is now used instead of the first.<br/>- Standard and conversion variable syntax merchandising eVars are now omitted from product values, as only product syntax merchandising eVars are allowed in this field.
**`purchaseId`** | If a purchase event does not include a purchase ID, the auto-generated purchase ID is now included.
**`prop1` - `prop75`** | No longer included in excluded hits.
**`referrer`** | Now omits bot traffic and excluded hits.
**`revenue`** | Now rounds to two decimal places.
**`rmvvar`** | Internal variables that typically map to other fields. These internal variables are now omitted.
**`searchEngine`** | Now omits bot traffic and excluded hits.
**`tntAction`** | - Now excludes traffic from bots.<br/>- Now omits duplicate entries in the same hit.<br/>- Action IDs with a value of `-1` are now returned as a value of `65535`.<br/>- If an action contains multiple action IDs, only the first is used.
**`userAgent`** | Now follows a similar workflow to data feeds where mobile device attributes and user agent are mutually exclusive. By default, `userAgent` is empty. If you prefer, you can contact customer care to populate this field. However, in doing so, all mobile device attribute fields no longer contain data.
**`tnt`** | Fixed an issue that sometimes caused this field's `delim` and `values` attributes to appear at the schema root level.
**`zip`** | Now honors 'Zip Option' in report suite settings (using geo zip).

A preview endpoint is available to test updated response payloads with your integration. To enable your stream for updated response payloads, follow both of these steps:

1. Send a `GET` call to the following endpoint using the same headers as your current LiveStream implementation:

   `https://livestream.adobe.net/api/2/enable/<stream_name>`

   The server responds indicating that updated response payloads are available in 15 minutes.

2. Modify your service to use either of the following URI's:
   
   * `https://livestream.adobe.net/api/1/stream/<stream_name>?beta=true`
     or
   * `https://livestream.adobe.net/api/2/stream/<stream_name>`

On April 13, 2026 when the updated response payload changes go live, all endpoints effectively function identically.
