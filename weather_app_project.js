const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".city-inp");
const card = document.querySelector(".card");
const apiKey = "534d8d73ff613602e55d2233263d10f3";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeaterInfo(weatherData);
    } catch (error) {
      console.log(error);
      displayError(error);
    }
  } else {
    displayError("Please Enter City Name");
  }
});

async function getWeatherData(city) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiURL);
  if (!response.ok) {
    throw new Error("Could not fetch data");
  }
  return await response.json();
}

function displayWeaterInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  cityDisplay.classList.add("cityDisplay");
  card.appendChild(cityDisplay);

  tempDisplay.textContent = `${(temp - 273.15).toFixed(0)}°C`;
  tempDisplay.classList.add("tempDisplay");
  card.appendChild(tempDisplay);

  humidityDisplay.textContent = `Humidity : ${humidity}`;
  humidityDisplay.classList.add("humiditiyDisplay");
  card.appendChild(humidityDisplay);

  descDisplay.textContent = description;
  descDisplay.classList.add("descDisplay");
  card.appendChild(descDisplay);

  weatherEmoji.textContent = getWeatherEmoji();
  weatherEmoji.classList.add("weatherEmoji");
  card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
  switch(true){
    case(weatherId >= 200 && weatherId < 300):
    return "⛈️";
    case(weatherId >= 300 && weatherId < 400):
    return "🌧️";
    case(weatherId >= 500 && weatherId < 600):
    return "🌧️";
    case(weatherId >= 600 && weatherId < 700):
    return "❄️";
    case(weatherId >= 700 && weatherId < 800):
    return "🌫️";
    case(weatherId === 800):
    return "☀️";
    case(weatherId >= 801 && weatherId < 810):
    return "☁️";
    default:
      return "☀️"
  }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
