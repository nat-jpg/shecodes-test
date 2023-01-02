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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecastweek");


  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
    forecastHTML = forecastHTML +
    `
    <div class="col">
      <div class="weather-forcast-date">${formatDay(forecastDay.dt)}</div>
      <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="36px">
      <div class="weather-forecast-temp">
        <span class="weather-forecast-max">${Math.round(forecastDay.temp.max)}°</span>
        <span class="weather-forecast-min">${Math.round(forecastDay.temp.min)}°</span>
      </div>
    </div>
    `;}
                    
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "f5e814a04eddfab1740f07bf0328eee2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

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
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  getForecast(response.data.coord);
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

 