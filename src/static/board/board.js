//Global string to use get_recent and get_trending posts easier
var headertext = '<tr><th scope=\'col\'>Messages</th><th scope=\'col\'>Happiness Level</th><th scope=\'col\'>Location</th><th scope=\'col\'>Time Stamp</th><th scope=\'col\'>Reactions</th></tr>';

//Global flags and stuff
var searchLoc = "";
var recentsFlag = 0;
var trendingFlag = 0;
var timeframe = 0;

$(document).ready(function(){
      //When page loads...
      getRecents();
      happyL = getCurrentHappiness();
      if(happyL == null){
        document.getElementById('myform').innerHTML = "";
      }
      welcomeText(happyL);

      //populate dropdown with list at bottom of JS document..
      for (let key in log_locs) {
        $("#loc_drop").append('<option value=' + key + '>' + log_locs[key] + '</option>');
      }  

});


function getSelectedLoc(){
  var e = document.getElementById("loc_drop");
  var strUser = e.options[e.selectedIndex].text;

  var location = getKeyByValue(log_locs,strUser);
  getRecents(location);
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
        welcome = "<h4 style=\"color:White; text-align:left;\">Vote first, then post!</h4>";
    }
   document.getElementById("welcome").innerHTML = welcome;
}

//HELPER FUNCTION to ~refactor~, exists to get rid of repetition
//Makes the table string to use in the "get_trending_posts" and "get_recent_posts"
function makeRow(messageArray){
  var trHTML = '';
  $.each(messageArray, function(index, value){
  trHTML += '<tr><td>' + 
    decodeURIComponent(value['message']) + '</td><td>' + value['happiness_level'] + '/5' + '</td><td>' + 
    decodeURIComponent(value['location']['logical_location']) + '</td><td>' + 
    timeSince(value['timestamp']) + '</td><td> <button onclick=\"callReact(\'upvote\',' + 
    value['post_id']  + ');\" class=\"btn btn-primary\"><i class="fa fa-smile-o"></i> ' + 
    value['reactions']['upvote'] + '</button> <button onclick=\"callReact(\'downvote\',' + 
    value['post_id'] +');\" class=\"btn btn-primary\"><i class="fa fa-frown-o"></i> ' + 
    value['reactions']['downvote'] + '</button></td></tr>' ;
  });
  return trHTML;
}

// function makeRowAdmin(messageArray){
//   var trHTML = '';
//   $.each(messageArray, function(index, value){
//   trHTML += '<tr><td>' + 
//     decodeURIComponent(value['message']) + '</td><td>' + value['happiness_level'] + '/5' + '</td><td>' + 
//     decodeURIComponent(value['location']['logical_location']) + '</td><td>' + 
//     timeSince(value['timestamp']) + '</td><td> <button onclick=\"callReact(\'upvote\',' + 
//     value['post_id']  + ');\" class=\"btn btn-primary\"><i class="fa fa-smile-o"></i> ' + 
//     value['reactions']['upvote'] + '</button> <button onclick=\"callReact(\'downvote\',' + 
//     value['post_id'] +');\" class=\"btn btn-primary\"><i class="fa fa-frown-o"></i> ' + 
//     value['reactions']['downvote'] + '</button></td> <td> <button onclick=\"deletePost(' +
//     value['post_id'] + ');\" class=\"btn btn-primary\"><i class="fa fa-smile-o"></i> ' + 
//     'Remove Post' + '</button> </td> </tr>' ;
//   });
//   return trHTML;
// }

