var form = document.getElementById("form-container");
var citySearch = document.getElementById("city-search");
var searchButton = document.getElementById("search-button");
var recentSearches = document.getElementById("button-container");
var buttons = document.getElementById("buttons");

var selectedCity = document.getElementById("current-city");
var currentDate = document.getElementById("current-date");
var currentTemperature = document.getElementById("current-temperature");
var currentWind = document.getElementById("current-wind");
var currentHumidity = document.getElementById("current-humidity");
var currentUVIndex = document.getElementById("current-uv-index");
var currentWeatherIcon = document.getElementById("current-weather-icon");

var firstDayDate= document.getElementById("first-day-date");
var firstDayIcon = document.getElementById("first-day-icon");
var firstDayTemperature = document.getElementById("first-day-temperature");
var firstDayWind = document.getElementById("first-day-wind");
var firstDayHumidity = document.getElementById("first-day-humidity");

var secondDayDate = document.getElementById("second-day-date");
var secondDayIcon = document.getElementById("second-day-icon");
var secondDayTemperature = document.getElementById("second-day-temperature");
var secondDayWind = document.getElementById("second-day-wind");
var secondDayHumidity = document.getElementById("second-day-humidity");

var thirdDayDate = document.getElementById("third-day-date");
var thirdDayIcon = document.getElementById("third-day-icon");
var thirdDayTemperature = document.getElementById("third-day-temperature");
var thirdDayWind = document.getElementById("third-day-wind");
var thirdDayHumidity = document.getElementById("third-day-humidity");

var forthDayDate = document.getElementById("forth-day-date");
var forthDayIcon = document.getElementById("forth-day-icon");
var forthDayTemperature = document.getElementById("forth-day-temperature");
var forthDayWind = document.getElementById("forth-day-wind");
var forthDayHumidity = document.getElementById("forth-day-humidity");

var fifthDayDate = document.getElementById("fifth-day-date");
var fifthDayIcon = document.getElementById("fifth-day-icon");
var fifthDayTemperature = document.getElementById("fifth-day-temperature");
var fifthDayWind = document.getElementById("fifth-day-wind");
var fifthDayHumidity = document.getElementById("fifth-day-humidity");

var sixthDayDate = document.getElementById("sixth-day-date");
var sixthDayIcon = document.getElementById("sixth-day-icon");
var sixthDayTemperature = document.getElementById("sixth-day-temperature");
var sixthDayWind = document.getElementById("sixth-day-wind");
var sixthDayHumidity = document.getElementById("sixth-day-humidity");


var apiKey = "d9b1aa46fc3cdeca117a491e878e66c4";
var currentLongitude = 0;
var currentLatitude = 0;

var DateTime = luxon.DateTime;
var now = DateTime.now();

var buttonList = [];

if (!(JSON.parse(localStorage.getItem("buttonlist")))) {
    localStorage.setItem("buttonlist", JSON.stringify(buttonList));
}
else {
    buttonList = JSON.parse(localStorage.getItem("buttonlist"));
}

