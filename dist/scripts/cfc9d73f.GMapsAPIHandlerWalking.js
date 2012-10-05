DirectionsRequest = {
  // origin: openXCStartLatitude.value,openXCStartLongitude.value,
  // destination: openXCStopLatitude.value,openXCStopLatitude.value,
  travelMode: 'WALKING',
  optimizeWaypoints: false,
  provideRouteAlternatives: false,
  avoidHighways: false,
  avoidTolls: false,
  region: String
}

var map;
var directionsDisplay;
var totalWalkTime;
var directionsService;
var stepDisplay;
var markerArray = [];

function initialize() {
  // Instantiate a directions service.
  directionsService = new google.maps.DirectionsService();

  // Create a map and center it on destination.
  var destination = new google.maps.LatLng(openXCStopLatitude.value,openXCStopLatitude.value);
  var mapOptions = {
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: destination
  }
  map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

  // Create a renderer for directions and bind it to the map.
  var rendererOptions = {
    map: map
  }
  directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions)

  // Instantiate an info window to hold step text.
  stepDisplay = new google.maps.InfoWindow();
}

function calcRoute() {

  // First, clear out any existing markerArray
  // from previous calculations.
  for (i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }

  // Retrieve the start and end locations and create
  // a DirectionsRequest using WALKING directions.
  var start = document.getElementById("start").value;
  var end = document.getElementById("end").value;
  var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.WALKING
  };

  // Route the directions and pass the response to a
  // function to create markers for each step.
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      var warnings = document.getElementById("warnings_panel");
      warnings.innerHTML = "" + response.routes[0].warnings + "";
      directionsDisplay.setDirections(response);
      showSteps(response);
    }
  });
}

function showSteps(directionResult) {
  // For each step, place a marker, and add the text to the marker's
  // info window. Also attach the marker to an array so we
  // can keep track of it and remove it when calculating new
  // routes.
  var myRoute = directionResult.routes[0].legs[0];

  for (var i = 0; i < myRoute.steps.length; i++) {
      var marker = new google.maps.Marker({
        position: myRoute.steps[i].start_point,
        map: map
      });
      attachInstructionText(marker, myRoute.steps[i].instructions);
      markerArray[i] = marker;
  }
}
//total distance value
function computeTotalDistance(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = (total / 1000)*1.60934.
  document.getElementById("total").innerHTML = total + " miles";
}
//total time value
function computeTotalTime(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].duration.value;
  }
  totalWalkTime = total / 60.
  document.getElementById("total").innerHTML = totalWalkTime + " minutes";
}

function attachInstructionText(marker, text) {
  google.maps.event.addListener(marker, 'click', function() {
    stepDisplay.setContent(text);
    stepDisplay.open(map, marker);
  });
}