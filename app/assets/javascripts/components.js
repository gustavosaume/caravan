// RATING COMPONENT
var template = '<fieldset class="rating rating-{{id}}">' +
  '<input type="radio" id="star5-{{id}}" name="rating-{{id}}" value="5"      /><label class = "full" for="star5-{{id}}" title="Awesome - 5 stars"></label>' +
  '<input type="radio" id="star4half-{{id}}" name="rating-{{id}}" value="4.5"/><label class="half" for="star4half-{{id}}" title="Pretty good - 4.5 stars"></label>' +
  '<input type="radio" id="star4-{{id}}" name="rating-{{id}}" value="4"      /><label class = "full" for="star4-{{id}}" title="Pretty good - 4 stars"></label>' +
  '<input type="radio" id="star3half-{{id}}" name="rating-{{id}}" value="3.5"/><label class="half" for="star3half-{{id}}" title="Meh - 3.5 stars"></label>' +
  '<input type="radio" id="star3-{{id}}" name="rating-{{id}}" value="3"      /><label class = "full" for="star3-{{id}}" title="Meh - 3 stars"></label>' +
  '<input type="radio" id="star2half-{{id}}" name="rating-{{id}}" value="2.5"/><label class="half" for="star2half-{{id}}" title="Kinda bad - 2.5 stars"></label>' +
  '<input type="radio" id="star2-{{id}}" name="rating-{{id}}" value="2"      /><label class = "full" for="star2-{{id}}" title="Kinda bad - 2 stars"></label>' +
  '<input type="radio" id="star1half-{{id}}" name="rating-{{id}}" value="1.5"/><label class="half" for="star1half-{{id}}" title="Meh - 1.5 stars"></label>' +
  '<input type="radio" id="star1-{{id}}" name="rating-{{id}}" value="1"      /><label class = "full" for="star1-{{id}}" title="Sucks big time - 1 star"></label>' +
  '<input type="radio" id="starhalf-{{id}}" name="rating-{{id}}" value="0.5" /><label class="half" for="starhalf-{{id}}" title="Sucks big time - 0.5 stars"></label>' +
'</fieldset>';

var StarRating = Ractive.extend({
  template: template,
  init: function(options) {
    var rating = this.ratingFromValue(options.data.rating);
    $("#star"+rating+"-"+options.data.id).prop("checked", true);

    if (options.data.isEnabled === false) {
      $("fieldset.rating-" + options.data.id).prop("disabled", true);
    }
  },
  ratingFromValue: function(value) {
    var rating;
    if (value >= 5) {
      rating = "5";
    }
    else if (value >= 4.5) {
      rating = "4half";
    }
    else if (value >= 4) {
      rating = "4";
    }
    else if (value >= 3.5) {
      rating = "3half";
    }
    else if (value >= 3) {
      rating = "3";
    }
    else if (value >= 2.5) {
      rating = "2half";
    }
    else if (value >= 2) {
      rating = "2";
    }
    else if (value >= 1.5) {
      rating = "1half";
    }
    else if (value >= 1) {
      rating = "1";
    }
    else if (value >= 0.5) {
      rating = "half";
    }

    return rating;
  },
  data: {
    id: "",
    rating: 0,
    isEnabled: true
  }
});