//declare event listeners
var cityNameInput = document.querySelector("#city-input");
var startDateInput = document.querySelector("#start-date-input");
var endDateInput = document.querySelector("#end-date-input");
var currentCityInput = document.querySelector("#current-city");
var futureCityInput = document.querySelector("#future-city");
var futureDateInput = document.querySelector("#future-date");

$("#start-date-input").datepicker({
  minDate: 0,
});

$("#end-date-input").datepicker({
  minDate: 0
});

//need to add functionality to return to homepage if search fails or strings empty
$("#submit-trip").click(function (event) {
  event.preventDefault();
  if (!cityNameInput.value || !startDateInput.value || !endDateInput.value) {
    $("#missing-param-modal").modal("show");
  } else if (startDateInput.value > endDateInput.value) {
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


  //search today's events eventlistener
//   $("#find-today-events").click(function (event) {
//     event.preventDefault();
//     if (!currentCityInput.value) {
//       $("#missing-param-modal").modal("show");
//     } else {
//       //city search formatting
//       var citySearch = currentCityInput.value
//         .trim()
//         .toLowerCase()
//         .replaceAll(" ", "+");
//       //get todays date and format
//       var startSearch = moment(new Date()).format("YYYY-MM-DD");
//       //get next days date and format
//       var endSearch = moment(startSearch).add(2, "days").format("YYYY-MM-DD");
//       //send to events page
//       // console.log(citySearch, startSearch, endSearch);
//       window.location.href =
//         "./HTML/events.html?city=" +
//         citySearch +
//         "&startDate=" +
//         startSearch +
//         "&endDate=" +
//         endSearch;
//     }
//   });


// //search for future events on a single day eventlistener
// $('#find-future-events').click(function(event) {
//   event.preventDefault();
//   if (!futureCityInput.value || !futureDateInput.value) {
//     $("#missing-param-modal").modal("show");
//   } else {
//     //get city and format
//     var citySearch = futureCityInput.value
//     .trim()
//     .toLowerCase()
//     .replaceAll(" ", "+");
//     //get future date
//     var startSearch = futureDateInput.value;
//     //get next days date for search
//     var endSearch = moment(futureDateInput.value).add(2, 'days').format('YYYY-MM-DD');
//     // console.log(citySearch, startSearch, endSearch);
//     window.location.href = "./HTML/events.html?city=" + citySearch + "&startDate=" + startSearch + "&endDate=" + endSearch;  
//   };
// });



