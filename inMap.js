let mapCircles = [];

const clearTheMap = () => {
    for (let circle of mapCircles) {
        circle.setMap(null);
    }
};

const showOnMapTable = (data) => {
    document.getElementById("activeCases").addEventListener("click", function () {
        clearTheMap();
        showDataOnMap(data, 'cases');
        var sortedData = sortResults(data, 'active');
        showDataInTable(sortedData , 'active');
    });
    document.getElementById("recoveredCases").addEventListener("click", function () {
        clearTheMap();
        showDataOnMap(data, 'recovered');
        var sortedData = sortResults(data, 'recovered');
        // showDataInTableRecovered(sortedData);
        showDataInTable(data, 'recovered');

    });
    document.getElementById("deathCases").addEventListener("click", function () {
        clearTheMap();
        showDataOnMap(data, 'deaths');
        var sortedData = sortResults(data, 'deaths');
        // showDataInTableDeaths(sortedData);
        showDataInTable(data, 'deaths');
    });
}

const showDataOnMap = (data, prop) => {
    data.forEach((country) => {

        let countryCenter = {
            lat: country.countryInfo.lat,
            lng: country.countryInfo.long
        }

        var countryCircle = new google.maps.Circle({
            strokeColor: '#D33F49',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#D33F49',
            fillOpacity: 0.35,
            map: map,
            center: countryCenter,
            radius: Math.sqrt(country[prop])*800
        });

        mapCircles.push(countryCircle);

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