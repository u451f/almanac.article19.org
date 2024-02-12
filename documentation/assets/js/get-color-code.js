/*
 * Return a color code for matched affiliations
 * or generate a random color code for unmatched ones
 * Format: hexadecimal with transparency value (90)
 * */
function getColorCode(affiliation) {
    var hexcolor;
    switch (affiliation) {
        case 'Google':
            hexcolor = "#ffcc0090";
        break;
        case 'mit.edu':
            hexcolor = "#ffcc0090";
        break;
        case 'cisco.com':
            hexcolor = "#ffcc0090";
        break;
        case 'DENIC':
            hexcolor = "#ffcc0090";
        break;
        default:
            hexcolor = '#' + Math.floor(Math.random() * 16777215).toString(16) + "90"
    }
    return hexcolor;
}

export { getColorCode };

