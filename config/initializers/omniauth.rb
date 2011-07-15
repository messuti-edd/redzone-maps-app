Rails.application.config.middleware.use OmniAuth::Builder do
	# Red Zone
#	provider :facebook, '120450744706003', '897ba80aed87829b02e6ae059e14a269', {:scope => "user_birthday, email"}

	# Test App
	provider :facebook, '196702243698043', 'e4971a4f35a0d40d94c1a317211f0707', {:scope => "user_birthday, email"}
end