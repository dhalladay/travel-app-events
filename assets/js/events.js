var eventContainerEl = document.querySelector("#events-container");
var queryString = document.location.search;
var eventClass = "row bg-dark rounded m-1 p-1 justify-content-between event-list";
var saveClass = "row bg-secondary rounded m-1 p-1 justify-content-between event-list";
// var page = 1;
// var totalPages = 0;
// var pageChangeObj = [];

// $('#page-up').on('click', function() {
//   if (page <= (totalPages - 1)) {
//     page++;
//     searchStrings(queryString);
//   }
// });

// $('#page-down').on('click', function() {
//   if (page > 1) {
//     page--;
//     searchStrings(queryString);
//   } else if (page = 0) {
//     page = 1;
//     searchStrings(queryString);
//   }
// });

//modal return button listener
$("#return-button").click(function (event) {
  event.preventDefault();
  window.location.href = "../index.html";
});

var searchStrings = function (queryString) {
  //split string into key pairs
  var splitQuery = queryString.split("&");
  //extract city from city query parameter
  var cityString = splitQuery[0];
  var splitCity = cityString.split("=");
  var citySearch = splitCity[1];
  //extract startDate from start parameter
  var startString = splitQuery[1];
  var splitStart = startString.split("=");
  var startSearch = moment(splitStart[1]).format("YYYY-MM-DD");
  //extract endDate from end parameter
  var endString = splitQuery[2];
  var splitEnd = endString.split("=");
  var endSearch = moment(splitEnd[1]).add(2, "days").format("YYYY-MM-DD");
  getEventsRepos(citySearch, startSearch, endSearch);
};

//create function to receive user input and search ticketmaster
var getEventsRepos = function (citySearch, startSearch, endSearch) {
  var city = citySearch;
  var start = startSearch;
  var end = endSearch;

  //ticketmaster API search with dynamic content
  var apiURL =
    "https://app.ticketmaster.com/discovery/v2/events.json?apikey=nmIDSJ3YAMVW3F9ZJYGySEgG4V1kQlCZ&city=" +
    city +
    "&startDateTime=" +
    start +
    "T03:00:00Z&endDateTime=" +
    end +
    "T00:00:00Z&sort=date,asc";

  //fetch request to ticketmaster
  fetch(apiURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          if (data.page.totalPages === 0) {
            $("#search-modal").modal("show");
          } else {
            var eventsArray = data._embedded.events;
            //send fetch data to function that will gather data needed for display  consol
            // displayPage(data.page.totalPages);
            createEventArray(eventsArray, start, end);
            getGeoCoord(citySearch);
            // console.log(page);
            // console.log(eventsArray);
          }
        });
      } else {
        $("#search-modal").modal("show");
      }
    })
    .catch(function (error) {
      $("#connect-modal").modal("show");
    });
};

//function to take api response data, modify it and send to display function
var createEventArray = function (eventsArray, start, end) {
  //create object to hold events
  var ticketObj = [];
  //create tempArr variable so events can be pushed to ticket array object
  tempArr = {};
  for (var i = 0; i < eventsArray.length; i++) {
    var eventName = eventsArray[i].name;
    var eventDate = eventsArray[i].dates.start.localDate;
    var eventUrl = eventsArray[i].url;
    //create variable for country code that can be sent to holiday API

    // var eventCountryCode=eventsArray[i]._embedded.venues[0].country.countryCode;
    tempArr = { eventName, eventDate, eventUrl };

    ticketObj.push(tempArr);
  }
  displayEvents(ticketObj);
};

// get OpenTripMap API
// get geo coordinates
var getGeoCoord = function (citySearch) {
  var cityInput = citySearch.replaceAll("+", " ");

  var geoUrl =
    "https://api.opentripmap.com/0.1/en/places/geoname?name=" +
    cityInput +
    "&apikey=5ae2e3f221c38a28845f05b622f8dc4db72d1ad73781713d40b42cea";

  fetch(geoUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        getTouristAttraction(data);
      });
    } else {
      console.log("Error: City Not Found");
    }
  });
};

