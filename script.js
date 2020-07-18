var map;
var infoWindow;
var countryData = [];
var histoData = [];
const mapCenter = {
    lat: 34.80746,
    lng: -40.4796
}
var newCenter;
const worldwideSelection = {
    name: 'Worldwide', 
    value: 'www', 
    selected: true
};


initMap = () => {
    map = new google.maps.Map(document.getElementById('map'), {
        center: mapCenter,
        zoom: 3,
        styles: mapStyle,
    });
}

window.onload = () => {
    getGlobalData();
    getHistoricalData();
    getCountriesData();
}

const getGlobalData = () => {
    fetch("https://disease.sh/v2/all")
    .then((response) => {
        return response.json()
    }).then((data) => {
        showGlobalStats(data);
        setMapCenter(mapCenter.lat, mapCenter.lng, 2)
    })
}

const getHistoricalData = () => {
    fetch('https://corona.lmao.ninja/v2/historical/all?lastdays=200')
    .then((response) => {
        return response.json()
    }).then((data) => {
        histoData = data;
        showHistoricalData(histoData, 'active');
    })
}

const getCountriesData = () => {
    fetch("https://corona.lmao.ninja/v2/countries")
    .then((response) => {
        return response.json()
    }).then((data) => {
        countryData = data;
        showDataOnMap(data, 'cases');
        setSearchList(data);

        var sortedData = sortResults(data, 'active');
        showDataInTable(sortedData, 'active');
    })
}

const getCountryData = (countryIso) => {
    const url = "https://disease.sh/v3/covid-19/countries/" + countryIso;
    fetch(url)
    .then((response)=>{
        return response.json()
    }).then((data)=>{
        showGlobalStats(data);
        setMapCenter(data.countryInfo.lat, data.countryInfo.long, 4);
        document.getElementById('country-searched').innerHTML = data.country;
        document.getElementById('country-search').innerHTML = data.country;
    })
}

const getCountryHistoData = (countryIso) => {
    fetch(`https://corona.lmao.ninja/v2/historical/${countryIso}?lastdays=200`)
    .then((response) => {
        return response.json()
    }).then((data) => {
        histoData = data.timeline;
        showHistoricalData(histoData, 'active');
    })
}

const showGlobalStats = (data) => {
    document.getElementById('total-cases').innerHTML = numeral(data.cases).format('0.00a');
    document.getElementById('active-card').innerHTML = `${numeral(data.active).format('0.00a')} total`;
    document.getElementById('casesToday').innerHTML = numeral(data.todayCases).format('+0,0');
    document.getElementById('recover-card').innerHTML = `${numeral(data.recovered).format('0.00a')} total`;
    document.getElementById('recoveredToday').innerHTML = numeral(data.todayRecovered).format('+0,0');
    document.getElementById('death-card').innerHTML = `${numeral(data.deaths).format('0.00a')} total`;
    document.getElementById('deathsToday').innerHTML = numeral(data.todayDeaths).format('+0,0');
}

const setSearchList = (data) => {
    let searchList = [worldwideSelection];
    data.forEach((country) => {
        searchList.push({
            name: country.country,
            value: country.countryInfo.iso3,
        })
    })
    initDropdown(searchList);
}

const initDropdown = (searchList) => {
    $('.ui.dropdown').dropdown({
        values: searchList,
        onChange: function(value, text) {
            if(value !== worldwideSelection.value){
                getCountryData(value);
                getCountryHistoData(value);
            } else {
                getGlobalData();
            }
        }
    });
}

const setMapCenter = (lat, long, zoom) => {
    map.setZoom(zoom);
    newCenter = {
        lat: lat,
        lng: long,
    };
    map.panTo(newCenter);
}


function sortResults(data, prop) {
    data.sort(function(a, b) {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
    });
    return data;
}

const changeStats = (prop1, prop2, elem) => {
    clearTheMap();
    setActiveTab(elem);
    showDataOnMap(countryData, prop1);
    var sortedData = sortResults(countryData, prop2);
    showDataInTable(sortedData , prop2);
    showHistoricalData(histoData, prop2);
}

const setActiveTab = (elem) => {
    const activeCard = document.querySelector('.card.active');
    console.log(activeCard);
    activeCard.classList.remove('active');
    elem.classList.add('active');
    console.log(activeCard);
}