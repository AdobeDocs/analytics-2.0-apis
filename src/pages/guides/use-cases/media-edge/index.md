# Media Edge API use cases

Media Edge API use cases include the following example scenarios:

* [Two chapters separated by an ad break](https://developer-stage.adobe.com/analytics-apis/docs/2.0/guides/use-cases/media-edge/chapters-with-ad-timeline/)
* [A Buffer State and a Pause](https://developer-stage.adobe.com/analytics-apis/docs/2.0/guides/use-cases/buffer-and-pause-timeline/)

## Two chapters separated by an ad break

This example in this use case includes the following:

* Two chapters: `Chapter 1` and `Chapter 2`.
* An ad break inserted at the middle of the content that contains two ads: `Ad 1` and `Ad 2`.
* A timeline that shows an offset in the playhead position that corresponds to behavior during an ad break.

## A Buffer state and a Pause

This example in this use case includes the following:

* A `buffering` state.
* The user pressing `pause`.
* The user closing the app without finishing the content to the end.
* A timeline that shows an offset in the playhead position that corresponds to behavior during an pause.

Media Edge APIs are built on the Adobe Experience Platform to provide media event tracking data within the framework of [XDM schemas](https://experienceleague.adobe.com/docs/experience-platform/xdm/home.html#:~:text=Experience%20Data%20Model%20(XDM)%2C,the%20power%20of%20digital%20experiences). For more information, see the [Media Edge API overview](https://experienceleague.adobe.com/docs/experience-platform/edge-network-server-api/media-edge-apis/overview.html).

<InlineAlert variant="info" slots="text" />

Adobe may add optional request and response members (name/value pairs) to existing API objects at any time and without notice or changes in versioning. Adobe recommends that you refer to the API documentation of any third-party tool you integrate with our APIs so that such additions are ignored in processing if not understood. If implemented properly, such additions are non-breaking changes for your implementation. Adobe will not remove parameters or add required parameters without first providing standard notification through release notes.
