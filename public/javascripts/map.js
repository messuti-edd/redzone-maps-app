var geocoder;
var map;
var results;

var got_data = {
	"pais": "",
	"pais_nc": "",
	"dep": "",
	"prov": "",
	"localidad": "",
	"lat": null,
	"lng": null
};

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

function initialize() {
	geocoder = new google.maps.Geocoder();
	var address = $j("input[name=search_key]").val();
	var latlng = new google.maps.LatLng(-34.0518110050727, 148.68843359375); //default
	if (address.length > 3) {
		latlng = codeAddress(address);
	}
	var myOptions = {
		zoom: 8,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	
	
	
	var new_point_pressed = false;
	var orig_val = $j("#new_point").val();
	var geocoder_listener = null;
	
	$j("#new_point").click(function() {
		if (new_point_pressed == false) {
			new_point_pressed = true;
			$j(this).val("Cancelar");
			
			geocoder_listener = google.maps.event.addListener(map, "click", function(e) {
				if (geocoder) {
					geocoder.geocode(
					{latLng: e.latLng},
					function(results, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							log(results);
							getDataFromLocation(results);
						}
					});
					got_data.lat = e.latLng.lat();
					got_data.lng = e.latLng.lng();
					$j('#reportDialog').dialog("open");
				}
			});
		}
		else {
			new_point_pressed = false;
			$j(this).val(orig_val);
			
			google.maps.event.removeListener(geocoder_listener);
		}
	});
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

	$j("input[name=pais]").val(got_data.pais);
	$j("input[name=dep]").val(got_data.dep);
	$j("input[name=localidad]").val(got_data.localidad);
}

function codeAddress() {
	var address = $j("input[name=search_key]").val();
	
	if (geocoder) {
		geocoder.geocode( {
			'address': address
		}, function(_results, status) {
			results = _results;
			if (status == google.maps.GeocoderStatus.OK) {
				map.setZoom(13);
				map.setCenter(_results[0].geometry.location);
//				var marker = new google.maps.Marker({
//					map: map, 
//					position: _results[0].geometry.location
//				});
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

$j(document).ready(function() {
	initialize();
	
	$j('#reportDialog').dialog({
		autoOpen: false,
		width: 450,
		height: 430,
		modal: false,
		open: null,
		close: null
	});
	
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
			fecha: fecha,
			lat: lat,
			lng: lng
		}, function(data) {
			log(data);
		});
	});
});