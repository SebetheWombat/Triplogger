class TripsController < ApplicationController
	before_action :authenticate_user!
	def new
		@my_trip = Trip.new
		@new_activity = Activity.new
		@my_photo = Photo.new	
	end

	def create
		@my_trip = current_user.trips.new(trip_params)
		@my_trip.save
		session[:trip_id] = @my_trip.id
	end

	def show
		@my_trip = current_user.trips.find(params[:id])
	rescue ActiveRecord::RecordNotFound
		redirect_to("/", alert: "That is not your trip")
	end

	def edit
		@my_trip = current_user.trips.find(params[:id])
		session[:trip_id] = @my_trip.id
		@my_photo = Photo.new
		@new_activity = Activity.new
	end

	def update
		@my_trip = current_user.trips.find(params[:id])
		#ingredient = Ingredient.new(
			#name: params[:ingredient][:name],
			#calories: params[:ingredient][:calories])
		
		# if params[:photo] != nil 
		# 	params[:photo][:image].each do |img|
		# 	  @my_photo = @my_trip.photos.new(image: img)
		# 	  @my_photo.save
		# 	end
		# end
		if @my_trip.update(trip_params)
			redirect_to(trip_path(@my_trip))
		else
			render "edit"
		end
	end

	def trip_params
		params.require(:trip).permit(:location, :lat, :long, :rating, :start_date, :end_date, :summary)
	end

end
