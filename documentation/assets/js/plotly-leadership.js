//https://codepen.io/u451f/pen/vYPzWQY example data
d3.csv("../data/leadership/leadership_dnsop_test.csv", function(err, rows){
    // console.log("Rows", rows);

    function unpack(rows, key) {
        return rows.map(function(row) {
             return row[key];
         });
    }

    function getColorCode() {
        // future plan: give some big actors always the same color.
        var hexcolor = '#' + Math.floor(Math.random() * 16777215).toString(16)
        return hexcolor;
    }

    var traces = [];
    var hexcolor;
    // TODO: do some kind of grouping of affiliations first
    for(var i = 0; i < rows.length; i++) {
        hexcolor = getColorCode();
        traces.push({
            type: "scatter",
            mode: 'lines',
            line: {
                color: hexcolor,
                width: 25
            },
            name: rows[i]['affiliation'],
            text: rows[i]['name'],
            x: [ rows[i]['datetime_min'], rows[i]['datetime_max'] ],
            y: [ rows[i]['affiliation'], rows[i]['affiliation'] ],
        });
    }

    console.log("traces", traces);

    var data = traces;

    var layout = {
        title: 'WG Leadership / chairs',
        xaxis: {
            title: 'Chairing period',
            //tickformat: '%Y'
        },
    };

    Plotly.newPlot('myDiv', data, layout);
})
