class MapPoint < ActiveRecord::Base
	belongs_to :user
	
	belongs_to :pais
	belongs_to :departamento
	belongs_to :provincia
	belongs_to :localidad
	belongs_to :barrio
	belongs_to :map_point_tipo
	
	validates :map_point_tipo_id, :presence => true
	validates :pais_id, :presence => true
	validates :localidad_id, :presence => true
	validates :barrio_id, :presence => true
	validates :descr, :length => 8..500
end
