var map;
var infoWindow;

initMap = () => {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40, lng: -55},
        zoom: 3,
        styles: mapStyle,
    });
}

window.onload = () => {
    // getJHUCSSEData();
    getGlobalData();
    getHistoricalData();
    getCountryData();
}

// const getJHUCSSEData = () => {
//     fetch("https://disease.sh/v2/jhucsse")
//     .then((response) => {
//         return response.json()
//     }).then((data) => {
//         showOnMap(data);
//     })
// }

// const showOnMap = (data) => {
//     data.map((country) => {

//         let countryCenter = {
//             lat: parseInt(country.coordinates.latitude),
//             lng: parseInt(country.coordinates.longitude)
//         }

//         var countryCircle = new google.maps.Circle({
//             strokeColor: '#D33F49',
//             strokeOpacity: 0.8,
//             strokeWeight: 2,
//             fillColor: '#D33F49',
//             fillOpacity: 0.35,
//             map: map,
//             center: countryCenter,
//             radius: Math.sqrt(country.stats.confirmed)*400
//         });

//         if (country.province == null) {
//             var html = `
//             <div class = "info-container">
//                 <div class = "info-country">
//                     ${country.country}
//                 </div>
//                 <div class = "info-confirmed">
//                     <b>Active: </b> ${numeral(country.stats.confirmed).format()}
//                 </div>
//                 <div class = "info-recovered">
//                     <b>Recovered: </b> ${numeral(country.stats.recovered).format()}
//                 </div>
//                 <div class = "info-deaths">
//                     <b>Deaths: </b> ${numeral(country.stats.deaths).format()}
//                 </div>
//             </div>
//             `;
//         } else {
//             var html = `
//             <div class = "info-container">
//                 <div class = "info-country">
//                     ${country.country}
//                 </div>
//                 <div class = "info-province">
//                     ${country.province}
//                 </div>
//                 <div class = "info-confirmed">
//                     <b>Active: </b> ${numeral(country.stats.confirmed).format()}
//                 </div>
//                 <div class = "info-recovered">
//                     <b>Recovered: </b> ${numeral(country.stats.recovered).format()}
//                 </div>
//                 <div class = "info-deaths">
//                     <b>Deaths: </b> ${numeral(country.stats.deaths).format()}
//                 </div>
//             </div>
//             `;
//         }

        

//         var infoWindow = new google.maps.InfoWindow({
//             content: html,
//             position: countryCircle.center,
//         });

//         google.maps.event.addListener(countryCircle, 'mouseover', function () {
//             infoWindow.open(map);
//         });

//         google.maps.event.addListener(countryCircle, 'mouseout', function () {
//             infoWindow.close();
//         });

//     })
// }

const getGlobalData = () => {
    fetch("https://disease.sh/v2/all")
    .then((response) => {
        return response.json()
    }).then((data) => {
        showGlobalStats(data);
        showGlobalData(data);
    })
}

const showGlobalStats = (data) => {
    document.getElementById('cases-card').innerHTML = numeral(data.cases).format();
    document.getElementById('active-card').innerHTML = numeral(data.active).format();
    document.getElementById('casesToday').innerHTML = numeral(data.todayCases).format();
    document.getElementById('recover-card').innerHTML = numeral(data.recovered).format();
    document.getElementById('recoveredToday').innerHTML = numeral(data.todayRecovered).format();
    document.getElementById('death-card').innerHTML = numeral(data.deaths).format();
    document.getElementById('deathsToday').innerHTML = numeral(data.todayDeaths).format();
}

