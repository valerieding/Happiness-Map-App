var arr = [
  ['1116 E 59th St', 'harper'],
  ['5640 S University Ave', 'Bartlett'],
  ['1005 E 60th St', 'bj'],
  ['6025 S Ellis Ave', 'bj'],
  ['Burton-Judson Courts', 'bj'],
  ['Mansueto', 'mansueto'],
  ['South Campus Dining Commons', 'cathey"'],
  ['Renee Granville-Grossman Residential Commons', 'south'],
  ['Laird Bell Law Quadrangle', 'law'],
  ['1121 E 60th St,', 'law'],
  ['Harris School of Public Policy', 'harris'],
  ['New Graduate Residence', 'new_grad'],
  ['Ida Noyes Hall', 'ida'],
  ['Chicago Booth Harper Center', 'booth'],
  ['The Oriental Institute', 'oriental'],
  ['5850 S Woodlawn Ave', 'rock'],
  ['1155 E 57th St', 'quadr'],
  ['5757 S University Ave', 'saieh'],
  ['5550 S University Ave', 'henry'],
  ['Alumni House', 'alumni'],
  //TODO snell
  ['Hutchinson Commons', 'reynolds'],
  ['5706 S University Ave', 'reynolds'],
  ['Samuel Kersten Jr Physics Teaching Center', 'physics'], //TODO check
  //TODO medical campus
  ['Midway Studio', 'logan'],
  ['5737 S University Ave', 'east'],
  ['5735 S University Ave', 'east'],
  ['5733 S University Ave', 'east'],
  ['5803 S University Ave', 'east'],
  ['5514 S University Ave', 'north'],
  ['1105 E 55th St', 'north'],
  ['5500 S University Ave', 'north'],
  ['1125 E 55th St', 'north'],
  ['Omsa/LGBTQ', 'multi'],
  //TODO north quadr
  ['Kent Chemical Laboratory', 'lab'],
  ['Searle Chemical Laboratory', 'lab'],
  ['5730 S Ellis Ave', 'crerar'],
  ['Regenstein Library', 'regenstein'],
  ['5640 S University Ave', 'bartlett'],
  ['5625 S Ellis Ave', 'maxp'],
  ['1101 E 56th St', 'maxp'],
  ['1119-1137 E 56th St', 'maxp'],
  ['5630 S University Ave', 'maxp'],
  ['5707 S University Ave', 'maxp'],
  ['5702 S Greenwood Ave', 'maxp'],
  //TODO hutch
  ['Swift Hall', 'swift'],
  ['Culver Hall', 'mainNorth'],
  ['Anatomy Bldg', 'mainNorth'],
  ['Zoology Bldg', 'mainNorth'],
  ['Ida B. and Walter Erman Biology Center', 'mainNorth'],
  ['970 E 58th St', 'bookstore'],
  ['Edward H. Levi Hall', 'edward'],
  ['Cobb Lecture Hall', 'cobb'],
  //TODO classics
  ['Social Science Research Bldg', 'ssr'],
  ['Harold Leonard Stuart Hall', 'stuart'],
  ['Rosenwald Hall', 'rosenwald'],
  ['Ryerson Physical Laboratory', 'ryeck'],
  ['Eckhart Hall', 'ryeck'],
  ['Ratner', 'ratner'],
  ['5848 S University Ave', 'southeast'],
  ['Albert Pick Hall for International Studies', 'southeast'],
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

  var map = new google.maps.Map(document.getElementById('campus-map'), {
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
    //getLocName();
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
      geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          //window.alert(results[0].formatted_address);
          var logicalLoc = toLogicalLoc(results[0].formatted_address);
          if(logicalLoc == null) {
            if(isQuad(latlng)) {
              currentMapLoc = 'quad';
              //window.alert("Quads");
            } else {
              currentMapLoc = 'offcampus';
              window.alert("Unknown Location: " + latlng);
            }
          } else {
            currentMapLoc = toLogicalLoc(results[0].formatted_address);
            //map.setZoom(11);
          }
        } else {
          currentMapLoc = null;
          window.alert('No results found');
        }
      } else {
        currentMapLoc = null;
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  } else {
    currentMapLoc = 'offcampus';
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
  if(myStringMap.has(split[0])) {
    ret = myStringMap.get(split[0]);
  }
  return ret;
}











