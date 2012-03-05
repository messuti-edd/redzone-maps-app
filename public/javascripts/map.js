var geocoder;
var map;
var results;
var new_point_marker = null;
var map_points_markers = [];
var map_point_tipos = [];
var zoom_on_hometown = 13;
var zoom_on_no_hometown = 9;

var got_data = {
	"pais": "",
	"pais_nc": "",
	"dep": "",
	"prov": "",
	"localidad": "",
	"lat": null,
	"lng": null
};


function initialize() {
	
	geocoder = new google.maps.Geocoder();
	var address = $j("input[name=search_key]").val();
	var latlng = new google.maps.LatLng(-34.0518110050727, 148.68843359375); //default
	if (address.length > 3) {
		latlng = codeAddress(address);
	}
	var myOptions = {
		zoom: address.length > 3 ? zoom_on_hometown : zoom_on_no_hometown,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	
	getPoints();
	
	var new_point_pressed = false;
	var orig_val = $j("#new_point").val();
	var geocoder_listener = null;
	
	$j("#new_point").click(function() {
		if (new_point_pressed == false) {
			new_point_pressed = true;
			$j(this).val("Cancelar");
			
			map.setOptions({
				draggableCursor: "url(/images/pin.gif) 64 116, auto"
			});
			
			geocoder_listener = google.maps.event.addListener(map, "click", function(e) {
				onMapClick(e);
			});
		}
		else {
			map.setOptions({draggableCursor: null});
			new_point_pressed = false;
			$j("#new_point").val(orig_val);
			
			if (new_point_marker != null) {
				new_point_marker.setMap(null);
				new_point_marker = null;
			}
			showNuevoPuntoForm(false);
			
			google.maps.event.removeListener(geocoder_listener);
		}
	});
	
	google.maps.event.addListener(map, "zoom_changed", function() {
			var zoom = map.getZoom();
			log("zoomed to "+zoom);
			
			scalePoints(zoom);
	});
}


function cleanForm() {
	$j("#reportDialog input[type=text]").val("");
	$j("#reportDialog textarea").val("");
	$j("#reportDialog select").val("-1");
	
	got_data.pais		= "";
	got_data.pais_nc	= "";
	got_data.dep		= "";
	got_data.prov		= "";
	got_data.localidad	= "";
}

function onMapClick(e) {
	if (geocoder) {
		geocoder.geocode(
		{
			latLng: e.latLng
			},
		function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				log(results);
				getDataFromLocation(results);

				if (new_point_marker == null) {
					new_point_marker = new google.maps.Marker({
						position: e.latLng,
						map: map,
						icon: "images/pin_64.png",
						draggable: true
					});

					map.setOptions({ draggableCursor: null, zoom: 17, center: e.latLng });
					google.maps.event.removeListener(geocoder_listener);
				}
			}
		});
		got_data.lat = e.latLng.lat();
		got_data.lng = e.latLng.lng();
		showNuevoPuntoForm(true);
	}
}

function getDataFromLocation(results) {
	var result = results[0]['address_components'];

	cleanForm();

	for (var i=0; i<result.length; i++) {
		var type = result[i].types[0];
		var name = result[i]['long_name'];

		if (type == 'country') {
			got_data.pais = name;
			got_data.pais_nc = result[i]['short_name'];;
		}
		else if (type == 'administrative_area_level_1') {
			got_data.dep = name;
		}
		else if (type == 'administrative_area_level_2') {
			got_data.prov = name;
		}
		else if (type == 'locality') {
			got_data.localidad = name;
		}
	}

//	$j("input[name=pais]").val(got_data.pais);
//	$j("input[name=dep]").val(got_data.dep);
//	$j("input[name=prov]").val(got_data.prov);
//	$j("input[name=localidad]").val(got_data.localidad);
}

