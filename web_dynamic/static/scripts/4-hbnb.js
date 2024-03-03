let amenities = {};
$("input").on("change", function () {
  if (this.checked) {
    amenities[this.dataset.id] = this.dataset.name;
  } else
    for (const amenity of Object.keys(amenities)) {
      if (amenity == this.dataset.id) delete amenities[amenity];
    }
  $("DIV.amenities h4").text(Object.values(amenities));
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
    data: `{"amenities": ["${Object.keys(amenities)}"]}`,
    headers: {
      "Content-Type": "application/json",
    },
    success: (places) => {
      $("section.places article").remove();
      if (places.length > 0) {
        $("section.places strong").remove();
        article(places);
      }
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
