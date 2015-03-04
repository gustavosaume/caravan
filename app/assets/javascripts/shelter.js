$(document).ready(function() {
  var shelterLocation = new google.maps.LatLng($("#shelter-map").data("center-lat"), $("#shelter-map").data("center-lng"))
  var mapOptions = {
    center: shelterLocation,
    zoom: 14
  };
  var map = new google.maps.Map($("#shelter-map")[0], mapOptions);
  var marker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    position: shelterLocation,
    map: map,
  });
});
