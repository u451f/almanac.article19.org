import { getColorCode, plotlyConfig, unpack } from "./helper-functions.js";

/*
 * Authorship
 * - Who co-authored standards in this WG?
 * - FIXME: Need to review the order of authors (alphabetical)
 * */

var file = "/assets/data/authorship/authorship_"+WG+".csv"

d3.csv(file, function(error, rows){
    // if the file cannot be loaded
    if (error) throw error;

    //console.log("Rows", rows);

    var traces = [];
    var hexcolor;
    var arr = Object.groupBy(rows, ({ affiliation }) => affiliation);

    // var affiliations = Object.keys(arr);

    // order the object by key
    const ordered = Object.keys(arr).sort().reduce(
        (obj, key) => {
            obj[key] = arr[key];
            return obj;
        },
        {}
    );

    for (const [key, value] of Object.entries(ordered)) {
        //console.log(key, value);
        console.log("color code for " +key, getColorCode(key));
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
    console.log("traces", traces);

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
        scattergap: 0,
        xaxis: {
            title: "Submission date",
            tickformat: "%Y"
        },
        yaxis: {
            //title: "Standard",
            automargin: true
        },
        font: {
            family: "Roboto, sans-serif",
            size: 12,
            color: "#101820"
        }
    };

    Plotly.newPlot("plotlyAuthorship", data, layout, plotlyConfig);
})
