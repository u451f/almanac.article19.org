function loadAuthorshipData(WG, redraw=false, is_small_screen=false) {
    var file = "/assets/data/dashboard/authorship/"+WG+".csv";

    // Config → authorship plot
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

    d3.csv(file, function(error, rows) {
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

        var traces = [];
        var hexcolor;
        var arrByAffiliation = Object.groupBy(rows, ({ affiliation }) => affiliation);

        // var affiliations = Object.keys(arrByAffiliation);

        // order the object by key
        const orderedByAffiliation = Object.keys(arrByAffiliation).sort().reduce(
            (obj, key) => {
                obj[key] = arrByAffiliation[key];
                return obj;
            },
            {}
        );

        for (const [key, value] of Object.entries(orderedByAffiliation)) {
            //console.log(key, value);
            //console.log("color code for " +key, getColorCode(key));
            traces.push({
                type: "scatter",
                mode: "markers",
                marker: {
                    size: 10,
                    opacity: 0.9,
                    color: getColorCode(key)
                },
                name: key,
                text: unpack(value, "affiliation"),
                x: unpack(value, "submission_date"),
                y: unpack(value, "title")
            });
        }
        //console.log("traces", traces);

        // Show long names in the plot title
        let wglongname = document.getElementById("wgname").textContent;
        if(wglongname === undefined) {
            wglongname = WG;
        }

        var data = traces;
        var layout = {
            title: {
                text: "Number of standards published in "+wglongname,
                xref: "container",
                x: 0,
                font:
                {
                    family: "Arial",
                    weight: "800"
                }
            },
            margin: {
                t: 35, r: 10, b: 45, l: 15
            },
            scattermode: "group",
            scattergap: 10,
            xaxis: {
                title: "Submission date",
                tickformat: "%b %Y",
            },
            yaxis: {
                title: "Request for Comments",
                automargin: true,
                showticklabels: false,
                showgrid: false
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
            layout.legend.y = -0.5;
            layout.margin.l = 0;
            layout.margin.r = 0;
            layout.legend.entrywidth = 300;
            layout.xaxis.fixedrange = true; // no zoom
            layout.yaxis.fixedrange = true;
        }

        // executed only once, bc this is a module
        Plotly.newPlot("plotlyDAuthorship", data, layout, plotlyConfig);

        if(redraw === true) {
            Plotly.update("plotlyDAuthorship", data);
        }
    });

}

export { loadAuthorshipData };
