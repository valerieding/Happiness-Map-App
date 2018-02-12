var arr = [
  ['1116 E 59th St', 'Harper'],
  ['5640 S University Ave', 'Bartlett'],
  ['1005 E 60th St', 'Burton-Judson Courts'],
  ['6025 S Ellis Ave', 'Burton-Judson Courts'],
];
var myStringMap = new Map(arr);

var styles = {
  default: null,
  hide: [
    {featureType: 'poi.business', stylers: [{visibility: 'off'}]},
    {featureType: 'poi.attraction', stylers: [{visibility: 'off'}]},
    {featureType: 'poi.school', stylers: [{visibility: 'off'}]},
    {featureType: 'poi.place_of_worship', stylers: [{visibility: 'off'}]},
    {featureType: 'poi.medical', stylers: [{visibility: 'off'}]},
    {featureType: 'poi.sports_complex', stylers: [{visibility: 'off'}]},
    {featureType: 'poi.government', stylers: [{visibility: 'off'}]},
    {featureType: 'transit', elementType: 'labels.icon', stylers: [{visibility: 'off'}]}
  ]
};

function initMap() {
  var myLatlng = {lat: 41.791422, lng: -87.599729};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: myLatlng
  });
   map.setOptions({styles: styles['hide']});
  
  var geocoder = new google.maps.Geocoder;

  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: 'Click to zoom'
  });

  map.addListener('click', function(e) {
    marker.setMap(null);
    marker = null;
    marker = placeMarker(e.latLng, map);
    geocodeLatLng(geocoder, map, marker);
  });

  marker.addListener('click', function() {
    //map.setZoom(8);
    //map.setCenter(marker.getPosition());
  });
}

function placeMarker(position, map) {
  //marker.setMap(null);
  var marker = new google.maps.Marker({
      position: position,
      map: map
  });
  return marker;
  //map.panTo(position);
}

function geocodeLatLng(geocoder, map, marker) {
  var latlng = marker.getPosition();
  //window.alert(latlng);
  if(isOnCampus(latlng)) {
    if(isQuad(latlng)) {
      window.alert("Quads");
    } else {
      geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          var logicalLoc = toLogicalLoc(results[0].formatted_address);
          if(logicalLoc == null) {
            window.alert("Unknown Location: " + latlng);
          } else {
            //map.setZoom(11);
            window.alert(toLogicalLoc(results[0].formatted_address));
          }
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
    }
  } else {
    window.alert("Not on Campus");
  }




  
}

function isQuad(latlng) {
  if(latlng.lat() > 41.7880849860362 
    && latlng.lat() < 41.7900248540438
    && latlng.lng() < -87.59810328483582
    && latlng.lng() > -87.60076940059662) {
    return true;
  } else {
    return false;
  }
}

function isOnCampus(latlng) {
  if(latlng.lat() > 41.784113073154536 
    && latlng.lat() < 41.79494425609071
    && latlng.lng() < -87.59028196334839
    && latlng.lng() > -87.60500192642212) {
    return true;
  } else {
    return false;
  }
}

function toLogicalLoc(formatted_address) {
  var ret = null;//formatted_address;//"Unknown Location";
  var split = formatted_address.split(',');
  if(!isNaN(formatted_address[0])) {
    if(myStringMap.has(split[0])) {
      ret = myStringMap.get(split[0]);
    }
  } else {
    ret = split[0];
  }
  return ret;
}











