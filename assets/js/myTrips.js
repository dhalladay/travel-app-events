var eventContainerEl = document.querySelector("#events-container");

var ticketObj = [
  {
    eventDate: "2022-07-03",
    eventName: "Ty Segall",
    eventUrl: "https://www.ticketmaster.com/event/Z7r9jZ1AdG0q7",
  },
  {
    eventName: "Ty Segall",
    eventDate: "2022-07-04",
    eventUrl: "https://www.ticketmaster.com/event/Z7r9jZ1AdFU1b",
  },
  {
    eventDate: "2022-07-03",
    eventName: "Ty Segall",
    eventUrl: "https://www.ticketmaster.com/event/Z7r9jZ1AdG0q7",
  },
  {
    eventName: "Ty Segall",
    eventDate: "2022-07-04",
    eventUrl: "https://www.ticketmaster.com/event/Z7r9jZ1AdFU1b",
  },
];

var displayEvents = function () {
  for (var i = 0; i < ticketObj.length; i++) {
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

