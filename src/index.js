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

  // Weather icons
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

  // Call de Forecast Function
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
  const forecastTempIcon = document.getElementById("forecast-temp-icon");
  let iconDescription = document.querySelector("#forecast-temp-icon");
  let forecastHTML = `<div class="row">`;
  forecastInfo.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2 next-day-container">
        <div class="day">${forecastDate(forecastDay.dt)}</div>
        <div class="icon-container">
          <img
            src="images/clear-sky.svg"
            alt="Moslty Rainy"
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

    // Forecast - Weather icons
    if (forecastDay.weather[0].icon === "01d") {
      forecastTempIcon.src = "images/clear-sky.svg";
      iconDescription.setAttribute("alt", forecastDay.weather[0].description);
    }
    if (forecastDay.weather[0].icon === "01n") {
      forecastTempIcon.src = "images/clear-sky-night.svg";
      iconDescription.setAttribute("alt", forecastDay.weather[0].description);
    }
    if (forecastDay.weather[0].icon === "02d") {
      forecastTempIcon.src = "images/few-clouds.svg";
      iconDescription.setAttribute("alt", forecastDay.weather[0].description);
    }
    if (forecastDay.weather[0].icon === "02n") {
      forecastTempIcon.src = "images/few-clouds-night.svg";
      iconDescription.setAttribute("alt", forecastDay.weather[0].description);
    }
    if (
      forecastDay.weather[0].icon === "03d" ||
      forecastDay.weather[0].icon === "03n"
    ) {
      forecastTempIcon.src = "images/scattered-clouds.svg";
      iconDescription.setAttribute("alt", forecastDay.weather[0].description);
    }
    if (
      forecastDay.weather[0].icon === "04d" ||
      forecastDay.weather[0].icon === "04n"
    ) {
      forecastTempIcon.src = "images/broken-clouds.svg";
      iconDescription.setAttribute("alt", forecastDay.weather[0].description);
    }
    if (
      forecastDay.weather[0].icon === "09d" ||
      forecastDay.weather[0].icon === "09n"
    ) {
      forecastTempIcon.src = "images/shower-rain.svg";
      iconDescription.setAttribute("alt", forecastDay.weather[0].description);
    }
    if (forecastDay.weather[0].icon === "10d") {
      forecastTempIcon.src = "images/rain.svg";
      iconDescription.setAttribute("alt", forecastDay.weather[0].description);
    }
    if (forecastDay.weather[0].icon === "10n") {
      forecastTempIcon.src = "images/rain-night.svg";
      iconDescription.setAttribute("alt", forecastDay.weather[0].description);
    }
    if (
      forecastDay.weather[0].icon === "11d" ||
      forecastDay.weather[0].icon === "11n"
    ) {
      forecastTempIcon.src = "images/thunderstorm.svg";
      iconDescription.setAttribute("alt", forecastDay.weather[0].description);
    }
    if (
      forecastDay.weather[0].icon === "13d" ||
      forecastDay.weather[0].icon === "13n"
    ) {
      forecastTempIcon.src = "images/snow.svg";
      iconDescription.setAttribute("alt", forecastDay.weather[0].description);
    }
    if (forecastDay.weather[0].icon === "50d") {
      forecastTempIcon.src = "images/mist.svg";
      iconDescription.setAttribute("alt", forecastDay.weather[0].description);
    }
    if (forecastDay.weather[0].icon === "50n") {
      forecastTempIcon.src = "images/mist-night.svg";
      iconDescription.setAttribute("alt", forecastDay.weather[0].description);
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