function fetchWeatherData(city) {
 
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey)
    .then(response => response.json())
    .then(data => {

        selectedCity.innerHTML = city;
        
        currentDate.innerHTML = "Date and Time"   + ": "  + now.toLocaleString(DateTime.DATETIME_MED);

        currentTemperature.innerHTML = "Temperature in Degrees Celsius"    + ": "  + Math.round(data.main.temp - 273.15);

        currentWind.innerHTML = "Wind Speed in Metres Per Second"   + ": "  + data.wind.speed;

        currentHumidity.innerHTML = "Humidity %"    + ": "  + data.main.humidity;

        currentLongitude = data.coord.lon;
        currentLatitude = data.coord.lat;

        var data1 = data;
        localStorage.setItem("weatherdata1", JSON.stringify(data1));
    });

    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + currentLatitude + "&lon=" + currentLongitude + "&exclude=hourly,daily&appid=" + apiKey)
    .then(response => response.json())
    .then(data => {

        currentUVIndex.innerHTML = "Current UV Index"   + ": " + data.current.uvi;

        if (data.current.uvi <= 3){
            currentUVIndex.classList.remove("yellow");
            currentUVIndex.classList.remove("red");
            currentUVIndex.classList.add("green");
        }

        if ((data.current.uvi > 3) && (data.current.uvi <= 6)) {
            currentUVIndex.classList.remove("green");
            currentUVIndex.classList.remove("red");
            currentUVIndex.classList.add("yellow");
        }

        if (data.current.uvi > 6) {
            currentUVIndex.classList.remove("green");
            currentUVIndex.classList.remove("yellow");
            currentUVIndex.classList.add("red");
        }

        var data2 = data;
        localStorage.setItem("weatherdata2", JSON.stringify(data2));
    });

    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey)
    .then(response => response.json())
    .then(data => {

        var iconValue = data.list[0].weather[0].icon;
        currentWeatherIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";
        
        firstDayDate.innerHTML = "Date and Time"   + ": " + data.list[2].dt_txt + " (24-Hour Clock)";        
        var iconValue = data.list[2].weather[0].icon;
        firstDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";
        firstDayTemperature.innerHTML = "Temperature in Degrees Celsius"   + ": " + Math.round(data.list[2].main.temp - 273.15);
        firstDayWind.innerHTML = "Wind Speed in Metres Per Second"   + ": " + data.list[2].wind.speed;
        firstDayHumidity.innerHTML = "Humidity %"   + ": " + data.list[2].main.humidity;

        secondDayDate.innerHTML = "Date and Time"   + ": " + data.list[10].dt_txt + " (24-Hour Clock)";
        var iconValue = data.list[10].weather[0].icon;
        secondDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";
        secondDayTemperature.innerHTML = "Temperature in Degrees Celsius"   + ": " + Math.round(data.list[10].main.temp - 273.15);
        secondDayWind.innerHTML = "Wind Speed in Metres Per Second"   + ": " + data.list[10].wind.speed;
        secondDayHumidity.innerHTML = "Humidity %"   + ": " + data.list[10].main.humidity;

        thirdDayDate.innerHTML = "Date and Time"   + ": " + data.list[18].dt_txt + " (24-Hour Clock)";
        var iconValue = data.list[18].weather[0].icon;
        thirdDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";
        thirdDayTemperature.innerHTML = "Temperature in Degrees Celsius"   + ": " + Math.round(data.list[18].main.temp - 273.15);
        thirdDayWind.innerHTML = "Wind Speed in Metres Per Second"   + ": " + data.list[18].wind.speed;
        thirdDayHumidity.innerHTML = "Humidity %"   + ": " + data.list[18].main.humidity;

        forthDayDate.innerHTML = "Date and Time"   + ": " + data.list[26].dt_txt + " (24-Hour Clock)";
        var iconValue = data.list[26].weather[0].icon;
        forthDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";
        forthDayTemperature.innerHTML = "Temperature in Degrees Celsius"   + ": " + Math.round(data.list[26].main.temp - 273.15);
        forthDayWind.innerHTML = "Wind Speed in Metres Per Second"   + ": " + data.list[26].wind.speed;
        forthDayHumidity.innerHTML = "Humidity %"   + ": " + data.list[26].main.humidity;

        fifthDayDate.innerHTML = "Date and Time"   + ": " + data.list[34].dt_txt + " (24-Hour Clock)";
        var iconValue = data.list[34].weather[0].icon;
        fifthDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";
        fifthDayTemperature.innerHTML = "Temperature in Degrees Celsius"   + ": " + Math.round(data.list[34].main.temp - 273.15);
        fifthDayWind.innerHTML = "Wind Speed in Metres Per Second"   + ": " + data.list[34].wind.speed;
        fifthDayHumidity.innerHTML = "Humidity %"   + ": " + data.list[34].main.humidity;
        sixthDayDate.innerHTML = "Date and Time"   + ": " + data.list[39].dt_txt + " (24-Hour Clock)";
        var iconValue = data.list[39].weather[0].icon;
        sixthDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";
        sixthDayTemperature.innerHTML = "Temperature in Degrees Celsius"   + ": " + Math.round(data.list[39].main.temp - 273.15);
        sixthDayWind.innerHTML = "Wind Speed in Metres Per Second"   + ": " + data.list[39].wind.speed;
        sixthDayHumidity.innerHTML = "Humidity %"   + ": " + data.list[39].main.humidity;

        var data3 = data;
        localStorage.setItem("weatherdata3", JSON.stringify(data3));
    })
}

