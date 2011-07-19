class Localidad < ActiveRecord::Base
	has_many :map_points
	has_many :barrios
end
