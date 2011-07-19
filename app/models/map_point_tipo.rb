class MapPointTipo < ActiveRecord::Base
	has_many :map_points
	
	validates_associated :map_points
end
