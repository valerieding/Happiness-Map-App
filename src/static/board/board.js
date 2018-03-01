//Global string to use get_recent and get_trending posts easier
var headertext = ""
//Global flags and stuff
var searchLoc = "";
var recentsFlag = 0;
var trendingFlag = 0;
var timeframe = 0;
var mod = 0;

$(document).ready(function(){
      //When page loads...
      getRecents();
      getCurrentHappiness();
      //populate dropdown with list at bottom of JS document..
      for (let key in log_locs) {
        $("#loc_drop").append('<option value=' + key + '>' + log_locs[key] + '</option>');
        console.log("happening NOW");
      }  

});


function getSelectedLoc(){
  var e = document.getElementById("loc_drop");
  var strUser = e.options[e.selectedIndex].text;

  var location = getKeyByValue(log_locs,strUser);
  getRecents(location,undefined);
  searchLoc = location;
}

//Change 'welcome' text based off the user's most recent happiness level vote.
function welcomeText(happy_lvl){
    var welcome = ""
    switch(happy_lvl){
      case 1:
        welcome = "<h4 style=\"color:White; text-align:left;\">1/5?!?! Why are you so sad?</h4>";
        break;
      case 2:
        welcome ="<h4 style=\"color:White; text-align:left;\">2/5? Tell us why you're feeling blue...</h4>";
        break;
      case 3:
        welcome ="<h4 style=\"color:White; text-align:left;\">Keep your chin up, and tell us why you feel so 3 right now...</h4>";
        break;
      case 4:
        welcome ="<h4 style=\"color:White; text-align:left;\">4/5? Nice! Tell us why...</h4>";
        break;
      case 5:
        welcome = "<h4 style=\"color:White; text-align:left;\">A perfect 5? You're too happy. Tell us why...</h4>";
        break;
      default:
        document.getElementById('myform').innerHTML = "";
        welcome = "<h4 style=\"color:White; text-align:left;\">Vote first, then post!</h4>";
    }
   document.getElementById("welcome").innerHTML = welcome;
}

//HELPER FUNCTION to ~refactor~, exists to get rid of repetition
//Makes the table string to use in the "get_trending_posts" and "get_recent_posts"
function makeRow(messageArray,mod){
  var trHTML = '';
  mod = document.getElementById('mod_lock').getAttribute('is_mod').toLowerCase() == 'true';
  console.log('mod: ' + mod)
  console.log("mod = " + typeof(mod));
  var headers = '<th scope=\'col\'>Happiness Level</th><th scope=\'col\'>Messages</th><th scope=\'col\'>Location</th><th scope=\'col\'>Time Stamp</th><th scope=\'col\'>Reactions</th>'
  if (mod) {
    headers += '<th scope=\'col\'>Remove Post</th>';
  }
  headertext = '<tr>' + headers + '</tr>'
  $.each(messageArray, function(index, value){
    trHTML += '<tr><td>' + value['happiness_level'] + '/5' + '</td><td>' +
        decodeURIComponent(value['message']) + '</td><td>' +
        decodeURIComponent(value['location']['logical_location']) + '</td><td>' +
        timeSince(value['timestamp']) + '</td><td> <button onclick=\"callReact(\'upvote\',' +
        value['post_id']  + ');\" class=\"btn btn-primary\"><i class="fa fa-smile-o"></i> ' +
        value['reactions']['upvote'] + '</button> <button onclick=\"callReact(\'downvote\',' +
        value['post_id'] +');\" class=\"btn btn-primary\"><i class="fa fa-frown-o"></i> ' +
        value['reactions']['downvote'] + '</button></td>';
    if (mod) {
      trHTML += '<td> <button onclick=\"deletePost('+ value['post_id'] + ');\" class=\"btn btn-primary\">' + 'Remove Post' + '</button> </td>';
    }
    trHTML += '</tr>'
  });
  return trHTML;
}

