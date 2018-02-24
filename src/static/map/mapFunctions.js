//where map stuff goes
var helloworld = function(){
  return 'Hello World';
};

// structures for mapping
const week = 604800;
const day =  86400;
const twoHr = 7200;

const ColorNumKey = ['#f1eef6','#d7b5d8','#df65b0','#dd1c77','#980043'];
const nullColor = "#ADADAD";
const HappinessTextKey = ["not at all happy", "only a little happy", "somewhat happy", "happy", "very happy"];

var regions = [];

var FullNameKey = Object.freeze({
  bj : "Burton Judson Courts",
  cathey : "Cathey Dining Commons",
  south : "South Campus Residence Hall",
  law : "Law School",
  harris : "Harris School",
  new_grad : "New Graduate Residence Halls",
  ida : "Ida Noyes",
  booth : "Booth School of Business",
  oriental : "Oriental Institute",
  rock : "Rockefeller Chapel",
  quadr : "Quadrangle Club",
  saieh : "Saieh Hall for Economics",
  henry : "Henry Crown Field House",
  smart : "Smart Museum",
  alumni : "Alumni House",
  snell :  "Snell-Hitchcock",
  reynolds : "Reynolds Club",
  physics : "Physics Buildings",
  med : "Medical Campus",
  logan : "Logan and Midway Studios",
  eastBuild : "East Quad Buildings",
  north : "Campus North Residence and Dining",
  multi : "Office of Multicultural Affairs",
  northBuild : "North Quad Buildings",
  lab : "Lab Buildings",
  crerar : "Crerar Library",
	mansueto : "Mansueto Library",
	regenstein : "Regenstein Library",
  bartlett : "Bartlett Dining Commons",
  maxp : "Max Palevsky Commons",
  hutch : "Hutchinson Commons",
  swift : "Swift Hall",
  reynolds : "Reynolds Club",
  mainNorth : "Main Quad North Buildings",
  bookstore : "University Bookstore",
  edward : "Edward H Levi Hall",
  cobb : "Cobb Hall",
  swift : "Swift Hall",
  bond : "Bond Chapel",
  classicsBuilds : "Classics Quad Buildings",
  harper : "Harper Memorial Library",
  ssr : "Social Science Research",
  stuart : "Stuart Hall",
  rosenwald : "Rosenwald",
  ryeck : "Ryerson/Eckhart",
  ratner : "Ratner Athletics Center",
  southeast : "South East Quad Buildings",
});


//map page functions
function databaseToMapObj(n) {
  return {
    id: n.logical_location,
    score: formatScore(n.happiness_level),
    fullname: getName(n),
    color: computeColor(n),
    rating: getHappinessRating(n)
  };
};

function emptyMapObj(n) {
  return {
    id: n,
    score: "n/a",
    fullname: FullNameKey[n],
    color: nullColor,
    rating: "no data available"
  };
};

function allMapObjects(ns) {
  let allObjs = {};
  for (var prop in FullNameKey){
    allObjs[prop] = emptyMapObj(prop);
  }
  if (ns) {
    ns.forEach(function(n) {
      allObjs[n.logical_location] = databaseToMapObj(n);
    });
  }
  return allObjs;
};

function getName(n) {
  if (n.logical_location){
    return FullNameKey[n.logical_location];
  }
  return "";
};

function computeColor(n) {
  if (n.happiness_level){
    return ColorNumKey[Math.floor(n.happiness_level) - 1];
  }
  return "";
};

function getHappinessRating(n) {
  if (n.happiness_level){
    return HappinessTextKey[Math.floor(n.happiness_level) - 1];
  } return "";
};

function formatScore(n) {
  return Math.round(100 * n) / 100;
}




//querying database functions
function getCampusScore(start_time) {
    if (!start_time) {
      start_time = 0;
    }
    var campus_avg;
    $.ajax({
      url: '/request/get_campus_average',
      type: 'post',
      async: false,
      data: {'start_time': start_time},
      success: function(data){
        campus_avg = data;
      }
    });
    if (campus_avg){
      return campus_avg;
    }
    return "n/a";
};

function getAllBuildingScores(start_time) {
  var allScores;

  if (start_time) {
    $.ajax({
      url: '/request/get_heatmap',
      type: 'post',
      dataType: 'json',
      async: false,
      data: {'start_time': start_time},
      success: function(data){
        allScores = data;
      }
    });
  } else {
    $.ajax({
      url: '/request/get_heatmap',
      type: 'post',
      dataType: 'json',
      async: false,
      data: {'start_time': 0},
      success: function(data){
        allScores = data;
      }
    });
  }
  return allScores;
};

function getBuildingScore(logloc) {
  var score;
  $.ajax({
    url: '/request/get_building_average',
    type: 'post',
    dataType: 'json',
    data: {'logical_location': logloc, 'start_time': 0},
    success: function(data){
      score = data;
    }
  });
  return score;
};


//modifying map html functions
function changeTimeFrame(start_time, regions) {
	let allScores = getAllBuildingScores(start_time);
	let allPlaces = allMapObjects(allScores);
	let campus_avg = getCampusScore(start_time);
	for (var i = 0; i < regions.length; i++){
		let data = regions[i].data('info');
		if (allPlaces[data.id]) {
			regions[i].animate({fill: allPlaces[data.id].color},200);
			regions[i].data({'info': allPlaces[data.id]});
		} else {
			let grouped = regions[i].items
			for (var j = 0; j < grouped.length; j++) {
				data = grouped[j].data('info')
				regions[i].items[j].animate({fill: allPlaces[data.id].color},200);
				regions[i].items[j].data({'info': allPlaces[data.id]});
			}
		}
	}
  setMapFeaturesDefault();
};

function setMapFeaturesDefault() {
	document.getElementById('region-header').innerHTML =
		'Try hovering over a building!<br><br><br>';
	document.getElementById('region-text').innerHTML = '';
	document.getElementById('campus-avg-text').innerHTML =
		'Campus Happiness: ' + formatScore(campus_avg) + '';
};

function setUpMapGeneral() {
  changeTimeFrame(null, regions);
  for (var i = 0; i < regions.length; i++){

    regions[i].mouseover(function(e){
      this.node.style.opacity = 0.7;
      this.node.style.stroke = 'yellow';
      var info = this.data('info');
      let label = info.rating + "<br>building happiness: " + info.score;
      document.getElementById('region-header').innerHTML = info.fullname;
      document.getElementById('region-text').innerHTML = label;
    });

    regions[i].mouseout(function(e){
      this.node.style.opacity = 1;
      this.node.style.stroke = '#333333';
    });
  }
  $('#optAll').on('change', function () {
    changeTimeFrame(null, regions);
  });
  $('#optWeek').on('change', function () {
    let now = Math.floor(Date.now() / 1000);
    changeTimeFrame(now - week, regions);
  });
  $('#optDay').on('change', function () {
    let now = Math.floor(Date.now() / 1000);
    changeTimeFrame(now - day, regions);
  });
  $('#optHour').on('change', function () {
    let now = Math.floor(Date.now() / 1000);
    changeTimeFrame(now - twoHr, regions);
  });
}
