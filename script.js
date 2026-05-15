const cityInput = document.getElementById('city-input');
const form = document.getElementById('weather-form');
const statusElement = document.getElementById('status-container');

const weatherContainer = document.getElementById('weather-result');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const cityNameElement = document.getElementById('city-name');
const windSpeedElement = document.getElementById('wind-speed');

const forecastContainer = document.getElementById('forecast-container');
const forecastCard = document.getElementById('forecast-cards');

const apikey = "15f0d3f8be73eb957be7bd699d022eed";

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();
    if (city === '') {
        alert('Please enter a city name.');
        return;
    }
    
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        cityNameElement.textContent = data.name;
        temperatureElement.textContent = data.main.temp + ' °C';
        descriptionElement.textContent = data.weather[0].description;
        humidityElement.textContent = data.main.humidity + '%';
        windSpeedElement.textContent = data.wind.speed + ' m/s';
        statusElement.classList.add('hidden');

        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`);
        if (!forecastResponse.ok) {
            throw new Error('Forecast data not found');
        }
        const forecastData = await forecastResponse.json();
        forecastCard.innerHTML = '';
        for (let i = 0; i < forecastData.list.length; i += 8) {
            const forecast = forecastData.list[i];
            const date = new Date(forecast.dt * 1000);
            const options = { weekday: 'long', month: 'short', day: 'numeric' };
            const dateString = date.toLocaleDateString(undefined, options);
            const card = document.createElement('div');
            card.classList.add('forecast-card');
            card.innerHTML = `
                <h3>${dateString}</h3>
                <p>Temp: ${forecast.main.temp} °C</p>
                <p>${forecast.weather[0].description}</p>
                <p>Humidity: ${forecast.main.humidity}%</p>
                <p>Wind: ${forecast.wind.speed} m/s</p>
            `;
            forecastCard.appendChild(card);
        }


    } catch (error) {
        statusElement.textContent = error.message;
        statusElement.classList.remove('hidden');
    }
});