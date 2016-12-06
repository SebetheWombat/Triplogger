Rails.application.routes.draw do
  resources :activities
  resources :photos

  get '/photosurl', to: 'photos#imageUrl'

  devise_for :users
	root 'site#home'
	resources :trips

end
