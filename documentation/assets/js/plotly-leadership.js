import { getColorCode } from './get-color-code.js';

d3.csv("../data/leadership/leadership_dnsop.csv", function(err, rows){
    // console.log("Rows", rows);

    function unpack(rows, key) {
        return rows.map(function(row) {
             return row[key];
         });
    }

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
                mode: 'lines',
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

    console.log("traces", traces);

    var data = traces;

    var layout = {
        title: 'WG Leadership',
        xaxis: {
            title: 'Chairing period',
            tickformat: '%Y'
        },
        yaxis: {
            automargin: true,
            visible: false,
            showgrid: false
        }
    };

    Plotly.newPlot('myDiv', data, layout);
})
