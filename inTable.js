const showDataInTable = (data, prop) => {
    var html = '';

    if (prop === 'active') {
        for (let index = 0; index < 15; index++) {
            html += `
            <tr>
                <td><b style="color: #320B0F;">${data[index].country}</b></td>
                <td>${numeral(data[index].cases).format()}</td>
                <td><span class="text-danger">${numeral(data[index][prop]).format()}</span></td>
            </tr>
        `
        }
        document.getElementById('table-header').innerHTML = '<span class="text-danger">Active</span>';
    } else if (prop === 'recovered') {
        for (let index = 0; index < 15; index++) {
            html += `
            <tr>
                <td><b>${data[index].country}</b></td>
                <td>${numeral(data[index].cases).format()}</td>
                <td><span style="color: #82212B;">${numeral(data[index].recovered).format()}</span></td>
            </tr>
        `
        }
        document.getElementById('table-header').innerHTML = '<span style="color: #82212B;">Recovered</span>';
    } else {
        for (let index = 0; index < 15; index++) {
            html += `
            <tr>
                <td><b>${data[index].country}</b></td>
                <td>${numeral(data[index].cases).format()}</td>
                <td><span class="text-secondary">${numeral(data[index].deaths).format()}</span></td>
            </tr>
        `
        }
        document.getElementById('table-header').innerHTML = '<span class="text-secondary">Deaths</span>';
    }
    document.getElementById('table-data').innerHTML = html;
}

const showDataInTableRecovered = (data) => {
    var html = '';

    for (let index = 0; index < 15; index++) {
        html += `
        <tr>
            <td><b>${data[index].country}</b></td>
            <td>${numeral(data[index].cases).format()}</td>
            <td><span style="color: #82212B;">${numeral(data[index].recovered).format()}</span></td>
        </tr>
    `
    }
    document.getElementById('table-header').innerHTML = '<span style="color: #82212B;">Recovered</span>';
    document.getElementById('table-data').innerHTML = html;
}

const showDataInTableDeaths = (data) => {
    var html = '';

    for (let index = 0; index < 15; index++) {
        html += `
        <tr>
            <td><b>${data[index].country}</b></td>
            <td>${numeral(data[index].cases).format()}</td>
            <td><span class="text-secondary">${numeral(data[index].deaths).format()}</span></td>
        </tr>
    `
    }
    document.getElementById('table-header').innerHTML = '<span class="text-secondary">Deaths</span>';
    document.getElementById('table-data').innerHTML = html;
}
{/* <td><div class="flag" style="background-image: url(${data[index].countryInfo.flag});"></div></td> */}
