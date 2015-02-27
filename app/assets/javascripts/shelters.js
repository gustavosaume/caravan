// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


$(document).ready(function () {

  var ipsum = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.';
  function getRandomRating() {
    return Math.ceil((Math.random() * 8.0)) + 2
  }


  var ShelterList = Ractive.extend({
    template: "#template-shelters",
    init: function(options) {}
  });

  var shelters = [
    { id: '1', name: 'Shelter 1', description: ipsum, rating: getRandomRating(), distance: 70},
    { id: '2', name: 'Shelter 2', description: ipsum, rating: getRandomRating(), distance: 80},
    { id: '3', name: 'Shelter 3', description: ipsum, rating: getRandomRating(), distance: 1040},
    { id: '4', name: 'Shelter 4', description: ipsum, rating: getRandomRating(), distance: 120},
    { id: '5', name: 'Shelter 5', description: ipsum, rating: getRandomRating(), distance: 10},
    { id: '6', name: 'Shelter 6', description: ipsum, rating: getRandomRating(), distance: 102},
    { id: '7', name: 'Shelter 7', description: ipsum, rating: getRandomRating(), distance: 1040},
    { id: '8', name: 'Shelter 8', description: ipsum, rating: getRandomRating(), distance: 1030},
    { id: '9', name: 'Shelter 9', description: ipsum, rating: getRandomRating(), distance: 40}
  ];

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
});