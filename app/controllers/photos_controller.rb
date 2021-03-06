class PhotosController < ApplicationController

	def new
		@my_photo = Photo.new
	end

	def create
		@my_trip = Trip.find(session[:trip_id])
		
		if params[:photo] != nil 
			params[:photo][:image].each do |img|
			  @my_photo = @my_trip.photos.new(image: img)
			  @my_photo.save
			end
		end
		
	end

	def imageUrl
		@my_trip = Trip.find(session[:trip_id])
		@my_photos = @my_trip.photos
		@photosArr = []
		@my_photos.each do |photo|
			@photosArr.push(photo.image.url(:thumb))
		end

		render json: {photoArr: @photosArr}
	end


	def destroy
		@my_photo = Photo.find(params[:id])
		@my_trip = @my_photo.trip
		@my_photo.destroy

		redirect_to(edit_trip_path(@my_trip))
	end

	private

	# def photo_params
	# 	params.require(:photo).permit(:image, :title)
	# end
end
