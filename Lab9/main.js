let weather = {
  apiKey: "cb263a9ed6988851a2ee09f0fe224e91",
  weatherArray:[],
  
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    console.log(name, icon, description, temp, humidity);
    let divTag = ` <div id="${name.toLowerCase()}" class="weather loading">
    <h1 class="city">Weather in ${name}</h1>
    <h2 class="temp">${temp} °C </h2>
    <div class="flex">
      <img src="http://openweathermap.org/img/wn/${icon}.png" alt="" class="icon" />
      
      <p class="description">${description}</p>
    </div>
    <p class="humidity">Humidity: ${humidity}% </p>
  </div> `;
  if(this.weatherArray.length>9){
    const deleted = this.weatherArray.shift();
    document.querySelector("#"+deleted).remove();
    
  }
    //document.querySelector("#weathers").innerHTML+=divTag
    document.querySelector("#weathers").innerHTML = divTag + document.querySelector("#weathers").innerHTML

    this.weatherArray.push(name.toLowerCase());

    localStorage.setItem("weathers", JSON.stringify(this.weatherArray));
   

  },
  search: function () {
    const searchBar=document.querySelector(".search-bar").value;
    if (this.weatherArray.includes(searchBar)) {
      alert("To miasto już było")

    } else {
      this.fetchWeather(searchBar);
    }
  },
};
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") weather.search();
  });
  const zmienna = JSON.parse(localStorage.getItem("weathers") || "[]")
  zmienna.forEach(element => {
    weather.fetchWeather(element);
  });
