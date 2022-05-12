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

let p = document.querySelector("p");
p.innerHTML = `${day} ${hour}:${minutes}`;

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

function showTempC(event) {
  event.preventDefault();
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = "18°";
}
let celsius = document.querySelector("#tempC");
celsius.addEventListener("click", showTempC);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = `${temperature}`;
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
