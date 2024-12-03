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
 * Load data and interface elements for working group (WG)
 */

var WG, WGtext;
let lastSelectedWG = sessionStorage.getItem("WG");
console.log(lastSelectedWG);

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
        sessionStorage.setItem("WG", event.target.value);
    }
});
