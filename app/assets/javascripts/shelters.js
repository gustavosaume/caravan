// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function () {

  var ShelterList = Ractive.extend({
    template: "#template-shelters",
    init: function(options) {}
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
  var shelterFilter = new Ractive({
    el: '#shelter-list-filter',
    template: '#template-shelters-filter',
    data: {
      sortColumn: defaultSortColumn
    }
  });

  shelterFilter.on('sort', function(event, column) {
    this.set('sortColumn', column);
    racShelters.set('sortColumn', column);
  });

  // add map
  var map = new google.maps.Map($("#shelter-list-map")[0]);
  var bounds = new google.maps.LatLngBounds();
  shelters.forEach(function(shelter) {
    var latLng = new google.maps.LatLng(shelter["location"][0], shelter["location"][1]);
    var marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: latLng,
      map: map
    });
    bounds.extend(latLng);
  });
  map.fitBounds(bounds);
});