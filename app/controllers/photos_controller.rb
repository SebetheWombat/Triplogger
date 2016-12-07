class PhotosController < ApplicationController

	def new
		@my_photo = Photo.new
	end

	def create
		
		@my_trip = Trip.last
		@my_photo = @my_trip.photos.create(photo_params)
	end

	def imageUrl
		@my_trip = Trip.last
		@my_photo = @my_trip.photos.last.image.url(:thumb)

		render json: {photo: @my_photo}
	end

	private

	def photo_params
		params.require(:photo).permit(:image, :title)
	end
end
