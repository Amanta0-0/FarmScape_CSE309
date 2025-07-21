document.getElementById('fetchWeatherBtn').addEventListener('click', function () {
  const location = document.getElementById('locationInput').value.trim();
  const date = document.getElementById('dateInput').value; // Currently unused but reserved for future

  if (!location) {
    alert('Please enter a location.');
    return;
  }

  const apiKey = '1814755da2ba1530cb656bfc1ab77121'; // Replace with your real API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Weather data not found for the specified location.');
      }
      return response.json();
    })
    .then(data => {
      const temp = data.main.temp;
      const description = data.weather[0].description.toLowerCase();
      const humidity = data.main.humidity;
      const wind = data.wind.speed;

      document.getElementById('weatherDetails').innerHTML =
        `Temperature: ${temp} °C<br>` +
        `Condition: ${description.charAt(0).toUpperCase() + description.slice(1)}<br>` +
        `Humidity: ${humidity}%<br>` +
        `Wind Speed: ${wind} m/s`;

      let suggestions = '';

      if (description.includes('rain')) {
        suggestions += '- Delay watering crops.<br>';
      } else {
        suggestions += '- Proceed with normal watering.<br>';
      }

      if (temp > 32) {
        suggestions += '- Provide shade for sensitive plants.<br>';
      }

      if (wind > 8) {
        suggestions += '- Secure tall plants or structures.<br>';
      }

      if (humidity > 80) {
        suggestions += '- Watch for fungal diseases.<br>';
      }

      if (!suggestions) {
        suggestions = 'No specific suggestions at this time.';
      }

      document.getElementById('activitySuggestions').innerHTML = suggestions;
    })
    .catch(error => {
      console.error(error);
      document.getElementById('weatherDetails').textContent = 'Failed to fetch weather data. Please try again later.';
      document.getElementById('activitySuggestions').textContent = 'No suggestions available.';
    });
});
