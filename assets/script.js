var citiesFormEL = document.querySelector('#city-form');
var cityNameEL = document.querySelector('#city');

var formSubmitHandler = function(event) {
    event.preventDefault();

    //Check if city is blank then alert
    if (cityNameEL !== '') {
    //get the city input value
    var cityName = cityNameEL.value.trim();

    getMyWeather(cityName);
    } else {
        alert('Please enter a city name.');
    };
};

citiesFormEL.addEventListener("submit", formSubmitHandler);

// get weather data from OpenWeather
var getMyWeather = function(cityName) {
    fetch('http://api.openweathermap.org/geo/1.0/direct?q='+ cityName +'&limit=1&appid=f63a069e27328750769e0a8925c0d4d8').then(function(response) {
        if (response.ok) {
                response.json().then(function(data) {
                var lat = data[0].lat;
                var lon = data[0].lon;

                return fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+ lat +'&lon='+ lon +'&units=imperial&exclude=minutely,hourly,alerts&appid=f63a069e27328750769e0a8925c0d4d8');
                }).then(function(response) {
                    response.json().then(function(data) {
                    console.log(data);
                    // city current name, date, and icon
                    var cityTitleEl = document.querySelector('#city-date');
                    cityTitleEl.innerHTML = cityName + " " + moment.unix(data.current.dt).format('MM/DD/YYYY') + ' <img src="http://openweathermap.org/img/wn/' + data.current.weather[0].icon + '.png">';
                    // city current temp info
                    var currentTempEl = document.querySelector('#temp');
                    currentTempEl.innerHTML = data.current.temp + '<span>&#176;</span>F';
                    // city current wind info
                    var currentWindEl = document.querySelector('#wind');
                    currentWindEl.innerHTML = data.current.wind_speed + ' MPH';
                    // city current humidity info
                    var currentHumidityEl = document.querySelector('#humidity');
                    currentHumidityEl.innerHTML = data.current.humidity + '<span>&#37;</span>';
                    // city current uv index info
                    var currentUVIndexEl = document.querySelector('#uv-index');
                    currentUVIndexEl.innerHTML = data.current.uvi;
                    // if statement for uv index to be highlighted by appropriate color
                    if (parseInt(currentUVIndexEl.textContent) < 3) {
                        currentUVIndexEl.setAttribute('class', 'favorable');
                    } else if (parseInt(currentUVIndexEl.textContent) > 7) {
                        currentUVIndexEl.setAttribute('class', 'severe');
                    } else {
                        currentUVIndexEl.setAttribute('class', 'moderate');
                    }
                    
                    
                    var dayForecast = function(dayCard, dayIndex) {
                    // date info
                    var forecastDateEl = document.querySelector('#'+ dayCard +'-date');
                    forecastDateEl.innerHTML = moment.unix(data.daily[dayIndex].dt).format('MM/DD/YYYY');
                    // icon info
                    var forecastIconEl = document.querySelector('#'+ dayCard +'-icon');
                    forecastIconEl.innerHTML = '<img src="http://openweathermap.org/img/wn/' + data.daily[dayIndex].weather[0].icon + '.png">'
                    // temp info
                    var forecastTempEl = document.querySelector('#'+ dayCard +'-temp');
                    forecastTempEl.innerHTML = data.daily[dayIndex].temp.max + '<span>&#176;</span>F';
                    // wind info
                    var forecastWindEl = document.querySelector('#'+ dayCard +'-wind');
                    forecastWindEl.innerHTML = data.daily[dayIndex].wind_speed + ' MPH';
                    // humidity info
                    var forecastWindEl = document.querySelector('#'+ dayCard +'-humidity');
                    forecastWindEl.innerHTML = data.daily[dayIndex].humidity + '<span>&#37;</span>';
                    };
                    // 5 day forecast
                    var dayCardArr = ['d1', 'd2', 'd3', 'd4', 'd5'];
                    var dayIndexArr = [1, 2, 3, 4, 5];
                    dayCardArr.forEach((dayCard, index) => {
                        var dayIndex = dayIndexArr[index];
                        console.log(dayCard, dayIndex);
                        console.log(dayCard === null);
                        console.log(dayIndex === null);
                        dayForecast(dayCard, dayIndex);
                    })
                    // forEach(dayForecast(dayCard,dayIndex));
                    
                    });
                });
        } else {
            alert('Either an invalid city name was entered or the site is not working.  Please try again with a valid city name');
        }
    });        
};

// // date info
// var forecastDateEl = document.querySelector('#'+ dayCard +'-date');
// forecastDateEl.innerHTML = moment.unix(data.daily[parseInt(dayIndex)].dt).format('MM/DD/YYYY');
// // icon info
// var forecastIconEl = document.querySelector('#'+ dayCard +'-icon');
// forecastIconEl.innerHTML = '<img src="http://openweathermap.org/img/wn/' + data.daily[dayIndex].weather[0].icon + '.png">'
// // temp info
// var forecastTempEl = document.querySelector('#'+ dayCard +'-temp');
// forecastTempEl.innerHTML = data.daily[dayIndex].temp.max + '<span>&#176;</span>F';
// // wind info
// var forecastWindEl = document.querySelector('#'+ dayCard +'-temp');
// forecastWindEl.innerHTML = data.daily[dayIndex].wind_speed + ' MPH';
// // humidity info
// var forecastWindEl = document.querySelector('#'+ dayCard +'-temp');
// forecastWindEl.innerHTML = data.daily[dayIndex].humidity + '<span>&#37;</span>';

