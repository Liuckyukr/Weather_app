function dayWeek(infoNowTime) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let infoDay = days[infoNowTime.getDay()];
    let infoHour = infoNowTime.getHours();
    let infoMinut = infoNowTime.getMinutes();
    if (infoMinut.length === 1) {
      infoMinut = "0" + infoMinut;
    }
    if (infoHour.length === 1) {
      infoHour = "0" + infoHour;
    }
    let infoRealyDate = `${infoDay} ${infoHour}:${infoMinut}`;
    return infoRealyDate;
  }
  let dateElement = document.querySelector("#dateCity");
  let infoNowTime = new Date();
  dateElement.innerHTML = dayWeek(infoNowTime);
  
  //let infoRealyDate = infoDay + " " + infoHour + ":" + infoMinut;
  
  //function showCity(event) {
  //event.preventDefault();
  //let inputCity = document.querySelector("#chooseCity");
  //document.getElementById("mainCity").innerHTML = inputCity.value;
  //}
  //let mCity = document.querySelector("#form");
  //mCity.addEventListener("submit", showCity);
  
  //let emojiCity = data.weather.icon;
  //let temperatureCity = Math.round(data.main.temp);
  //let humidityCity = data.main.humidity;
  //let windCity = data.wind.speed;
  //let emTempHumWind = emojiCity +temperatureCity +humidityCity +windCity;
  
  //return emTempHumWind;
  function showWeather(response) {
    document.querySelector("#mainCity").innerHTML = response.data.name;
    document.querySelector("#emojiCity").innerHTML =
      response.data.weather[0].icon;
    document.querySelector("#temperatureCity").innerHTML =
      Math.round(response.data.main.temp) + " °C";
    document.querySelector("#humidityCity").innerHTML =
      response.data.main.humidity + " %";
    document.querySelector("#windCity").innerHTML =
      Math.round(response.data.wind.speed) + " m/s";
  }
  
  function weatherCity(city) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeather);
  }
  
  function userSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#chooseSity").value;
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
  