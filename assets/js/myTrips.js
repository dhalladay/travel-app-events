
var eventContainerEl = document.querySelector("#events-container");
var searchContainerEl = document.querySelector("#search-container");
var eventClass = "row bg-dark rounded m-1 p-1 justify-content-between";
var saveClass = "row bg-secondary rounded m-1 p-1 justify-content-between";

var showEvents = function() {
  var storedEvent = localStorage.getItem("eventsArray");
 
  storedEvent = JSON.parse(storedEvent)

  var showEventsEl = document.createElement("a");
  showEventsEl.textContent = storedEvent;

  displayEvents(storedEvent)
};

var displayEvents = function(storedEvent) {
  var searchCity = storedEvent[0]
  .replaceAll("+", " ")
  .toUpperCase()
  var startDate = storedEvent[1]
  var endDate = storedEvent[2]

  var searchContainer = document.createElement("h2");
      searchContainer.className = "container";

      var cityEl = document.createElement("h3");
      cityEl.className = "text-center name ";
      cityEl.textContent = "Your trip to " + searchCity;

      var startDateEl = document.createElement("p");
      startDateEl.className = "text-center date";
      startDateEl.textContent = "From " + startDate + " to " + endDate;

      searchContainer.append(cityEl, startDateEl)
      
      searchContainerEl.appendChild(searchContainer);

  for(var i = 3; i < storedEvent.length; i++) {
    
    var eventName = storedEvent[i][0];
    var eventDate = storedEvent[i][1];
      var eventUrl = storedEvent[i][2];
      
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
      urlEl.href = eventUrl
      urlEl.textContent = "Go to Event";
      
      eventRow.append(nameEl, dateEl, urlEl);
      eventContainer.append(eventRow);
      
      
      eventContainerEl.appendChild(eventContainer);
    }
    
};
showEvents();

