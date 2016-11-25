var charts = [{
    name: ROLE_COUNT,
    columns: ["timestamp", "msgCount","SubType"],
    schema: [{
        "metadata": {
            "names": ["TIME", "COUNT","SubType"],
            "types": ["time", "ordinal","ordinal"]
        },
        "data": []
    }],
    chartConfig: {
        x: "TIME",
        charts: [{ type: "line", y: "COUNT",color: "SubType"}],
        padding: { "top": 30, "left": 60, "bottom": 60, "right": 90 },
        range: true,
        rangeColor: COLOR_BLUE,
        colorScale: [COLOR_BLUE,COLOR_RED,COLOR_GREEN,COLOR_CYAN,COLOR_OLIVE,COLOR_VIOLET,COLOR_ORANGE,COLOR_CRIMSON]
    },
    types: [
        { name: TYPE_LANDING, type: 1 }
    ],
    processData: function(data) {
       //console.log(data);
        var result = [];
        var schema = this.schema;
        var columns = this.columns;
        data.forEach(function(row, i) {
            var record = [];
            columns.forEach(function(column) {
                var value = row[column];
                record.push(value);
            });
            result.push(record);

        });
            //  console.log(result);
        return result;
    }

},{
    name: ROLE_ALLCOUNT,
    columns: ["timestamp", "msgCount"],
    schema: [{
        "metadata": {
            "names": ["TIME", "COUNT"],
            "types": ["time", "ordinal"]
        },
        "data": []
    }],
    chartConfig: {
        x: "TIME",
        charts: [{ type: "line", y: "COUNT"}],
        padding: { "top": 30, "left": 60, "bottom": 60, "right": 30 },
        range: true,
        rangeColor: COLOR_BLUE,
        colorScale: [COLOR_BLUE]
    },
    types: [
        { name: TYPE_LANDING, type: 1 }
    ],
    processData: function(data) {
       //console.log(data);
        var result = [];
        var schema = this.schema;
        var columns = this.columns;
        data.forEach(function(row, i) {
            var record = [];
            columns.forEach(function(column) {
                var value = row[column];
                record.push(value);
            });
            result.push(record);

        });
            //  console.log(result);
        return result;
    }

}
];
