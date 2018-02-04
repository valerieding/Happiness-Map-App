

function initMap() {
  // Create a map object and specify the DOM element for display.
  console.log("reached initMap");
  var map = new google.maps.Map(document.getElementById('campus-map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}
