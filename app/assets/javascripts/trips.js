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
	$('#js-trip-form').submit(function(){
		$(this).hide();
		$('#js-activities-form').show();
		console.log("SUBMITTED!");
	});
	//Trying to submit form and then clear values
	$('.activity-form').submit(function(e){
		console.log("NEW ACTIVITY CREATED!");
		var category = $(this).parent().data("category");
		$(this).find('.hidden').val(category);

		setTimeout(function(){
			$('.title').val("");
			$('.desc').val("");
		});
	});
	$('.photo-form').submit(function(){
		console.log("SUCH A PRETTY PICTURE!");

		setTimeout(function(){
			$('.photo-form')[0].reset();
		});
	});
});