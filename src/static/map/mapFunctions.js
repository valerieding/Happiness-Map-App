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
    fullname: log_locs[n],
    color: nullColor,
    rating: "no data available"
  };
};

function allMapObjects(ns) {
  let allObjs = {};
  for (var prop in log_locs){
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
    return log_locs[n.logical_location];
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
  if (n == "n/a")
    return n;
  return Math.round(100 * n) / 100;
}




//querying database functions
async function getCampusScore(start_time) {
    var campus_avg;
    if (!start_time) {
      start_time = 0;
    }
    try {
      campus_avg = await $.ajax({
        url: '/request/get_votes_by',
        type: 'post',
        data: {'start_time': start_time},
        success: function(data){
          campus_avg = data;
        }
      });
      if (campus_avg){
        return campus_avg;
      }
      return "n/a";
    } catch(error) {
      e.error(error);
    }
};

async function getAllBuildingScores(start_time) {
  var allScores;
  if (!start_time) {
    start_time = 0;
  }
  try {
    allScores = await $.ajax({
      url: '/request/get_votes_by',
      type: 'post',
      dataType: 'json',
      data: {'group_by': 'loc', 'start_time': start_time},
      success: function(data){
        allScores = data;
      }
    });
    return allScores;
  } catch(error) {
    console.error(error);
  }
};

async function getAllBuildingScoresByUser(start_time) {
  var allScores;
  if (!start_time) {
    start_time = 0;
  }
  try {
    allScores = await $.ajax({
    url: "/request/get_personal_votes_by",
    type: 'post',
    dataType: 'json',
    data: {'group_by': 'loc', 'start_time': start_time},
    success: function(data){
      allScores = data;
    }
    });
    return allScores;
  } catch(error) {
    console.error(error);
  }
};


//modifying map html functions
async function changeTimeFrame(start_time, query_func) {
	let allScores = await query_func(start_time);
	let allPlaces = allMapObjects(allScores);
	for (var i = 0; i < regions.length; i++){
    let data = regions[i].data('info');
		if (allPlaces[data.id]) {
			regions[i].animate({fill: allPlaces[data.id].color},200);
			regions[i].data({'info': allPlaces[data.id]});
		}
  }
  if (query_func == getAllBuildingScores) {
    setMapFeatures(start_time);
  }
};

async function setMapFeatures(start_time) {
  let campus_avg = await getCampusScore(start_time);
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
    changeTimeFrame(-week, query_func);
  });
  $('#optDay').on('change', function () {
    changeTimeFrame(-day, query_func);
  });
  $('#optHour').on('change', function () {
    changeTimeFrame(-twoHr, query_func);
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
      var info = this.data('info');
	    for (var j = 0; j < regions.length; j++){
		       if (regions[j].data('info') == info){
			          regions[j].attr({stroke: "yellow", opacity: "0.7"});
		       }
	    }
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
