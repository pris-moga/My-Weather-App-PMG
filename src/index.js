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
  const actualTempIcon = document.getElementById("actual-temp-icon");
  let iconDescription = document.querySelector("#actual-temp-icon");

  celsiusTemp = Math.round(response.data.main.temp);
  celsiusMinTemp = Math.round(response.data.main.temp_min);
  celsiusMaxTemp = Math.round(response.data.main.temp_max);
  celsiusFeelsLike = Math.round(response.data.main.feels_like);

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
    response.data.weather[0].description;

  // weather icons
  if (response.data.weather[0].icon === "01d") {
    actualTempIcon.src = "images/clear-sky.svg";
    iconDescription.setAttribute("alt", response.data.weather[0].description);
  }
  if (response.data.weather[0].icon === "01n") {
    actualTempIcon.src = "images/clear-sky-night.svg";
    iconDescription.setAttribute("alt", response.data.weather[0].description);
  }
  if (response.data.weather[0].icon === "02d") {
    actualTempIcon.src = "images/few-clouds.svg";
    iconDescription.setAttribute("alt", response.data.weather[0].description);
  }
  if (response.data.weather[0].icon === "02n") {
    actualTempIcon.src = "images/few-clouds-night.svg";
    iconDescription.setAttribute("alt", response.data.weather[0].description);
  }
  if (
    response.data.weather[0].icon === "03d" ||
    response.data.weather[0].icon === "03n"
  ) {
    actualTempIcon.src = "images/scattered-clouds.svg";
    iconDescription.setAttribute("alt", response.data.weather[0].description);
  }
  if (
    response.data.weather[0].icon === "04d" ||
    response.data.weather[0].icon === "04n"
  ) {
    actualTempIcon.src = "images/broken-clouds.svg";
    iconDescription.setAttribute("alt", response.data.weather[0].description);
  }
  if (
    response.data.weather[0].icon === "09d" ||
    response.data.weather[0].icon === "09n"
  ) {
    actualTempIcon.src = "images/shower-rain.svg";
    iconDescription.setAttribute("alt", response.data.weather[0].description);
  }
  if (response.data.weather[0].icon === "10d") {
    actualTempIcon.src = "images/rain.svg";
    iconDescription.setAttribute("alt", response.data.weather[0].description);
  }
  if (response.data.weather[0].icon === "10n") {
    actualTempIcon.src = "images/rain-night.svg";
    iconDescription.setAttribute("alt", response.data.weather[0].description);
  }
  if (
    response.data.weather[0].icon === "11d" ||
    response.data.weather[0].icon === "11n"
  ) {
    actualTempIcon.src = "images/thunderstorm.svg";
    iconDescription.setAttribute("alt", response.data.weather[0].description);
  }
  if (
    response.data.weather[0].icon === "13d" ||
    response.data.weather[0].icon === "13n"
  ) {
    actualTempIcon.src = "images/snow.svg";
    iconDescription.setAttribute("alt", response.data.weather[0].description);
  }
  if (response.data.weather[0].icon === "50d") {
    actualTempIcon.src = "images/mist.svg";
    iconDescription.setAttribute("alt", response.data.weather[0].description);
  }
  if (response.data.weather[0].icon === "50n") {
    actualTempIcon.src = "images/mist-night.svg";
    iconDescription.setAttribute("alt", response.data.weather[0].description);
  }
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

// °C & °F
function showCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector(".actual-temp");
  temperature.innerHTML = celsiusTemp;
  let minTemperature = document.querySelector("#min-temp");
  minTemperature.innerHTML = celsiusMinTemp;
  let maxTemperature = document.querySelector("#max-temp");
  maxTemperature.innerHTML = celsiusMaxTemp;
  let feelsLikeTemperature = document.querySelector("#feels-like-temp");
  feelsLikeTemperature.innerHTML = celsiusFeelsLike;
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
}

function showFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector(".actual-temp");
  let fahrenheitTemperature = Math.round((celsiusTemp * 9) / 5 + 32);
  temperature.innerHTML = fahrenheitTemperature;
  let minTemperature = document.querySelector("#min-temp");
  let fahrenheitMinTemperature = Math.round((celsiusMinTemp * 9) / 5 + 32);
  minTemperature.innerHTML = fahrenheitMinTemperature;
  let maxTemperature = document.querySelector("#max-temp");
  let fahrenheitMaxTemperature = Math.round((celsiusMaxTemp * 9) / 5 + 32);
  maxTemperature.innerHTML = fahrenheitMaxTemperature;
  let feelsLikeTemperature = document.querySelector("#feels-like-temp");
  let fahrenheitFeelsLikeTemp = Math.round((celsiusFeelsLike * 9) / 5 + 32);
  feelsLikeTemperature.innerHTML = fahrenheitFeelsLikeTemp;
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
}

// No functions section
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

let celsiusTemp = null;
let celsiusMinTemp = null;
let celsiusMaxTemp = null;
let celsiusFeelsLike = null;
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);
