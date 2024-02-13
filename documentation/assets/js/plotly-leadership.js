var path = "../data/leadership/";
var file = path + "leadership_dnsop.csv";

import { getColorCode, unpack } from './helper-functions.js';

d3.csv(file, function(err, rows){
    // console.log("Rows", rows);

    var traces = [];
    var hexcolor;

    // TODO: test on some other files and if needed
    // do some kind of grouping of affiliations first

    for(var i = 0; i < rows.length; i++) {
        hexcolor = getColorCode(rows[i]['affiliation']);
        /* This bit should probably be done when creating the CSV*/
        var datetime_min, datetime_max;
        if(!rows[i]['datetime_min']) {
            datetime_min = "2007-01-01 00:00:00+00:00";
        } else {
            datetime_min = rows[i]['datetime_min'];
        }
        if(!rows[i]['datetime_max']) {
            datetime_max = "2024-01-01 00:00:00+00:00";
        } else {
            datetime_max = rows[i]['datetime_max'];
        }

        if(datetime_min != datetime_max) { // should I be doing this or is this a pre-cleanup?
            traces.push({
                type: "scatter",
                mode: 'lines+markers',
                line: {
                    color: hexcolor,
                    width: 25
                },
                name: rows[i]['affiliation'],
                text: rows[i]['name'],
                x: [ datetime_min, datetime_max ],
                y: [ rows[i]['affiliation'], rows[i]['affiliation'] ],
            });
        }
    }
    //console.log("traces", traces);

    var data = traces;

    if(window.width < 800) {
        console.log("small screen");
    }
        var layout = {
            title: {
                text: 'Who chaired this WG?',
                xref: 'container',
                x: 0
            },
            showlegend: false,
            xaxis: {
                title: 'Chairing period',
                tickformat: '%Y'
            },
            yaxis: {
                automargin: true,
                //showticklabels: false,
                showgrid: false
            },
            font: {
                family: "Roboto, sans-serif",
                size: 12,
                color: '#101820'
            }
        };

    Plotly.newPlot('plotlyLeadership', data, layout, {responsive: true});
})
