//var array will have city name, start and end dates
var array={
  city:"denvor",
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

  getEventsRepos(array);

//create function to take api response data, modify it and send to display function
 var createEventArray = function(eventsArray) {
   //create object to hold events
   var ticketObj = [];
   //create tempArr variable so events can be pushed to ticket array object
   tempArr = {};
   for (var i=0; i < eventsArray.length; i++) {
     var eventName=eventsArray[i].name;
     var eventDate=eventsArray[i].dates.start.localDate;
     var eventUrl=eventsArray[i].url;
     var eventCity=eventsArray[i]._embedded.venues[0].city.name;
     //create variable for country code that can be sent to holiday API
     var eventCountryCode=eventsArray[i]._embedded.venues[0].country.countryCode;
     tempArr = {eventName,eventDate,eventUrl};
     ticketObj.push(tempArr);
   }
   console.log(ticketObj);
 };




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
