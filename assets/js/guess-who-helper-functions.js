/*
 * Check if people have a small screen so we can adjust the plot layout
 * */

function isScreenSmall() {
    if (window.screen.width <= 1024) {
        return true;
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
 * Unpack data and return a string limited to 70 chars
 * Useful for very long titles on the y-axis
 * */
function unpackShorten(rows, key) {
    return rows.map(function(row) {
        if(row[key].length > 70) {
            return row[key].substring(0, 70) + "…";
        } else {
            return row[key];
        }
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
function getColorCode(affiliation) {
    var hexcolor;
    //console.log("affiliation", affiliation);
    switch (affiliation) {
        case "Akamai":
            hexcolor = "#702375ab"; // ART19 purple
        break;
        case "Cisco":
            hexcolor = "#691B32ab"; // ART19 earth
        break;
        case "Cloudflare":
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
            hexcolor = "#B90748ab"; // ART19 raspberry
        break;
        case "Google":
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

// Config for dashboard → authorship plot
const plotlyConfigDA = {
    displaylogo: false,
    responsive: true,
    toImageButtonOptions: {
        format: "svg",
        filename: "almanac.article19.org-authorship-"+WG,
        scale: 1
    },
    displayModeBar: true,
    modeBarButtonsToRemove: ["zoom2d", "pan2d","select2d","lasso2d", "resetScale2d"]
};

// Config for dashboard → influence plot
const plotlyConfigDI = {
    displaylogo: false,
    responsive: true,
    toImageButtonOptions: {
        format: "svg",
        filename: "almanac.article19.org-influence-"+WG,
        scale: 1
    },
    displayModeBar: true,
    modeBarButtonsToRemove: ["zoom2d", "pan2d","select2d","lasso2d", "resetScale2d"]
};

// Config for dashboard → leadership plot
const plotlyConfigDL = {
    displaylogo: false,
    responsive: true,
    toImageButtonOptions: {
        format: "svg",
        filename: "almanac.article19.org-leadership-"+WG,
        scale: 1
    },
    displayModeBar: true,
    modeBarButtonsToRemove: ["zoom2d", "pan2d","select2d","lasso2d", "resetScale2d"]
};

// Config for overview → authorship plot
const plotlyConfigOA = {
    displaylogo: false,
    responsive: true,
    toImageButtonOptions: {
        format: "svg",
        filename: "almanac.article19.org-authorship-ov-"+WG,
        scale: 1
    },
    displayModeBar: true,
    modeBarButtonsToRemove: ["zoom2d", "pan2d","select2d","lasso2d", "resetScale2d"]
};

export { getColorCode, isScreenSmall, orderByAffiliation, unpack, unpackShorten, plotlyConfigDA, plotlyConfigDI, plotlyConfigDL, plotlyConfigOA };
