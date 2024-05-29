/*
 * Check if people have a small screen so we can adjust the plot layout
 * */

function isScreenSmall() {
    if (window.screen.width <= 1024) {
        return true;
    }
}

/*
 * FIXME: document this
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
 * Usage: array.sort( compare );
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
function getColorCode(affiliation) {
    var hexcolor;
    //console.log("affiliation", affiliation);
    switch (affiliation) {
        case "Akamai":
        case "akamai.com":
            hexcolor = "#702375ab"; // ART19 purple
        break;
        case "Cisco":
        case "cisco.com":
            hexcolor = "#691B32ab"; // ART19 earth
        break;
        case "Cloudflare":
        case "cloudflare.com":
            hexcolor = "#eb8a23ab"; // ART19 orange
        break;
        case "Facebook":
        case "Meta":
            hexcolor = "#691B3266"; // ART19 earth
        break;
        case "Fastly":
            hexcolor = "#f1a827ab"; // ART19 yellow
        break;
        case "Futurewei":
        case "Huawei":
        case "huawei.com":
            hexcolor = "#B90748ab"; // ART19 raspberry
        break;
        case "Google":
        case "google.com":
            hexcolor = "#d62d26ab"; // ART19 red
        break;
        default:
            const colors = ["009470", "142864", "00acd8", "101820", "c8c8c8"]; // green, blue, lightblue, black, grey
            const randomSelColor = Math.floor(Math.random() * colors.length);
            const transparency = getRandomArbitrary(16, 256).toString(16);
            hexcolor = "#" + colors[randomSelColor] + transparency;
    }
    //console.log("aff: " + affiliation + " hex: " + hexcolor);
    return hexcolor;
}

/*
 * Configure and simplify the plotly tool bar for each plot
 * */
const plotlyConfigA = {
    displaylogo: false,
    responsive: true,
    toImageButtonOptions: {
        format: "svg",
        filename: "almanac.article19.org-authorship-"+WG,
        scale: 1
    },
    modeBarButtonsToRemove: ["zoom2d", "pan2d","select2d","lasso2d", "resetScale2d"]
};
const plotlyConfigL = {
    displaylogo: false,
    responsive: true,
    toImageButtonOptions: {
        format: "svg",
        filename: "almanac.article19.org-leadership-"+WG,
        scale: 1
    },
    modeBarButtonsToRemove: ["zoom2d", "pan2d","select2d","lasso2d", "resetScale2d"]
};
const plotlyConfigI = {
    displaylogo: false,
    responsive: true,
    toImageButtonOptions: {
        format: "svg",
        filename: "almanac.article19.org-influence-"+WG,
        scale: 1
    },
    modeBarButtonsToRemove: ["zoom2d", "pan2d","select2d","lasso2d", "resetScale2d"]
};

export { getColorCode, isScreenSmall, orderByAffiliation, unpack, plotlyConfigA, plotlyConfigL, plotlyConfigI };
