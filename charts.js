const showHistoricalData = (data) => {

    var timeFormat = 'MM/DD/YYYY';

    // ACTIVE
    let histoCases = [];
    var lastDataPointActive;
    for (let date in data.cases) {
        if (lastDataPointActive) {
            let newDataPoint = {
                x: date,
                y: data.cases[date] - lastDataPointActive
            }
            histoCases.push(newDataPoint);
        }
        lastDataPointActive = data.cases[date]
    }

    var activeValues = {datasets: [
        {
            label: 'Total Cases',
            pointRadius: 1,
            borderColor: '#AD0B39',
            backgroundColor: '#AD0B3950',
            data: histoCases,
        }
    ]};

    let chart1 = document.getElementById("activeLineGraph").getContext('2d');

    new Chart(activeLineGraph, {
        type: 'line',
        data: activeValues,
        options: {
            legend: {
                display: false
             },
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
                        display:     false,
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

    // RECOVERED
    let histoRecovered = [];
    var lastDataPointRecovered;
    for (let date in data.recovered) {
        if (lastDataPointRecovered) {
            let newDataPoint = {
                x: date,
                y: data.recovered[date] - lastDataPointRecovered
            }
            histoRecovered.push(newDataPoint);
        }
        lastDataPointRecovered = data.recovered[date]
    }

    var recoveredValues = {datasets: [
        {
            label: 'Recovered',
            pointRadius: 1,
            borderColor: '#DD882C',
            backgroundColor: '#DD882C50',
            data: histoRecovered,
        }
    ]};

    let chart2 = document.getElementById("recoveredLineGraph").getContext('2d');

    new Chart(recoveredLineGraph, {
        type: 'line',
        data: recoveredValues,
        options: {
            legend: {
                display: false
             },
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
                        display:     false,
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

    // DEATH
    
    let histoDeaths = [];
    var lastDataPointDeaths;
    for (let date in data.deaths) {
        if (lastDataPointDeaths) {
            let newDataPoint = {
                x: date,
                y: data.deaths[date] - lastDataPointDeaths
            }
            histoDeaths.push(newDataPoint);
        }
        lastDataPointDeaths = data.deaths[date]
        
    }

    var deathValues = {datasets: [
        {
            label: 'Deaths',
            pointRadius: 1,
            borderColor: '#292F36',
            backgroundColor: '#292F3650',
            data: histoDeaths,
        }
    ]};

    let chart3 = document.getElementById("deathsLineGraph").getContext('2d');

    new Chart(deathsLineGraph, {
        type: 'line',
        data: deathValues,
        options: {
            legend: {
                display: false
             },
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
                        display:     false,
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

const showGlobalStatsChart = (data) => {
    var chartdata = {
        datasets: [{
            data: [data.active, data.recovered, data.deaths],
            backgroundColor: ['#AD0B39', '#DD882C' , '#292F36']
        }],
        labels: [
            'Active Cases',
            'Recovered',
            'Deaths'
        ],
    };

    var ctx = document.getElementById('global');
    var myDoughnutChart = new Chart(global, {
        type: 'doughnut',
        data: chartdata,
        options: {
            legend: {
                display: false
            },
            circumference: Math.PI,
            rotation: Math.PI,
        }
    });
}