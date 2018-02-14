//where map stuff goes

var helloworld = function(){
  return 'Hello World';
};

// structures for mapping

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
    score: "n/a",
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
  return ColorNumKey[Math.floor(n.happiness_level) - 1];
};

function getHappinessRating(n) {
  return HappinessTextKey[Math.floor(n.happiness_level) - 1];
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
      score = data;
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
