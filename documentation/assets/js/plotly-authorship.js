var file = "../data/authorship/authorship_detnet.csv"

import { getColorCode, unpack } from './helper-functions.js';

d3.csv(file, function(err, rows){
    //console.log("Rows", rows);

    var traces = [];

    // that would not work in some browsers, so we should maybe do it differently
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy#browser_compatibilit<F12>y
    var arr = Object.groupBy(rows, ({ affiliation }) => affiliation);
    console.log(Object.keys(arr));
    Object.keys(arr).forEach(key => {
        //console.log(key); // key = title
        //console.log(arr[key]); // content
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

    console.log("traces", traces);

    var data = traces;
    var layout = {
        title: 'Authorship',
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

    Plotly.newPlot('myDiv', data, layout);
})
