
/* --------------------------------------------
Google Map
-------------------------------------------- */	
window.onload = MapLoadScript;
function GmapInit() {
	  Gmap = $('.map-canvas');
	  Gmap.each(function() {
		var $this           = $(this),
			lat             = '',
			lng             = '',
			zoom            = 12,
			scrollwheel     = false,
			zoomcontrol 	= true,
			draggable       = true,
			mapType         = google.maps.MapTypeId.ROADMAP,
			title           = '',
			contentString   = '',
			theme_icon_path = $this.data('icon-path'),
			dataLat         = $this.data('lat'),
			dataLng         = $this.data('lng'),
			dataZoom        = $this.data('zoom'),
			dataType        = $this.data('type'),
			dataScrollwheel = $this.data('scrollwheel'),
			dataZoomcontrol = $this.data('zoomcontrol'),
			dataHue         = $this.data('hue'),
			dataTitle       = $this.data('title'),
			dataContent     = $this.data('content');
			
		if( dataZoom !== undefined && dataZoom !== false ) {
			zoom = parseFloat(dataZoom);
		}
		if( dataLat !== undefined && dataLat !== false ) {
			lat = parseFloat(dataLat);
		}
		if( dataLng !== undefined && dataLng !== false ) {
			lng = parseFloat(dataLng);
		}
		if( dataScrollwheel !== undefined && dataScrollwheel !== null ) {
			scrollwheel = dataScrollwheel;
		}
		if( dataZoomcontrol !== undefined && dataZoomcontrol !== null ) {
			zoomcontrol = dataZoomcontrol;
		}
		if( dataType !== undefined && dataType !== false ) {
			if( dataType == 'satellite' ) {
				mapType = google.maps.MapTypeId.SATELLITE;
			} else if( dataType == 'hybrid' ) {
				mapType = google.maps.MapTypeId.HYBRID;
			} else if( dataType == 'terrain' ) {
				mapType = google.maps.MapTypeId.TERRAIN;
			}		  	
		}
		if( dataTitle !== undefined && dataTitle !== false ) {
			title = dataTitle;
		}
		if( navigator.userAgent.match(/iPad|iPhone|Android/i) ) {
			draggable = false;
		}
		
		var mapOptions = {
		  zoom        : zoom,
		  scrollwheel : scrollwheel,
		  zoomControl : zoomcontrol,
		  draggable   : draggable,
		  center      : new google.maps.LatLng(lat, lng),
		  mapTypeId   : mapType
		};		
		var map = new google.maps.Map($this[0], mapOptions);
		
		//var image = 'images/icons/map-marker.png';
		var image = theme_icon_path;
		
		if( dataContent !== undefined && dataContent !== false ) {
			contentString = '<div class="map-data">' + '<h6>' + title + '</h6>' + '<div class="map-content">' + dataContent + '</div>' + '</div>';
		}
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});
		
		var marker = new google.maps.Marker({
		  position : new google.maps.LatLng(lat, lng),
		  map      : map,
		  icon     : image,
		  title    : title
		});
		if( dataContent !== undefined && dataContent !== false ) {
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map,marker);
			});
		}
		
		if( dataHue !== undefined && dataHue !== false ) {
			var styledMapType = new google.maps.StyledMapType(
				[
				  {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
				  {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
				  {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
				  {
					featureType: 'administrative',
					elementType: 'geometry.stroke',
					stylers: [{color: '#c9b2a6'}]
				  },
				  {
					featureType: 'administrative.land_parcel',
					elementType: 'geometry.stroke',
					stylers: [{color: '#dcd2be'}]
				  },
				  {
					featureType: 'administrative.land_parcel',
					elementType: 'labels.text.fill',
					stylers: [{color: '#ae9e90'}]
				  },
				  {
					featureType: 'landscape.natural',
					elementType: 'geometry',
					stylers: [{color: '#dfd2ae'}]
				  },
				  {
					featureType: 'poi',
					elementType: 'geometry',
					stylers: [{color: '#dfd2ae'}]
				  },
				  {
					featureType: 'poi',
					elementType: 'labels.text.fill',
					stylers: [{color: '#93817c'}]
				  },
				  {
					featureType: 'poi.park',
					elementType: 'geometry.fill',
					stylers: [{color: '#a5b076'}]
				  },
				  {
					featureType: 'poi.park',
					elementType: 'labels.text.fill',
					stylers: [{color: '#447530'}]
				  },
				  {
					featureType: 'road',
					elementType: 'geometry',
					stylers: [{color: '#f5f1e6'}]
				  },
				  {
					featureType: 'road.arterial',
					elementType: 'geometry',
					stylers: [{color: '#fdfcf8'}]
				  },
				  {
					featureType: 'road.highway',
					elementType: 'geometry',
					stylers: [{color: '#f8c967'}]
				  },
				  {
					featureType: 'road.highway',
					elementType: 'geometry.stroke',
					stylers: [{color: '#e9bc62'}]
				  },
				  {
					featureType: 'road.highway.controlled_access',
					elementType: 'geometry',
					stylers: [{color: '#e98d58'}]
				  },
				  {
					featureType: 'road.highway.controlled_access',
					elementType: 'geometry.stroke',
					stylers: [{color: '#db8555'}]
				  },
				  {
					featureType: 'road.local',
					elementType: 'labels.text.fill',
					stylers: [{color: '#806b63'}]
				  },
				  {
					featureType: 'transit.line',
					elementType: 'geometry',
					stylers: [{color: '#dfd2ae'}]
				  },
				  {
					featureType: 'transit.line',
					elementType: 'labels.text.fill',
					stylers: [{color: '#8f7d77'}]
				  },
				  {
					featureType: 'transit.line',
					elementType: 'labels.text.stroke',
					stylers: [{color: '#ebe3cd'}]
				  },
				  {
					featureType: 'transit.station',
					elementType: 'geometry',
					stylers: [{color: '#dfd2ae'}]
				  },
				  {
					featureType: 'water',
					elementType: 'geometry.fill',
					stylers: [{color: '#b9d3c2'}]
				  },
				  {
					featureType: 'water',
					elementType: 'labels.text.fill',
					stylers: [{color: '#92998d'}]
				  }
				],
				{name: 'Styled Map'});
	
		  map.setOptions({styles: styles});
		}
	 });
}
	
function MapLoadScript() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	GmapInit();
	document.body.appendChild(script);
}

