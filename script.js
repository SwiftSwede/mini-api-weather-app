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
  const weatherDisplay = document.getElementById("weatherDisplay");
  if (location) {
    weatherDisplay.style.display = "flex";
    weatherDisplay.innerHTML = `
    <div>
      <div class="spinnerContainer">
      <p>Loading...</p>
       <div class="spinner">
       </div>
      </div>
    </div>
  `;
    try {
      const weatherData = await getWeather(location);
      console.log(weatherData);
      displayWeather(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      weatherDisplay.innerHTML =
        "<p>Error fetching weather data. Please try again.</p>";
    }
  } else {
    alert("Please enter a location!");
  }
}

function displayWeather(weatherData) {
  const weatherDisplay = document.getElementById("weatherDisplay");
  const weatherText = document.getElementById("weatherText");
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

const img = document.querySelector("img");

/*
1. Await doesn't work on global scope, so we must wrap it in a function
2. We must assign await responses to variables in order to use them
3. We need to call the function in order to use the data our async function got
*/
// async function getCats() {
//   const response = await fetch(
//     "https://api.giphy.com/v1/gifs/translate?api_key=C6sa12xa3W0bcC4vLy2SztWnUuxlfIvQ&s=cats",
//     {
//       mode: "cors",
//     }
//   );
//   const catData = await response.json();
//   img.src = catData.data.images.original.url;
// }

// getCats();
