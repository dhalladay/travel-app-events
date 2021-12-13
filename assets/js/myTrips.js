var eventContainerEl = document.querySelector("#events-container");
var searchContainerEl = document.querySelector("#search-container");
var eventClass = "row bg-dark rounded m-1 p-1 justify-content-between";
var saveClass = "row bg-secondary rounded m-1 p-1 justify-content-between";

var showEvents = function() {
  var storedEvent = localStorage.getItem("eventsArray");
 
  storedEvent = JSON.parse(storedEvent)
  console.log(storedEvent[0])
  var city = storedEvent[0]
  .replaceAll("+", " ");
console.log(city)

  var showEventsEl = document.createElement("a");
  showEventsEl.textContent = storedEvent;

  displayEvents(storedEvent)
};

var displayEvents = function(storedEvent) {
  var searchCity = storedEvent[0]
  .replaceAll("+", " ");
  var startDate = storedEvent[1]
  var endDate = storedEvent[2]

  var searchContainer = document.createElement("h2");
      searchContainer.className = "container";

      var cityEl = document.createElement("h3");
      cityEl.className = "text-center name";
      cityEl.textContent = searchCity;

      var startDateEl = document.createElement("p");
      startDateEl.className = "text-center date";
      startDateEl.textContent = startDate;

      var endDateEl = document.createElement("p");
      endDateEl.className = "text-center date";
      endDateEl.textContent = endDate;

      searchContainer.append(cityEl, startDateEl, endDateEl)
      
      searchContainerEl.appendChild(searchContainer);

  for(var i = 3; i < storedEvent.length; i++) {
    
    var eventName = storedEvent[i][0];
    var eventDate = storedEvent[i][1];
      var eventUrl = storedEvent[i][2];
      
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

showEvents();


