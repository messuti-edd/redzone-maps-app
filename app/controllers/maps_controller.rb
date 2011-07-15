class MapsController < ApplicationController
  def home
		@geoip ||= GeoIP.new("#{Rails.root}/db/GeoIP.dat")
		remote_ip = request.remote_ip
		
		if remote_ip != "127.0.0.1" #todo: check for other local addresses or set default value
			location_location = @geoip.country(remote_ip)
			if location_location != nil     
				render :text => location_location[2]
			end
		end
		
#		if !signed_in?
#			render :text => '<script>top.location="/auth/facebook";</script>'
#		end
  end

end
