class SiteController < ApplicationController
	def home

		trips = Trip.all
		markers = []
		trips.each do |trip|
			markers.push(trip.location)
		end
		gon.markers = markers

		render :home
	end

    
end