//GET RECENTS AND TRENDING WITH PARAMETERS: LOCATION and TIMEFRAME
//Used for sorting posts by logical location and/or recency
//Will get desired location from a dropdown list of all possibilities
function getRecents(loc,time){
  console.log("using getR");
  var currData = {};
  if(loc){
    currData['logical_location'] =loc;
  }
  if(time){
    currData['start_time'] = time;
  }
  $.ajax({
    url: '/request/get_recent_posts',
    type: 'post',
    dataType: 'json',
    data: currData,
    success: function(data) {
      var messageArray = data;
      console.log(messageArray);
      var trHTML = makeRow(messageArray);
      $('#tuffy').empty()
      $('#tuffy').append(headertext + trHTML);
    },
    error: function(msg) {
      alert(msg.responseText);
    }
  });
  trendingFlag = 0;
}
function getTrending(loc,time){
  console.log("using new getTrending");
  var currData = {};
  if(loc){
    currData['logical_location'] =loc;
  }
  if(timeframe){
    currData['start_time'] = timeframe;
  }
  $.ajax({
    url: '/request/get_trending_posts',
    type: 'post',
    dataType: 'json',
    data: currData,
    success: function(data) {
      var messageArray = data;
      console.log(messageArray);
      var trHTML = makeRow(messageArray);
      $('#tuffy').empty(trHTML);
      $('#tuffy').append(headertext + trHTML);
    },
    error: function(msg) {
      alert(msg.responseText);
    }
  });
  trendingFlag = 1;
}

function getCurrentHappiness(){
  $.ajax({
    url: '/request/get_happiness_level',
    type: 'post',
    dataType: 'json',
    success: function(data) {
      welcomeText(data)
    },
    error: function(msg) {
      console.log("get_happiness_level failed");
    }
  });
}

// ADD POST ON SUBMIT
$(function() {
  $("#myform").submit(function(e) {
    e.preventDefault();
    addPost();
    document.getElementById('welcome').innerHTML = "<h4 style=\"color:White; text-align:left;\">Check back in an hour!</h4>";
    document.getElementById('myform').innerHTML = "";
  });
});

//QUERY TO ADD POST
function addPost(){
  $.ajax({
    url: 'request/add_post',
    type: 'post',
    dataType: 'json',
    data: {'message': $("#myform").serialize().slice(8)},
    success: (function(data) {
       console.log("added post successfully");
       console.log("my form input: "+ $("#myform").serialize().slice(8));
    })
  });
  getRecents(undefined,undefined);
  document.getElementById("loc_drop").value = "";
}

//QUERY TO DELETE POST
function deletePost(postID){
  $.ajax({
    url: 'request/remove_post',
    type: 'post',
    dataType: 'json',
    data: {'post_id':postID}
  });
  getRecents(undefined,undefined);
}

//QUERY FOR RECENT POSTS WHEN BUTTON IS CLICKED
$(function() {
  $("#recent").click(function(e) {
    e.preventDefault();
    if(searchLoc==""){
      getRecents(undefined,timeframe);
    } else {
      getRecents(searchLoc,timeframe);
    }
  });
});

//QUERY FOR TRENDING POSTS WHEN BUTTON IS CLICKED
$(function() {
  $("#trending").click(function(e) {
    e.preventDefault();
    if(searchLoc==""){
      getTrending(undefined,timeframe);
    } else {
      getTrending(searchLoc,timeframe);
    }
  });        
});

// QUERY TO UP AND DOWNVOTE
function react(vote,postID){
  var currData = {'post_id':postID};
  if(vote == "upvote"){
    currData['reaction'] = 'upvote';
  }
  if(vote == "downvote"){
    currData['reaction'] = 'downvote';
  }
  $.ajax({
     url: '/request/add_reaction',
     type: 'post',
     dataType: 'json',
     data: currData
  });
}
// FUNCTION CALLED ON BUTTON CLICK
function callReact(vote,postID){
  switch(vote){
    case "upvote":
      react(vote,postID);
      break;
    case "downvote":
      react(vote,postID);
      break;
    default:
      window.alert("hi!");
  }
  if(searchLoc == ""){
      if(trendingFlag){
        getTrending(undefined,timeframe);
      } else {
        getRecents(undefined,timeframe);
      }
    } else {
      if(trendingFlag){
        getTrending(searchLoc,timeframe);
      } else{
        getRecents(searchLoc,timeframe);
      }
    }
}

// QUERY TO LOG OUT ADMIN
$(function() {
  $("#adminLogoutButton").click(function(e) {
    e.preventDefault();
    console.log("admin button clicked");
    logout();
  });
});
function logout(){
  $.ajax({
    url: '/request/admin_logout',
    type: 'post',
    success: function(data) {
      console.log("Admin logged out successfully");
      window.location.reload();
    },
    error: function (msg) {
      console.log("error logging out admin");
    }
  });
}

