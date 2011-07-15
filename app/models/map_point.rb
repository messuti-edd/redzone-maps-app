class MapPoint < ActiveRecord::Base
	belongs_to :user
	
	belongs_to :pais
	belongs_to :departamento
	belongs_to :provincia
	belongs_to :localidad
	
	has_one :map_point_tipo
end