function load() {
    var data1 = JSON.parse(localStorage.getItem("weatherdata1")) || {};
    var data2 = JSON.parse(localStorage.getItem("weatherdata2")) || {};
    var data3 = JSON.parse(localStorage.getItem("weatherdata3")) || {};
    
    if (JSON.parse(localStorage.getItem("weatherdata1"))) {

        selectedCity.innerHTML = data1.name;
            
        currentDate.innerHTML = "Date and Time"   + ": "  + now.toLocaleString(DateTime.DATETIME_MED);

        currentTemperature.innerHTML = "Temperature in Degrees Celsius"    + ": "  + Math.round(data1.main.temp - 273.15);

        currentWind.innerHTML = "Wind Speed in Metres Per Second"   + ": "  + data1.wind.speed;

        currentHumidity.innerHTML = "Humidity %"    + ": "  + data1.main.humidity;

        currentLongitude = data1.coord.lon;
        currentLatitude = data1.coord.lat;

        /*currentUVIndex.innerHTML = "Current UV Index"   + ": " + data2.current.uvi;

        if (data2.current.uvi <= 3) {
            currentUVIndex.classList.remove("yellow");
            currentUVIndex.classList.remove("red");
            currentUVIndex.classList.add("green");
        }

        if ((data2.current.uvi > 3) && (data2.current.uvi <= 6)) {
            currentUVIndex.classList.remove("green");
            currentUVIndex.classList.remove("red");
            currentUVIndex.classList.add("yellow");
        }

        if (data2.current.uvi > 6) {
            currentUVIndex.classList.remove("green");
            currentUVIndex.classList.remove("yellow");
            currentUVIndex.classList.add("red");
        }*/

        var iconValue = data3.list[0].weather[0].icon;
        currentWeatherIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";
        firstDayDate.innerHTML = "Date and Time"   + ": " + data3.list[2].dt_txt + " (24-Hour Clock)";        
        var iconValue = data3.list[2].weather[0].icon;
        firstDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";
        firstDayTemperature.innerHTML = "Temperature in Degrees Celsius"   + ": " + Math.round(data3.list[2].main.temp - 273.15);
        firstDayWind.innerHTML = "Wind Speed in Metres Per Second"   + ": " + data3.list[2].wind.speed;
        firstDayHumidity.innerHTML = "Humidity %"   + ": " + data3.list[2].main.humidity;
        secondDayDate.innerHTML = "Date and Time"   + ": " + data3.list[10].dt_txt + " (24-Hour Clock)";
        var iconValue = data3.list[10].weather[0].icon;
        secondDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";
        secondDayTemperature.innerHTML = "Temperature in Degrees Celsius"   + ": " + Math.round(data3.list[10].main.temp - 273.15);
        secondDayWind.innerHTML = "Wind Speed in Metres Per Second"   + ": " + data3.list[10].wind.speed;
        secondDayHumidity.innerHTML = "Humidity %"   + ": " + data3.list[10].main.humidity;
        thirdDayDate.innerHTML = "Date and Time"   + ": " + data3.list[18].dt_txt + " (24-Hour Clock)";
        var iconValue = data3.list[18].weather[0].icon;
        thirdDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";
        thirdDayTemperature.innerHTML = "Temperature in Degrees Celsius"   + ": " + Math.round(data3.list[18].main.temp - 273.15);
        thirdDayWind.innerHTML = "Wind Speed in Metres Per Second"   + ": " + data3.list[18].wind.speed;
        thirdDayHumidity.innerHTML = "Humidity %"   + ": " + data3.list[18].main.humidity;
        forthDayDate.innerHTML = "Date and Time"   + ": " + data3.list[26].dt_txt + " (24-Hour Clock)";
        var iconValue = data3.list[26].weather[0].icon;
        forthDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";
        forthDayTemperature.innerHTML = "Temperature in Degrees Celsius"   + ": " + Math.round(data3.list[26].main.temp - 273.15);
        forthDayWind.innerHTML = "Wind Speed in Metres Per Second"   + ": " + data3.list[26].wind.speed;
        forthDayHumidity.innerHTML = "Humidity %"   + ": " + data3.list[26].main.humidity;
        fifthDayDate.innerHTML = "Date and Time"   + ": " + data3.list[34].dt_txt + " (24-Hour Clock)";
        var iconValue = data3.list[34].weather[0].icon;
        fifthDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";
        fifthDayTemperature.innerHTML = "Temperature in Degrees Celsius"   + ": " + Math.round(data3.list[34].main.temp - 273.15);
        fifthDayWind.innerHTML = "Wind Speed in Metres Per Second"   + ": " + data3.list[34].wind.speed;
        fifthDayHumidity.innerHTML = "Humidity %"   + ": " + data3.list[34].main.humidity;
        sixthDayDate.innerHTML = "Date and Time"   + ": " + data3.list[39].dt_txt + " (24-Hour Clock)";
        var iconValue = data3.list[39].weather[0].icon;
        sixthDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";
        sixthDayTemperature.innerHTML = "Temperature in Degrees Celsius"   + ": " + Math.round(data3.list[39].main.temp - 273.15);
        sixthDayWind.innerHTML = "Wind Speed in Metres Per Second"   + ": " + data3.list[39].wind.speed;
        sixthDayHumidity.innerHTML = "Humidity %"   + ": " + data3.list[39].main.humidity;
    }

    for (var i = 0; (buttonList.length > 0) && (i < buttonList.length); i++) {
        addCityButton(buttonList[i]);
    }
}

function addCityButton(city) {

    var newButton = document.createElement("button");
    newButton.type = "submit";
    newButton.id = city;
    newButton.classList.add("btn");
    newButton.classList.add("btn-dark");
    newButton.value = city;
    newButton.textContent = city;

    buttons.appendChild(newButton);
}

load();

setInterval(function() {location.reload();}, 300*1000);

form.addEventListener('submit', function(event) {

    event.preventDefault();

    var searchValue = citySearch.value;

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + apiKey)
    .then(response => response.json())
    .then(data => {
        console.log("Code: ", data.cod);
        if ((searchValue == "") || (data.cod == 404)) {
            window.alert("'" + searchValue + "'" + " is not a valid city. Please try again.");
        }
        else {
            fetchWeatherData(searchValue);

            var j = 0;
            
            for (var i = 0; (buttonList.length > 0) && (i < buttonList.length); i++) {
                if (buttonList[i] === searchValue) {
                    j++;
                }
            }

            if (j === 0) {
                buttonList.push(searchValue)
                localStorage.setItem("buttonlist", JSON.stringify(buttonList));
                addCityButton(searchValue);
            }
            }
        });
});

recentSearches.addEventListener('click', function(event) {
    event.preventDefault();

    var searchValue = event.target.value;
    fetchWeatherData(searchValue);
});