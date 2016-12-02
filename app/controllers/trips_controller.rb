class TripsController < ApplicationController
	before_action :authenticate_user!
	def new
		@my_trip = Trip.new
		@new_activity = Activity.new
		@my_photo = Photo.new
	end

	def create
		@my_trip = current_user.trips.new(trip_params)
		puts "MY TRIP"
		puts @my_trip.id
		puts ""
		@my_trip.save

	end

	def show
		@my_trip = Trip.find(params[:id])
	end

	def trip_params
		params.require(:trip).permit(:location, :rating, :start_date, :end_date, :summary)
	end
end
