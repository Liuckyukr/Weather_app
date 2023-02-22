function dayWeek(timestamp) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let date = new Date(timestamp);
    let infoDay = days[date.getDay()];
    let infoHour = date.getHours();
    let infoMinut = date.getMinutes();
    if (infoMinut < 10) {
      infoMinut = "0" + infoMinut;
    }
    if (infoHour < 10) {
      infoHour = "0" + infoHour;
    }
    return `${infoDay} ${infoHour}:${infoMinut}`;
  }
   
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat"
    ];
    return days[day]
  }

  function displayForecast (response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function(forecastDay) {
      forecastHTML = forecastHTML + `
            <div class="col-3">
              <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="44"/>
            </div>
            <div class="col-3">
              <span>${Math.round(forecastDay.temp.min)}°C</span> 
              <span>${Math.round(forecastDay.temp.max)}°C</span>
            </div>
            <div class="col-3">
              <span>${formatDay(forecastDay.dt)}<span>
            </div>
            <div class="col-3">
              <span>${Math.round(forecastDay.feels_like.day)}°C</span>
            </div>
      `;
    });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  }
  
  function getForecast(coordinates) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;  
    axios.get(apiUrl).then(displayForecast);
  }
  
  function showWeather(response) {
    document.querySelector("#dateCity").innerHTML = dayWeek(response.data.dt*1000);
    document.querySelector("#mainCity").innerHTML = response.data.name;
    document.querySelector("#temperatureCity").innerHTML =
      Math.round(response.data.main.temp) + " °C";
    document.querySelector("#humidityCity").innerHTML =
      response.data.main.humidity + " %";
    document.querySelector("#windCity").innerHTML =
      Math.round(response.data.wind.speed) + " m/s";
    document.querySelector("#emojiCity").setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    document.querySelector("#descriptCity").innerHTML = response.data.weather[0].description;
    getForecast(response.data.coord);
  }
  
  function weatherCity(city) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeather);
  }
  
  function userSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#chooseCity").value;
    weatherCity(city);
  }
  
  function weatherLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "2ff29bed3181c3526c35cc5408037f85";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeather);
  }
  
  function currentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(weatherLocation);
  }
  
  let form = document.querySelector("#form");
  form.addEventListener("submit", userSubmit);
  
  let currentLocationButton = document.querySelector("#currentData");
  currentLocationButton.addEventListener("click", currentLocation);

  weatherCity("Kyiv");
  