//When time-related buttons are clicked:
//ALL
$(function() {
  $('input[type=radio][id="optAllScatter"]').change(function(e) {
    console.log("showing all posts");
    e.preventDefault();
    timeframe = 0;
    if(searchLoc==""){
      getRecents(undefined,timeframe);
    } else {
      getRecents(searchLoc,timeframe);
    }
  });        
});
//WEEK
$(function() {
  $('input[type=radio][id="optWeekScatter"]').change(function(e) {
    console.log("showing last week's posts");
    e.preventDefault();
    timeframe = -604800;
    getRecents(searchLoc, timeframe);
  });        
});
//DAY
$(function() {
  $('input[type=radio][id="optDayScatter"]').change(function(e) {
    console.log("showing last day's posts");
    e.preventDefault();
    timeframe = -86400;
    getRecents(searchLoc, timeframe);
  });        
});
//TWO HOURS
$(function() {
  $('input[type=radio][id="optHourScatter"]').change(function(e) {
    console.log("showing last two hours' posts");
    e.preventDefault();
    timeframe = -7200;
    getRecents(searchLoc, timeframe);
  });        
});

// We used a slightly modified version of this function from
// https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time-eg-2-seconds-ago-one-week-ago-etc-best
// We know it's smelly but we'll try to refactor on iteration 2
var secondsPerMinute = 60;
var secondsPerHour = secondsPerMinute * 60;
var secondsPerDay = secondsPerHour * 24;
var secondsPerMonth = secondsPerDay * 30;
var secondsPerYear = secondsPerDay * 365;

function timeSince(timeStamp) {
    var elapsed = new Date().getTime() / 1000 - timeStamp;

    var value, unit, prefix = '';
    if (elapsed < secondsPerMinute) {
        value = Math.round(elapsed);
        unit = 'second';
    } else if (elapsed < secondsPerHour) {
        value = Math.round(elapsed / secondsPerMinute);
        unit = 'minute';
    } else if (elapsed < secondsPerDay) {
        value = Math.round(elapsed / secondsPerHour);
        unit = 'hour';
    } else if (elapsed < secondsPerMonth) {
        prefix = '~'
        value = Math.round(elapsed / secondsPerDay);
        unit = 'day';
    } else if (elapsed < secondsPerYear) {
        prefix = '~'
        value = Math.round(elapsed / secondsPerMonth);
        unit = 'month';
    } else {
        prefix = '~'
        value = Math.round(elapsed / secondsPerYear);
        unit = 'year';
    }
    if (value != 1) {
        unit += 's'
    }
    return prefix + value + ' ' + unit + ' ago';
}

//Found this on stack overflow since no built in function in JS...
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

var log_locs = Object.freeze({
  blank: "",
  offcampus: "Off Campus",
  alumni : "Alumni House",
  bartlett : "Bartlett Dining Commons",
  bond : "Bond Chapel",
  bookstore : "University Bookstore",
  booth : "Booth School of Business",
  bj : "Burton Judson Courts",
  cathey : "Cathey Dining Commons",
  classicsBuilds : "Classics Quad Buildings",
  cobb : "Cobb Hall",
  crerar : "Crerar Library",
  eastBuild : "East Quad Buildings",
  edward : "Edward H Levi Hall",
  harper : "Harper Memorial Library",
  harris : "Harris School",
  henry : "Henry Crown Field House",
  hutch : "Hutchinson Commons",
  ida : "Ida Noyes",
  lab : "Lab Buildings",
  law : "Law School",
  logan : "Logan and Midway Studios",
  mainNorth : "Main Quad North Buildings",
  mansueto : "Mansueto Library",
  maxp : "Max Palevsky Commons",
  med : "Medical Campus",
  multi : "Office of Multicultural Affairs",
  new_grad : "New Graduate Residence Halls",
  north : "Campus North Residence and Dining",
  northBuild : "North Quad Buildings",
  oriental : "Oriental Institute",
  physics : "Physics Buildings",
  quadr : "Quadrangle Club",
  ratner : "Ratner Athletics Center",
  regenstein : "Regenstein Library",
  reynolds : "Reynolds Club",
  rock : "Rockefeller Chapel",
  rosenwald : "Rosenwald",
  ryeck : "Ryerson/Eckhart",
  saieh : "Saieh Hall for Economics",
  smart : "Smart Museum",
  snell :  "Snell-Hitchcock",
  ssr : "Social Science Research",
  stuart : "Stuart Hall",
  south : "South Campus Residence Hall",
  southeast : "South East Quad Buildings",
  swift : "Swift Hall",
});



