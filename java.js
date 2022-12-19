let now = new Date();
let hour = now.getHours();
let minute = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let date = document.querySelector(".date");
date.innerHTML = `${day} ${hour}:${minute}`;

function displayWeather(response) {
  let temperature = document.querySelector(".tempUnit");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let location = document.querySelector(".city");
  location.innerHTML = response.data.name;
  let condition = document.querySelector(".overview");
  condition.innerHTML = response.data.weather[0].main;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

function searchCity(inputCity) {
  let apiKey = "9171ffc58ca719fcd9afd47b128d0e6f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function city(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-input").value;
  searchCity(inputCity);
}

let inputCity = document.querySelector("#search-city");
inputCity.addEventListener("submit", city);

  