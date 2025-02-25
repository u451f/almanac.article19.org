
function loadAuthorshipOverviewData(WG, redraw=false, is_small_screen=false) {
    // Data CSV
    var file = "/assets/data/overview/authorship/"+WG+".csv";

    // Config for overview → authorship plot
    const plotlyConfig = {
        displaylogo: false,
        responsive: true,
        toImageButtonOptions: {
            format: "svg",
            filename: "almanac.article19.org-who-publishes-"+WG,
            scale: 1
        },
        modeBarButtonsToRemove: ["zoom2d", "pan2d","select2d","lasso2d", "resetScale2d"]
    };

    d3.csv(file, function(error, rows){
        // if the file cannot be loaded
        if (error) {
            Plotly.purge("plotlyDAuthorship");
            displayError("plotlyDAuthorship");
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
                mode: "markers",
                marker: {
                    size: unpack_exag_size(rows, affiliation, WG),
                    color: getColorCode(affiliation)
                },
                name: affiliation,
                x: unpack(rows, "year"),
                y: unpack_del0(rows, affiliation),
                hoveron: "points+fills",
                fillcolor: getColorCode(affiliation)
            })
        );
        //console.log(traces);

        var data = traces;
        var layout = {
            title: {
                text: "Number of standards published in "+WG.toUpperCase(),
                xref: "container",
                x: 0
            },
            margin: {
                t: 35, r: 40, b: 45, l: 40
            },
            scattermode: "group",
            scattergap: 10,
            xaxis: {
                title: "year",
                //dtick: 2,
                tickformat: ".0f",
                ticks: 'outside',
                ticklen: 2,
                tickwidth: 1,
                tickcolor: '#fff'
            },
            yaxis: {
                title: "Request for Comments",
                zerolinecolor: '#eee',
                tickformat: '.0f',
                ticks: 'outside',
                ticklen: 1,
                tickwidth: 1,
                tickcolor: '#fff'
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
        Plotly.newPlot("plotlyDAuthorship", data, layout, plotlyConfig);

        if(redraw === true) {
            Plotly.update("plotlyDAuthorship", data);
        }
    })
}

export { loadAuthorshipOverviewData };
