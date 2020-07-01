const showGlobalData = (data) => {
    let myChart = document.getElementById("pieChart").getContext('2d');
    let labelTitles = ['Active Cases', 'Recovered', 'Deaths'];
    let stats = [data.active, data.recovered, data.deaths];
    let colors = ['#D33F49', '#82212B', '#320B0F']

    var PieChart = new Chart(myChart, {
        type: 'pie',
        data: {
            labels: labelTitles,
            datasets: [{
                data: stats,
                circumference: 100,
                backgroundColor: colors,
                borderWidth: 0,
            }]
        }
    });
}

const showHistoricalData = (data) => {

    let histoCases = [];
    for (let date in data.cases) {
        let newDataPoint = {
            x: date,
            y: data.cases[date]
        }
        histoCases.push(newDataPoint);
    }

    let histoRecovered = [];
    for (let date in data.recovered) {
        let newDataPoint = {
            x: date,
            y: data.recovered[date]
        }
        histoRecovered.push(newDataPoint);
    }
    
    let histoDeaths = [];
    for (let date in data.deaths) {
        let newDataPoint = {
            x: date,
            y: data.deaths[date]
        }
        histoDeaths.push(newDataPoint);
    }

    let myChart = document.getElementById("lineGraph").getContext('2d');
    var timeFormat = 'MM/DD/YYYY';

    var LineChart = new Chart(lineGraph, {
        type: 'line',
        data: {
            datasets: [
                {
                label: 'Total Cases',
                pointRadius: 0,
                borderColor: '#D33F49',
                // backgroundColor: '#D33F49',
                data: histoCases,
            },
            {
                label: 'Total Recovered',
                pointRadius: 0,
                borderColor: '#82212B',
                // backgroundColor: '#82212B',
                data: histoRecovered,
            },
            {
                label: 'Total Deaths',
                pointRadius: 0,
                borderColor: '#320B0F',
                // backgroundColor: '#320B0F',
                data: histoDeaths,
            },
            
        ]},
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