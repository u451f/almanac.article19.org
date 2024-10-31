import { loadAuthorshipOverviewData } from "./modules/plotly-authorship-overview.js";
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
 * Load data and interface elements for working group (WG)
 * Use first option as default
 */

var WG = selectElement.selectedOptions[0].value;
var WGtext = cleanOptionText(selectElement.selectedOptions[0].text);
loadAuthorshipOverviewData(WG, false, is_small_screen);
loadInfluenceData(WG, false, is_small_screen, false);
loadLeadershipData(WG, false, is_small_screen, false);

/*
 * Main overview page logic
 */
selectElement.addEventListener("change", (event) => {
    WG = event.target.value;
    if(typeof(WG) !== "undefined") {
        loadAuthorshipOverviewData(WG, true, is_small_screen);
        loadInfluenceData(WG, true, is_small_screen, false);
        loadLeadershipData(WG, true, is_small_screen, false);
    }
});
