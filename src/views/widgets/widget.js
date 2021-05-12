var widgetList = [];
var index = 0;

var currencyList = [
    "AED","ARS","AUD","BGN","BRL","BSD","CAD","CHF","CLP","CNY","COP","CZK",
    "DKK","DOP","EGP","EUR","FJD","GBP","GTQ","HKD","HRK","HUF","IDR","ILS",
    "INR","ISK","JPY","KRW","KZT","MVR","MXN","MYR","NOK","NZD","PAB","PEN",
    "PHP","PKR","PLN","PYG","RON","RUB","SAR","SEK","SGD","THB","TRY","TWD",
    "UAH","UYU","ZAR",
];

var zipcodeLocation = [
    "AD","AR","AS","AT","AU","BD","BE","BG","BR","CA","CH","CZ","DE","DK","DO","ES",
    "FI","FO","FR","GB","GF","GG","GL","GP","GT","GU","GY","HR","HU","IM","IN","IS",
    "IT","JE","JP","LI","LK","LT","LU","MC","MD","MH","MK","MP","MQ","MX","MY","NL",
    "NO","NZ","PH","PK","PL","PM","PR","PT","RE","RU","SE","SI","SJ","SK","SM","TH",
    "TR","US","VA","VI","YT","ZA"
];

function createSelector(mArray)
{
    let myOptions = '';

    mArray.forEach(item => myOptions += '<option value=' + item + '>' + item + '</option>');
    return myOptions;
}

function indexWeather()
{
    return '<a id="weather-country-name' + index + '" name="' + index + '" class="country-name">Weather City</a>' +
    '<input id="weather-field' + index + '" name="' + index + '" class="textfield" type="weather-field" name="weather-field" value="City name" onfocus="this.value=\'\'" onkeydown="getWeather(this, false)">' +
    '<a id="weather-short-description' + index + '" name="' + index + '" class="short-description"></a>' +
    '<center><img id="weather-img-description' + index + '" class="weather-img" style="display: none;"></center>';
}

function indexCovid()
{
    return '<a id="covid-country-name' + index + '" name="' + index + '" class="country-name">COVID Country</a>' +
    '<input id="covid-field' + index + '" name="' + index + '" class="textfield" type="covid-field" name="covid-field" value="Country name" onfocus="this.value=\'\'" onkeydown="getCovid(this, false)">' +
    '<div>' +
    '<a id="covid-date' + index + '" name="' + index + '" class="short-description"></a>' +
    '<a id="covid-short-description-text' + index + '" name="' + index + '" class="short-description"></a>' +
    '<a id="covid-short-description-number-cases' + index + '" name="' + index + '" class="short-description"></a>' +
    '<a id="covid-short-description-status' + index + '" name="' + index + '" class="short-description"></a>' +
    '</div>'
}

function indexIp()
{
    return '<a id="ip-addr' + index + '" name="' + index + '" class="country-name">Address Ip</a>' +
    '<input id="ip-field' + index + '" name="' + index + '" class="textfield" type="ip-field" name="ip-field" value="Ip address" onfocus="this.value=\'\'" onkeydown="getIpAddr(this, false)">' +
    '<a id="ip-lat' + index + '" name="' + index + '" class="short-description"></a>' +
    '<a id="ip-long' + index + '" name="' + index + '" class="short-description"></a>'
}

function indexCurrency()
{
    let selectorCurrency = createSelector(currencyList);

    return '<a id="currency-first' + index + '" name="' + index + '" class="country-name">Currency</a>' +
    '<center><select id="currency-first-select" class="currency-select">' + selectorCurrency + '</center>' +
    '<input id="currency-field' + index + '" name="' + index + '" class="textfield" type="currency-field" name="currency-field" value="0.00" onfocus="this.value=\'\'" onkeydown="getCurrency(this, false)">' +
    '<center><select id="currency-second-select" class="currency-select">' + selectorCurrency + '</select>' + 
    '<a id="currency-result' + index + '" name="' + index + '" class="short-description" style="font-size: xx-large;"></a></center>';
}

function indexYt()
{
    return '<a id="yt-first' + index + '" name="' + index + '" class="country-name">Youtube</a>' +
    '<input id="yt-field' + index + '" name="' + index + '" class="textfield" type="yt-field" name="yt-field" value="ID" onfocus="this.value=\'\'" onkeydown="getYoutube(this, false)">' +
    '<center> <a id="yt-result-text-sub' + index + '" name="' + index + '" class="short-description" style="font-size: large;"></a>' +
    '<a id="yt-result-sub' + index + '" name="' + index + '" class="short-description" style="font-size: xx-large;"></a>' +
    '<a id="yt-result-text-view' + index + '" name="' + index + '" class="short-description" style="font-size: large;"></a>' +
    '<a id="yt-result-view' + index + '" name="' + index + '" class="short-description" style="font-size: xx-large;"></a></center>';
}

function indexZipCode()
{
    return '<a id="zipcode-addr' + index + '" name="' + index + '" class="country-name">Zip Code</a>' +
    '<center><select id="zipcode-select" class="zipcode-select">' + createSelector(zipcodeLocation) + '</center>' +
    '<input id="zipcode-field' + index + '" name="' + index + '" class="textfield" type="zipcode-field" name="zipcode-field" value="Zip Code" onfocus="this.value=\'\'" onkeydown="getZipcode(this, false)" style="margin-top: 0px;">' +
    '<center> <a id="zipcode-result-text-city' + index + '" name="' + index + '" class="short-description" style="font-size: large;"></a>' +
    '<a id="zipcode-result-city' + index + '" name="' + index + '" class="short-description" style="font-size: large;"></a>' +
    '<a id="zipcode-result-text-state' + index + '" name="' + index + '" class="short-description" style="font-size: large;"></a>' +
    '<a id="zipcode-result-state' + index + '" name="' + index + '" class="short-description" style="font-size: large;"></a></center>';
}

