import { getColorCode } from './get-color-code.js';

d3.csv("../data/influence/influence_detnet_wide.csv", function(err, rows){
    console.log("Rows", rows);

    var headerNames = d3.keys(rows[0]);
    headerNames.shift(); // remove Date as a header
    // headerNames.sort(); // order alphabetically
    console.log("headerNames", headerNames);

    function unpack(rows, key) {
        return rows.map(function(row) {
             return row[key];
         });
    }

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
            fillcolor: {
                color: getColorCode(actor)
            }
        })
    );
    console.log(traces);

    // assign data and draw the plot
    var data = traces;
    var layout = {
        title: 'Influence in WG detnet',
    };
    Plotly.newPlot('myDiv', data, layout);
})
