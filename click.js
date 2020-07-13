const listener = () => {
    document.getElementById("activeCases").addEventListener("click", function () {
        clearTheMap();
        showDataOnMap(countryData, 'cases');
        var sortedData = sortResults(countryData, 'active');
        showDataInTable(sortedData , 'active');
        showHistoricalData(histoData, 'active');
    });
    
    document.getElementById("recoveredCases").addEventListener("click", function () {
        clearTheMap();
        showDataOnMap(countryData, 'recovered');
        var sortedData = sortResults(countryData, 'recovered');
        showDataInTable(sortedData, 'recovered');
        showHistoricalData(histoData, 'recovered');
    });
    
    document.getElementById("deathCases").addEventListener("click", function () {
        clearTheMap();
        showDataOnMap(countryData, 'deaths');
        var sortedData = sortResults(countryData, 'deaths');
        showDataInTable(sortedData, 'deaths');
        showHistoricalData(histoData, 'deaths');
    });
}

