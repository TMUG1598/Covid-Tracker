let mapCircles = [];

const clearTheMap = () => {
    for (let circle of mapCircles) {
        circle.setMap(null);
    }
};

const showDataOnMap = (data, prop) => {
    data.forEach((country) => {

        let countryCenter = {
            lat: country.countryInfo.lat,
            lng: country.countryInfo.long
        }

        if (prop === 'cases') {
            var countryCircle = new google.maps.Circle({
                strokeColor: '#D33F49',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#D33F49',
                fillOpacity: 0.35,
                map: map,
                center: countryCenter,
                radius: Math.sqrt(country[prop])*1000
            });
        } else if (prop === 'recovered') {
            var countryCircle = new google.maps.Circle({
                strokeColor: '#A8DADC',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#457B9D',
                fillOpacity: 0.35,
                map: map,
                center: countryCenter,
                radius: Math.sqrt(country[prop])*1200
            });
        } else {
            var countryCircle = new google.maps.Circle({
                strokeColor: '#f1faee',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#6C757D',
                fillOpacity: 0.35,
                map: map,
                center: countryCenter,
                radius: Math.sqrt(country[prop])*2000
            });
        }

        mapCircles.push(countryCircle);

        var html = `
            <div class = "info-container">
                <div class="mb-2 info-flag">
                    <img src="${country.countryInfo.flag}" width="100%">
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