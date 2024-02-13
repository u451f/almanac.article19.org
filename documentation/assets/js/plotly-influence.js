var file = "../data/influence/influence_detnet_wide.csv";

import { getColorCode, unpack } from './helper-functions.js';

d3.csv(file, function(err, rows){
    console.log("Rows", rows);

    var headerNames = d3.keys(rows[0]);
    headerNames.shift(); // remove Date as a header
    // headerNames.sort(); // order alphabetically
    console.log("headerNames", headerNames);

    var traces = [];
    var hexcolor;
    headerNames.forEach((actor) => traces.push({
            type: "scatter",
            mode: "none",
            fill: 'tozeroy',
            name: actor,
            x: unpack(rows, 'Date'),
            y: unpack(rows, actor),
            hoveron: 'points+fills',
            fillcolor: getColorCode(actor)
        })
    );
    console.log(traces);

    // assign data and draw the plot
    var data = traces;
    var layout = {
        title: 'Influence',
        xaxis: {
            title: 'per year'
        },
        yaxis: {
            title: 'Emails sent'
        },
        font: {
            family: "Roboto, sans-serif",
            size: 12,
            color: '#101820'
        }
    };
    Plotly.newPlot('myDiv', data, layout);
})
