var eventContainerEl = document.querySelector("#events-container");
var holidayContainerEl = document.querySelector("#holiday-container");
var queryString = document.location.search;
var eventClass = "row bg-dark rounded m-1 p-1 justify-content-between";
var saveClass = "row bg-secondary rounded m-1 p-1 justify-content-between"

//modal return button listener
$('#return-button').click(function(event) {
  event.preventDefault();
  window.location.href = "../index.html";
});


var searchStrings = function(queryString) {
  //split string into key pairs
  var splitQuery = queryString.split("&");
  //extract city from city query parameter
  var cityString = splitQuery[0];
  var splitCity = cityString.split("=");
  var citySearch = splitCity[1];
  //extract startDate from start parameter
  var startString = splitQuery[1];
  var splitStart = startString.split('=');
  var startSearch = splitStart[1]
  //extract endDate from end parameter
  var endString = splitQuery[2]
  var splitEnd = endString.split("=");
  var endSearch = splitEnd[1];
  // getEventsRepos(citySearch, startSearch, endSearch);
  getEventsRepos(citySearch, startSearch, endSearch);
}

//create function to receive user input and search ticketmaster
var getEventsRepos = function(citySearch, startSearch, endSearch) {
  var city = citySearch
  var start = startSearch;
  var end = endSearch;
  //ticketmaster API search with dynamic content
  var apiURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=nmIDSJ3YAMVW3F9ZJYGySEgG4V1kQlCZ&city=" + city + "&startDateTime=" + start + "T03:00:00Z&endDateTime=" + end + "T00:00:00Z&sort=date,asc";
  
  //fetch request to ticketmaster
  fetch(apiURL)
  .then(function(response) {
    if(response.ok) {
      response.json().then(function(data) {
        if (data.page.totalPages === 0) {
          $("#search-modal").modal("show");
        } else {
          var eventsArray = data._embedded.events;
          //send fetch data to function that will gather data needed for display  consol
          console.log(eventsArray);
          createEventArray(eventsArray, start, end);
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

//function to take api response data, modify it and send to display function
var createEventArray = function(eventsArray, start, end) {
  //create object to hold events
  var ticketObj = [];
  //create tempArr variable so events can be pushed to ticket array object
  tempArr = {};
  for (var i=0; i < eventsArray.length; i++) {
    var eventName=eventsArray[i].name;
    var eventDate=eventsArray[i].dates.start.localDate;
    var eventUrl=eventsArray[i].url;
    //create variable for country code that can be sent to holiday API
    var eventCountryCode=eventsArray[i]._embedded.venues[0].country.countryCode;
    tempArr = {eventName,eventDate,eventUrl};
    ticketObj.push(tempArr);
  }
  displayEvents(ticketObj);
  getHoliday(eventCountryCode, start, end);
};
  
  var displayEvents = function(ticketObj) {
    for(var i = 0; i < ticketObj.length; i++) {
      
      var eventName = ticketObj[i].eventName;
      var eventDate = ticketObj[i].eventDate;
      var eventUrl = ticketObj[i].eventUrl;

      var eventContainer = document.createElement("section");
      eventContainer.className = "container";
      
      var eventRow = document.createElement("div");
      eventRow.className = eventClass;
            
      var nameEl = document.createElement("p");
      nameEl.className = "text-center";
      nameEl.textContent = eventName;
      
      var dateEl = document.createElement("p");
      nameEl.className = "text-center";
      dateEl.textContent = eventDate;
      
      var urlEl = document.createElement("a");
      nameEl.className = "text-center";
      urlEl.href = eventUrl
      urlEl.textContent = "Go to Event";
      
      eventRow.append(nameEl, dateEl, urlEl);
      eventContainer.append(eventRow);

      
      eventContainerEl.appendChild(eventContainer);
    }
};

$("#events-container").on('click', function(event) {
  var event=event.target;
  $(event).closest("div").toggleClass("bg-dark bg-secondary")
});

 // get holiday API
 var getHoliday = function (eventCountryCode, start, end) {
  // Returns an array of dates between the two dates
  let startDate = moment(start);
  let endDate = moment(end);
  let datesArray = [];
  
  for (var m = moment(startDate); m.isSameOrBefore(endDate); m.add(1, "days")) {
    datesArray.push(m.format("YYYY-MM-DD"));
  }
  
  console.log(datesArray);
//   for (var i = 0; datesArray.length; i++) {
//     // setTimeout(function () {
//       var holidayUrl =
//         "https://holidays.abstractapi.com/v1/?api_key=914c5cd8cbee4eac81585b5ed13d510d&country=" +
//         eventCountryCode +
//         "&year=" +
//         datesArray[i].split("-")[0] +
//         "&month=" +
//         datesArray[i].split("-")[1] +
//         "&day=" +
//         datesArray[i].split("-")[2];

//       fetch(holidayUrl).then(function (response) {
//         response.json().then(function (data) {
//           console.log(data);
//         });
//       });
//     // }, 1000);
//   }
};
// getHoliday();


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

// var displayHoliday = function() {
//   for(var i = 0; i < ticketObj.length; i++) {
    
//     var eventName = ticketObj[i].eventName;
//     var eventDate = ticketObj[i].eventDate;
//     var eventUrl = ticketObj[i].eventUrl;
    
//     var eventEl = document.createElement("div");
    
//     var nameEl = document.createElement("h2");
//     nameEl.textContent = eventName;
    
//     var dateEl = document.createElement("h3");
//     dateEl.textContent = eventDate;
    
//     var urlEl = document.createElement("h3");
//     urlEl.textContent = eventUrl;
    
//     eventEl.append(nameEl, dateEl, urlEl);

//   eventContainerEl.appendChild(eventEl);
// }
// };

searchStrings(queryString);