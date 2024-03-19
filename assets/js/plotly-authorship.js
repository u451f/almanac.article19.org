import { getColorCode, plotlyConfig, unpack } from './helper-functions.js';

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

    var arr = Object.groupBy(rows, ({ affiliation }) => affiliation);
    //console.log(Object.keys(arr));
    Object.keys(arr).forEach(key => {
        let affiliation = unpack(arr[key], "affiliation");
        console.log(affiliation[0]);
        traces.push({
            type: "scatter",
            mode: 'markers',
            marker: {
                size: 10,
                // opacity: 0.6,
                color: getColorCode(affiliation[0])
            },
            name: key,
            text: unpack(arr[key], "affiliation"),
            x: unpack(arr[key], "submission_date"),
            y: unpack(arr[key], "title")
        });
    });
    //console.log("traces", traces);

    var data = traces;
    var layout = {
        title: {
            text: 'Who authored published standards in WG '+WG+'?',
            xref: 'container',
            x: 0
        },
        margin: {
            t: 35, r: 10, b: 45, l: 40
        },
        scattermode: 'group',
        scattergap: 0,
        xaxis: {
            title: 'Submission date',
            tickformat: '%Y'
        },
        yaxis: {
            //title: 'Standard',
            automargin: true
        },
        font: {
            family: "Roboto, sans-serif",
            size: 12,
            color: '#101820'
        }
    };

    Plotly.newPlot('plotlyAuthorship', data, layout, plotlyConfig);
})
