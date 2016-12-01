class ActivitiesController < ApplicationController

	def new
		@new_activity = Activity.new()
	end
	def create
		@my_trip = Trip.last
		@new_activity = @my_trip.activities.create(active_params)
	end

	def active_params
		params.require(:activity).permit(:category, :title, :description)
	end
end