const showGlobalData = (data) => {
    let myChart = document.getElementById("pieChart").getContext('2d');
    let labelTitles = ['Active Cases', 'Recovered', 'Deaths'];
    let stats = [data.active, data.recovered, data.deaths];
    let colors = ['#D33F49', '#8AC926', '#0D1626']

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

const getHistoricalData = () => {
    fetch('https://corona.lmao.ninja/v2/historical/all?lastdays=300')
    .then((response) => {
        return response.json()
    }).then((data) => {
        showHistoricalData(data);
    })
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
                borderColor: '#39A0ED',
                data: histoCases,
            },
            {
                label: 'Total Deaths',
                borderColor: '#0D1626',
                data: histoDeaths,
            },
            {
                label: 'Total Recovered',
                borderColor: '#8AC926',
                data: histoRecovered,
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
                            return numeral(value).format();
                        }
                    }
                }]
            },
        }
    });
}

const getCountryData = () => {
    fetch("https://corona.lmao.ninja/v2/countries")
    .then((response) => {
        return response.json()
    }).then((data) => {
        showOnMap(data);
        showDataOnMapActive(data);
        countrySelect(data);
        var sortedData = sortResults(data, 'active');
        showDataInTableActive(sortedData);
    })
}

const showOnMap = (data) => {
    document.getElementById("activeCases").addEventListener("click", function () {
        initMap();
        showDataOnMapActive(data);
        var sortedData = sortResults(data, 'active');
        showDataInTableActive(sortedData);
    });
    document.getElementById("recoveredCases").addEventListener("click", function () {
        initMap();
        showDataOnMapRecovered(data);
        var sortedData = sortResults(data, 'recovered');
        showDataInTableRecovered(sortedData);
    });
    document.getElementById("deathCases").addEventListener("click", function () {
        initMap();
        showDataOnMapDeaths(data);
        var sortedData = sortResults(data, 'deaths');
        showDataInTableDeaths(sortedData);
    });
}

const showDataOnMapActive = (data) => {
    data.forEach((country) => {

        let countryCenter = {
            lat: country.countryInfo.lat,
            lng: country.countryInfo.long
        }

        var countryCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: countryCenter,
            radius: Math.sqrt(country.cases)*800
        });

        var html = `
            <div class = "info-container">
                <div class="info-flag" style="background-image: url(${country.countryInfo.flag})">
                </div>
                <div class = "info-name">
                    <h4>${country.country}</h4>
                </div>
                <div class = "info-confirmed">
                    <b>Total: </b> ${numeral(country.cases).format()}
                </div>
                <div class = "info-confirmed">
                    <b>Active: </b> ${numeral(country.active).format()}
                </div>
                <div class = "info-recovered">
                    <b>Recovered: </b> ${numeral(country.recovered).format()}
                </div>
                <div class = "info-deaths">
                    <b>Deaths: </b> ${numeral(country.deaths).format()}
                </div>
            </div>
        `

        var infoWindow = new google.maps.InfoWindow({
            content: html,
            position: countryCircle.center,
        });

        google.maps.event.addListener(countryCircle, 'mouseover', function () {
            infoWindow.open(map);
        });

        google.maps.event.addListener(countryCircle, 'mouseout', function () {
            infoWindow.close();
        });

    })
}

const showDataOnMapRecovered = (data) => {
    data.forEach((country) => {

        let countryCenter = {
            lat: country.countryInfo.lat,
            lng: country.countryInfo.long
        }

        var countryCircle = new google.maps.Circle({
            strokeColor: '#8AC926',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#8AC926',
            fillOpacity: 0.35,
            map: map,
            center: countryCenter,
            radius: Math.sqrt(country.recovered)*800
        });

        var html = `
            <div class = "info-container">
                <div class="info-flag" style="background-image: url(${country.countryInfo.flag})">
                </div>
                <div class = "info-name">
                    <h4>${country.country}</h4>
                </div>
                <div class = "info-confirmed">
                    <b>Total: </b> ${numeral(country.cases).format()}
                </div>
                <div class = "info-confirmed">
                    <b>Active: </b> ${numeral(country.active).format()}
                </div>
                <div class = "info-recovered">
                    <b>Recovered: </b> ${numeral(country.recovered).format()}
                </div>
                <div class = "info-deaths">
                    <b>Deaths: </b> ${numeral(country.deaths).format()}
                </div>
            </div>
        `

        var infoWindow = new google.maps.InfoWindow({
            content: html,
            position: countryCircle.center,
        });

        google.maps.event.addListener(countryCircle, 'mouseover', function () {
            infoWindow.open(map);
        });

        google.maps.event.addListener(countryCircle, 'mouseout', function () {
            infoWindow.close();
        });

    })
}

