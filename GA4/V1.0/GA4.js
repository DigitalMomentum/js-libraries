// GA EVENT TRACKING //
/* GtagHelper.init('UA-42062014-1', 'AW-979314105');
 * If Using an SPA, use GtagHelper.init('UA-42062014-1', 'AW-979314105', true); to disable auto tracking of page views and then add `GtagHelper.sendPageView($location.path());` on route change
 * 
 * Add Data Attributes to the items that you want to track on click
 * E.g. <a href="/" data-event-click="SurveyBanner" data-event-action="click" data-event-label="NQF Survey">Survey</a>
 * 
 * Add Data Attributes to the items that you want to track as an adwords conversion
 * E.g. <a href="/contact-us" data-event-conversion="WbX4s2q83tQBELnL_ABC" data-event-conversion-url="/contact-us">Survey</a>
 * 
 * Tracking UserId - Add the "User" object to local storage in the form of {Id = 123} and it will be added to the dataLayer
*/


window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

var GA4Helper = (function () {
	var GA_ID; //Google Analytics ID
	var AW_ID;

	var defaultParams = {} //Default params to send with every event including Pageview (If setup before init).


	/* Initialise GA
	 * Pass Analytics and Adwords ID's
	 * Set disableAutoPageView if you want to manually set the page views yourself
	 */
	function init(googleAnalyticsId, AdwordsId, disableAutoPageView) {
		GA_ID = googleAnalyticsId;
		AW_ID = AdwordsId;


		if (typeof disableAutoPageView === 'undefined') {
			disableAutoPageView = false;
		}


		let data = addUserIdToData({ 'send_page_view': !disableAutoPageView });


		if (typeof GA_ID === 'undefined' || GA_ID == null) {
			console.warn("Google Analytics ID has not been set. Analytics will not work on this site.");
			//return;
		}else{
			gtag('config', GA_ID, data);
		}


		if(typeof AW_ID !== 'undefined' && AW_ID != null){
			gtag('config', AW_ID);
		}

		
		

		documentReady(initDataEvents);
	}


	/* * Clear all default params that are sent with every request */
    function clearDefaultParams() {
        defaultParams = {};
	}


	/* 
	* Add a default param to be sent with every request
	*/
	function addDefaultParam(paramName, value) {
            defaultParams[paramName] = value;
    }




	// Initialises the on click events for the data items
	function initDataEvents() {
		
		// Get all elements with the attribute data-ga-click
		let elements = document.querySelectorAll("[data-ga-click]");
		//console.log(elements)
		// Attach a click event listener to each matching element
		elements.forEach(element => {
			//console.log("element", element)
			element.addEventListener("click", function () {
				//console.log("click")
				// Get the value of the data-ga-click attribute
				const eventType = this.getAttribute("data-ga-click");

				// Call your custom function (e.g., gtag) with the event type and attributes
				sendEvent(eventType, getAllDataAttributes(this));
			});
		});

	}


	//Gets all the data attributes starting in data-ga-params and returns an object of them
	function getAllDataAttributes(element) {
		const dataAttributes = {};
		const attributePrefix = 'data-ga-param-';
		
		// Iterate through all attributes of the element
		for (const attr of element.attributes) {
			if (attr.name.startsWith(attributePrefix)) {
				
					// Remove the "data-" prefix and store the value
					const attributeName = attr.name.slice(attributePrefix.length);
					dataAttributes[attributeName] = attr.value;
				
			}
		}

		return dataAttributes;
	}

	function sendEvent(eventType, attributes) {
		if (!attributes) {
            attributes = {};
		}

        //Add the default params to the attributes
        for (const [key, value] of Object.entries(defaultParams)) {
            attributes[key] = value;
        }
		

		if(typeof(attributes["event_category"]) == "undefined"){
			//In GA, the basic reports don't let you filter by event name, which is a pain. So if there is no category, set that instead so we can filter in reports
			attributes["event_category"] = eventType;
		}
        gtag("event", eventType, attributes);
    }

	function reInitDataEvents() {

		//I think this works.. untested
		$("[data-ga-click]").off("click");

		initDataEvents();
	}


	// Manually send a page view
	function sendPageView(url, title) {
		var params = {
			page_location: url
		}

		if (title) {
            params.page_title = title;
		}

        sendEvent("page_view", params);
	}



	function addUserIdToData(data) {

		let userId = getUserId();

		if (userId != null) {
			data["user_id"] = userId;
		}

		return data;
	}
	function getUserId() {
		let user = localStorage.getItem("User");
		if (user != null) {
			return JSON.parse(user).Id;
		}

		return null;
	}


	var products = (function () {
		function viewItem(price, itemId, itemName, itemCategories, item_brand) {
			const qty = 1;
	  
			gtag('event', "view_item", {
			  currency: "AUD",
			  value: price * qty,
			  items: [
				{
				  item_id: itemId,
				  item_name: itemName,
				  item_brand: item_brand,
				  item_category: itemCategories[0],
				  item_category2: itemCategories[1],
				  item_category3: itemCategories[2],
				  item_category4: itemCategories[3],
				  item_category5: itemCategories[4],
				  price: price,
				  quantity: qty
				}
			  ]
			});
		}

		return {
			viewItem
		}
	})();


	//Replaces JQuery's Document.ready
	function documentReady (callback) {
		
		// Check if the document is already loaded
		if (document.readyState === "complete" || document.readyState === "interactive") {
			// Document is already loaded
			
			callback();
		} else {
			// Listen for the readystatechange event
			document.onreadystatechange = function () {
				if (document.readyState === "complete") {
					// Document is fully loaded
					
					callback();
				}
			};
		}
	}

	return {
		init,
		reInitDataEvents,
		sendPageView,
        sendEvent,
		products,
		clearDefaultParams,
		addDefaultParam
	}



})();

