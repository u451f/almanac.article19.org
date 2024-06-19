/*
 * On the viz dashboard, load WG according to query string
 * */
const queryString = window.location.search;
const params = new URLSearchParams(queryString);

/*
 * On the viz dashboard, by default load dnsop data
 * FIXME: think about doing that differently
 * */
if(!params.get("wg")) {
    // eventually do that differently
    // nothing was selected, let's have a default view
    params.set("wg", "ietf");
    window.location.search = params;
}

/*
 * Assign WG var to be used by the plotly scripts
 * groups, images and links follow the scheme $org-$wg, e.g. "ietf-dnsop"
 */
const WG = params.get("wg");

/* switch view to a different WG and reload page */
function setWG(select) {
    var value = select.value;
    params.set("wg", value);
    window.location.search = params;
}
