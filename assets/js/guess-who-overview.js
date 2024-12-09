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
/*
// Remove saved data from sessionStorage
sessionStorage.removeItem("WG");
// Remove all saved data from sessionStorage
sessionStorage.clear();
*/
var WG, WGtext;
let lastSelectedWG = sessionStorage.getItem("WG");

if (lastSelectedWG) {
    // if person is reloading the page or using the back button, restore the view
    WG = lastSelectedWG;
    selectElement.value = WG;
    WGtext = cleanOptionText(selectElement.selectedOptions[0].text);
} else {
    // on first load, use the first element in the list
    WG = selectElement.selectedOptions[0].value;
    WGtext = cleanOptionText(selectElement.selectedOptions[0].text);
}
loadAuthorshipOverviewData(WG, false, is_small_screen);
loadInfluenceData(WG, false, is_small_screen, false);
loadLeadershipData(WG, false, is_small_screen, false);

/*
 * Main overview page logic
 */
selectElement.addEventListener("change", (event) => {
    WG = event.target.value;
    if(typeof(WG) !== "undefined") {
        removeErrors();
        loadAuthorshipOverviewData(WG, true, is_small_screen);
        loadInfluenceData(WG, true, is_small_screen, false);
        loadLeadershipData(WG, true, is_small_screen, false);
        sessionStorage.setItem("WG", event.target.value);
    }
});
