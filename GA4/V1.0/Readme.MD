# Google Analytics Helper

## Setup
Include `<script src="https://lib.digitalmomentum.com.au/GA4/V1.0/GA4.js"></script>`

# Initialize

`GA4Helper.init('G-SXVZJH8F4S', 'AW-S79314105');`

# Automatic Tagging
You can add ID's or classes on links / buttons to trigger tagging rather than custom events. 

See Docs:
 - [Automatically collected events](https://support.google.com/analytics/answer/9234069?sjid=4093258464454628144-AP)
 - [Enhanced measurement events](https://support.google.com/analytics/answer/9216061?sjid=4093258464454628144-AP)

# Custom Events with Attributes

Custom events use attributes to trigger either:
-  [Reccomended Events](https://support.google.com/analytics/answer/9267735?sjid=4093258464454628144-AP)
 - [Enhanced Events](https://support.google.com/analytics/answer/12229021?sjid=4093258464454628144-AP)
 - [Setup / configure custom events](https://www.lovesdata.com/blog/google-analytics-4-events#custom-events)

 Attributes for a "Click" look like the following:

 `<button data-ga-click="select_content" data-ga-paramcontent_type="product" data-ga-content_id="yummy treat"`>Shop Now</button>

- data-ga-click (Required): Triggers the event `select_content` on click
- data-ga-*: All other params that will be included in the event post

Check the Recommended events for the params that should be passed. 

# Custom Events by Javascript:
Use the function `sendEvent()` just the same as you would with gtag.

```
GA4Helper.sendEvent("select_content", {
    "paramcontent_type": "product",
    "content_id", "yummy treat"
});
```

# Default Parameters
You can set default parameters that will be sent with every event. This is useful for things like user ID, or other params that are always the same.

Set the default parameters before the init function to make sure that the default params are sent as part of the page_view event_:
```
GA4Helper.addDefaultParam("user_id", "123"});
GA4Helper.addDefaultParam("page_category", "products"});
```

# Release Notes


## 2025-04-01
 - Added support for default parameters
 - Fixed sendPageView function. I don't think this worked previously.
 - Added PageTitle param to sendPageView function