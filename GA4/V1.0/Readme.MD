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


# Functions

### addDefaultParam(paramName, value)

You can set default parameters that will be sent with every event. This is useful for things like user ID, or other params that are always the same.

Set the default parameters before the init function to make sure that the default params are sent as part of the page_view event_:
```
GA4Helper.addDefaultParam("user_id", "123");
GA4Helper.addDefaultParam("page_category", "products"});
```


### clearDefaultParams()

Clears all the default params for any new events
```
GA4Helper.clearDefaultParams();
```

### init(googleAnalyticsId, [AdwordsId], [disableAutoPageView])

Initialises the GA4Helper. This function should be called before any other functions other than `addDefaultParam()`.

- disableAutoPageView: If set to true, the page_view event will not be sent automatically. This is useful if you are using a single page app and want to send the page_view event manually.

```
GA4Helper.init('G-XXXXXXX', 'AW-XXXXXXXX', true);
```


### sendPageView(eventName, [parameters])

Use the function `sendEvent()` just the same as you would with gtag.
If `event_category` is not set, it will default to `eventName`

```
GA4Helper.sendEvent("click", {
    "event_category": "button",
    "event_label": "Shop Now",
    "paramcontent_type": "product",
    "content_id", "yummy treat"
});
```


### sendPageView(url, [title], [parameters])
This function will send a page_view event to GA4. It will also set the page_title and page_location params.
```
GA4Helper.sendPageView("https://www.example.com/", "Example Page Title", {
    "paramcontent_type": "product",
    "content_id", "yummy treat"
});
```



# Events Naming conventions

Use [object first approach](https://knowandconnect.com/handbooks/ga4-naming-convention)

Examples:

User clicks the donate button
Event Name: "donation"
 - event_action = "click"
 - page_category = "dog profile"

User lands on the redirecting you to another site page
Event Name: "donation"
 - event_action = "redirected"
 - page_category = "redirect notification"
 
 User prints a poster
 Event Name: "Poster"
  - event_action = "Print Poster"
  - page_category = "dog profile"



# Release Notes


## 2025-04-01
 - Added support for default parameters
 - Fixed sendPageView function. I don't think this worked previously.
 - Added PageTitle param to sendPageView function