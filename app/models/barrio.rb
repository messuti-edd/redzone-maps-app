class Barrio < ActiveRecord::Base
	belongs_to :localidad
	
	validates_length_of :nombre, :within => 3..30
end
