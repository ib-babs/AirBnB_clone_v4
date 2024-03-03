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
