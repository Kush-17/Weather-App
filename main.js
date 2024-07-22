const apiKey = "d8b48c4bb14afabfef7ac68396536fc5";
const url = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

document.querySelector(".search button").addEventListener("click", function() {
    const city = document.querySelector(".search input").value;
    console.log('City:', city); 
    if (city) {
        checkWeather(city);
    } else {
        console.error('City input is empty');
    }
});

const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const requestUrl = `${url}${city}&appid=${apiKey}`;
        console.log('Request URL:', requestUrl); 
        const response = await fetch(requestUrl);
        
        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            
        }
        const data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temperature").innerHTML = `${data.main.temp}°C`;
        document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
        document.querySelector(".wind").innerHTML = `${data.wind.speed} km/hr`;

         if(data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
         }
         else if(data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
         }
         else if(data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
         }
         else if(data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
         }
         else if(data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
         }
         else if(data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png";
         }

         document.querySelector(".weather").style.display = "block";
         document.querySelector(".error").style.display = "none";
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}
