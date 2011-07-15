class Authentication < ActiveRecord::Base
	belongs_to :user

	def self.find_from_hash(hash)
		find_by_provider_and_uid(hash['provider'], hash['uid'])
	end

	def self.create_from_hash(hash, user = nil)
		user ||= User.create_from_hash!(hash)
		check_user_name(user)
		Authentication.create(:user => user, :uid => hash['uid'], :provider => hash['provider'])
	end

	def self.check_user_name(user)
		if user.username.index('profile.php?') != nil # EN FACEBOOK significa que no tiene nickname
			user.username = "user_#{user.id}"
			user.save
		end
	end
end
