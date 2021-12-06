var cityNameInput = document.querySelector("#city-input");
var startDateInput = document.querySelector("#start-date-input");
var endDateInput = document.querySelector("#end-date-input");

$('#submit-trip').click(function(event) {
  event.preventDefault();
  if (!cityNameInput.value || !startDateInput.value || !endDateInput.value) {
    alert("Missing search data");
  } else {
    var citySearch = cityNameInput.value
    .trim()
    .toLowerCase()
    .replaceAll(" ", "+");
    var startSearch = startDateInput.value;
    var endSearch = endDateInput.value;
    window.location.href = "./HTML/events.html?city=" + citySearch + "&startDate=" + startSearch + "&endDate=" + endSearch;  
  };
});
 
//plan a trip 
//opens a modal
//user enters city, start and end date
//event listener on modal submit button
//gather city name, start date, end date, county code and create an array
//plug the array data into a api fetch requests (holiday and ticketmaster)


//pass info from ticket master and holiday functions to create the events display page


//today
//open modal
//user can enter city
//event listener on modal submit button
//gather city name and today's date and country code to create an arry
//plug the array data into a api functions (holiday and ticketmaster )
//pass info from ticket master and holiday functions to create the events display page


//display page
//dynamically create notification card for the holiday
  //says it is <holiday> in <city>
//dynamically created ticket master events listed
  //show the name, date, price
//user can select events they are interest in 
//ability to add their own events, free form text field and date
//event listener on the display page to save to trips, takes them to my trips page

//my trips page
//shows them all the events they selected or created in a card
//display any other events they created
//plus icon will take them to plan a trip modal and functionality
// splay any other events they created
//plus icon will take them to plan a trip modal and functionality