const showDataOnMapDeaths = (data) => {
    data.forEach((country) => {

        let countryCenter = {
            lat: country.countryInfo.lat,
            lng: country.countryInfo.long
        }

        var countryCircle = new google.maps.Circle({
            strokeColor: '#000000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#000000',
            fillOpacity: 0.35,
            map: map,
            center: countryCenter,
            radius: Math.sqrt(country.deaths)*800
        });

        var html = `
            <div class = "info-container">
                <div class="info-flag" style="background-image: url(${country.countryInfo.flag})">
                </div>
                <div class = "info-name">
                    <h4>${country.country}</h4>
                </div>
                <div class = "info-confirmed">
                    <b>Total: </b> ${numeral(country.cases).format()}
                </div>
                <div class = "info-confirmed">
                    <b>Active: </b> ${numeral(country.active).format()}
                </div>
                <div class = "info-recovered">
                    <b>Recovered: </b> ${numeral(country.recovered).format()}
                </div>
                <div class = "info-deaths">
                    <b>Deaths: </b> ${numeral(country.deaths).format()}
                </div>
            </div>
        `

        var infoWindow = new google.maps.InfoWindow({
            content: html,
            position: countryCircle.center,
        });

        google.maps.event.addListener(countryCircle, 'mouseover', function () {
            infoWindow.open(map);
        });

        google.maps.event.addListener(countryCircle, 'mouseout', function () {
            infoWindow.close();
        });

    })
}

function sortResults(data, prop) {
    data.sort(function(a, b) {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
    });
    return data;
}

const showDataInTableActive = (data) => {
    var html = '';

    for (let index = 0; index < 15; index++) {
        html += `
        <tr>
            <td><div class="flag" style="background-image: url(${data[index].countryInfo.flag});"></div></td>
            <td>${data[index].country}</td>
            <td>${numeral(data[index].cases).format()}</td>
            <td><span class="text-danger">${numeral(data[index].active).format()}</span></td>
        </tr>
    `
    }
    document.getElementById('table-header').innerHTML = '<span class="text-danger">Active</span>';
    document.getElementById('table-data').innerHTML = html;
}

const showDataInTableRecovered = (data) => {
    var html = '';

    for (let index = 0; index < 15; index++) {
        html += `
        <tr>
            <td><div class="flag" style="background-image: url(${data[index].countryInfo.flag});"></div></td>
            <td>${data[index].country}</td>
            <td>${numeral(data[index].cases).format()}</td>
            <td><span class="text-success">${numeral(data[index].recovered).format()}</span></td>
        </tr>
    `
    }
    document.getElementById('table-header').innerHTML = '<span class="text-success">Recovered</span>';
    document.getElementById('table-data').innerHTML = html;
}

const showDataInTableDeaths = (data) => {
    var html = '';

    for (let index = 0; index < 15; index++) {
        html += `
        <tr>
            <td><div class="flag" style="background-image: url(${data[index].countryInfo.flag});"></div></td>
            <td>${data[index].country}</td>
            <td>${numeral(data[index].cases).format()}</td>
            <td><span class="text-secondary">${numeral(data[index].deaths).format()}</span></td>
        </tr>
    `
    }
    document.getElementById('table-header').innerHTML = '<span class="text-secondary">Deaths</span>';
    document.getElementById('table-data').innerHTML = html;
}

const countrySelect = (data) => {
    var html = `
        <option selected>Country</option>
    `;
    data.forEach((country, index) => {
        html += `<option value=${index}>${country.country}</option>`;
    })
    document.getElementById('inputGroupSelect').innerHTML = html;
}