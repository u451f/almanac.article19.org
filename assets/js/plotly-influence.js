import { getColorCode, isScreenSmall, plotlyConfigDI, unpack } from "./guess-who-helper-functions.js";

/*
 * Influence
 * - Who wrote emails most to mailing lists associated with this WG?
 * - Ordered by year and affiliation (alphabetical)
 */

if(REALM != "undefined" && REALM == "overview") {
    var file = "/assets/data/overview/influence/"+WG+".csv";
} else {
    var file = "/assets/data/dashboard/influence/"+WG+".csv";
}

if (isScreenSmall()) {
    var is_small_screen = true;
}

d3.csv(file, function(error, rows){
    // if the file cannot be loaded
    if (error) {
        throw error;
    }

    //console.log("Rows", rows);

    var headerNames = d3.keys(rows[0]);
    // remove Date as a header
    headerNames.shift();
    // case insensitive sorting
    headerNames.sort((a, b) => a.localeCompare(b, undefined, {sensitivity: "base"}));

    var traces = [];
    var hexcolor;
    headerNames.forEach((affiliation) => traces.push({
            type: "scatter",
            mode: "none",
            fill: "tozeroy",
            name: affiliation,
            x: unpack(rows, "Date"),
            y: unpack(rows, affiliation),
            hoveron: "points+fills",
            fillcolor: getColorCode(affiliation)
        })
    );
    //console.log(traces);

    var data = traces;
    var layout = {
        title: {
            text: "Who sent most emails to "+WG+"?",
            xref: "container",
            x: 0
        },
        margin: {
            t: 35, r: 40, b: 45, l: 40
        },
        xaxis: {
            title: "per year"
        },
        yaxis: {
            title: "Emails sent"
        },
        font: {
            family: "Roboto, sans-serif",
            size: 12,
            color: "#101820"
        },
        legend: {
            orientation: "v"
        }
    };
    if(is_small_screen) {
        layout.legend.orientation = "h";
        layout.legend.y = -0.75;
        layout.margin.r = 5;
    }
    Plotly.newPlot("plotlyDInfluence", data, layout, plotlyConfigDI);
})
