const queryString = window.location.search;
const params = new URLSearchParams(queryString);

// change with option is selected
if(!params.get("wg")) {
    // eventually do that differently
    // nothing was selected, let's have a default view
    params.set("wg", "ietf-domain-name-system-operations");
    window.location.search = params;
}

// assign var to be used in plotly scripts
// FIXME: maybe have the logo and link in a yaml file instead
const WG = params.get("wg");
if(WG) {
    // FIXME: clean that
    // mark as selected in <select>
    let selectwg = document.getElementById("wg");
    selectwg.value = WG;
    // load corresponding image
    let wglogo = document.getElementById("wglogo");
    wglogo.src = wglogo.src + WG + ".svg";
    // load corresponding link
    let wglink = document.getElementById("wglink");
    wglink.href = wglink.href + WG;
    // load corresponding name
    let wgname = document.getElementById("wgname");
    wgname.textContent = selectwg.options[selectwg.selectedIndex].text;
    wglogo.title = selectwg.options[selectwg.selectedIndex].text;
}

/* switch view to a different WG and reload page */
function setWG(select) {
    var value = select.value;
    params.set("wg", value);
    window.location.search = params;
}

