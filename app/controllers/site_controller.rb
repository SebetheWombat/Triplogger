class SiteController < ApplicationController
	def home

		trips = Trip.all
		markers = []
		photos = []
		if current_user != nil
			current_user.trips.each do |trip|
				markers.push(trip)
				if trip.photos.length > 0
					photos.push({id: trip.id, img: trip.photos[0].image.url})
				end
			end

		end
		gon.markers = markers
		gon.photos = photos

		render :home
	end

    
end
