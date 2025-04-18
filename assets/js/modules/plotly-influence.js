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
            Plotly.purge("plotlyDInfluence");
            displayError("plotlyDInfluence");
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
                hoveron: "points",
                fillcolor: getColorCode(affiliation)
            })
        );
        //console.log(traces);

        let displayTitle;
        if(dashboard === true) {
            // Show long names in the plot title
            let wglongname = document.getElementById("wgname").textContent;
            if(wglongname === undefined) {
                wglongname = WG;
            }
            displayTitle = wglongname;
        } else {
            displayTitle = WG.toUpperCase();
        }


        var data = traces;
        var layout = {
            title: {
                text: "Amount of communication in "+displayTitle,
                xref: "container",
                x: 0,
                font:
                {
                    family: "Arial",
                    weight: "800",
                }
            },
            margin: {
                t: 35, r: 40, b: 45, l: 0
            },
            xaxis: {
                title: "year",
                tickformat: "%Y",
                ticks: 'outside',
                ticklen: 8,
                tickwidth: 1,
                tickcolor: '#fff'
            },
            yaxis: {
                automargin: true,
                title: "Emails sent",
                zerolinecolor: "#eee",
                tickformat: ".0f",
                ticks: 'outside',
                ticklen: 5,
                tickwidth: 1,
                tickcolor: '#eee'
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
