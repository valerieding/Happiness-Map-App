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
  offcampus : "Off Campus Locations",
  quad : "Main Quad",
  mid : "Midway Plaisance",
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
  if (!ns) {
    return allObjs;
  }
  if (ns.length) {
    ns.forEach(function(n) {
      allObjs[n.logical_location] = databaseToMapObj(n);
    });
  } else if (ns) {
    for (let key in ns) {
      let temp = {logical_location: key, happiness_level: ns[key]};
      allObjs[key] = databaseToMapObj(temp);
    }
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
    var campus_avg;
    if (!start_time) {
      start_time = 0;
    }
    $.ajax({
      url: '/request/get_votes_by',
      type: 'post',
      async: false,
      data: {'start_time': start_time},
      success: function(data){
        campus_avg = data;
        console.log(campus_avg);
      }
    });
    if (campus_avg){
      return campus_avg;
    }
    return "n/a";
};

function getAllBuildingScores(start_time) {
  var allScores;
  if (!start_time) {
    start_time = 0;
  }
  $.ajax({
    url: '/request/get_votes_by',
    type: 'post',
    dataType: 'json',
    async: false,
    data: {'group_by': 'loc', 'start_time': start_time},
    success: function(data){
      allScores = data;
    }
  });
  return allScores;
};

function getAllBuildingScoresByUser(start_time) {
  var allScores;
  if (!start_time) {
    start_time = 0;
  }
  $.ajax({
    url: "/request/get_personal_votes_by",
    type: 'post',
    dataType: 'json',
    async: false,
    data: {'group_by': 'loc', 'start_time': start_time},
    success: function(data){
      allScores = data;
    }
  });
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
function changeTimeFrame(start_time, query_func) {
	let allScores = query_func(start_time);
	let allPlaces = allMapObjects(allScores);
  console.log(allPlaces);
	for (var i = 0; i < regions.length; i++){
    let data = regions[i].data('info');
		if (allPlaces[data.id]) {
			regions[i].animate({fill: allPlaces[data.id].color},200);
			regions[i].data({'info': allPlaces[data.id]});
		} else if (regions[i].items){
    }
  }
  if (query_func == getAllBuildingScores) {
    setMapFeatures(start_time);
  }
};

function setMapFeatures(start_time) {
  let campus_avg = getCampusScore(start_time);
	document.getElementById('region-header').innerHTML =
		'Try hovering over a building!<br><br><br>';
	document.getElementById('region-text').innerHTML = '';
	document.getElementById('campus-avg-text').innerHTML =
		'Campus Happiness: ' + formatScore(campus_avg) + '';
};

function setButtonFunctions(query_func) {
  $('#optAll').on('change', function () {
    changeTimeFrame(null, query_func);
  });
  $('#optWeek').on('change', function () {
    let now = Math.floor(Date.now() / 1000);
    changeTimeFrame(now - week, query_func);
  });
  $('#optDay').on('change', function () {
    let now = Math.floor(Date.now() / 1000);
    changeTimeFrame(now - day, query_func);
  });
  $('#optHour').on('change', function () {
    let now = Math.floor(Date.now() / 1000);
    changeTimeFrame(now - twoHr, query_func);
  });
}


function setUpMapGeneral() {
  changeTimeFrame(null, getAllBuildingScores);
  for (var i = 0; i < regions.length; i++){

    regions[i].mouseover(function(e){
      var info = this.data('info');
	  for (var j = 0; j < regions.length; j++){
		if (regions[j].data('info') == info){
			regions[j].attr({stroke: "yellow", opacity: "0.7"});
		}
	  }
      let label = info.rating + "<br>building happiness: " + info.score;
      document.getElementById('region-header').innerHTML = info.fullname;
      document.getElementById('region-text').innerHTML = label;

    });

    regions[i].mouseout(function(e){
      var info = this.data('info');
	  for (var j = 0; j < regions.length; j++){
		if (regions[j].data('info') == info){
		  regions[j].attr({stroke: "#333333", opacity: "1"});
		}
	  }
	});
  }
}

function setUpMapPersonal() {
  changeTimeFrame(null, getAllBuildingScoresByUser);
  for (var i = 0; i < regions.length; i++){

    regions[i].mouseover(function(e){
      this.node.style.opacity = 0.7;
      this.node.style.stroke = 'yellow';
    });

    regions[i].mouseout(function(e){
      this.node.style.opacity = 1;
      this.node.style.stroke = '#333333';
    });
  }
}
