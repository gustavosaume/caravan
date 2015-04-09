$(document).ready(function() {
  $("body").on("click", ".trackable", function() {
    ll('tagEvent', this.textContent + " - clicked");
  });

  $("body").on("click", ".coming-soon", function() {
    window.alert("Coming soon!");
  });
});