// get tourist attractions
var getTouristAttraction = function (data) {
  var cityLat = data.lat;
  var cityLon = data.lon;

  var tourUrl =
    "https://api.opentripmap.com/0.1/en/places/radius?radius=100000&lon=" +
    cityLon +
    "&lat=" +
    cityLat +
    "&kinds=natural%2Cother%2Camusement_parks%2Cwater_parks%2Cmalls%2Crestaurants%2Cmuseums&rate=3&limit=20&apikey=5ae2e3f221c38a28845f05b622f8dc4db72d1ad73781713d40b42cea";

  fetch(tourUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        var place = data.features;
        displayTourism(place);
      });
    } else {
      console.log("Error: Tourist Attractions Not Found");
    }
  });
};

// display tourist attraction data
var tourismContainer = $("#tourism-container");
var tourismTitle = $("<h2>").text("Tourist Attractions").addClass("text-center");
var tourismContent = $("<div>").addClass("list-group");

var displayTourism = function (place) {
  for (var i = 0; i < place.length; i++) {
    var tourismList = $("<li>")
      .text(place[i].properties.name)
      .addClass("list-group-item ");
    tourismContent.append(tourismList);
  }

  tourismContainer.append(tourismTitle, tourismContent);
};

// display Events
var displayEvents = function (ticketObj) {
  for (var i = 0; i < ticketObj.length; i++) {
    var eventName = ticketObj[i].eventName;
    var eventDate = ticketObj[i].eventDate;
    var eventUrl = ticketObj[i].eventUrl;

    var eventContainer = document.createElement("ul");
    eventContainer.className = "container";

    var eventRow = document.createElement("li");
    eventRow.className = "row justify-content-between" + eventClass;

    var nameEl = document.createElement("h3");
    nameEl.className = "text-center name col-4";
    nameEl.textContent = eventName;

    var dateEl = document.createElement("p");
    nameEl.className = "text-center date col-4";
    dateEl.textContent = eventDate;

    var urlEl = document.createElement("a");
    nameEl.className = "text-center link col-4";
    urlEl.href = eventUrl;
    urlEl.setAttribute("target", "_blank");
    urlEl.textContent = "Go to Event";

    eventRow.append(nameEl, dateEl, urlEl);
    eventContainer.append(eventRow);

    eventContainerEl.appendChild(eventContainer);
  }
};

$("#events-container").on("click", function (event) {
  var event = event.target;

  $(event).closest("li").toggleClass("bg-dark bg-secondary");
});

// $("#tourism-container").on("click", function (event) {
//   var event = event.target;

//   $(event).closest("li").toggleClass("bg-secondary");
// });

var saveEvents = function(eventsArray) {
  localStorage.setItem("eventsArray",JSON.stringify(eventsArray));
  window.location.href = "./myTrips.html"
}

$("#save-btn").on("click", function () {
  var splitQuery = queryString.split("&");
  //extract city from city query parameter
  var cityString = splitQuery[0];
  var splitCity = cityString.split("=");
  var citySearch = splitCity[1];
  //extract startDate from start parameter
  var startString = splitQuery[1];
  var splitStart = startString.split("=");
  var startSearch = splitStart[1];
  //extract endDate from end parameter
  var endString = splitQuery[2];
  var splitEnd = endString.split("=");
  var endSearch = splitEnd[1];
  var eventsArray = [citySearch, startSearch, endSearch];
  var titleContent = $(".bg-secondary").children("h3");
  var paragraphContent = $(".bg-secondary").children("p");
  var urlContent = $(".bg-secondary").children("a");
  for (var i = 0; i < paragraphContent.length; i++) {
    var a = titleContent[i].textContent;
    var b = paragraphContent[i].textContent;
    var c = urlContent[i].href;
    var tempArray = [a, b, c];
    eventsArray.push(tempArray);
  }
  saveEvents(eventsArray)

});

searchStrings(queryString);

