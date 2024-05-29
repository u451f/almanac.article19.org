import { getColorCode, isScreenSmall, plotlyConfigL, unpack } from "./helper-functions.js";

/*
 * Leadership
 * - Who has been chairing a WG?
 * - Ordered by default by start date (time_start)
 * */

var file = "/assets/data/leadership/"+WG+".csv";
if (isScreenSmall()) {
    var is_small_screen = true;
}

d3.csv(file, function(error, rows) {
    if (error) throw error; // if file cannot be loaded

    //console.log("Rows", rows);

    var traces = [];
    var hexcolor;

    for(var i = 0; i < rows.length; i++) {
        hexcolor = getColorCode(rows[i]["affiliation"]);

        var time_start, time_end;
        time_start = rows[i]["time_start"];
        time_end = rows[i]["time_end"];

        if(time_start != time_end) {
            traces.push({
                type: "scatter",
                mode: "lines",
                line: {
                    color: hexcolor,
                    width: 25
                },
                name: rows[i]["affiliation"],
                text: rows[i]["name"],
                x: [ time_start, time_end ],
                y: [ rows[i]["affiliation"], rows[i]["affiliation"] ],
            });
        }
    }
    //console.log("traces", traces);

    var data = traces;

    var layout = {
        scattermode: "group",
        title: {
            text: "Who chaired WG "+WG+"?",
            xref: "container",
            x: 0
        },
        margin: {
            t: 35, r: 0, b: 50, l: 40
        },
        xaxis: {
            title: "Chairing period",
        },
        yaxis: {
            automargin: true,
            //showticklabels: false,
            showgrid: false
        },
        font: {
            family: "Roboto, sans-serif",
            size: 12,
            color: "#101820"
        },
        showlegend: true,
    };
    if(is_small_screen) {
        layout.showlegend = false
    }

    Plotly.newPlot("plotlyLeadership", data, layout, plotlyConfigL);
})
