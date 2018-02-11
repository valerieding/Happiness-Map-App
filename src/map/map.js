//where map stuff goes

var helloworld = function(){
  return 'Hello World';
};

// structures for mapping
var FullNameKey = Object.freeze({
	regenstein: "Regenstein Library",
	bartlett: "Bartlett Dining Commons",
	maxp: "Max Palevsky",
	mansueto: "Mansueto Library",
});

const ColorNumKey = ['#ffffb2','#fecc5c','#fd8d3c','#f03b20','#bd0026'];
const nullColor = "#ADADAD";
const HappinessTextKey = ["very unhappy", "unhappy", "neutral", "happy", "very happy"];

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

function emptyMabObj(n) {
  return {
    id: n,
    fullname: FullNameKey[n],
    color: nullColor,
    rating: "no data available"
  };
};

function allMapObjects(ns) {
  let allObjs = {};
  for (var prop in FullNameKey){
    allObjs[prop] = emptyMabObj(prop);
  }
  ns.forEach(function(n) {
    allObjs[n.logical_location] = databaseToMapObj(n);
  });
  return allObjs;
};

function getInfo(n) {
  return n.rating + "<br>building happiness: " + n.score;
};

function getName(n) {
  return FullNameKey[n.logical_location];
};

function computeColor(n) {
  if (n.happiness_level >=5){
    return ColorNumKey[4];
  }
  return ColorNumKey[Math.floor(n.happiness_level)];
};

function getHappinessRating(n) {
  if (n.happiness_level >=5){
    return HappinessTextKey[4];
  }
  return HappinessTextKey[Math.floor(n.happiness_level)];
};

function formatScore(n) {
  return Math.round(100 * n) / 100;
}




//querying database functions
function getCampusScore() {
    var campus_avg;
    $.ajax({
      url: '/request/get_campus_average',
      type: 'post',
      async: false,
      success: function(data){
        campus_avg = data;
        console.log(campus_avg);
      }
    });
    return campus_avg;
};

function getAllBuildingScores() {
  var allScores;
  $.ajax({
    url: '/request/get_heatmap',
    type: 'post',
    dataType: 'json',
    async: false,
    data: {'start_time': 0, 'end_time': 1550000000},
    success: function(data){
      allScores = data;
      console.log(allScores);
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
    data: {'logical_location': logloc, 'start_time': 0, 'end_time': 1550000000},
    success: function(data){
      console.log("got building average");
      score = data;
      console.log(score);
    }
  });
  return score;
};


// function just for testing
function populateDB() {
  $.ajax({
    url: '/request/issue_user_id',
    type: 'post',
    async: false
  });
  $.ajax({
    url: '/request/add_vote',
    type: 'post',
    dataType: 'json',
    data: {'latitude': 41.792289, 'longitude': -87.599959,
      'logical_location': 'regenstein', 'happiness_level': 1},
  });
  $.ajax({
    url: '/request/add_vote',
    type: 'post',
    dataType: 'json',
    data: {'latitude': 41.792289, 'longitude': -87.599959,
      'logical_location': 'regenstein', 'happiness_level': 2},
  });
  $.ajax({
    url: '/request/add_vote',
    type: 'post',
    dataType: 'json',
    data: {'latitude': 41.792289, 'longitude': -87.599959,
      'logical_location': 'regenstein', 'happiness_level': 1},
  });
  $.ajax({
    url: '/request/add_vote',
    type: 'post',
    dataType: 'json',
    data: {'latitude': 41.792289, 'longitude': -87.599959,
      'logical_location': 'regenstein', 'happiness_level': 2},
  });
  $.ajax({
    url: '/request/add_vote',
    type: 'post',
    dataType: 'json',
    data: {'latitude': 41.791863, 'longitude': -87.600968,
      'logical_location': 'mansueto', 'happiness_level': 3},
  });
  $.ajax({
   url: '/request/add_vote',
   type: 'post',
   dataType: 'json',
   data: {'latitude': 41.793031, 'longitude': -87.599938,
     'logical_location': 'maxp', 'happiness_level': 5},
 });
 $.ajax({
   url: '/request/add_vote',
   type: 'post',
   dataType: 'json',
   data: {'latitude': 41.791895, 'longitude': -87.598393,
     'logical_location': 'bartlett', 'happiness_level': 4},
 });
};
