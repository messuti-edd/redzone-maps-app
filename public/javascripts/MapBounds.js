
var MapBounds = {
	map: null,
	map_id: null,
	self: null,
	mouseDown: false,
	point1: null, point2: null,
	startPosX: 0, startPosY: 0,
	noDraggingEvent: null,
	draggingActive: true,
	
	init: function(_map) {
		this.map = _map;
		this.map_id = $(this.map.getDiv()).attr("id");
		var self = this;
		
		$("body").append('<div id="sel" style="background-color: #ccc;'+
			'border: 1px solid blue;position: absolute;'+
			'width: 100%;'+
			'-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";'+
			'filter: alpha(opacity=50);'+
			'-moz-opacity:0.5;'+
			'-khtml-opacity: 0.5'+
			'opacity: 0.5'+
			'z-index: 10;"></div>');
		
		google.maps.event.addListener(this.map, 'mousedown', function(event) {
			self.point1 = event.latLng
			self.mouseDown = true;
		});

		google.maps.event.addListener(this.map, 'mouseup', function(event) {
			self.point2 = event.latLng;
			self.mouseDown = false;
		});
		
		$("#"+this.map_id).mousedown(function(e) {
			self.startPosX = e.pageX;
			self.startPosY = e.pageY;
		});
		
		$("#map_canvas, #sel").mousemove(function(e) {
			if (self.mouseDown && !self.draggingActive) {

				var endPosX = e.pageX;
				var endPosY = e.pageY;

				var width	= 0;
				var height	= 0;
				var top		= 0;
				var left	= 0;

				if (endPosX > self.startPosX) {
					width = endPosX - self.startPosX;
					left = self.startPosX;
				}
				else {
					width = self.startPosX - endPosX;
					left = self.startPosX - width;
				}

				if (endPosY > self.startPosY) {
					height = endPosY - self.startPosY;
					top = self.startPosY;
				}
				else {
					height = self.startPosY - endPosY;
					top = self.startPosY - height;
				}

				$("#sel").show();
				$("#sel").css('width', width);
				$("#sel").css('height', height);
				$("#sel").css('top', top);
				$("#sel").css('left', left);
			}
		});
	},
	
	startSelection: function() {
		var self = this;
		var c = self.map.getCenter();
		this.noDraggingEvent = google.maps.event.addListener(self.map, 'drag', function() {
			self.map.setCenter( c ); // Disable dragging
		});
		this.draggingActive = false;
	},
	
	getSelection: function() {
		google.maps.event.removeListener(this.noDraggingEvent); // Enable dragging
		var points = this.point1.lat()+";"+this.point1.lng()+";"+this.point2.lat()+";"+this.point2.lng();
		$("#sel").hide();

		this.draggingActive = true;
		return points;
	}
}