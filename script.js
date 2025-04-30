const apiKey = "9d94cb3e9785333f1be82c0a0066951d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherContainer = document.querySelector(".weather");
const errorContainer = document.querySelector(".error");

// Weather icon mapping
const weatherIcons = {
  "Clouds": "cloudy.png",
  "Clear": "clear.png",
  "Rain": "rain.png",
  "Drizzle": "drizzle.png",
  "Mist": "mist.png",
  "Snow": "snow.png",
  "Thunderstorm": "thunderstorm.png"
};

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if (!response.ok) {
      throw new Error("City not found");
    }
    
    const data = await response.json();
    
    // Update weather data
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
    document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;
    
    // Set weather icon
    const weatherMain = data.weather[0].main;
    weatherIcon.src = `images/${weatherIcons[weatherMain] || "unknown.png"}`;
    
    // Change background based on weather
    changeBackground(weatherMain);
    
    // Show weather and hide error
    weatherContainer.style.display = "block";
    errorContainer.style.display = "none";
    
  } catch (error) {
    errorContainer.textContent = "City not found. Please try again.";
    errorContainer.style.display = "block";
    weatherContainer.style.display = "none";
  }
}

function changeBackground(weatherCondition) {
  const backgrounds = {
    "Clear": "linear-gradient(135deg, #4361ee, #3a0ca3)",
    "Clouds": "linear-gradient(135deg, #6c757d, #495057)",
    "Rain": "linear-gradient(135deg, #1a759f, #184e77)",
    "Drizzle": "linear-gradient(135deg, #4cc9f0, #4895ef)",
    "Thunderstorm": "linear-gradient(135deg, #7209b7, #560bad)",
    "Snow": "linear-gradient(135deg, #caf0f8, #90e0ef)",
    "default": "linear-gradient(135deg, #4361ee, #3a0ca3)"
  };
  
  document.body.style.background = backgrounds[weatherCondition] || backgrounds.default;
  document.body.style.transition = "background 1s ease";
}

// Event listeners
searchBtn.addEventListener("click", () => {
  if (searchBox.value.trim()) {
    checkWeather(searchBox.value.trim());
  }
});

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && searchBox.value.trim()) {
    checkWeather(searchBox.value.trim());
  }
});

// Initial load with default city
checkWeather("Agadir");