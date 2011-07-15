class UsersController < ApplicationController
	def list
		users = User.find(:all)
		
		render :text => users.to_yaml
	end
end
