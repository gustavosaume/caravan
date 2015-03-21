//= require components

$(document).ready(function() {
  var lat = $("#shelter-map").data("center-lat");
  var lon = $("#shelter-map").data("center-lon");
  var shelterLocation;
  if (lat && lon) {
    shelterLocation = new google.maps.LatLng(lat, lon);
  }

  var mapOptions = {
    zoom: 14,
    scrollwheel: false,
  };

  if (shelterLocation) {
    mapOptions.center = shelterLocation;
  }
  else {
    mapOptions.zoom = 10;
    mapOptions.center = new google.maps.LatLng(40.77,-73.99);
  }

  var map = new google.maps.Map($("#shelter-map")[0], mapOptions);

  if (shelterLocation) {
    var marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: shelterLocation,
      map: map,
    });
  }


  var rating = new StarRating({
    el: "#rating",
    data: {
      id: "first",
      rating: $("#rating").data("rating"),
    }
  });
});
