let amenities = {};
let states = {};
let cities = {};
$("input#amenities_check").on("change", function () {
  if (this.checked) {
    amenities[this.dataset.id] = this.dataset.name;
  } else
    for (const amenity of Object.keys(amenities)) {
      if (amenity == this.dataset.id) delete amenities[amenity];
    }
  $("DIV.amenities h4").text(Object.values(amenities));
});

$("input#state_check").on("change", function () {
  if (this.checked) {
    states[this.dataset.id] = this.dataset.name;
    console.log(states);
} else
for (const state of Object.keys(states)) {
    if (state == this.dataset.id) delete states[state];
    }
  $("DIV.locations h4").text(Object.values(states));
});

$("input#city_check").on("change", function () {
  if (this.checked) {
    cities[this.dataset.id] = this.dataset.name;
    console.log(cities);
} else
    for (const city of Object.keys(cities)) {
      if (city == this.dataset.id) delete cities[city];
    }
  $("DIV.locations h4").text(Object.values(cities));
});

$.ajax({
  type: "GET",
  url: " http://127.0.0.1:5001/api/v1/status",
  success: function (response) {
    if (response.status === "OK") {
      $("div#api_status").addClass("available");
      $("div#api_status").css("background-color", "#ff545f");
    } else {
      $("div#api_status").removeClass("available");
      $("div#api_status").css("background-color", "#cccccc");
    }
  },
});

$.ajax({
  type: "POST",
  url: "http://127.0.0.1:5001/api/v1/places_search/",
  data: "{}",
  headers: {
    "Content-Type": "application/json",
  },
  success: (places) => {
    article(places);
  },
});

$("button").on("click", function () {
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5001/api/v1/places_search/",
    data: `{"states": ["${Object.keys(states)}"], "cities": ["${Object.keys(
      cities
    )}"], "amenities": ["${Object.keys(amenities)}"]}`,
    headers: {
      "Content-Type": "application/json",
    },
    success: (places) => {
      $("section.places article").remove();
      //   if (places.length > 0) {
      article(places);
      //}
    },
  });
});

function article(places) {
  $.each(places, function (indexInArray, place) {
    let guest = "Guest",
      bedroom = "Bedroom",
      bathroom = "Bathroom";
    if (place.max_guest > 1) guest = guest.concat("s");
    if (place.number_rooms > 1) bedroom = bedroom.concat("s");
    if (place.number_bathrooms > 1) bathroom = bathroom.concat("s");
    $("section.places").append(`<article><div class="title_box">
     <h2>${place.name}</h2>
     <div class="price_by_night">$${place.price_by_night}</div>
   </div>
   <div class="information">
     <div class="max_guest">
       ${place.max_guest} ${guest}
     </div>
     <div class="number_rooms">
       ${place.number_rooms} ${bedroom}
     </div>
     <div class="number_bathrooms">
       ${place.number_bathrooms} ${bathroom}
     </div>
   </div>
 <div class="description">${place.description}</div>`);
  });
}
