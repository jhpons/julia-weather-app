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

function displayCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search");
  h2 = document.querySelector("h2");
  h2.innerHTML = `${cityInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=6515f856935f19ac3c6d56e1e4dfc07c&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

let form = document.querySelector("#city");
form.addEventListener("submit", displayCity);

function showTempF(event) {
  event.preventDefault();
  let degrees = document.querySelector("#degrees");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  degrees.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}
let fahrenheit = document.querySelector("#tempF");
fahrenheit.addEventListener("click", showTempF);

function showTempC(event) {
  event.preventDefault();
  let degrees = document.querySelector("#degrees");
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  degrees.innerHTML = Math.round(celsiusTemperature);
}
let celsius = document.querySelector("#tempC");
celsius.addEventListener("click", showTempC);

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(response.data.main.temp);
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = `${temperature}`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=6515f856935f19ac3c6d56e1e4dfc07c&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

let p = document.querySelector("p");
p.innerHTML = `${day} | ${hour}:${minutes}`;

let celsiusTemperature = null;
