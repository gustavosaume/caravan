$(document).ready(function() {
  $("body").on("click", ".trackable", function() {
    ll('tagEvent', this.textContent + " - clicked");
  });

  $("body").on("click", ".coming-soon", function() {
    window.alert("Coming soon!");
  });

  $("body").on("click", ".scrollable", function() {
    var self = this;
    $("html, body").animate({
      scrollTop: $($(self).data("scroll-to-selector")).offset().top
    }, 500);
  });
});