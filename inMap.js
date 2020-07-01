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
            strokeColor: '#D33F49',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#D33F49',
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
            strokeColor: '#D33F49',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#D33F49',
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
            strokeColor: '#D33F49',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#D33F49',
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