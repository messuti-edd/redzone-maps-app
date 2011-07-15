function initialize() {
	geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(-34.397, 150.644);
	var myOptions = {
		zoom: 8,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
}


var map = null;

$(document).ready(function() {
	initialize();
	MapBounds.init(map);
	
	
	// Autoselect
	$("input[name=points]").click(function(e) {
		e.preventDefault();
		$(this).select();
	});
	
	
	// START / GET SELECTION
	$("input[name=start]").click(function(e) {
		if (MapBounds.draggingActive) {
			MapBounds.startSelection();
			
			$("input[name=points]").val('');
			$(this).val("Get Selection");
			$(this).addClass("selecting");
		}
		else {
			$("input[name=points]").val( MapBounds.getSelection() ); // Paste points
//			
			$(this).val("Start Selection");
			$(this).removeClass("selecting");
		}
	})
});