Rails.application.routes.draw do
  resources :activities

  devise_for :users
	root 'site#home'
	resources :trips

end
