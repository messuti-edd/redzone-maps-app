class MapPointController < ApplicationController
  def create
  end

  def destroy
  end
	
	def create_ajax
		time = Time.now
		@map_point = MapPoint.new()
		@map_point.tipo_id	= params[:tipo]
		@map_point.descr		= params[:descr]
		@map_point.fecha		= params[:fecha]
		@map_point.lat			= params[:lat]
		@map_point.lng			= params[:lng]
		@map_point.user			= current_user
		@map_point.fecha_creado = time
		@map_point.fecha_last_edit = time
		
		pais = Pais.find_all_by_nombre_and_nombre_corto(params[:pais], params[:pais_nc])
		
		if pais.length > 0
			@pais = pais.first
		else
			@pais = Pais.new(:nombre => params[:pais], :nombre_corto => params[:pais_nc])
			@pais.save()
		end
		
		@map_point.pais = @pais
		
		if @map_point.save()
			render :text => 'OK!'
		else
			render :text => 'fail'
		end
		
	end

end
