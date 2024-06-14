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

 Attributes for a "Click" look like the following:

 `<button data-ga-click="select_content" data-ga-paramcontent_type="product" data-ga-content_id="yummy treat"`>Shop Now</button>

- data-ga-click (Required): Triggers the event `select_content` on click
- data-ga-*: All other params that will be included in the event post

Check the Reccomended events for the params that should be passed. 

# Custom Events by Javascript:
Use the function `sendEvent()` just the same as you would with gtag.

```
sendEvent("select_content", {
    "paramcontent_type": "product",
    "content_id", "yummy treat"
});
```

