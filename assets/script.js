var citiesFormEL = document.querySelector('#city-form');
var cityNameEL = document.querySelector('#city');
var dayIndex = 0;
var dayCard = '';

var formSubmitHandler = function(event) {
    event.preventDefault();

    //Check if city is blank then alert
    if (cityNameEL !== '') {
    //get the city input value
    var cityName = cityNameEL.value.trim();

    console.log(cityName);

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
                console.log(lat);
                console.log(lon);

                return fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+ lat +'&lon='+ lon +'&units=imperial&exclude=minutely,hourly,alerts&appid=f63a069e27328750769e0a8925c0d4d8');
                }).then(function(response) {
                    response.json().then(function(data) {
                    console.log(data);
                    // city current name, date, and icon
                    var cityTitleEl = document.querySelector('#city-date');
                    cityTitleEl.innerHTML = cityName + " " + moment.unix(data.current.dt).format('MM/DD/YYYY') + ' <img src="http://openweathermap.org/img/wn/' + data.current.weather[0].icon + '.png">';
                    console.log(cityTitleEl);
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
                    console.log(currentUVIndexEl.textContent);
                    if (parseInt(currentUVIndexEl.textContent) < 3) {
                        currentUVIndexEl.setAttribute('class', 'favorable');
                    } else if (parseInt(currentUVIndexEl.textContent) > 7) {
                        currentUVIndexEl.setAttribute('class', 'severe');
                    } else {
                        currentUVIndexEl.setAttribute('class', 'moderate');
                    }
                    });
                });
        } else {
            alert('Either an invalid city name was entered or the site is not working.  Please try again with a valid city name');
        }
    });        
};

// var dayForecast = function(dayCard, dayIndex) {
//     var dayCard = 
// }
// // $(document).on('click', '.btn', function() 
// { 
//     console.log("clicked"); 
// });

