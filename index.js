$(document).ready(function() {
    var currentDate = new Date().toLocaleDateString("en-GB");
    $("#currentDay").html("London " + "(" + currentDate + ")" + ' <i class="fas fa-cloud px-2 mb-3"></i>');
  });