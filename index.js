$(document).ready(function() {
    var currentDate = new Date().toLocaleDateString("en-GB");
    $("#currentDay").html("London " + "(" + currentDate + ")" + ' <i class="fas fa-cloud px-2 mb-3"></i>');

    var apiKey = "6f83c14a6bcce6889ecd90ad33b4ace6"; 
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather";
    var apiUrl2 = "https://api.openweathermap.org/data/2.5/forecast";

  // Initial city for demonstration
    var defaultCity = "London";

    var savedCities = [];

    // Function to fetch weather data
    function fetchWeather(city) {
      $.ajax({
        url: apiUrl,
        method: "GET",
        data: {
          q: city,
          appid: apiKey,
          units: "metric", // Use "imperial" for Fahrenheit
        },
        success: function (data) {
          // Update DOM with weather data
          $("#currentDay").html(`${data.name} (${dayjs().format("DD/MM/YYYY")})`);
          $(".currentIcon").attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png")
          $("#temp").text(`${data.main.temp} °C`);
          $("#wind").text(`${data.wind.speed} m/s`);
          $("#humidity").text(`${data.main.humidity}%`);
        },
        error: function () {
          alert("Error fetching weather data.");
        },
      });
    }

    // Initial fetch for the default city
    fetchWeather(defaultCity);


    // function for saving to localstorage
    function saveToLocal(cityName) {
      savedCities.push(cityName)

      localStorage.setItem("cities", JSON.stringify(savedCities))

    }

    function loadFromLocal() {
      // <button type="submit" class="btn btn-secondary mt search-button" id="search-button" aria-label="submit search">
      //       Berlin
      // </button>
      $("#history").html("")

      for(i = 0; i < savedCities.length; i++) {
        var newBtn = $("<button>");
        newBtn.text(savedCities[i])
        newBtn.attr("class", "btn btn-secondary mt search-button")
        $("#history").append(newBtn)
      }
    }

    loadFromLocal();

    // Event handler for the search button
    $("#search-button").on("click", function (event) {
      event.preventDefault();
      var searchInput = $("#search-input").val();
      if (searchInput.trim() !== "") {
        fetchWeather(searchInput);
        fetchForecast(searchInput);
        saveToLocal(searchInput)
        loadFromLocal()
      }
    });


    // Function to get 5-day forecast dates starting from tomorrow
  function getForecastDates() {
    var dates = [];
    var today = new Date();
    today.setDate(today.getDate() + 1); // Start from tomorrow

    for (var i = 0; i < 5; i++) {
      var forecastDate = new Date(today);
      forecastDate.setDate(today.getDate() + i);
      dates.push(forecastDate.toLocaleDateString("en-GB"));
    }

    return dates;
  }

  // Fetch function for forecast weather
  function fetchForecast(city) {
    $.ajax({
      url: apiUrl2,
      method: "GET",
      data: {
        q: city,
        appid: apiKey,
        units: "metric", // Use "imperial" for Fahrenheit
      },
      success: function (data) {
        console.log(data)
        // Update DOM with weather data
        $(".temp1").text(`${data.list[0].main.temp} °C`);
        $(".wind1").text(`${data.list[0].wind.speed} m/s`);
        $(".humidity1").text(`${data.list[0].main.humidity}%`);
        $(".icon1").attr("src", "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png")
        $(".temp2").text(`${data.list[8].main.temp} °C`);
        $(".wind2").text(`${data.list[8].wind.speed} m/s`);
        $(".humidity2").text(`${data.list[8].main.humidity}%`);
        $(".icon2").attr("src", "https://openweathermap.org/img/wn/" + data.list[8].weather[0].icon + "@2x.png")
        $(".temp3").text(`${data.list[16].main.temp} °C`);
        $(".wind3").text(`${data.list[16].wind.speed} m/s`);
        $(".humidity3").text(`${data.list[16].main.humidity}%`);
        $(".icon3").attr("src", "https://openweathermap.org/img/wn/" + data.list[16].weather[0].icon + "@2x.png")
        $(".temp4").text(`${data.list[24].main.temp} °C`);
        $(".wind4").text(`${data.list[24].wind.speed} m/s`);
        $(".humidity4").text(`${data.list[24].main.humidity}%`);
        $(".icon4").attr("src", "https://openweathermap.org/img/wn/" + data.list[24].weather[0].icon + "@2x.png")
        $(".temp5").text(`${data.list[32].main.temp} °C`);
        $(".wind5").text(`${data.list[32].wind.speed} m/s`);
        $(".humidity5").text(`${data.list[32].main.humidity}%`);
        $(".icon5").attr("src", "https://openweathermap.org/img/wn/" + data.list[32].weather[0].icon + "@2x.png")
      },
      error: function () {
        alert("Error fetching weather data.");
      },
    });
  }

  // Function to update the card titles with forecast dates
  function updateForecastDates() {
    var forecastDates = getForecastDates();

    // Update each card title with the forecast date
    $(".card-title").each(function (index, element) {
      $(element).text(forecastDates[index]);
    });
  }

  // Initial update of forecast dates
  updateForecastDates();
  
  });