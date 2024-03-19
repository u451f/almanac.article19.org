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
    console.log("affiliation", affiliation);
    switch (affiliation) {
        case 'Akamai':
        case 'Akami': /* FIXME: typo in data */
        case 'akamai.com':
            hexcolor = "#00947066"; // ART19 green more transparent
        break;
        case 'Cisco':
        case 'cisco.com':
            hexcolor = "#722376ab"; // ART19 purple
        break;
        case 'Cloudflare':
        case 'cloudflare.com':
            hexcolor = "#72237666"; // ART19 purple more transparent
        break;
        case 'Facebook':
        case 'Meta':
            hexcolor = "#f8ab02ab"; // ART19 yellow
        break;
        case 'Fastly':
            hexcolor = "#bb0748ab"; // ART19 red
        break;
        case 'Futurewei':
        case 'Huawei':
        case 'huawei.com':
            hexcolor = "#009470ab"; // ART19 green
        break;
        case 'Google':
        case 'google.com':
            hexcolor = "#bb0748ab"; // ART19 red
        break;
        default:
            //hexcolor = '#' + Math.floor(Math.random() * 16777215).toString(16) + "90" // Use random hex value
            const colors = ["bb0748", "009470", "f8ab02", "722376", "000000"]; // main ART19 colors red, green, yellow, purple
            const randomSelColor = Math.floor(Math.random() * colors.length);
            const transparency = Math.floor(Math.random() * 256).toString(16);
            hexcolor = '#' + colors[randomSelColor] + transparency;
    }
    console.log("aff: " + affiliation + " hex: " + hexcolor);
    return hexcolor;
}

const plotlyConfig = {
    displaylogo: false,
    responsive: true,
    toImageButtonOptions: {
        format: 'svg',
        filename: 'almanac.article19.org-authorship'+WG,
        scale: 1
    },
    modeBarButtonsToRemove: ['zoom2d', 'pan2d','select2d','lasso2d', 'resetScale2d']
};

export { getColorCode, unpack, plotlyConfig };
