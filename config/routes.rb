Rails.application.routes.draw do
  resources :activities
  resources :photos

  devise_for :users
	root 'site#home'
	resources :trips

end
