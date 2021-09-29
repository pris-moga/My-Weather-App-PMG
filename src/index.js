// Date
function currentDate(now) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "Decemper",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return month + " " + date + ", " + hours + ":" + minutes;
}

// Search Location Engine
function showWeather(response) {
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#actual-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like-temp").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}

function search(location) {
  let urlSearchLocation = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  axios.get(urlSearchLocation).then(showWeather);
}

function searchLocation(event) {
  event.preventDefault();
  let location = document.querySelector("#search-location").value;
  if (location === "" || location === " " || location === null) {
    document.querySelector("#location").innerHTML = "Type a location";
  }
  search(location);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(actualPosition);
  navigator.geolocation.getCurrentPosition(actualPositionForecast);
}

function actualPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let urlCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(urlCoords).then(showWeather);
}

// Future Forecast
function showWeatherForecast(response) {
  document.querySelector("#min-temp-0").innerHTML = Math.round(
    response.data.daily[0].temp.min
  );
  document.querySelector("#max-temp-0").innerHTML = Math.round(
    response.data.daily[0].temp.max
  );
  document.querySelector("#min-temp-1").innerHTML = Math.round(
    response.data.daily[1].temp.min
  );
  document.querySelector("#max-temp-1").innerHTML = Math.round(
    response.data.daily[1].temp.max
  );
  document.querySelector("#min-temp-2").innerHTML = Math.round(
    response.data.daily[2].temp.min
  );
  document.querySelector("#max-temp-2").innerHTML = Math.round(
    response.data.daily[2].temp.max
  );
  document.querySelector("#min-temp-3").innerHTML = Math.round(
    response.data.daily[3].temp.min
  );
  document.querySelector("#max-temp-3").innerHTML = Math.round(
    response.data.daily[3].temp.max
  );
  document.querySelector("#min-temp-4").innerHTML = Math.round(
    response.data.daily[4].temp.min
  );
  document.querySelector("#max-temp-4").innerHTML = Math.round(
    response.data.daily[4].temp.max
  );
}

function actualPositionForecast(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let urlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current&appid=${apiKey}&units=metric`;
  axios.get(urlForecast).then(showWeatherForecast);
}

/*
function forecastLocation(location) {
  let urlForecast = `https://api.openweathermap.org/data/2.5/onecall?${location}&exclude=daily&appid=${apiKey}&units=metric`;
  axios.get(urlForecast).then(showWeatherForecast);
}

function forecast(event) {
  event.preventDefault();
  let location = document.querySelector("#search-location").value;
  forecastLocation(location);
}
*/

let dateElement = document.querySelector("#current-date");
let now = new Date();
dateElement.innerHTML = currentDate(now);

let apiKey = "bb0df6985c2eab6a171d64a6bacbb4e1";

let form = document.querySelector("#form");
form.addEventListener("submit", searchLocation /*forecast*/);

let myLocation = document.querySelector("#my-location");
myLocation.addEventListener("click", currentLocation);

search("Mexico City");

//forecastLocation("Mexico City");

// °C & °F
/*
function showCelsius() {
  let temperature = document.querySelector(".actual-temp");
  temperature.innerHTML = 21;
}

function showFahrenheit() {
  let temperature = document.querySelector(".actual-temp");
  let fahrenheitTemperature = Math.round((21 * 9) / 5 + 32);
  temperature.innerHTML = fahrenheitTemperature;
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);
*/