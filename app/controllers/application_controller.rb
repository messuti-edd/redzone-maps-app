class ApplicationController < ActionController::Base
  #protect_from_forgery

	protected

  def current_user
    @current_user ||= User.find_by_id(session[:user_id])
  end

  def signed_in?
    !!current_user
  end

  helper_method :current_user, :signed_in?

  def current_user=(user)
    @current_user = user
    session[:user_id] = user.id
  end

	def require_user
		if !signed_in?
			store_location
			redirect_to '/questions', :notice => "Tenes que iniciar sesion primero!"
		end
	end

	def store_location
		session[:return_to] = request.fullpath
	end
end
