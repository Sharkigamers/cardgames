var nameIndex;
var today = ""
var yesterday = ""

var fromHuman = 0

function CovidUrlExists(apiCall) {
    var http = new XMLHttpRequest();
    http.open('HEAD', apiCall, false);
    http.send();
    if (http.status == 404) {
        document.getElementById("covid-country-name" + nameIndex.name).innerHTML = "Unknown Country [EN]";
        document.getElementById("covid-date" + nameIndex.name).innerHTML = "Impossible";
        document.getElementById("covid-short-description-text" + nameIndex.name).innerHTML = "Impossible";
        document.getElementById("covid-short-description-number-cases" + nameIndex.name).innerHTML = "Impossible";
        document.getElementById("covid-short-description-status" + nameIndex.name).innerHTML = "Impossible";
    } else {
        $.getJSON(apiCall, covidCallback);
    }
}

function covidCallback(covidData) {
    var parsedCovidData = covidData[Object.keys(covidData)[Object.keys(covidData).length - 1]];
    var countryName = parsedCovidData.Country;
    var covidDate = parsedCovidData.Date.substr(0, 10);
    var numberCases = parsedCovidData.Cases;
    var status = parsedCovidData.Status;

    document.getElementById("covid-country-name" + nameIndex.name).innerHTML = countryName;
    document.getElementById("covid-date" + nameIndex.name).innerHTML = covidDate;
    document.getElementById("covid-short-description-text" + nameIndex.name).innerHTML = "Total cases";
    document.getElementById("covid-short-description-number-cases" + nameIndex.name).innerHTML = numberCases;
    document.getElementById("covid-short-description-status" + nameIndex.name).innerHTML = status.toUpperCase();
    if (fromHuman) {
        const url = parseInt($("#widget0").attr("modified")) ? 'users/widgets/update' : 'users/widgets/add';
        const data = {
            type: 'covid',
            param_1: nameIndex.value,
            param_2: '',
            param_3: '',
            param_4: '',
        }

        $.post(url, data, function(data, status) {
            console.log(data);
        });
        $("#widget0").attr("modified", "1");
        fromHuman = 0
    }
}

function getCovid(countryName, reload) {
    if(reload || event.key === 'Enter') {
        if (!reload)
            fromHuman = 1
        function covidCall() {
            nameIndex = countryName
            var date = new Date();

            today = date.getFullYear() + '-' +  (parseInt(date.getMonth()) + 1).toString() + '-' + date.getDate();
            date.setDate(date.getDate() - 1);
            yesterday = date.getFullYear() + '-' + (parseInt(date.getMonth()) + 1).toString() + '-' + date.getDate();

            CovidUrlExists('https://api.covid19api.com/total/country/' + countryName.value +
            '/status/confirmed?from=' + yesterday + 'T00:00:00Z&to=' + today + 'T00:00:00Z')
        }
        covidCall()
        setInterval(covidCall, 600000);
    }
}