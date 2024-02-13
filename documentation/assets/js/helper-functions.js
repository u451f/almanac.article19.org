function unpack(rows, key) {
    return rows.map(function(row) {
         return row[key];
     });
}

function isNullOrUndefined(value) {
  return value === undefined || value === null;
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
        case 'Google':
            hexcolor = "#ffcc0090";
        break;
        case 'mit.edu':
            hexcolor = "#ffcc0090";
        break;
        case 'Huawei':
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

export { unpack, isNullOrUndefined, getColorCode };