function pressWidgetButton() {
    if (document.getElementById("widget-list").style.display == "none")
        document.getElementById("widget-list").style.display = "block";
    else
        document.getElementById("widget-list").style.display = "none";
}

function wichSelected(wichWidget) {
    switch (wichWidget) {
        case "weather":
            return indexWeather();
        case "covid":
            return indexCovid();
        case "zipcode":
            return indexZipCode();
        case "youtube":
            return indexYt();
        case "ip":
            return indexIp();
        case "currency":
            return indexCurrency();
        default:
            break;
    }
}

function selectWidget(wichWidget) {
    document.getElementById("widget-list").style.display = "none";
    if (index > 0)
        for (let key in widgetList) {
            if (widgetList[parseInt(key + 1)] == undefined)
                index = parseInt(key) + 1
                break;
        }
    widgetList[index] = wichWidget;
    if ((index % 3 == 0 && widgetList[index + 1] == undefined && widgetList[index + 2] == undefined)
    || (index % 3 == 1 && widgetList[index + 1] == undefined && widgetList[index - 1] == undefined)
    || (index % 3 == 2 && widgetList[index - 1] == undefined && widgetList[index - 2] == undefined))
        document.getElementById('widget-page').insertAdjacentHTML('beforeend', '<div id="widget-content' + Math.floor(index / 3) + '" class="dashboard-widget-content">');
    document.getElementById('widget-content' + Math.floor(index / 3)).insertAdjacentHTML(
        'beforeend',
        '<div modified=0 id="widget' + index + '" class="dashboard-widget">\
        <button class="delete-widget" onclick="deleteWidget(' + index +')">\
        <img src="./pictures/svg/delete.svg"></button>' + wichSelected(wichWidget) + '</div>'
    );
    index += 1;
}

function deleteWidget(toDelete) {
    const url = 'users/widgets/remove';
    const data = {
        type: '',
        param_1: '',
        param_2: '',
        param_3: '',
        param_4: '',
    }

    $.post(url, data, function(data, status) {
        console.log('lopes');
    });
    document.getElementById("widget" + toDelete).remove();
    if ((toDelete % 3 == 0 && widgetList[toDelete + 1] == undefined && widgetList[toDelete + 2] == undefined)
    || (toDelete % 3 == 1 && widgetList[toDelete + 1] == undefined && widgetList[toDelete - 1] == undefined)
    || (toDelete % 3 == 2 && widgetList[toDelete - 1] == undefined && widgetList[toDelete - 2] == undefined))
        document.getElementById("widget-content" + Math.floor(toDelete / 3)).remove();
    delete widgetList[toDelete]
    if (index > toDelete)
        index = toDelete;
}

function setWidgetParams(mItem, tempIndex) {
    switch (mItem.type) {
        case "weather":
            console.log(tempIndex)
            document.getElementById("weather-field" + tempIndex.toString()).value =  mItem.param_1
            return getWeather(
                {
                    "name": tempIndex,
                    "value": mItem.param_1
                },
                true
            );
        case "covid":
            document.getElementById("covid-field" + tempIndex.toString()).value =  mItem.param_2
            return getCovid(
                {
                    "name": tempIndex,
                    "value": mItem.param_1
                },
                true
            );
        case "zipcode":
            document.getElementById("zipcode-select" + tempIndex.toString()).value =  mItem.param_1
            document.getElementById("zipcode-field" + tempIndex.toString()).value =  mItem.param_2
            return getZipcode(
                {
                    "name": tempIndex,
                    "value": mItem.param_2
                },
                true
            );
        case "youtube":
            document.getElementById("yt-field" + tempIndex.toString()).value =  mItem.param_1
            return getYoutube(
                {
                    "name": tempIndex,
                    "value": mItem.param_1
                },
                true
            );
        case "ip":
            document.getElementById("ip-field" + tempIndex.toString()).value =  mItem.param_1
            return getYoutube(
                {
                    "name": tempIndex,
                    "value": mItem.param_1
                },
                true
            );
        case "currency":
            document.getElementById("currency-first-select" + tempIndex.toString()).value =  mItem.param_1
            document.getElementById("currency-field" + tempIndex.toString()).value =  mItem.param_1
            document.getElementById("currency-second-select" + tempIndex.toString()).value =  mItem.param_3
            return getCurrency(
                {
                    "name": tempIndex,
                    "value": mItem.param_2
                },
                true
            );
        default:
            break;
    }
}

function loadUserWidgets(data, event)
{
    let tempIndex = 0
    console.log(data)
    data.forEach(function(item) {
        selectWidget(item.type);
        setWidgetParams(item, tempIndex);
        ++tempIndex;
        }
    );
    index = tempIndex;
}

function fromDatabaseLoadPage(event)
{
    var dbCall = "users/widgets/"
    var http = new XMLHttpRequest();
    http.open('GET', dbCall);
    http.send();
    $.getJSON(dbCall, loadUserWidgets, event)
}
