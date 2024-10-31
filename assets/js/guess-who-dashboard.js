import { loadAuthorshipData } from "./modules/plotly-authorship.js";
import { loadInfluenceData } from "./modules/plotly-influence.js";
import { loadLeadershipData } from "./modules/plotly-leadership.js";

// Setup
if (isScreenSmall()) {
    var is_small_screen = true;
}

/*
 * Event listener for working group selector
 */
const selectElement = document.querySelector("#wg");

/*
 * Load data and interface elements for default working group
 * FIXME: potentially just select the first element of the select that's not disabled.
 */

var WG = "ietf-add";
var WGtext = cleanOptionText(selectElement.options[1].text);
updateInterfaceElements(WG, WGtext);
loadAuthorshipData(WG, false, is_small_screen);
loadInfluenceData(WG, false, is_small_screen);
loadLeadershipData(WG, false, is_small_screen);

/*
 * Main dashboard logic
 */
selectElement.addEventListener("change", (event) => {
    WG = event.target.value;
    WGtext = cleanOptionText(event.target.selectedOptions[0].text);
    if(typeof(WG) !== "undefined") {
        updateInterfaceElements(WG, WGtext);
        loadAuthorshipData(WG, true, is_small_screen);
        loadInfluenceData(WG, true, is_small_screen);
        loadLeadershipData(WG, true, is_small_screen);
    }
});
