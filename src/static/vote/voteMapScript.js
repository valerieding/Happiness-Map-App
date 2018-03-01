/* This script initializes the embedded Google Map, and handles functions
 * such as clicks on the map in order to determing the logical location
 * from the click location, to set the location for a happiness vote. 
 */

// An array mapping addresses to logical locations used for voting
var arr = [
  ['1116 E 59th St', 'harper'],
  ['5640 S University Ave', 'bartlett'],
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



/** MAP FUNCTIONS **/

// Styles for the Google Map
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

var map;
var marker;
var gecoder;
var gNavigator;

function snapToCurrentLoc() {
  if (gNavigator.geolocation || isOnCampus(myLatlng.lat(), myLatlng.lng()) == true) {
    gNavigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      marker = placeMarker(pos, map);
      if(currentMapLoc == null) {
        geocodeLatLng(geocoder, map, marker);
        autoLoc = true;
        //which_loc = 'auto';
      }



      map.setCenter(pos); 
    }, function() {
        //handleLocationError(true, infoWindow, map.getCenter());    
        //marker = placeMarker(myLatlng, map);
        //geocodeLatLng(geocoder, map, marker);
        free_click = true;
      });
  } else {
      // Browser doesnt' support Geolocation
      // handleLocationError(false, infoWindow, map.getCenter())
      free_click = true;
      //auto_loc = "<h5> Not currently on campus </h5>";
      //document.getElementById("autofill_loc").innerHTML = "<h5>Not on campus</h5>";
  }
}

/* Revision to above initMap() implementation
 * this one automatically provides your location with Google Maps Geolocation API
 * 
 * Automatically place marker on user's current location
 * If user is off campus, then default to campus center
 */
function initMap() {
  var myLatlng = {lat: 41.791422, lng: -87.599729};
  map = new google.maps.Map(document.getElementById('campus-map'), {
    zoom: 16,
    center: myLatlng
  });

  var free_click = false;
  map.setOptions({styles: styles['hide']});

  geocoder = new google.maps.Geocoder;
  gNavigator = navigator;

  //snapToCurrentLoc(navigator, map, marker, geocoder);

  map.addListener('click', function(e) {
   // if (free_click == true) {
      marker.setMap(null);
      marker = null;
      marker = placeMarker(e.latLng, map);
      geocodeLatLng(geocoder, map, marker);

   // }
  });

  if (free_click == true)
    marker.addListener('click', function() {});

}

/* This function places a marker on the map at the specified position. */
function placeMarker(position, map) {
  var marker = new google.maps.Marker({
      position: position,
      map: map
  });
  return marker;
}

/* This function determines the address of the clicked location, and further
 * maps this address to a logical location of the type used in voting.
 * 
 * This function sets the value of a global variable currentMapLoc (which is 
 * NOT declared in this script, and must be declared in the HTML file or script 
 * that contains this script) to the determined logical location 
 */
function geocodeLatLng(geocoder, map, marker) {
  var latlng = marker.getPosition();
  if(isOnCampus(latlng.lat(), latlng.lng())) {
      geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          var logicalLoc = toLogicalLoc(results[0].formatted_address);
          if(logicalLoc == null) {
            if(isQuad(latlng.lat(), latlng.lng())) {
              currentMapLoc = 'quad';
            } else {
              currentMapLoc = 'offcampus';
            }
          } else {
            currentMapLoc = toLogicalLoc(results[0].formatted_address);
          }
        } else {
          currentMapLoc = null;
        }
      } else {
        currentMapLoc = null;
      }
    });
  } else {
    currentMapLoc = 'offcampus';
  }
  autoLoc = false;
  which_loc = 'map';
}  

/* This function determines if a given click is within the boundaries of
 * the quad. It does not check whether the click is a buliding within the 
 * boundaries of the quad */
function isQuad(lat, lng) {
  if(lat > 41.7880849860362 
    && lat < 41.7900248540438
    && lng < -87.59810328483582
    && lng > -87.60076940059662) {
    return true;
  } else {
    return false;
  }
}

function mitchTest() {
  return true;
}



/* This function determines if a given click is within the boundaries of
 * campus. */
function isOnCampus(lat, lng) {
  if(lat > 41.784113073154536 
    && lat < 41.79494425609071
    && lng < -87.59028196334839
    && lng > -87.60500192642212) {
    return true;
  } else {
    return false;
  }
}

/* This function finds if a formatted_address from the geolocator is in 
 * myStringMap and returns the logical location from myStringMap if it is 
 * (or null if not). */
function toLogicalLoc(formatted_address) {
  var ret = null;
  var split = formatted_address.split(',');
  if(myStringMap.has(split[0])) {
    ret = myStringMap.get(split[0]);
  }
  return ret;
}











