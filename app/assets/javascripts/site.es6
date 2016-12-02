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
    function createMarker(coords, map){
		var marker = new google.maps.Marker({
			position: coords,
			map: map
		});
	}
	// createMarker({lat: 0, lng: 0}, map);
	// createMarker({lat: 10, lng: 10}, map);
	// createMarker({lat: 20, lng: 80}, map);
	// createMarker({lat: 25.7629064, lng: -80.193075}, map);
	
	function geocodeAddress(map, address){
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({'address': address}, function(results, status){
			console.log(status);
			//console.log(results[0].geometry.location.lat());
			var lat = results[0].geometry.location.lat();
			var lng = results[0].geometry.location.lng()
			if(status === 200 || status === "OK"){
				createMarker({lat: lat, lng: lng}, map);
			}else{
				console.log('Geocode was not successful for the following reason: ' + status);
			}
		});
	}
	//console.log(gon.markers);
	gon.markers.forEach(function(m){
		if(m != ""){
			console.log(m);
			geocodeAddress(map, m);
			//var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + m + "&sensor=false";
		}
	});
  }




