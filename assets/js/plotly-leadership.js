import { getColorCode, isScreenSmall, orderByAffiliation, plotlyConfigDL, unpack } from "./guess-who-helper-functions.js";

/*
 * Leadership
 * - Who has been chairing a WG?
 * - Ordered by default by start date (time_start)
 * */

var file = "/assets/data/dashboard/leadership/"+WG+".csv";
if (isScreenSmall()) {
    var is_small_screen = true;
}

d3.csv(file, function(error, rows) {
    if (error) {
        throw error;
    }

    rows.sort(orderByAffiliation);
    //console.log("Rows", rows);

    var traces = [];
    var affiliation, hexcolor, person, time_start, time_end, wgname;

    for(var i = 0; i < rows.length; i++) {
        affiliation = rows[i]["affiliation"];
        person = rows[i]["name"];
        time_start = rows[i]["time_start"];
        time_end = rows[i]["time_end"];
        wgname = (rows[i]["wg"] !== undefined) ? rows[i]["wg"] : WG;
        hexcolor = getColorCode(affiliation);

        if(time_start != time_end) { // for esthetical reasons: but there's a bug somewhere in the data if that happens
            traces.push({
                type: "scatter",
                mode: "lines",
                line: {
                    color: hexcolor,
                    width: 25
                },
                name: affiliation,
                text: wgname + "/" + person,
                x: [ time_start, time_end ],
                y: [ affiliation, affiliation ],
            });
        }
    }
    //console.log("traces", traces);

    var data = traces;

    var layout = {
        scattermode: "group",
        title: {
            text: "Chairing periods: "+WG,
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
            autorange: "reversed",
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

    Plotly.newPlot("plotlyDLeadership", data, layout, plotlyConfigDL);
})
