class SiteController < ApplicationController
	def home

		trips = Trip.all
		markers = []
		if current_user != nil
			current_user.trips.each do |trip|
				markers.push(trip.location)
			end
		end
		gon.markers = markers

		render :home
	end

    
end
