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
 * Dashboard interface: load image, link, title
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
        case affiliation.startsWith("Futurewei"):
        case affiliation.startsWith("Huawei"):
            hexcolor = "#702375ab"; // ART19 purple
        break;
        case affiliation.startsWith("Akamai"):
        case affiliation.startsWith("Cloudflare"):
        case affiliation.startsWith("Fastly"):
            hexcolor = "#eb8a2399"; // ART19 orange
        break;
        case affiliation.startsWith("Facebook"):
        case affiliation.startsWith("Meta"):
            hexcolor = "#691B3299"; // ART19 earth
        break;
        case affiliation.startsWith("CDT"):
        case affiliation.startsWith("ICANN"):
        case affiliation.startsWith("W3C"):
        case affiliation.startsWith("World Wide Web Consortium"):
            hexcolor = "#f1a82799"; // ART19 yellow
        break;
        case affiliation.startsWith("Google"):
            hexcolor = "#d62d2699"; // ART19 red
        break;
        case affiliation.startsWith("Cisco"):
        case affiliation.startsWith("Microsoft"):
        //case affiliation.startsWith("Mozilla"):
        case affiliation.startsWith("Orange"):
            hexcolor = "#b9074899"; // ART19 raspberry
        break;
        default:
            const colors = ["142864", "00acd8", "c8c8c8", "009470"]; // blue, lightblue, grey, green
            const randomSelColor = Math.floor(Math.random() * colors.length);
            const transparency = getRandomArbitrary(16, 256).toString(16);
            hexcolor = "#" + colors[randomSelColor] + transparency;
    }
    //console.log("aff: " + affiliation + " hex: " + hexcolor);
    return hexcolor;
}
