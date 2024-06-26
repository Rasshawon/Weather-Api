let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");
let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");
let searchCity = document.querySelector(".weather_search");
let citySearchName = document.querySelector(".city_name"); //we can use it inside searchCity.addEventListener func 18no line

let city = "Dhaka";
searchCity.addEventListener("submit", (e) => {
  e.preventDefault();
  city = citySearchName.value;
  getWeatherData();
  cityName.value = "";
});

//get country name
const getCountryName = (code) => {
  const regionNamesInEnglish = new Intl.DisplayNames([code], {
    type: "region",
  }).of(code);
  return regionNamesInEnglish;
};
//get date and time
const getDateTime = (dt) => {
  const currDate = new Date(dt * 1000);
  console.log(currDate);
  const timeMenu = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const dateTimeFormat = new Intl.DateTimeFormat("en-US", timeMenu).format(
    currDate
  );
  return dateTimeFormat;
};
const getWeatherData = async () => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=9162902ae6d14c1f26646c960581dbe8`;
  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();

    console.log(data);
    const { dt, main, name, sys, weather, wind } = data;
    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);
    w_temperature.innerHTML = `${main.temp}&#176`;
    w_minTem.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;
    w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`;
    w_feelsLike.innerHTML = `${main.feels_like.toFixed(2)}&#176`;
    w_humidity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    w_pressure.innerHTML = `${main.pressure} hPa`;
    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;
  } catch (error) {
    console.log(error);
  }
};

document.body.addEventListener("load", getWeatherData());
