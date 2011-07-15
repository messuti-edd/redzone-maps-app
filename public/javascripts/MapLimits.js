var MapLimits = {
	map: null,
	limitsEventListener: null,
	
	/**
	 * @param _map The map to be limited
	 * @param bounds The LatLngBounds object, or the selection from the MapBounds selector
	 */
	init: function(_map, bounds) {
		this.map = _map;
		if (typeof(bounds) == 'string') { // Comes from MapBounds selector
			bounds = getBoundsFromSelection(bounds);
		}
		
		this.map.fitBounds( bounds );
		var self = this;
		var oldZoom = this.map.getZoom();

		var listener = google.maps.event.addListener(this.map, "idle", function() {
			self.map.setZoom(oldZoom);
			google.maps.event.removeListener(listener); 
		});

		this.limitsEventListener = 
			google.maps.event.addListener(this.map, "drag", function() {
			checkBounds(self.map, bounds);
		});
	},
	
	quit: function() {
		google.maps.event.removeListener(this.limitsEventListener);
	}
}

function getBoundsFromSelection(sel) {
	var boundsArr = sel.split(";");
	var lat1 = boundsArr[0]*1;
	var lng1 = boundsArr[1]*1;
	var lat2 = boundsArr[2]*1;
	var lng2 = boundsArr[3]*1;
	
	if (lat1 > lat2) {
		var tmp = lat1;
		lat1 = lat2;
		lat2 = tmp;
	}
	
	if (lng1 > lng2) {
		var tmp = lng1;
		lng1 = lng2;
		lng2 = tmp;
	}

	var latlng1 = new google.maps.LatLng(lat1, lng1);
	var latlng2 = new google.maps.LatLng(lat2, lng2);
	var bounds = new google.maps.LatLngBounds(latlng1, latlng2);
	
	return bounds;
}

function checkBounds(_map, allowedBounds) {
	var mapBounds = _map.getBounds();
	
	if (allowedBounds.contains(mapBounds.getNorthEast()) &&
		allowedBounds.contains(mapBounds.getSouthWest())) {
		return true;
	}

	var AmaxX = allowedBounds.getNorthEast().lng();
	var AmaxY = allowedBounds.getNorthEast().lat();
	var AminX = allowedBounds.getSouthWest().lng();
	var AminY = allowedBounds.getSouthWest().lat();
	
	var mapMaxX = mapBounds.getNorthEast().lng();
	var mapMaxY = mapBounds.getNorthEast().lat();
	var mapMinX = mapBounds.getSouthWest().lng();
	var mapMinY = mapBounds.getSouthWest().lat();
	
		
	if (mapMaxX > AmaxX) {
		mapMaxX = AmaxX;
	}
	if (mapMaxY > AmaxY) {
		mapMaxY = AmaxY;
	}

	if (mapMinX < AminX) {
		mapMinX = AminX;
	}
	if (mapMinY < AminY) {
		mapMinY = AminY;
	}
	
	var newBounds = new google.maps.LatLngBounds(
			new google.maps.LatLng(mapMinY, mapMinX),
			new google.maps.LatLng(mapMaxY, mapMaxX)
		);
	
	var zoom = _map.getZoom();
	_map.fitBounds(newBounds);
	_map.setZoom(zoom);
	
	return false;
}