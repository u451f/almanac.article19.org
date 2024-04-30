/*
 * FIXME: document this
 * */
function unpack(rows, key) {
    return rows.map(function(row) {
         return row[key];
     });
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
        case "Akami": /* FIXME: typo in data */
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
            //hexcolor = "#" + Math.floor(Math.random() * 16777215).toString(16) + "90" // Use random hex value
            //const colors = ["d62d26", "eb8a23", "f1a827", "00940a", "00acd8", "142864", "702375", "b90748", "691b32"]; // main ART19 colors red, orange, yellow, green, lightblue, blue, purple, earth
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
 * FIXME: the filename should also contain "authorship", "leadership" or "influence"
 * */
const plotlyConfig = {
    displaylogo: false,
    responsive: true,
    toImageButtonOptions: {
        format: "svg",
        filename: "almanac.article19.org-"+WG,
        scale: 1
    },
    modeBarButtonsToRemove: ["zoom2d", "pan2d","select2d","lasso2d", "resetScale2d"]
};

export { getColorCode, unpack, plotlyConfig };
