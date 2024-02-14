var WG = "dnsop"
var file = "../data/authorship/authorship_"+WG+".csv"

import { getColorCode, unpack } from './helper-functions.js';

d3.csv(file, function(err, rows){
    //console.log("Rows", rows);

    var traces = [];

    var arr = Object.groupBy(rows, ({ affiliation }) => affiliation);
    //console.log(Object.keys(arr));
    Object.keys(arr).forEach(key => {
        let affiliation = unpack(arr[key], "affiliation");
        traces.push({
            type: "scatter",
            mode: 'markers',
            marker: {
                size: 10,
                opacity: 0.6,
                color: getColorCode(affiliation)
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
            text: 'Who authored published standards in this WG?',
            xref: 'container',
            x: 0
        },
        scattermode: 'group',
        xaxis: {
            title: 'Submission date',
            tickformat: '%Y'
        },
        yaxis: {
            //title: 'Standard',
            automargin: true
        },
        scattergap: 0,
        font: {
            family: "Roboto, sans-serif",
            size: 12,
            color: '#101820'
        }
    };

    Plotly.newPlot('plotlyAuthorship', data, layout, {responsive: true});
})
