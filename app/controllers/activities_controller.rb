class ActivitiesController < ApplicationController

	def new
		@new_activity = Activity.new()
	end
	def create
		@my_trip = Trip.find(session[:trip_id])
		@new_activity = @my_trip.activities.create(active_params)

	end

	def update
		@my_activity = Activity.find(params[:id])
		@my_activity.update(active_params)
		@my_trip=@my_activity.trip
		redirect_to(edit_trip_path(@my_trip))
	end

	def destroy
		@my_activity = Activity.find(params[:id])
		@my_trip = @my_activity.trip
		@my_activity.destroy

		redirect_to(edit_trip_path(@my_trip))

	end

	

	def active_params
		params.require(:activity).permit(:category, :title, :description)
	end
end
