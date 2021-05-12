var nameIndex;
var fromHuman = 0

function WeatherUrlExists(apiCall) {
    var http = new XMLHttpRequest();
    http.open('HEAD', apiCall, false);
    http.send();
    if (http.status == 404) {
        document.getElementById("weather-country-name" + nameIndex.name).innerHTML = "Unknown City";
        document.getElementById("weather-short-description" + nameIndex.name).innerHTML = "No short description available";
        document.getElementById("weather-description" + nameIndex.name).innerHTML = "No long description available";
    } else {
        console.log(fromHuman)
        $.getJSON(apiCall, weatherCallback);
    }
}

function weatherCallback(weatherData) {
    var cityName = weatherData.name;
    var main = weatherData.weather[0].main
    var description = weatherData.weather[0].description

    document.getElementById("weather-country-name" + nameIndex.name).innerHTML = cityName;
    document.getElementById("weather-short-description" + nameIndex.name).innerHTML = main;
    $("#weather-img-description" + nameIndex.name).attr('src', "http://openweathermap.org/img/w/" + weatherData.weather[0].icon +".png");
    $("#weather-img-description" + nameIndex.name).attr('style', "display=block;")
    console.log(fromHuman)
    if (fromHuman) {
        const url = parseInt($("#widget0").attr("modified")) ? 'users/widgets/update' : 'users/widgets/add';
        const data = {
            type: 'weather',
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

function getWeather(countryName, reload) {
    if(reload || event.key === 'Enter') {
        if (!reload)
            fromHuman = 1
        function weatherCall() {
            nameIndex = countryName

            WeatherUrlExists('http://api.openweathermap.org/data/2.5/weather?q=' + nameIndex.value + '&appid=fa51895cc4073f6777013831ab55574d')
        }
        weatherCall()
        setInterval(weatherCall, 86400000);
    }
}
