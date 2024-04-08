function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  

 cityElement.innerHTML = response.data.city;
 timeElement.innerHTML = formatDate(date);
 descriptionElement.innerHTML = response.data.condition.description;
 humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
 windspeedElement.innerHTML = `${response.data.wind.speed}km/h`;
 temperatureElement.innerHTML = Math.round(temperature);
 icon.innerHTML =`<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;

 getForecast(response.data.city);

}

 function formatDate(date) {
  
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day = days[date.getDay()];


if (minutes < 10) {
  minutes = `0${minutes}`;
}


  return `${day} ${hours}:${minutes}`;
}


function searchCity(city) {
  let apiKey = "013c2b91f3a4o14fc7369c10t4e1ea91";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiURL).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-form-input");
  
  searchCity(searchInput.value);
}
function formatDay(timestamp) {
  let date = new Date (timestamp * 1000);
  let days = ["Sun","Mon","Tue","Wed","Thur","Fri" ,"Sat"];

  return days[date.getDay()];
}

 function getForecast(city) {
 let apiKey = "013c2b91f3a4o14fc7369c10t4e1ea91";
 let apiURL =`https://api.shecodes.io/weather/v1/forecast?query=${city}&lat=&key=${apiKey}&units=metric`;
   axios(apiURL).then(displayForecast);
   console.log(apiURL);
 }

  function displayForecast(response) {

    let forecastHTML = ""; 

    response.data.daily.forEach(function (day, index) {
      if(index < 5){
      forecastHTML =
        forecastHTML +
        `
          <div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <div class="weather-forecast-icon">
           <img src="${day.condition.icon_url}"/>
            </div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>${Math.round(day.temperature.maximum)}º</strong>
              </div>
               <div class="weather-forecast-temperature">${Math.round(
                 day.temperature.minimum
               )}°</div>
              </div>
            </div>
          </div>
        `;
        }
    });

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHTML; 
  }


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");
 



