var eventContainerEl = document.querySelector("#events-container");

var displayEvents = function() {
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

displayEvents(ticketObj);