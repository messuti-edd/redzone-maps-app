class MapPointController < ApplicationController
  def create
  end

  def destroy
  end
	
	def get_points_ajax
		map_points = MapPoint.all
		map_point_types = MapPointTipo.all
		
		points_array = Array.new
		map_points.each do |point|
			points_array.push([point.id, point.map_point_tipo_id, point.lat, point.lng])
		end
		
		point_types_array = Array.new
		map_point_types.each do |point_tipo|
			point_types_array.push([point_tipo.id, point_tipo.nombre, point_tipo.marker_image])
		end
		
		render :json => {:point_tipos => point_types_array, :points => points_array}
	end
	
	def create_ajax
		@map_point = MapPoint.new()
		@map_point.map_point_tipo	= MapPointTipo.find_by_id(params[:tipo])
		@map_point.descr		= params[:descr]
		@map_point.fecha		= params[:fecha]
		@map_point.lat			= params[:lat]
		@map_point.lng			= params[:lng]
		@map_point.user			= current_user
		
		# create or get pais
		@pais = Pais.find_by_nombre_and_nombre_corto(params[:pais], params[:pais_nc])
		if @pais == nil
			@pais = Pais.create(:nombre => params[:pais], :nombre_corto => params[:pais_nc])
		end
		@map_point.pais = @pais
		
		# create or get departamento
		@dep = Departamento.find_by_pais_id_and_nombre(@pais.id, params[:dep])
		if @dep == nil
			@dep = Departamento.create(:nombre => params[:dep], :pais_id => @pais.id)
		end
		@map_point.departamento = @dep
		
		# create or get provincia
		if params[:prov].length > 0
			@prov = Provincia.find_by_departamento_id_and_nombre(@dep.id, params[:prov])
			if (@prov == nil and params[:prov].length > 0)
				@prov = Provincia.create(:nombre => params[:prov], :departamento_id => @dep.id)
			end
			@map_point.provincia = @prov
		end
		
		# create or get localidad
		if params[:prov].length > 0
			@localidad = Localidad.find_by_provincia_id_and_nombre(@prov.id, params[:localidad])
			if @localidad == nil
				@localidad = Localidad.create(:nombre => params[:localidad], :provincia_id => @prov.id, 
					:departamento_id => @dep.id)
			end
		else
			@localidad = Localidad.find_by_departamento_id_and_nombre(@dep.id, params[:localidad])
			if @localidad == nil
				@localidad = Localidad.create(:nombre => params[:localidad], :departamento_id => @dep.id)
			end
		end
		@map_point.localidad = @localidad
		
		# create or get barrio
		@barrio = Barrio.find_by_localidad_id_and_nombre(@localidad.id, params[:barrio])
		if @barrio == nil
			@barrio = Barrio.create(:nombre => params[:barrio], :localidad_id => @localidad.id)
		end
		@map_point.barrio = @barrio
		
		
		if @localidad != nil and @map_point.save()
			render :json => {:error => false, :mssg => "Creado con exito!"}
		else
			render :json => {:error => true, :mssg => "Error creando el punto!"}
		end
		
	end

end
