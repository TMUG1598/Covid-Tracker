const showHistoricalData = (data, prop) => {

    var values = [];

    if (prop === 'active') {
        let histoCases = [];
        for (let date in data.cases) {
            let newDataPoint = {
                x: date,
                y: data.cases[date]
            }
            histoCases.push(newDataPoint);
        }

        values = {datasets: [
            {
                label: 'Total Cases',
                pointRadius: 0,
                borderColor: '#D33F49',
                backgroundColor: '#D33F49',
                data: histoCases,
            }
        ]};

    } else if (prop === 'recovered') {
        let histoRecovered = [];
        for (let date in data.recovered) {
            let newDataPoint = {
                x: date,
                y: data.recovered[date]
            }
        histoRecovered.push(newDataPoint);
        }

        values = {datasets: [
            {
                label: 'Recovered',
                pointRadius: 0,
                borderColor: '#457B9D',
                backgroundColor: '#457B9D',
                data: histoRecovered,
            }
        ]};

    } else {

        let histoDeaths = [];
        for (let date in data.deaths) {
            let newDataPoint = {
                x: date,
                y: data.deaths[date]
            }
            histoDeaths.push(newDataPoint);
        }

        values = {datasets: [
            {
                label: 'Deaths',
                pointRadius: 0,
                borderColor: '#6C767D',
                backgroundColor: '#6C767D',
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