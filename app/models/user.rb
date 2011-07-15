class User < ActiveRecord::Base
	validates :email, :uniqueness => true
	validates :username, :uniqueness => true

	has_many :authentication
	has_many :map_point

	def self.create_from_hash!(hash)
		name						= nil
		username				= nil
		mail						= nil
		gender					= nil
		birthday				= nil
		birthday_year		= 0
		birthday_month	= 0
		birthday_day		= 0

		# Facebook126188
		
		if hash['provider'] == 'facebook'
			name = hash['user_info']['name']
			username = hash['user_info']['nickname']
			mail = hash['user_info']['email']
			gender = hash['extra']['user_hash']['gender']
			birthday = hash['extra']['user_hash']['birthday']
			d = birthday.split('/')
			birthday = d[2]+'-'+d[0]+'-'+d[1]
			birthday_year = d[2]
			birthday_month = d[0]
			birthday_day = d[1]

			# Twitter
		elsif hash['provider'] == 'twitter'
			name = hash['extra']['user_hash']['name']
			username = hash['extra']['user_hash']['screen_name']
		end

		self.create(:name => name, :username => username, :email => mail )
	end

	def get_date_info
		if (birthday != nil)
			return {:year => birthday.year, :month => birthday.month, :day => birthday.day}
		else
			return {:year => 0, :month => 0, :day => 0}
		end
	end

	
end
