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
  url: "http://127.0.0.1:5000/api/v1/status",
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
