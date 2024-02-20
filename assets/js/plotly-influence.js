import { getColorCode, unpack } from './helper-functions.js';

var file = "/assets/data/influence/influence_"+WG+".csv";

d3.csv(file, function(error, rows){
    // if the file cannot be loaded
    if (error) throw error;

    //console.log("Rows", rows);

    var headerNames = d3.keys(rows[0]);
    headerNames.shift(); // remove Date as a header
    headerNames.sort(); // order alphabetically

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
    //console.log(traces);

    var data = traces;
    var layout = {
        title: {
            text: 'Who sent most emails to WG '+WG+'?',
            xref: 'container',
            x: 0
        },
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
    Plotly.newPlot('plotlyInfluence', data, layout, {responsive: true});
})