class TripsController < ApplicationController
	before_action :authenticate_user!
	def new
		
		@my_trip = Trip.new
	end

	def create
		@my_trip = current_user.trips.create(trip_params)
		redirect_to trip_path(@my_trip.id)
	end

	def show
		
		@my_trip = Trip.find(params[:id])
	end

	def trip_params
		params.require(:trip).permit(:location, :rating, :start_date, :end_date, :summary)
	end
end