function codeAddress() {
	var address = $j("input[name=search_key]").val();
	
	if (address <= 3) return;
	
	if (geocoder) {
		geocoder.geocode( {
			'address': address
		}, function(_results, status) {
			results = _results;
			if (status == google.maps.GeocoderStatus.OK) {
				map.setZoom(zoom_on_hometown);
				map.setCenter(_results[0].geometry.location);
			} else {
				alert("Geocode was not successful for the following reason: " + status);
			}
		});
	}
}

function getLatLngFromAdress(address) {
	var latLng = null;
	
	if (geocoder) {
		geocoder.geocode( {
			'address': address
		}, function(_results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				latLng = _results[0].geometry.location;
			}
		});
	}
	
	return latLng;
}

function getPoints() {
	$j.getJSON("smap_point/getpoints", {},
		function(data){
			map_points_markers = [];
			var tipos = data['point_tipos'];
			var points = data['points'];
			
			for (var i=0; i<tipos.length; i++) {
				map_points_markers[tipos[i][0]] = [];
				
				map_point_tipos[tipos[i][0]] = [tipos[i][1], tipos[i][2]];
			}
			
			for (var i=0; i<points.length; i++) {
				var point_id = points[i][0];
				var point_tipo = points[i][1];
				var point_lat = points[i][2];
				var point_lng = points[i][3];
				var markerImage = new google.maps.MarkerImage(
					"images/"+map_point_tipos[point_tipo][1],
					null, null,
					new google.maps.Point(4, 4),
					new google.maps.Size(8, 8)

				);

				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(point_lat, point_lng),
					map: map,
					icon: markerImage,
					draggable: false
				});
				marker['rzpoint_id'] = point_id;
				
				map_points_markers[point_tipo].push( marker );
			}
		}
	);
}

function scalePoints(scale) {
	scale = scale - 6;
	for (var i=1; i<map_points_markers.length; i++) {
		var point_markers = map_points_markers[i];
		var marker_image = map_point_tipos[i][1];
		
		for (var j=0; j<point_markers.length; j++) {
				
			var markerImage = new google.maps.MarkerImage(
				"images/"+marker_image,
				null, null,
				new google.maps.Point(scale/2, scale/2),
				new google.maps.Size(scale, scale)
			);
				
			point_markers[j].setIcon( markerImage );
		}
	}
}

function showNuevoPuntoForm(show) {
	if (show) {
		$j("#new_point_form").show();
		$j("input[name=send_point]").show();
	}
	else {
		$j("#new_point_form").hide();
		$j("input[name=send_point]").hide();
	}
}

$j(document).ready(function() {
	initialize();
	
//	$j('#reportDialog').dialog({
//		autoOpen: false,
//		width: 450,
//		height: 430,
//		modal: false,
//		open: null,
//		close: null
//	});
	
	$j("input[name=search]").click(function() {
		codeAddress();
	});
	
	$j("input[name=search_key]").keyup(function(evt) {
		if (evt.keyCode == 13) {
			codeAddress();
		}
	});
	
	$j("input[name=send_point]").click(function() {
		var tipo = $j("select[name=tipo]").val();
		var descr = $j("textarea[name=descr]").val();
		var barrio = $j("input[name=barrio]").val();
		var pais = got_data.pais;
		var pais_nc = got_data.pais_nc;
		var dep = got_data.dep;
		var prov = got_data.prov;
		var localidad = got_data.localidad
		var fecha = $j("input[name=fecha]").val();
		var lat = got_data.lat;
		var lng = got_data.lng;
		
		$j.get("smap_point/create", {
			tipo: tipo,
			descr: descr,
			pais: pais,
			pais_nc: pais_nc,
			dep: dep,
			prov: prov,
			localidad: localidad,
			barrio: barrio,
			fecha: fecha,
			lat: lat,
			lng: lng
		}, function(data) {
			if (!data['error']) {
				cleanForm();
				showNuevoPuntoForm(false);
				alert("Exito!");
			}
		});
	});
});