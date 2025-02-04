/*
 * Influence
 * - Who wrote emails most to mailing lists associated with this WG?
 * - Ordered by year and affiliation (alphabetical)
 */

function loadInfluenceData(WG, redraw=false, is_small_screen=false, dashboard=true) {
    // Data CSV
    if(dashboard === true) {
        var file = "/assets/data/dashboard/influence/"+WG+".csv";
    } else {
        var file = "/assets/data/overview/influence/"+WG+".csv";
    }

    // Config for influence plot
    const plotlyConfigDI = {
        displaylogo: false,
        responsive: true,
        toImageButtonOptions: {
            format: "svg",
            filename: "almanac.article19.org-who-speaks-"+WG,
            scale: 1
        },
        modeBarButtonsToRemove: ["zoom2d", "pan2d","select2d","lasso2d", "resetScale2d"]
    };

    d3.csv(file, function(error, rows){
        // if the file cannot be loaded
        if (error) {
            Plotly.purge("plotlyDInfluence");
            displayError("plotlyDInfluence");
            return console.warn(error);
        }
        //console.log("Rows", rows);

        // files can be empty, when there is no available data
        if(rows.length < 1) {
            Plotly.purge("plotlyDAuthorship");
            displayError("plotlyDAuthorship");
            return console.warn("File is empty");
        }

        var headerNames = d3.keys(rows[0]);
        // remove Date as a header
        headerNames.shift();
        // case insensitive sorting
        headerNames.sort((a, b) => a.localeCompare(b, undefined, {sensitivity: "base"}));

        var traces = [];
        var hexcolor;
        headerNames.forEach((affiliation) => traces.push({
                type: "scatter",
                mode: "none",
                fill: "tozeroy",
                name: affiliation,
                x: unpack(rows, "Date"),
                y: unpack(rows, affiliation),
                hoveron: "points+fills",
                fillcolor: getColorCode(affiliation)
            })
        );
        //console.log(traces);

        var data = traces;
        var layout = {
            title: {
                text: "Amount of communication in "+WG,
                xref: "container",
                x: 0
            },
            margin: {
                t: 35, r: 40, b: 45, l: 40
            },
            xaxis: {
                title: "per year"
            },
            yaxis: {
                title: "Emails sent"
            },
            font: {
                family: "Roboto, sans-serif",
                size: 12,
                color: "#101820"
            },
            legend: {
                orientation: "v"
            }
        };

        if(is_small_screen) {
            layout.legend.orientation = "h";
            layout.legend.y = -0.75;
            layout.legend.entrywidth = 300;
            layout.margin.r = 5;
            layout.xaxis.fixedrange = true; // no zoom
            layout.yaxis.fixedrange = true;
        }

        // executed only once, bc this is a module
        Plotly.newPlot("plotlyDInfluence", data, layout, plotlyConfigDI);

        if(redraw === true) {
            Plotly.update("plotlyDInfluence", data);
        }
    })
}

export { loadInfluenceData }
