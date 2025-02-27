function loadLeadershipData(WG, redraw=false, is_small_screen=false) {
    var file = "/assets/data/overview/leadership/"+WG+".csv";

    // Config for Leadership plot
    const plotlyConfigDI = {
        displaylogo: false,
        responsive: true,
        toImageButtonOptions: {
            format: "svg",
            filename: "almanac.article19.org-who-leads-"+WG,
            scale: 1
        },
        modeBarButtonsToRemove: ["zoom2d", "pan2d","select2d","lasso2d", "resetScale2d"]
    };

    d3.csv(file, function(error, rows){
        // if the file cannot be loaded
        if (error) {
            Plotly.purge("plotlyOLeadership.js");
            displayError("plotlyOLeadership.js");
            return console.warn(error);
        }
        //console.log("Rows", rows);

        // files can be empty, when there is no available data
        if(rows.length < 1) {
            Plotly.purge("plotlyOLeadership");
            displayError("plotlyOLeadership");
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
                type: "bar",
                name: affiliation,
                x: unpack(rows, "Date"),
                y: unpack(rows, affiliation),
                marker: {
                    color: getColorCode(affiliation),
                    //opacity: 0.5
                },
            })
        );
        //console.log(traces);

        var data = traces;
        var layout = {
            //barmode: "overlay",
            barmode: "group",
            scattergap: 1,
            title: {
                text: "Number of working groups chaired in "+WG.toUpperCase(),
                xref: "container",
                x: 0
            },
            titlefont: {
                weight: "bold",
            },
            margin: {
                t: 35, r: 40, b: 45, l: 15
            },
            xaxis: {
                title: "year",
                tickformat: "%Y",
                ticks: 'outside',
                ticklen: 2,
                tickwidth: 1,
                tickcolor: '#fff'
            },
            yaxis: {
                title: "Number of chaired WGs",
                tickformat: ".0f",
                dtick: "1",
                ticks: 'outside',
                ticklen: 1,
                tickwidth: 1,
                tickcolor: '#fff',
                zerolinecolor: "#eee",
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
        Plotly.newPlot("plotlyOLeadership", data, layout, plotlyConfigDI);

        if(redraw === true) {
            Plotly.update("plotlyOLeadership", data);
        }
    })
}

export { loadLeadershipData }
