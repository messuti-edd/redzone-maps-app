class AuthenticationController < ApplicationController
  def create
		
		omniauth = request.env["omniauth.auth"]
		unless @auth = Authentication.find_from_hash(omniauth)
			@auth = Authentication.create_from_hash(omniauth, current_user)
		end

		self.current_user = @auth.user
		flash[:notice]= "Estas adentro!"
		session[:omniauth] = omniauth

#		render :text => omniauth.to_yaml
#		redirect_to questions_path
		redirect_to 'http://apps.facebook.com/redzonemaps'
  end

	def logout
		session[:user_id] = nil
		flash[:notice]= "Estas fuera!"

		redirect_to('/maps/home', :notice => 'You are out!')
	end
end
