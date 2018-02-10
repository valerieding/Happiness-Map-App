//where map stuff will go

var helloworld = function(){
   return 'Hello World';
};

//map page functions
function databaseToMapObj(n) {return n};

function getInfo(n) { return n};

function getName(n) { return n};

function computeColor(n) { return n};

function getHappinessRating(n) {return n};

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
    //console.log(campus_avg);
};

function getAllBuildingScores() {return 0};

function getBuildingScore(logloc) {
  var score;
  $.ajax({
    url: '/request/get_building_average',
    type: 'post',
    dataType: 'json',
    data: {'logical_location': logloc, 'start_time': 0, 'end_time': 1550000000},
    success: function(data){
      console.log("got building average");
      console.log(data);
    }
  });
}


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
    success: function(data){
      console.log("Added vote1 to db");
    }
  });
  $.ajax({
    url: '/request/add_vote',
    type: 'post',
    dataType: 'json',
    data: {'latitude': 41.791863, 'longitude': -87.600968,
      'logical_location': 'mansueto', 'happiness_level': 5},
    success: function(data){
      console.log("Added vote2 to db");
    }
  });
}