//GET RECENT POSTS
function getRecents(){
  //e.preventDefault();
  $.ajax({
    url: '/request/get_recent_posts',
    type: 'post',
    dataType: 'json',
    data: {'latitude': 10, 'longitude': 10},
    async: false,
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
//GET TRENDING POSTS
function getTrending(){
  if(!timeframe){
    $.ajax({
      url: '/request/get_trending_posts',
      type: 'post',
      dataType: 'json',
      async: false,
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
  } else {
      $.ajax({
        url: '/request/get_trending_posts',
        type: 'post',
        dataType: 'json',
        data: {'start_time':timeframe},
        async: false,
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
  }
  trendingFlag = 1;
}

//GET RECENTS AND TRENDING WITH PARAMETER: LOCATION
//Used for sorting posts by logical location
//Will get desired location from a dropdown list of all possibilities
function getRecents(loc){
  //e.preventDefault();
  $.ajax({
    url: '/request/get_recent_posts',
    type: 'post',
    dataType: 'json',
    data: {'logical_location':loc},
    async: false,
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
function getTrending(loc){
  $.ajax({
    url: '/request/get_trending_posts',
    type: 'post',
    dataType: 'json',
    data: {'logical_location':loc},
    async: false,
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

function getRecentTimePeriod(timeframe,location){
  //e.preventDefault();
  if(location == ""){
    $.ajax({
      url: '/request/get_recent_posts',
      type: 'post',
      dataType: 'json',
      data: {'start_time':timeframe},
      async: false,
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
  } else {
      $.ajax({
        url: '/request/get_recent_posts',
        type: 'post',
        dataType: 'json',
        data: {'start_time':timeframe,'logical_location':location},
        async: false,
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
  }
  trendingFlag = 0;
}


function getCurrentHappiness(){
  var happyL =0;
  console.log("happy level is " + happyL);
  $.ajax({
    url: '/request/get_happiness_level',
    type: 'post',
    dataType: 'json',
    async: false,
    success: function(data) {
      happyL = data;
      console.log("happy level now is " + happyL);
    },
     error: function(msg) {
      console.log("didnt work");
    }
  });
  return happyL;
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
    data: {'latitude': 10, 
           'longitude': 10, 
           'message': $("#myform").serialize().slice(8), 
           'logical_location': "Maclean"},
    success: (function(data) {
       console.log("added post successfully");
       console.log("my form input: "+ $("#myform").serialize().slice(8));
    })
  });
  getRecents();
  //Again!
  getRecents();
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
  getRecents();
  //Again!
  getRecents();
}

//QUERY FOR RECENT POSTS WHEN BUTTON IS CLICKED
$(function() {
  $("#recent").click(function(e) {
    e.preventDefault();
    if(searchLoc==""){
      getRecents();
    } else {
      getRecents(searchLoc);
    }
  });
});

//QUERY FOR TRENDING POSTS WHEN BUTTON IS CLICKED
$(function() {
  $("#trending").click(function(e) {
    e.preventDefault();
    if(searchLoc==""){
      getTrending();
    } else {
      getTrending(searchLoc);
    }
  });        
});

function upvote(vote,postID){
  $.ajax({
     url: '/request/add_reaction',
     type: 'post',
     dataType: 'json',
     data: {'post_id': postID, 'reaction': 'upvote'}
  });
}

function downvote(vote,postID){
  $.ajax({
     url: '/request/add_reaction',
     type: 'post',
     dataType: 'json',
     data: {'post_id': postID, 'reaction': 'downvote'}
  });
}

//QUERY TO UP AND DOWNVOTE WHEN BUTTONS ARE CLICKED
function callReact(vote,postID){
  switch(vote){
    case "upvote":
      upvote(vote,postID);
      break;
    case "downvote":
      downvote(vote,postID);
      break;
    default:
      window.alert("hi!");
  }
  if(searchLoc == ""){
      if(trendingFlag){
        getTrending();
      } else {
        getRecents();
      }
    } else {
      if(trendingFlag){
        getTrending(searchLoc);
      } else{
        getRecents(searchLoc);
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







//Recent buttons clicked
//ALL
$(function() {
  $('input[type=radio][id="optAllScatter"]').change(function(e) {
    console.log("showing all posts");
    e.preventDefault();
    if(searchLoc==""){
      getRecents();
    } else {
      getRecents(searchLoc);
    }
  });        
});
//WEEK
$(function() {
  $('input[type=radio][id="optWeekScatter"]').change(function(e) {
    console.log("showing last week's posts");
    e.preventDefault();
    timeframe = -604800;
    getRecentTimePeriod(timeframe, searchLoc);
  });        
});
//DAY
$(function() {
  $('input[type=radio][id="optDayScatter"]').change(function(e) {
    console.log("showing last day's posts");
    e.preventDefault();
    timeframe = -86400;
    getRecentTimePeriod(timeframe, searchLoc);
  });        
});
//TWO HOURS
$(function() {
  $('input[type=radio][id="optHourScatter"]').change(function(e) {
    console.log("showing last two hours' posts");
    e.preventDefault();
    timeframe = -7200;
    getRecentTimePeriod(timeframe, searchLoc);
  });        
});







// We used a slightly modified version of this function from
// https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time-eg-2-seconds-ago-one-week-ago-etc-best
// We know it's smelly but we'll try to refactor on iteration 2
function timeSince(timeStamp) {
    var previous = new Date(timeStamp * 1000);
    var current = new Date();

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        if (Math.round(elapsed/1000) == 1){
          return Math.round(elapsed/1000) + ' second ago';   
        }
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
        if (Math.round(elapsed/msPerMinute) == 1){
          return  Math.round(elapsed/msPerMinute) + ' minute ago';   
        }
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
        if (Math.round(elapsed/msPerHour) == 1){
          return  Math.round(elapsed/msPerHour) + ' hour ago';   
        }
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        if (Math.round(elapsed/msPerDay) == 1){
          return '~' + Math.round(elapsed/msPerDay) + ' day ago';   
        }
        return '~' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        if (Math.round(elapsed/msPerMonth) == 1){
          return '~' + Math.round(elapsed/msPerMonth) + ' month ago';   
        }
        return '~' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        if (Math.round(elapsed/msPerYear) == 1){
          return '~' + Math.round(elapsed/msPerYear) + ' year ago';   
        }
        return '~' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
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

// // same functions but for ADMIN

// function makeRowAdmin(messageArray){
//   var trHTML = '';
//   $.each(messageArray, function(index, value){
//   trHTML += '<tr><td>' + 
//     decodeURIComponent(value['message']) + '</td><td>' + value['happiness_level'] + '/5' + '</td><td>' + 
//     decodeURIComponent(value['location']['logical_location']) + '</td><td>' + 
//     timeSince(value['timestamp']) + '</td><td> <button onclick=\"callReact(\'upvote\',' + 
//     value['post_id']  + ');\" class=\"btn btn-primary\"><i class="fa fa-smile-o"></i> ' + 
//     value['reactions']['upvote'] + '</button> <button onclick=\"callReact(\'downvote\',' + 
//     value['post_id'] +');\" class=\"btn btn-primary\"><i class="fa fa-frown-o"></i> ' + 
//     value['reactions']['downvote'] + '</button></td>' + 
//     '<td> <button onclick=\"deletePost('+ value['post_id'] + ');\" class=\"btn btn-primary\">' + 'Remove Post' + '</button> </td>'+
//     '</tr>' ;
//   console.log(value['post_id']);
//   });
//   return trHTML;
// }

// //GET RECENT POSTS
// function getRecentsAdmin(){
//   //e.preventDefault();
//   $.ajax({
//     url: '/request/get_recent_posts',
//     type: 'post',
//     dataType: 'json',
//     async: false,
//     success: function(data) {
//       var messageArray = data;
//       console.log(messageArray);
//       var trHTML = makeRowAdmin(messageArray);
//       $('#coco').empty()
//       $('#coco').append(headertext + trHTML);
//     },
//     error: function(msg) {
//       alert(msg.responseText);
//     }
//   });
//   trendingFlag = 0;
// }
// //GET TRENDING POSTS
// function getTrendingAdmin(){
//   $.ajax({
//     url: '/request/get_trending_posts',
//     type: 'post',
//     dataType: 'json',
//     data: {'latitude': 10, 'longitude': 10},
//     async: false,
//     success: function(data) {
//       var messageArray = data;
//       console.log(messageArray);
//       var trHTML = makeRowAdmin(messageArray);
//       $('#coco').empty(trHTML);
//       $('#coco').append(headertext + trHTML);
//     },
//     error: function(msg) {
//       alert(msg.responseText);
//     }
//   });
//   trendingFlag = 1;
// }

// //GET RECENTS AND TRENDING WITH PARAMETER: LOCATION
// //Used for sorting posts by logical location
// //Will get desired location from a dropdown list of all possibilities
// function getRecentsAdmin(loc){
//   //e.preventDefault();
//   $.ajax({
//     url: '/request/get_recent_posts',
//     type: 'post',
//     dataType: 'json',
//     data: {'logical_location':loc},
//     async: false,
//     success: function(data) {
//       var messageArray = data;
//       console.log(messageArray);
//       var trHTML = makeRowAdmin(messageArray);
//       $('#coco').empty()
//       $('#coco').append(headertext + trHTML);
//     },
//     error: function(msg) {
//       alert(msg.responseText);
//     }
//   });
//   trendingFlag = 0;
// }
// function getTrendingAdmin(loc){
//   $.ajax({
//     url: '/request/get_trending_posts',
//     type: 'post',
//     dataType: 'json',
//     data: {'logical_location':loc},
//     async: false,
//     success: function(data) {
//       var messageArray = data;
//       console.log(messageArray);
//       var trHTML = makeRowAdmin(messageArray);
//       $('#coco').empty(trHTML);
//       $('#coco').append(headertext + trHTML);
//     },
//     error: function(msg) {
//       alert(msg.responseText);
//     }
//   });
//   trendingFlag = 1;
// }



