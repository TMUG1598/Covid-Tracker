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
    document.getElementById('cases-card').innerHTML = numeral(data.cases).format('0.00a');
    document.getElementById('active-card').innerHTML = `${numeral(data.active).format('0.00a')} total`;
    document.getElementById('casesToday').innerHTML = numeral(data.todayCases).format('+0,0');
    document.getElementById('recover-card').innerHTML = `${numeral(data.recovered).format('0.00a')} total`;
    document.getElementById('recoveredToday').innerHTML = numeral(data.todayRecovered).format('+0,0');
    document.getElementById('death-card').innerHTML = `${numeral(data.deaths).format('0.00a')} total`;
    document.getElementById('deathsToday').innerHTML = numeral(data.todayDeaths).format('+0,0');
}

const getHistoricalData = () => {
    fetch('https://corona.lmao.ninja/v2/historical/all?lastdays=300')
    .then((response) => {
        return response.json()
    }).then((data) => {
        showHistoricalData(data);
    })
}

const getCountryData = () => {
    fetch("https://corona.lmao.ninja/v2/countries")
    .then((response) => {
        return response.json()
    }).then((data) => {
        showOnMapTable(data);
        showDataOnMap(data, 'cases');
        countrySelect(data);
        var sortedData = sortResults(data, 'active');
        showDataInTable(sortedData, 'active');
    })
}

function sortResults(data, prop) {
    data.sort(function(a, b) {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
    });
    return data;
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