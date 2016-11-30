Rails.application.routes.draw do
  devise_for :users
	root 'site#home'
	resources :trips
end
