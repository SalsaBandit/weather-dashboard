const cityInput = document.getElementById('city-input');
const form = document.getElementById('weather-form');
const statusElement = document.getElementById('status-container');

const weatherContainer = document.getElementById('weather-result');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const cityNameElement = document.getElementById('city-name');
const windSpeedElement = document.getElementById('wind-speed');

const apikey = "15f0d3f8be73eb957be7bd699d022eed";

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();
    if (city === '') {
        alert('Please enter a city name.');
        return;
    }

    statusElement.classList.add("hidden");
    weatherContainer.classList.add("hidden");
    
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        cityNameElement.textContent = data.name;
        temperatureElement.textContent = 'Temperature: ' + data.main.temp + ' °C';
        descriptionElement.textContent = 'Description: ' + data.weather[0].description;
        humidityElement.textContent = 'Humidity: ' + data.main.humidity + '%';
        windSpeedElement.textContent = 'Wind Speed: ' + data.wind.speed + ' m/s';

        weatherContainer.classList.remove("hidden");

    } catch (error) {
        statusElement.textContent = error.message;
        statusElement.classList.remove("hidden");
    }
});