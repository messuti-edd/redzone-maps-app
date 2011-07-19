# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)


MapPointTipo.create([
		{:nombre => 'Asalto', :marker_image => "pin_asalto.png"}, 
		{:nombre => 'Atraco', :marker_image => "pin_atraco.png"}, 
		{:nombre => 'Asesinato', :marker_image => "pin_asesinato.png"}, 
		{:nombre => 'Foneada', :marker_image => "pin_foneada.png"}
	])