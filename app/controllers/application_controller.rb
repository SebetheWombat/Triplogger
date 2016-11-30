class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :config_params, if: :devise_controller?

  helper_method :resource_name, :resource, :devise_mapping

  def resource_name
    :user
  end
 
  def resource
    @resource ||= User.new
  end
 
 

  def config_params
  	devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end
end
