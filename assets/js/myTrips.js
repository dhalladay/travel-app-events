var storedEvent = localStorage.getItem("eventsArray");
storedEvent = JSON.parse(storedEvent);
console.log(storedEvent[0]);