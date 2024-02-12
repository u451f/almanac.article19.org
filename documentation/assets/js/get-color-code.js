/*
 * Return a color code for matched affiliations
 * or generate a random color code for unmatched ones
 *
 * */
function getColorCode(affiliation) {
    var hexcolor;
    switch (affiliation) {
        case 'Google':
            hexcolor = "#ffcc00";
        break;
        case 'cisco.com':
            hexcolor = "#ffcc00";
        break;
        case 'DENIC':
            hexcolor = "#ffcc00";
        break;
        default:
            hexcolor = '#' + Math.floor(Math.random() * 16777215).toString(16)
    }
    return hexcolor;
}

export { getColorCode };

