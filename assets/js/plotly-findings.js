var file = "/assets/data/findings/test.csv";

d3.csv(file, function (err, data) {
    // if the file cannot be loaded
    if (err) {
        throw err;
    }
    //console.log("data", data);
    // Create a lookup table to sort and regroup the columns of data,
    // first by year, then by wg:
    var lookup = {};
    function getData(year, wg) {
        var byYear, trace;
        if (!(byYear = lookup[year])) {;
            byYear = lookup[year] = {};
        }
        // If a container for this year + wg doesn't exist yet,
        // then create one:
        if (!(trace = byYear[wg])) {
            trace = byYear[wg] = {
                x: [],
                y: [],
                id: [],
                text: [],
                marker: {size: []}
            };
        }
        return trace;
    }

    // FIXME: Use our colors
    // Go through each row, get the right trace, and append the data:
    for (var i = 0; i < data.length; i++) {
        var datum = data[i];
        var trace = getData(datum.year, datum.affiliation);
        trace.text.push(datum.nb_contributions);
        trace.id.push(datum.wg);
        trace.x.push(datum.wg);
        trace.y.push(datum.affiliation);
        trace.marker.size.push(datum.nb_contributions);
    }


    // Get the group names:
    var years = Object.keys(lookup);
    // In this case, every year includes every wg, so we
    // can just infer the wgs from the *first* year:
    // FIXME: this might not be true
    var firstYear = lookup[years[0]];
    var wgs = Object.keys(firstYear);
    console.log(wgs);

    // Create the main traces, one for each wg:
    var traces = [];
    for (i = 0; i < wgs.length; i++) {
        var data = firstYear[wgs[i]];
        // One small note. We're creating a single trace here, to which
        // the frames will pass data for the different years. It's
        // subtle, but to avoid data reference problems, we'll slice
        // the arrays to ensure we never write any new data into our
        // lookup table:
        traces.push({
            name: wgs[i],
            x: data.x.slice(),
            y: data.y.slice(),
            id: data.id.slice(),
            text: data.text.slice(),
            mode: 'markers',
            marker: {
                size: data.marker.size.slice()
            }
        });
    }
    //console.log(traces);

    // Create a frame for each year. Frames are effectively just
    // traces, except they don't need to contain the *full* trace
    // definition (for example, appearance). The frames just need
    // the parts the traces that change (here, the data).
    //
    // FIXME: if I miss some data here, then my bubbles move onto a wrong y
    // while if the data here is 0 then the frames are correct.
    var frames = [];
    for (i = 0; i < years.length; i++) {
        frames.push({
            name: years[i],
            data: wgs.map(function (wg) {
                return getData(years[i], wg);
            })
        })
    }
    console.log(frames);

    // Now create slider steps, one for each frame. The slider
    // executes a plotly.js API command (here, Plotly.animate).
    // In this example, we'll animate to one of the named frames
    // created in the above loop.
    var sliderSteps = [];
    for (i = 0; i < years.length; i++) {
        sliderSteps.push({
            method: 'animate',
            label: years[i],
            args: [[years[i]], {
                mode: 'immediate',
                transition: {duration: 300},
                frame: {duration: 300, redraw: false},
            }]
        });
    }

    var layout = {
        /*
        xaxis: {
            title: 'WG',
        },
        yaxis: {
            title: 'Affiliation'
        },
        hovermode: 'closest',
        */
        // We'll use updatemenus (whose functionality includes menus as
        // well as buttons) to create a play button and a pause button.
        // The play button works by passing `null`, which indicates that
        // Plotly should animate all frames. The pause button works by
        // passing `[null]`, which indicates we'd like to interrupt any
        // currently running animations with a new list of frames. Here
        // The new list of frames is empty, so it halts the animation.
        updatemenus: [{
            x: 0,
            y: 0,
            yanchor: 'top',
            xanchor: 'left',
            showactive: false,
            direction: 'left',
            type: 'buttons',
            pad: {t: 87, r: 10},
            buttons: [{
                method: 'animate',
                args: [null, {
                    mode: 'immediate',
                    fromcurrent: true,
                    transition: {duration: 100},
                    frame: {duration: 1000, redraw: false}
                }],
                label: 'Play'
            }, {
                method: 'animate',
                args: [[null], {
                    mode: 'immediate',
                    transition: {duration: 0},
                    frame: {duration: 0, redraw: false}
                }],
                label: 'Pause'
            }]
        }],
        // Finally, add the slider and use `pad` to position it
        // nicely next to the buttons.
        sliders: [{
            pad: {
                l: 130,
                t: 55
            },
            currentvalue: {
                visible: true,
                prefix: 'Year: ',
                xanchor: 'right',
                font: {size: 12}
            },
            steps: sliderSteps
        }]
    };

    // Create the plot:
    Plotly.newPlot('plotlyFindings', {
        data: traces,
        layout: layout,
        config: {
            showSendToCloud: true
        },
        frames: frames,
    });
});
