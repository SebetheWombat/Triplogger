// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var googleIsReady = false;

function initMap (from) {
	if (from !== "our code") {
		googleIsReady = true;
	}

	if ($("#map-canvas").length > 0 && googleIsReady) {
		initMapForRealForReal();
	}
}

$(document).on('turbolinks:load', function(){
	console.log("You're JS is WIRED!");
	$("#slide-trip").click(function(){
		$(this).css("width","0");
	});

	// for when you click around and return to home page
	initMap("our code");
});

  var map;

  function initMapForRealForReal() {

    map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: {lat: 20, lng: 0},
      zoom: 2
    });
    function createMarker(coords,m, map){
		var marker = new google.maps.Marker({
			position: coords,
			map: map
		});
		
		//marker.set("id", m.id);
		google.maps.event.addListener(marker, 'click', function(){
			console.log(m.location);
			console.log(gon.photos);
			//Reset sidebar values
			$("#slide-image img").attr("src", "");
			$("#slide-startdate").text("");
			$("#slide-enddate").text("");
			$("#slide-summary").text("");
			gon.photos.forEach(function(photo){
				if(photo.id == m.id){
					$("#slide-image img").attr("src", photo.img);
				}
			});
			$("#slide-trip").css("width", "500px");
			$("#slide-location").text(m.location);
			if(m.start_date != null && m.end_date != null){
				var sdate = m.start_date.split("T");
				sdate = sdate[0].split("-");
				var edate = m.end_date.split("T");
				edate = edate[0].split("-")

				$("#slide-startdate").text(`${sdate[1]}/${sdate[2]}/${sdate[0]} -`);
				$("#slide-enddate").text(` ${edate[1]}/${edate[2]}/${edate[0]}`);
			}
				
			$("#slide-summary").text(m.summary);
			$("#slide-link").attr("href", `/trips/${m.id}`);
		});

	}
	
	function geocodeAddress(map, m){
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({'address': m.location}, function(results, status){
			console.log(status);
			var lat = results[0].geometry.location.lat();
			var lng = results[0].geometry.location.lng()
			if(status === 200 || status === "OK"){
				createMarker({lat: lat, lng: lng}, m, map);
			}else{
				console.log('Geocode was not successful for the following reason: ' + status);
			}
		});
	}
	console.log(gon.markers);
	gon.markers.forEach(function(m){
		if(m.location != ""){
			console.log(m.location);
			geocodeAddress(map, m);
		}
	});
  }

