const showHistoricalData = (data, prop) => {

    var values = [];

    if (prop === 'active') {

        document.getElementById('chart-title').innerHTML = '<span style="color: #E63946;">Active Cases</span>';

        let histoCases = [];
        var lastDataPoint;
        for (let date in data.cases) {
            if (lastDataPoint) {
                let newDataPoint = {
                    x: date,
                    y: data.cases[date] - lastDataPoint
                }
                histoCases.push(newDataPoint);
            }
            lastDataPoint = data.cases[date]
        }

        values = {datasets: [
            {
                label: 'Total Cases',
                pointRadius: 1,
                borderColor: '#D33F49',
                backgroundColor: '#D33F4950',
                data: histoCases,
            }
        ]};

    } else if (prop === 'recovered') {

        document.getElementById('chart-title').innerHTML = '<span style="color: #457B9D;">Recovered</span>';


        let histoRecovered = [];
        var lastDataPoint;
        for (let date in data.recovered) {
            if (lastDataPoint) {
                let newDataPoint = {
                    x: date,
                    y: data.recovered[date] - lastDataPoint
                }
                histoRecovered.push(newDataPoint);
            }
            lastDataPoint = data.recovered[date]
        }

        values = {datasets: [
            {
                label: 'Recovered',
                pointRadius: 1,
                borderColor: '#457B9D',
                backgroundColor: '#457B9D50',
                data: histoRecovered,
            }
        ]};

    } else {

        document.getElementById('chart-title').innerHTML = '<span class="text-secondary">Deaths</span>';

        let histoDeaths = [];
        var lastDataPoint;
        for (let date in data.deaths) {
            if (lastDataPoint) {
                let newDataPoint = {
                    x: date,
                    y: data.deaths[date] - lastDataPoint
                }
                histoDeaths.push(newDataPoint);
            }
            lastDataPoint = data.deaths[date]
            
        }

        values = {datasets: [
            {
                label: 'Deaths',
                pointRadius: 1,
                borderColor: '#6C767D',
                backgroundColor: '#6C767D50',
                data: histoDeaths,
            }
        ]};

    }


    let myChart = document.getElementById("lineGraph").getContext('2d');
    var timeFormat = 'MM/DD/YYYY';

    var LineChart = new Chart(lineGraph, {
        type: 'line',
        data: values,
        options: {
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            scales:     {
                xAxes: [{
                    type: "time",
                    time: {
                        format: timeFormat,
                        tooltipFormat: 'll'
                    },
                    scaleLabel: {
                        display:     true,
                        labelString: 'Date'
                    }
                }],
                yAxes: [{
                    ticks: {
                        callback: function(value) {
                            return numeral(value).format('0 a');
                        }
                    }
                }]
            },
        }
    });
}