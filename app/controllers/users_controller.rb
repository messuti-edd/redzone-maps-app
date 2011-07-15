class UsersController < ApplicationController
	def list
		users = User.find(:all)
		
		render :json=> users.to_json
	end
end
