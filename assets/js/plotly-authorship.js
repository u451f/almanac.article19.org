import { getColorCode, isScreenSmall, plotlyConfigDA, unpack } from "./guess-who-helper-functions.js";

/*
 * Authorship
 * - Who co-authored standards in this WG?
 * */

var file = "/assets/data/dashboard/authorship/"+WG+".csv";

if (isScreenSmall()) {
    var is_small_screen = true;
}

/*
 * Load authorship CSV file, treat data and call plotly
 * */
d3.csv(file, function(error, rows){
    // if the file cannot be loaded
    if (error) {
        throw error;
    }

    //console.log("Rows", rows);

    var traces = [];
    var hexcolor;
    var arrByAffiliation = Object.groupBy(rows, ({ affiliation }) => affiliation);

    // var affiliations = Object.keys(arrByAffiliation);

    // order the object by key
    const orderedByAffiliation = Object.keys(arrByAffiliation).sort().reduce(
        (obj, key) => {
            obj[key] = arrByAffiliation[key];
            return obj;
        },
        {}
    );

    for (const [key, value] of Object.entries(orderedByAffiliation)) {
        //console.log(key, value);
        //console.log("color code for " +key, getColorCode(key));
        traces.push({
            type: "scatter",
            mode: "markers",
            marker: {
                size: 10,
                // opacity: 0.9,
                color: getColorCode(key)
            },
            name: key,
            text: unpack(value, "affiliation"),
            x: unpack(value, "submission_date"),
            y: unpack(value, "title")
        });
    }
    //console.log("traces", traces);

    var data = traces;
    var layout = {
        title: {
            text: "Who authored published standards in WG "+WG+"?",
            xref: "container",
            x: 0
        },
        margin: {
            t: 35, r: 10, b: 45, l: 40
        },
        scattermode: "group",
        scattergap: 10,
        xaxis: {
            title: "Submission date",
            tickformat: "%b %Y"
        },
        yaxis: {
            title: "RFCs",
            automargin: true,
            showticklabels: false,
            showgrid: false
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
        layout.legend.y = -0.5;
        layout.margin.l = 0;
        layout.margin.r = 0;
        layout.legend.entrywidth = 300;
    }

    Plotly.newPlot("plotlyDAuthorship", data, layout, plotlyConfigDA);
})
