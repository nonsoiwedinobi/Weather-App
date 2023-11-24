$(document).ready(function() {
    var currentDate = new Date().toLocaleDateString("en-GB");
    $("#currentDay").html("London " + "(" + currentDate + ")" + ' <i class="fas fa-cloud px-2 mb-3"></i>');

    var apiKey = "6f83c14a6bcce6889ecd90ad33b4ace6"; 
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  // Initial city for demonstration
    var defaultCity = "London";

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
          $("#currentDay").html(`${data.name} (${dayjs().format("DD/MM/YYYY")}) <i class="fas fa-cloud px-2 mb-3"></i>`);
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

    // Event handler for the search button
    $("#search-button").on("click", function (event) {
      event.preventDefault();
      var searchInput = $("#search-input").val();
      if (searchInput.trim() !== "") {
        fetchWeather(searchInput);
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