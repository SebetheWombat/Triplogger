Rails.application.routes.draw do
  

  get '/photosurl', to: 'photos#imageUrl'

  devise_for :users
	root 'site#home'
	resources :trips
		resources :activities
  		resources :photos


end
