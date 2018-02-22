var helloworld = function(){
  return 'Hello World';
};

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
  var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
};


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
    };

function welcomeText(happy_lvl){
  var welcome = ""
  switch(happy_lvl){
    case 1:
      welcome = "<h4 style=\"color:SlateBlue; text-align:left;\">1/5?!?! Why are you so sad?</h4>";
      return welcome;
      break;
    case 2:
      welcome ="<h4 style=\"color:DodgerBlue; text-align:left;\">2/5? Tell us why you're feeling blue...</h4>";
      return welcome;
      break;
    case 3:
      welcome ="<h4 style=\"color:Orange; text-align:left;\">Keep your chin up, and tell us why you feel so 3 right now</h4>";
      return welcome;
      break;
    case 4:
      welcome ="<h4 style=\"color:Yellow; text-align:left;\">4/5? Nice! How come?</h4>";
      return welcome;
      break;
    case 5:
      welcome = "<h4 style=\"color:MediumSeaGreen; text-align:left;\">You're too happy. Tell us why...</h4>";
      return welcome;
      break;
    default:
      welcome.append("Vote first, then post!");
      return welcome;
  }
};

function get_recent_posts(location){
  var posts = "will be implemented in iteration 2";
  return posts;
};


function callReact(vote,postID,userID){
switch(vote){
case "upvote":
  // $(function(){
  //   $.ajax({
  //    url: '/request/add_reaction',
  //    type: 'post',
  //    dataType: 'json',
  //    data: {'post_id': postID, 'reaction': 'upvote'}


  //   });
  // });
  return 'success: upvote'
  break;
  case "downvote":
    // $(function(){
    //   $.ajax({
    //    url: '/request/add_reaction',
    //    type: 'post',
    //    dataType: 'json',
    //    data: {'post_id': postID, 'reaction': 'downvote'}
    //   });
    // });
    // break;
    return 'success: downvote'
    break;
  default:
    return 'no react'
    window.alert("hi!");
  }
};
