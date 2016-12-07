// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).on('turbolinks:load', function(){
	console.log("Trips");
	$('#location').keypress(function(){
		var input = /** @type {!HTMLInputElement} */(
            document.getElementById('location'));
		console.log(input);
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
});

function createTrip(){
	$('#js-trip-form').submit(function(){
		var tripLoc = $('#location').val();
		var rating = $('input[class=rating]:checked').val();
		var start = $('#start_date').val();
		start = start.split("-").reverse().join("/");
		var end = $('#end_date').val();
		if(end !== ""){
			end = " - " + end.split("-").reverse().join("/");
		}
		$('#tripPreview').append(`<p>${tripLoc}</p>`)
		$('#tripPreview').append(`<p>${rating}</p>`)
		$('#tripPreview').append(`<p>${start}${end}</p>`);

		$(this).hide();
		$('#js-activities-form').show();
		console.log("SUBMITTED!");
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
		$("#activityPreview").append("<div class='prevact'><p class='prevTitle'>"+title+"</p><p class='desc hide'>"+slideText+"</p></div>");
		setTimeout(function(){
			$('.title').val("");
			$('.description').val("");
		});
	});
}

function uploadPhoto(){
	$('.photo-form').submit(function(){
		console.log("SUCH A PRETTY PICTURE!");
		
		setTimeout(function(){
			$('.photo-form')[0].reset();
			addPreviewThumbnail();
		},1000);
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
		$('#main-show').attr("src", $(this).attr("src"));
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
	$('#activityPreview').on('click', '.prevact', function(){
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

	var img = response.photo;
	var html = "<img src=" + img + ">";
	$('#photoPreview').append(html);
}

function errorThing(err){
	console.log("FAIL");
	console.log(err);
}





