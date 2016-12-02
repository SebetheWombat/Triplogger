// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).on('turbolinks:load', function(){
	console.log("You're JS is WIRED!");
	

});


  var map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: {lat: 20, lng: 0},
      zoom: 2
    });
    var marker = new google.maps.Marker({
    	position: {lat: 25.7629064, lng: -80.193075},
    	map: map
    });
  }


