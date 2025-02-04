
function loadLeadershipData(WG, redraw=false, is_small_screen=false, dashboard=true) {
    // Load CSV
    if(dashboard === true) {
        var file = "/assets/data/dashboard/leadership/"+WG+".csv";
    } else {
        var file = "/assets/data/overview/leadership/"+WG+".csv";
    }

    // Config for dashboard → leadership plot
    const plotlyConfig = {
        displaylogo: false,
        responsive: true,
        toImageButtonOptions: {
            format: "svg",
            filename: "almanac.article19.org-who-leads-"+WG,
            scale: 1
        },
        modeBarButtonsToRemove: ["zoom2d", "pan2d","select2d","lasso2d", "resetScale2d"]
    };

    d3.csv(file, function(error, rows) {
        if (error) {
            Plotly.purge("plotlyDLeadership");
            displayError("plotlyDLeadership");
            return console.warn(error);
        }

        // files can be empty, when there is no available data
        if(rows.length < 1) {
            Plotly.purge("plotlyDAuthorship");
            displayError("plotlyDAuthorship");
            return console.warn("File is empty");
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
                showgrid: false,
            },
            font: {
                family: "Roboto, sans-serif",
                size: 12,
                color: "#101820"
            },
            showlegend: false,
            legend: {
                orientation: "v"
            }
        };

        if(is_small_screen) {
            layout.yaxis.showticklabels = false;
            layout.showlegend = true;
            layout.legend.orientation = "h";
            layout.legend.y = -0.5;
            layout.legend.entrywidth = 300;
            layout.xaxis.fixedrange = true; // no zoom
            layout.yaxis.fixedrange = true;
        }

        // executed only once, bc this is a module
        Plotly.newPlot("plotlyDLeadership", data, layout, plotlyConfig);

        if(redraw === true) {
            Plotly.update("plotlyDLeadership", data);
        }
    })
}

export { loadLeadershipData }
