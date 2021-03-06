$(function() {
    var seriesOptions = [],
        yAxisOptions = [],
        seriesCounter = 0,
        names = ['MSFT', 'AAPL', 'GOOG'],
        colors = Highcharts.getOptions().colors;

    $.each(names, function(i, name) {

        $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename='+ name.toLowerCase() +'-c.json&callback=?',    function(data) {

            seriesOptions[i] = {
                name: name,
                data: data
            };

            // As we're loading the data asynchronously, we don't know what order it will arrive. So
            // we keep a counter and create the chart when all the data is loaded.
            seriesCounter++;

            if (seriesCounter == names.length) {
                createChart();
            }
        });
    });



    // create the chart when all data is loaded
    function createChart() {

        $('#container').highcharts('StockChart', {

            rangeSelector: {
                selected: 4
            },

            yAxis: {
                labels: {
                    formatter: function() {
                        return (this.value > 0 ? '+' : '') + this.value;
                    }
                }
            },
            
            plotOptions: {
                series: {
                    compare: 'value'
                }
            },
            
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y} USD</b> ({point.change} USD)<br/>',
                changeDecimals: 2,
                valueDecimals: 2
            },
            
            series: seriesOptions
        });
    }

});