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
    "December",
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
  let actualTempIcon = document.querySelector("#actual-temp-icon");

  celsiusTemp = Math.round(response.data.main.temp);
  celsiusMinTemp = Math.round(response.data.main.temp_min);
  celsiusMaxTemp = Math.round(response.data.main.temp_max);
  celsiusFeelsLike = Math.round(response.data.main.feels_like);

  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#actual-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
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

  // Call Weather icons
  actualTempIcon.setAttribute("src", getIcon(response.data.weather[0].icon));
  actualTempIcon.setAttribute("alt", response.data.weather[0].description);

  // Call the Forecast Function
  getForecast(response.data.coord);
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
}

function actualPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let urlCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(urlCoords).then(showWeather);
}

// Wheather Icons
function getIcon(iconCode) {
  let icon = "";

  if (iconCode === "01d") {
    icon = "images/clear-sky.svg";
  }
  if (iconCode === "01n") {
    icon = "images/clear-sky-night.svg";
  }
  if (iconCode === "02d") {
    icon = "images/few-clouds.svg";
  }
  if (iconCode === "02n") {
    icon = "images/few-clouds-night.svg";
  }
  if (iconCode === "03d" || iconCode === "03n") {
    icon = "images/scattered-clouds.svg";
  }
  if (iconCode === "04d" || iconCode === "04n") {
    icon = "images/broken-clouds.svg";
  }
  if (iconCode === "09d" || iconCode === "09n") {
    icon = "images/shower-rain.svg";
  }
  if (iconCode === "10d") {
    icon = "images/rain.svg";
  }
  if (iconCode === "10n") {
    icon = "images/rain-night.svg";
  }
  if (iconCode === "11d" || iconCode === "11n") {
    icon = "images/thunderstorm.svg";
  }
  if (iconCode === "13d" || iconCode === "13n") {
    icon = "images/snow.svg";
  }
  if (iconCode === "50d") {
    icon = "images/mist.svg";
  }
  if (iconCode === "50n") {
    icon = "images/mist-night.svg";
  }

  return icon;
}

// Forecast
function forecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastInfo = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecastInfo.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2 next-day-container">
        <div class="day">${forecastDate(forecastDay.dt)}</div>
        <div class="icon-container">
          <img
            src="${getIcon(forecastDay.weather[0].icon)}"
            alt="${forecastDay.weather[0].description}"
            class="weather-icon-small"
            id="forecast-temp-icon"
          />
        </div>
        <div>
          <span class="lower-temp-nextdays"
            ><span id="min-temp-0">${Math.round(forecastDay.temp.min)}</span>° /
          </span>
          <span class="max-temp-nextdays"
            ><span id="max-temp-0">${Math.round(forecastDay.temp.max)}</span>°
          </span>
        </div>
      </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let urlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`;
  axios.get(urlForecast).then(displayForecast);
}

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

// Universal Variables
let dateElement = document.querySelector("#current-date");
let now = new Date();
dateElement.innerHTML = currentDate(now);

let apiKey = "bb0df6985c2eab6a171d64a6bacbb4e1";

let form = document.querySelector("#form");
form.addEventListener("submit", searchLocation);

let myLocation = document.querySelector("#my-location");
myLocation.addEventListener("click", currentLocation);

search("Mexico City");

let celsiusTemp = null;
let celsiusMinTemp = null;
let celsiusMaxTemp = null;
let celsiusFeelsLike = null;
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);
