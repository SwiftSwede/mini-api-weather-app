async function getWeather(location) {
  const apiKey = "2UXHDJVTNLSFFLUB36X3FVPRH"; // Replace with your actual API key
  const endpoint = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=2UXHDJVTNLSFFLUB36X3FVPRH`;

  const response = await fetch(endpoint); // Use fetch to make the request
  if (!response.ok) {
    throw new Error("Location not found"); // Throw an error if the response is not ok
  }
  return await response.json(); // Parse the response as JSON
}

async function fetchWeather() {
  const location = document.getElementById("locationInput").value;
  if (location) {
    try {
      const weatherData = await getWeather(location);
      console.log(weatherData);
      displayWeather(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  } else {
    alert("Please enter a location!");
  }
}

function displayWeather(weatherData) {
  const weatherDisplay = document.getElementById("weatherDisplay");
  const temperature = (
    ((weatherData.currentConditions.temp - 32) * 5) /
    9
  ).toFixed(1);
  const condition = weatherData.currentConditions.conditions;
  weatherDisplay.innerHTML = `
  <p>Location: ${weatherData.resolvedAddress}</p>
  <p>Temperature: ${temperature}°C</p>
  <p>Condition: ${condition}</p>
  `;

  weatherDisplay.classList.add("visible");
}
