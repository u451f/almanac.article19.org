/*
 * Check if people have a small screen so we can adjust the plot layout
 * */

function isScreenSmall() {
    if (window.screen.width <= 1024) {
        return true;
    }
}

/*
 * Dashboard interface: headline
 * */
function cleanOptionText(WGtext) {
    return WGtext.replace('-- ','');
}

/*
 * Dashboard interface: load image, link, title
 */
function updateInterfaceElements(WG, WGtext) {
    // load corresponding image
    let wglogo = document.getElementById("wglogo");
    wglogo.src = "/assets/images/groups/" + WG + ".svg";

    // load corresponding link into top menu
    let almanaclink = document.getElementById("almanaclink");
    almanaclink.href = "/group/" + WG + ".html";

    // load corresponding name into the title
    let wgname = document.getElementById("wgname");
    wgname.textContent = WGtext;
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
        case affiliation.startsWith("Akamai"):
        case affiliation.startsWith("Cisco"):
            hexcolor = "#702375ab"; // ART19 purple
        break;
        case affiliation.startsWith("Cloudflare"):
            hexcolor = "#eb8a23ab"; // ART19 orange
        break;
        case affiliation.startsWith("Facebook"):
        case affiliation.startsWith("Meta"):
            hexcolor = "#691B3266"; // ART19 earth
        break;
        case affiliation.startsWith("Fastly"):
        case affiliation.startsWith("ICANN"):
            hexcolor = "#f1a827ab"; // ART19 yellow
        break;
        case affiliation.startsWith("Futurewei"):
        case affiliation.startsWith("Huawei"):
            hexcolor = "#B90748ab"; // ART19 raspberry
        break;
        case affiliation.startsWith("Google"):
            hexcolor = "#d62d26ab"; // ART19 red
        break;
        case affiliation.startsWith("CDT"):
        case affiliation.startsWith("Mozilla"):
            hexcolor = "#009470ab"; // ART19 green
        break;
        default:
            const colors = ["142864", "00acd8", "c8c8c8"]; // blue, lightblue, grey
            const randomSelColor = Math.floor(Math.random() * colors.length);
            const transparency = getRandomArbitrary(16, 256).toString(16);
            hexcolor = "#" + colors[randomSelColor] + transparency;
    }
    //console.log("aff: " + affiliation + " hex: " + hexcolor);
    return hexcolor;
}
