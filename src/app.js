let today = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[today.getDay()];
let hour = today.getHours();
let minutes = today.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
function formatDates(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (1 <= index && index <= 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col=12">
      <span class="weather-forecast-day">${formatDates(forecastDay.dt)}</span>
      <span class = "weather-forecast-max"> ${Math.round(
        forecastDay.temp.max
      )}° |</span>
      <span class = "weather-forecast-min">${Math.round(
        forecastDay.temp.min
      )}°</span> 
      <span class = "forecast-emoji"><img src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png"
        width="42"/>
      </span>
    </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "6515f856935f19ac3c6d56e1e4dfc07c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}
function displayCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search");
  h2 = document.querySelector("h2");
  h2.innerHTML = `${cityInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=6515f856935f19ac3c6d56e1e4dfc07c&units=imperial`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

let form = document.querySelector("#city");
form.addEventListener("submit", displayCity);

function showTemperature(response) {
  fahrenheitTemperature = response.data.main.temp;
  let temperature = Math.round(response.data.main.temp);
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = `${temperature}`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=6515f856935f19ac3c6d56e1e4dfc07c&units=imperial`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

let dateTime = document.querySelector("#dateTime");
dateTime.innerHTML = `${day} | ${hour}:${minutes}`;

let fahrenheitTemperature = null;
