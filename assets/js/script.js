
//declare event listeners
var cityNameInput = document.querySelector("#city-input");
var startDateInput = document.querySelector("#start-date-input");
var endDateInput = document.querySelector("#end-date-input");
var currentCityInput = document.querySelector("#current-city");
var futureCityInput = document.querySelector("#future-city");
var futureDateInput = document.querySelector("#future-date");

//need to add functionality to return to homepage if search fails or strings empty
$('#submit-trip').click(function(event) {
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
    var startSearch = startDateInput.value;
    //add a day to end date as ticketmaster api uses events BEFORE end date query parameter
    var endSearch = moment(endDateInput.value).add(2, 'days').format("YYYY-MM-DD");
    window.location.href = "./HTML/events.html?city=" + citySearch + "&startDate=" + startSearch + "&endDate=" + endSearch;  


var ticketObj = [{
  eventDate:"2022-07-03",
  eventName:"Ty Segall",
  eventUrl:"https://www.ticketmaster.com/event/Z7r9jZ1AdG0q7",
}];

ticketObj[0].eventName

ticketObj[0].eventDate

ticketObj[0].eventUrl

var displayEvents = function(ticketObj, events) {
  console.log(ticketObj);
  console.log(events);
};

var array = {
  city: "denver",
  startDate: "2022-07-04",
  month: "07",
  year: "2022",
  endDate: "2022-07-06",
  country: "US",
};

// Returns an array of dates between the two dates
let startDate = moment(array.startDate);
let endDate = moment(array.endDate);
let datesArray = [];

for (var m = moment(startDate); m.isSameOrBefore(endDate); m.add(1, "days")) {
  datesArray.push(m.format("YYYY-MM-DD"));
}

console.log(datesArray);

// get holiday API
var getHoliday = function () {
  for (var i = 0; datesArray.length; i++) {
    // setTimeout(function () {
      var holidayUrl =
        "https://holidays.abstractapi.com/v1/?api_key=914c5cd8cbee4eac81585b5ed13d510d&country=" +
        array.country +
        "&year=" +
        datesArray[i].split("-")[0] +
        "&month=" +
        datesArray[i].split("-")[1] +
        "&day=" +
        datesArray[i].split("-")[2];

      fetch(holidayUrl).then(function (response) {
        response.json().then(function (data) {
          console.log(data);
        });
      });
    // }, 1000);
  }
};
getHoliday();


// fetch(holidayUrl)
//   .then(function (response) {
//     if (response.ok) {
//       response.json().then(function (data) {
//         console.log(data);
//       });
//     } else {
//       console.log("No holiday found");
//     }
//   })
//   .catch(function (error) {
//     alert("Unable to connect to Abstract holiday API");
//   });
//var array will have city name, start and end dates
var array={
  city:"denver",
  startDate:"2022-07-03",
  endDate:"2022-07-05",
  country: "US"
};

var holidaySearch = {
  startDate:"2022-07-03",
  endDate:"2022-07-05",
  country: "US"
};

//create function to receive user input and search ticketmaster
var getEventsRepos = function(array) {
  var city = array.city;
  var start = array.startDate;
  var end = array.endDate;
  //ticketmaster API search with dynamic content
  var apiURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=nmIDSJ3YAMVW3F9ZJYGySEgG4V1kQlCZ&city=" + city + "&startDateTime=" + start + "T12:00:00Z&endDateTime=" + end + "T23:59:00Z&sort=date,asc";
  
  //fetch request to ticketmaster
  fetch(apiURL)
  .then(function(response) {
    if(response.ok) {
      response.json().then(function(data) {
        console.log(data.page.totalPages === 0);
        if (data.page.totalPages === 0) {
          $("#search-modal").modal("show");
        } else {
        var eventsArray = data._embedded.events;
        //send fetch data to function that will gather data needed for display
        createEventArray(eventsArray);
        }
      });
    } else {
      $("#search-modal").modal("show");
    }
  }) 
  .catch(function(error) {
      console.log("unable to connect");
      $("#connect-modal").modal("show");
  });

  };
});

//search today's events eventlistener
$('#find-today-events').click(function(event) {
  event.preventDefault();
  if (!currentCityInput.value) {
    $("#missing-param-modal").modal("show");
  } else {
    //city search formatting
    var citySearch = currentCityInput.value
    .trim()
    .toLowerCase()
    .replaceAll(" ", "+");
    //get todays date and format
    var startSearch = moment(new Date()).format("YYYY-MM-DD");
    //get next days date and format
    var endSearch = moment(startSearch).add(2, 'days').format("YYYY-MM-DD");
    //send to events page
    // console.log(citySearch, startSearch, endSearch);
    window.location.href = "./HTML/events.html?city=" + citySearch + "&startDate=" + startSearch + "&endDate=" + endSearch;  
  };
});

//search for future events on a single day eventlistener
$('#find-future-events').click(function(event) {
  event.preventDefault();
  if (!futureCityInput.value || !futureDateInput.value) {
    $("#missing-param-modal").modal("show");
  } else {
    //get city and format
    var citySearch = futureCityInput.value
    .trim()
    .toLowerCase()
    .replaceAll(" ", "+");
    //get future date
    var startSearch = futureDateInput.value;
    //get next days date for search
    var endSearch = moment(futureDateInput.value).add(2, 'days').format('YYYY-MM-DD');
    // console.log(citySearch, startSearch, endSearch);
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