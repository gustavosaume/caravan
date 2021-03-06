//= require components
//= require global-events

function showTestimonialModal() {
  var modal = new ModalView({
    partials: {
      modalContent: $('#template-modal-testimonial').html()
    }
  });

  modal.on('submit', function() {
    var url = window.location.pathname + '/testimonials';
    var data = {};
    $("#testimonial-form .form-control, #testimonial-form input:radio")
      .serializeArray()
      .filter(function(element) {
        return element.value.length > 0;
      })
      .forEach(function(element) {
        data[element.name] = element.value;
      });

    var services = $("#testimonial-form input:checkbox")
      .serializeArray()
      .map(function(element) {
        return element.value;
      });

    var otherServices = $("#other-service").val();
    if (otherServices) {
      services.push(otherServices);
    }

    if (services.length > 0) {
      data["services"] = services;
    }

    if (!$.isEmptyObject(data)) {
      $.post(url, {"testimonial": data}).done(function() {
        document.location.reload(true);
      }).fail(function() {
        console.log("FAILURE");
      });
    }
    else {
      window.alert("You need to add a testimonial first!");
    }
  });
}


$(document).ready(function() {
  if (window.location.hash == "#rate") {
    showTestimonialModal();
  }

  var lat = $("#shelter-map").data("center-lat");
  var lon = $("#shelter-map").data("center-lon");
  var shelterLocation;
  if (lat && lon) {
    shelterLocation = new google.maps.LatLng(lat, lon);
  }

  var mapOptions = {
    zoom: 14,
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
  };

  if (shelterLocation) {
    mapOptions.center = shelterLocation;
  }
  else {
    mapOptions.zoom = 10;
    mapOptions.center = new google.maps.LatLng(40.77,-73.99);
  }

  var map = new google.maps.Map($("#shelter-map")[0], mapOptions);

  var transitLayer = new google.maps.TransitLayer();
  transitLayer.setMap(map);

  if (shelterLocation) {
    var marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: shelterLocation,
      map: map,
    });

    var infowindow = new google.maps.InfoWindow({
      content: $("script[id^='template-map-tooltip']").html()
    });
    infowindow.open(map, marker);
  }

  var rating = new StarRating({
    el: "#rating",
    data: {
      id: "first",
      rating: $("#rating").data("rating"),
      title: $("#rating").data("title"),
      isEnabled: false,
    }
  });

  $("#rate").on("click", showTestimonialModal);

});
