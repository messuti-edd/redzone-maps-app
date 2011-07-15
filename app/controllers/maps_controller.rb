class MapsController < ApplicationController
  def home
		@geoip ||= GeoIP.new("#{Rails.root}/db/GeoIP.dat")
		remote_ip = request.remote_ip
		@location_pais = ""
		@user_location = signed_in? ? current_user.location : ''
		
		if remote_ip != "127.0.0.1" #todo: check for other local addresses or set default value
			location_location = @geoip.country(remote_ip)
			if location_location != nil
				@location_pais = location_location[6]
				#render :json => location_location
			end
		end
		
		if !signed_in?
			render :text => '<script>top.location="/auth/facebook";</script>'
		end
  end

end
