var array = {
  city: "denver",
  startDate: "2022-07-04",
  month: "07",
  year: "2022",
  endDate: "2022-07-06",
  country: "US",
};

// Returns an array of dates between the two dates
let startDate = moment(array.startDate);
let endDate = moment(array.endDate);
let datesArray = [];

for (var m = moment(startDate); m.isSameOrBefore(endDate); m.add(1, "days")) {
  datesArray.push(m.format("YYYY-MM-DD"));
}

console.log(datesArray);

// get holiday API
var getHoliday = function () {
  for (var i = 0; datesArray.length; i++) {
    // setTimeout(function () {
      var holidayUrl =
        "https://holidays.abstractapi.com/v1/?api_key=914c5cd8cbee4eac81585b5ed13d510d&country=" +
        array.country +
        "&year=" +
        datesArray[i].split("-")[0] +
        "&month=" +
        datesArray[i].split("-")[1] +
        "&day=" +
        datesArray[i].split("-")[2];

      fetch(holidayUrl).then(function (response) {
        response.json().then(function (data) {
          console.log(data);
        });
      });
    // }, 1000);
  }
};
getHoliday();


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
