/*
 * Check if people have a small screen so we can adjust the plot layout
 * */

function isScreenSmall() {
    if (window.screen.width <= 1024) {
        return true;
    }
}

function displayError(errtxt) {
    var target = document.getElementById(errtxt);
    var elmTxt = document.createElement('div');
    elmTxt.className = "error";
    elmTxt.innerHTML = "No available data.";
    target.after(elmTxt);
}

function removeErrors() {
    const elems = document.querySelectorAll('.error');
    for (const e of elems) {
        e.remove();
    };
}

/*
 * Dashboard interface: headline
 * */
function cleanOptionText(WGtext) {
    return WGtext.replace('-- ','');
}

/*
 * Dashboard/Graphs interface: load image, link, title
 */
function updateInterfaceElements(WG, WGtext) {
    // load corresponding image
    let wglogo = document.getElementById("wglogo");
    if(wglogo) {
        wglogo.src = "/assets/images/groups/" + WG + ".svg";
    }

    // load corresponding link into top menu
    let almanaclink = document.getElementById("almanaclink");
    if(almanaclink) {
        almanaclink.href = "/group/" + WG + ".html";
    }

    // load corresponding name into the title
    let wgname = document.getElementById("wgname");
    if(wgname) {
        wgname.textContent = WGtext;
    }
}

/*
 * Landing page interface: load SDO link
 */
function updateInterfaceElementsOverview(WG) {
    // load corresponding link into top menu
    let almanaclink = document.getElementById("almanaclink");
    if(almanaclink) {
        if(WG == "ietf") {
            link = "3_ietf";
        } else if (WG == "irtf") {
            link = "2_irtf";
        } else if (WG == "w3c") {
            link = "1_w3c";
        }
        almanaclink.href = "/orgs/" + link + ".html";
    }
}

/*
 * Unpack data and return
 * */
function unpack(rows, key) {
    return rows.map(function(row) {
        return row[key];
     });
}

/*
 * Unpack data and return
 * */
function unpack_del0(rows, key) {
    return rows.map(function(row) {
        if (row[key] > 0) {
            return row[key];
        }
     });
}

/*
 * Instead of justreturning the actual value, here, we exagerrate the value by
 * a certain factor, this is purely visual for the landing page plots.
 * */
function unpack_exag_size(rows, key, WG) {
    return rows.map(function(row) {
        var factor;
        if(WG == "irtf" || WG == "w3c") {
            factor = 10;
        } else {
             factor = 2;
        }
        return parseInt(row[key] * factor);
     });
}

/*
 * Return int in range
 * needed for color code generation
 * */

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/*
 * Order alphabetically by affiliation
 * Usage: myArray.sort( orderByAffiliation );
 * */
function orderByAffiliation( a, b ) {
    if ( a.affiliation < b.affiliation ) {
        return -1;
    }
    if ( a.affiliation > b.affiliation ) {
        return 1;
    }
    return 0;
}

/*
 * Return a color code for matched affiliations
 * or generate a random color code for unmatched ones
 * Format: hexadecimal with transparency value (90)
 * */
String.prototype.startsWith = function( str ){
    return ( this.indexOf( str ) === 0 );
};

function getColorCode(affiliation) {
    var hexcolor;
    //console.log("affiliation", affiliation);
    switch (true) {
        case affiliation.startsWith("Huawei"):
            hexcolor = "#702375ab"; // ART19 purple
        break;
        case affiliation.startsWith("Cloudflare"):
            hexcolor = "#3a186bab"; // purpledark
        break;
        case affiliation.startsWith("Fastly"):
            hexcolor = "#d62d2699"; // ART19 red
        break;
        case affiliation.startsWith("Akamai"):
            hexcolor = "#C200DB99"; // Electric purple
        break;
        case affiliation.startsWith("Apple"):
            hexcolor = "#FF00AA99"; // persian rose
        break;
        case affiliation.startsWith("Facebook"):
        case affiliation.startsWith("Meta"):
            hexcolor = "#691B3299"; // ART19 earth
        break;
        case affiliation.startsWith("Google"):
            hexcolor = "#ff2727ab"; // tomato
        break;
        case affiliation.startsWith("Brave"):
            hexcolor = "#cd93649a"; // chocoloate
        break;
        case affiliation.startsWith("Cisco"):
            hexcolor = "#c5a000aa"; // brownish
        break;
        case affiliation.startsWith("Microsoft"):
            hexcolor = "#00ffa299"; // brightgreen
        break;
        case affiliation.startsWith("Salesforce"):
            hexcolor = "#fcba03aa"; // goldyellow
        break;
        case affiliation.startsWith("Sinodun"):
        case affiliation.startsWith("sn3rd"):
            hexcolor = "#15d199aa"; // greenish
        break;
        case affiliation.startsWith("Orange"):
            hexcolor = "#ff910066"; // bright orange
        break;
        case affiliation.startsWith("Mozilla"):
            hexcolor = "#F6A8B899"; // cherry blossom pink
        break;
        case affiliation.startsWith("Ericsson"):
        case affiliation.startsWith("Nokia"):
            hexcolor = "#b9074899"; // ART19 raspberry
        break;
        case affiliation.startsWith("ARTICLE 19"):
            hexcolor = "#d400ffab"; // violet
        break;
        case affiliation.startsWith("CDT"):
        case affiliation.startsWith("Center for Democracy"):
            hexcolor = "#78811d99"; // mustard
        break;
        case affiliation.startsWith("IETF"):
            hexcolor = "#28775899"; // ART19 dark green
        break;
        case affiliation.startsWith("ICANN"):
            hexcolor = "#00947099"; // ART19 green
        break;
        case affiliation.startsWith("Internet Society"):
            hexcolor = "#00947099"; // ART19 green
        break;
        case affiliation.startsWith("World Wide Web Consortium"):
        case affiliation.startsWith("W3C"):
            hexcolor = "#f1a82799"; // ART19 yellow
        break;
        default:
            const colors = ["142864", "00acd8", "4F3FE0", "8cb9cd", "5BAAF8"]; // ART 19 blue, ART 19 lightblue, palatinate blue, not fluo cyan, argentinia blue
            const randomSelColor = Math.floor(Math.random() * colors.length);
            const transparency = getRandomArbitrary(16, 256).toString(16);
            hexcolor = "#" + colors[randomSelColor] + transparency;
    }
    //console.log("aff: " + affiliation + " hex: " + hexcolor);
    return hexcolor;
}
