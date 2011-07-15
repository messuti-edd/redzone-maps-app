class Pais < ActiveRecord::Base
	has_many :map_points
	
	validates_uniqueness_of :nombre
	validates_uniqueness_of :nombre_corto
end
