var eventContainerEl = document.querySelector("#events-container");
var queryString = document.location.search;

var searchStrings = function(queryString) {
  //split string into key pairs
  var splitQuery = queryString.split("&");
  //extract city from city query parameter
  var cityString = splitQuery[0];
  var splitCity = cityString.split("=");
  var city = splitCity[1];
  //extract startDate from start parameter
  var startString = splitQuery[1];
  var splitStart = startString.split('=');
  var start = splitStart[1]
  //extract endDate from end parameter
  var endString = splitQuery[2]
  var splitEnd = endString.split("=");
  var end = splitEnd[1];
  console.log(city, start, end);

}

searchStrings(queryString);

// console.log(queryString.split("&"));

// var ticketObj = [{
//   eventDate:"2022-07-03",
//   eventName:"Ty Segall",
//   eventUrl:"https://www.ticketmaster.com/event/Z7r9jZ1AdG0q7",
//   },
//   {
//     eventName: "Ty Segall",
//     eventDate: "2022-07-04",
//     eventUrl: "https://www.ticketmaster.com/event/Z7r9jZ1AdFU1b",
// },
// {
//   eventDate:"2022-07-03",
//   eventName:"Ty Segall",
//   eventUrl:"https://www.ticketmaster.com/event/Z7r9jZ1AdG0q7",
//   },
//   {
//     eventName: "Ty Segall",
//     eventDate: "2022-07-04",
//     eventUrl: "https://www.ticketmaster.com/event/Z7r9jZ1AdFU1b",
// }];

var displayEvents = function(ticketObj) {
  for(var i = 0; i < ticketObj.length; i++) {

  var eventName = ticketObj[i].eventName;
  var eventDate = ticketObj[i].eventDate;
  var eventUrl = ticketObj[i].eventUrl;

    var eventEl = document.createElement("div");

    var nameEl = document.createElement("h2");
    nameEl.textContent = eventName;

    var dateEl = document.createElement("h3");
    dateEl.textContent = eventDate;

    var urlEl = document.createElement("h3");
    urlEl.textContent = eventUrl;

    eventEl.append(nameEl, dateEl, urlEl);

    eventContainerEl.appendChild(eventEl);
  }
};

// displayEvents(ticketObj);