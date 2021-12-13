var eventContainerEl = document.querySelector("#events-container");
var queryString = document.location.search;
var eventClass = "row bg-dark rounded m-1 p-1 justify-content-between";
var saveClass = "row bg-secondary rounded m-1 p-1 justify-content-between";

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
  var endSearch = moment(splitEnd[1]).add(2, 'days').format("YYYY-MM-DD");
  getEventsRepos(citySearch, startSearch, endSearch);
};


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
          // console.log(eventsArray);
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
    // var eventCountryCode=eventsArray[i]._embedded.venues[0].country.countryCode;
    tempArr = {eventName,eventDate,eventUrl};
    ticketObj.push(tempArr);
  }
  displayEvents(ticketObj);
};

var displayEvents = function(ticketObj) {
  for(var i = 0; i < ticketObj.length; i++) {
    
    var eventName = ticketObj[i].eventName;
    var eventDate = ticketObj[i].eventDate;
      var eventUrl = ticketObj[i].eventUrl;
      
      var eventContainer = document.createElement("ul");
      eventContainer.className = "container";
      
      var eventRow = document.createElement("li");
      eventRow.className = eventClass;
            
      var nameEl = document.createElement("h3");
      nameEl.className = "text-center name";
      nameEl.textContent = eventName;
      
      var dateEl = document.createElement("p");
      nameEl.className = "text-center date";
      dateEl.textContent = eventDate;
      
      var urlEl = document.createElement("a");
      nameEl.className = "text-center link";
      urlEl.href = eventUrl
      urlEl.textContent = "Go to Event";
      
      eventRow.append(nameEl, dateEl, urlEl);
      eventContainer.append(eventRow);
      
      
      eventContainerEl.appendChild(eventContainer);
    }
};

$("#events-container").on('click', function(event) {
  var event=event.target;
  $(event).closest("li").toggleClass("bg-dark bg-secondary");
});

$('#save-btn').on('click', function() {
  
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
  var eventsArray = [citySearch, startSearch, endSearch];
  var titleContent = $('.bg-secondary').children("h3");
  var paragraphContent = $('.bg-secondary').children("p");
  var urlContent = $('.bg-secondary').children("a");
  for (var i=0; i < paragraphContent.length; i++) {
    var a = titleContent[i].textContent;
    var b = paragraphContent[i].textContent;
    var c = urlContent[i].href;
    var tempArray = [a, b, c]
    eventsArray.push(tempArray);
  }
  console.log(eventsArray);

  localStorage.eventsArray = JSON.stringify(eventsArray);
});

      searchStrings(queryString);