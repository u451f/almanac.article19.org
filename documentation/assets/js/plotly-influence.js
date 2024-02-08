d3.csv("../data/influence/influence_detnet_wide.csv", function(err, rows){
    console.log("Rows", rows);

    var headerNames = d3.keys(rows[0]);
    headerNames.shift(); // remove Date as a header
    //headerNames.sort().reverse(); // order alphabetically
    console.log("headerNames", headerNames);

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
    var hexcolor = getColorCode();
    headerNames.forEach((actor) => traces.push({
            type: "scatter",
            //mode: "lines",
            mode: "none",
            fill: 'tozeroy',
            name: actor,
            x: unpack(rows, 'Date'),
            y: unpack(rows, actor),
            hoveron: 'points+fills',
            //line: {color: '#' + Math.floor(Math.random() * 16777215).toString(16)}
            fillcolor: {color: hexcolor}
        })
    );
    console.log(traces);
/*
    var trace1 = {
        type: "scatter",
        mode: "lines",
        name: 'cisco.com',
        x: unpack(rows, 'Date'),
        y: unpack(rows, 'cisco.com'),
        line: {color: '#17BECF'}
    }

    var trace2 = {
        type: "scatter",
        mode: "lines",
        name: 'huawei.com',
        x: unpack(rows, 'Date'),
        y: unpack(rows, 'huawei.com'),
        line: {color: '#7F7F7F'}
    }

    var data = [trace1,trace2];
*/
    var data = traces;

    var layout = {
        title: 'Influence in WG detnet',
    };

    Plotly.newPlot('myDiv', data, layout);
})
