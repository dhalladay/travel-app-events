//declare event listeners
var cityNameInput = document.querySelector("#city-input");
var startDateInput = document.querySelector("#start-date-input");
var endDateInput = document.querySelector("#end-date-input");
var currentCityInput = document.querySelector("#current-city");
var futureCityInput = document.querySelector("#future-city");
var futureDateInput = document.querySelector("#future-date");
var page = 1;

$("#start-date-input").datepicker({
  minDate: 0,
});

$("#end-date-input").datepicker({
  minDate: 0
});

//need to add functionality to return to homepage if search fails or strings empty
$('#submit-trip').click(function(event) {
  event.preventDefault();
  if (!cityNameInput.value || !startDateInput.value) {
    $("#missing-param-modal").modal("show");
  } else if (cityNameInput.value && startDateInput.value && !endDateInput.value) {
    var citySearch = cityNameInput.value
    .trim()
    .toLowerCase()
    .replaceAll(" ", "+");
    var startSearch = moment(startDateInput.value).format("YYYY-MM-DD");
    //add a day to end date as ticketmaster api uses events BEFORE end date query parameter
    var endSearch = moment(startDateInput.value).format("YYYY-MM-DD");
    window.location.href = "./HTML/events.html?city=" + citySearch + "&startDate=" + startSearch + "&endDate=" + endSearch;
  } else if (startSearch > endSearch) {
    $("#date-order-modal").modal("show");
  } else {
    var citySearch = cityNameInput.value
      .trim()
      .toLowerCase()
      .replaceAll(" ", "+");
    var startSearch = moment(startDateInput.value).format("YYYY-MM-DD");
    //add a day to end date as ticketmaster api uses events BEFORE end date query parameter

    var endSearch = moment(endDateInput.value).format("YYYY-MM-DD");
    window.location.href = "./HTML/events.html?city=" + citySearch + "&startDate=" + startSearch + "&endDate=" + endSearch;  
  };
});




