d3.csv("../data/authorship/authorship_detnet.csv", function(err, rows){
    console.log("Rows", rows);

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

    // that would not work in some browsers, so we should maybe do it differently
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy#browser_compatibilit<F12>y
    var arr = Object.groupBy(rows, ({ affiliation }) => affiliation);
    console.log(Object.keys(arr));
    Object.keys(arr).forEach(key => {
        //console.log(key); // key = title
        //console.log(arr[key]); // content
        traces.push({
            type: "scatter",
            mode: 'markers',
            marker: {
                size: 10,
                opacity: 0.6,
                color: getColorCode()
            },
            name: key,
            text: unpack(arr[key], "affiliation"),
            x: unpack(arr[key], "submission_date"),
            y: unpack(arr[key], "title")
        });
    });

    console.log("traces", traces);

    var data = traces;
    var layout = {
        title: 'Authorship in WG detnet',
        scattermode: 'group',
        xaxis: {
            title: 'Submission date',
            tickformat: '%Y'
        },
        yaxis: {title: 'Titles'},
        scattergap: 0,
    };

    Plotly.newPlot('myDiv', data, layout);
})
