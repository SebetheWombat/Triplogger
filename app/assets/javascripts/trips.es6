// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).on('turbolinks:load', function(){
	console.log("Trips");
	$('#location').keypress(function(){
		var input = /** @type {!HTMLInputElement} */(
            document.getElementById('location'));

		var autocomplete = new google.maps.places.Autocomplete(input);
	});

	$('.js-actlink').click(function(){
		console.log("link clicked");
		$(this).siblings().toggleClass('hide');
	});
	createTrip();
	addActivity();
	uploadPhoto();
	showPreviewDescription();
	showDescription();
	replaceImage();
	displayCategories();
	$('#closeout').click(function(){
		$("#orig-sum").show();
		$("#new-sum").hide();
		$(this).addClass('hide');
	});
	scrolling();
	updateAction();
});

function createTrip(){
	$('#js-trip-form').submit(function(e){
		e.preventDefault();
		var tripLoc = $('#location').val();
		var done = false;
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({'address': tripLoc}, function(results, status){
			if(results === null || results[0] === undefined){
				$(".alert").remove();
				var msg = "We're sorry. We're not able to find '" + tripLoc + "' anywhere on the map.";
				$('.container').prepend("<div class='alert'>" + msg + "</div>");

			}else{
				var lat = results[0].geometry.location.lat();
				var long = results[0].geometry.location.lng()
				$("#form-lat").val(lat);
				console.log($("#form-lat").val());
				$("#form-long").val(long);
				$('#js-trip-form').unbind().submit();
				var rating = $('input[class=rating]:checked').val();
				var start = $('#start_date').val();
				start = start.split("-").reverse().join("/");
				var end = $('#end_date').val();
				if(end !== ""){
					end = " - " + end.split("-").reverse().join("/");
				}
				$('#tripPreview').append(`<p>${tripLoc}</p>`)
				if(rating !== undefined){
					$('#tripPreview').append(`<p>Rating: ${rating}</p>`)
				}
				$('#tripPreview').append(`<p>${start}${end}</p>`);
				$('#js-trip-form').hide();
				$('#js-activities-form').show();
				$(".alert").remove();
				console.log("SUBMITTED!");
			}
		});
	});
}

function addActivity(){
	$('.activity-form').submit(function(e){
		console.log("NEW ACTIVITY CREATED!");
		var category = $(this).parent().data("category");
		$(this).find('.hidden').val(category);
		$(this).parent().addClass('hide');
		var title = $(this).find('.title').val()

		console.log(title);
		if(title === ""){
			title = "Untitled";
		}
		var slideText = $(this).find('.description').val()
			if(slideText.length > 300){
				slideText = slideText.substring(0, 300) + "...";
			}
		$(".activityPreview").append("<div class='prevact'><p class='prevTitle'>"+title+"</p><div class='desc hide'>"+slideText+"</div></div>");
		setTimeout(function(){
			$(this).find('.title').val("");
			$(this).find('.description').val("");
		});
	});
}

function uploadPhoto(){
	$('.photo-form').submit(function(){
		$('.photoPreviewThumbs').append("Loading photos...");
		setTimeout(function(){
			$('.photo-form')[0].reset();
			addPreviewThumbnail();
		},6000);
	});
}

function showDescription(){
	$('.act-title').click(function(){
		$("#new-sum").show();
		$("#closeout").removeClass('hide');
		var title = $(this).text();
		var desc = $(this).next().text();
		var html = "<h4>" + title + "</h4>" + desc
		$("#new-sum").html(html);
		$("#orig-sum").hide();
	});

}

function replaceImage(){
	$('.thumb').click(function(){
		var imgSrc = $(this).attr("src")
		imgSrc = imgSrc.replace('thumb', 'original');
		$('#main-show').attr("src", imgSrc);
		console.log($(this).attr("src"));
	});
}

function displayCategories(){
	var seen = {};
	$('b').each(function(){
		var c = $(this).text();
		if(seen[c]){
			$(this).remove();
			console.log(c);
		}else{
			seen[c] = true;
		}
	});
	console.log(seen);
}

function showPreviewDescription(){
	$('.activityPreview').on('click', '.prevact', function(){
		console.log("Show Preview Description");

		$(this).find('.desc').toggleClass('hide');
	});
}

function addPreviewThumbnail(){
	console.log("HI");
	$.ajax({
		type: "GET",
		url: "/photosurl",
		success: doTheThing,
		error: errorThing
	});
}

function doTheThing(response){
	console.log("Success!!!!!");
	console.log(response);

	var img = response.photoArr
	$('.photoPreviewThumbs').html("");
	img.forEach(function(photo){
		var html = "<img src=" + photo + ">";
		$('.photoPreviewThumbs').append(html);
	});
}

function errorThing(err){
	console.log("FAIL");
	console.log(err);
}

function scrolling(){
	var x = 0;
	$("#scroll-left").on('click', function(){
		var pics = $(this).data("pics");
		if(x < pics * 15){
			x += 250;
		}
		$("#scrollbar-images").scrollLeft(x);
	});
	$("#scroll-right").on('click', function(){
		if(x > 0){
			x -= 250
		}
		$("#scrollbar-images").scrollLeft(x);
	});
}

function updateAction(){
	$(".toggleForm").click(function(){
		$(this).siblings('div').toggleClass('hide');
	});
}


