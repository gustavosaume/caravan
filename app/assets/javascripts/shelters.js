//= require components

$(document).ready(function () {

  var ShelterList = Ractive.extend({
    template: "#template-shelters"
  });

  var shelters = $("#shelter-list-container").data("shelters");

  var defaultSortColumn = 'distance';
  var racShelters = new ShelterList({
    el: '#shelter-list-container',
    data: {
      shelters: shelters,
      sort: function(array, column) {
        array = array.slice().sort(function(a, b) {
          return a[column] < b[column] ? -1 : 1;
        });
        return array;
      },
      sortColumn: defaultSortColumn
    }
  });


  //FILTERS
  // var shelterFilter = new Ractive({
  //   el: '#shelter-list-filter',
  //   template: '#template-shelters-filter',
  //   data: {
  //     sortColumn: defaultSortColumn
  //   }
  // });

  // shelterFilter.on('sort', function(event, column) {
  //   this.set('sortColumn', column);
  //   racShelters.set('sortColumn', column);
  // });

  // add map
  var map = new google.maps.Map($("#shelter-list-map")[0], {
    scrollwheel: false,
    panControl: false,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL,
      position: google.maps.ControlPosition.RIGHT_BOTTOM,
    },
    mapTypeControl: true,
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM,
    },
    overviewMapControl: true
  });

  var transitLayer = new google.maps.TransitLayer();
  transitLayer.setMap(map);
  
  var bounds = new google.maps.LatLngBounds();
  shelters.forEach(function(shelter) {
    var location = shelter.location;
    if (location) {
      var latLng = new google.maps.LatLng(location.latlon[0], location.latlon[1]);
      var marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: latLng,
        map: map,
      });
      bounds.extend(latLng);

      var infowindow = new google.maps.InfoWindow({
        content: $("#template-map-tooltip-" + shelter.id).html()
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
        map.setCenter(marker.position);
      });
    }
  });
  map.fitBounds(bounds);
});