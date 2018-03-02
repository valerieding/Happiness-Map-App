var secondsPerMinute = 60;
var secondsPerHour = secondsPerMinute * 60;
var secondsPerDay = secondsPerHour * 24;
var secondsPerMonth = secondsPerDay * 30;
var secondsPerYear = secondsPerDay * 365;

function timeSince(timeStamp) {
    //var elapsed = new Date().getTime() / 1000 - timeStamp;
    elapsed = 1519947079/1000 - timeStamp;
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

function welcomeText(happy_lvl){
    var welcome = "", color
    switch(happy_lvl){
      case 1:
        welcome = "1/5?!?! Why are you so sad?";
        color = "SlateBlue";
        break;
      case 2:
        welcome ="2/5? Tell us why you're feeling blue...";
        color = "DodgerBlue";
        break;
      case 3:
        welcome ="Keep your chin up, and tell us why you feel so 3 right now...";
        color = "Orange";
        break;
      case 4:
        welcome ="4/5? Nice! Tell us why...";
        color = "Yellow";
        break;
      case 5:
        welcome = "A perfect 5? You're too happy. Tell us why...";
        color = "MediumSeaGreen";
        break;
      default:
        document.getElementById('myform').innerHTML = "";
        welcome = "Vote first, then post!";
        color = "White";
    }
    return "<h4 style=\"color:" + color + "; text-align:left;\">" + welcome + "</h4>"
}

function makeRow(messageArray,mod){
  var trHTML = '';
  //mod = document.getElementById('script_loader').getAttribute('is_mod').toLowerCase() == 'true';
  //console.log('mod: ' + mod)
  //console.log("mod = " + typeof(mod));
  var headers = '<th scope=\'col\'>Happiness Level</th><th scope=\'col\'>Messages</th><th scope=\'col\'>Where</th><th scope=\'col\'>When</th><th scope=\'col\'>Reactions</th>'
  if (mod) {
    headers += '<th scope=\'col\'>Remove Post</th>';
  }
  headertext = '<thead class=\'thead-dark\'><tr>' + headers + '</tr></thead>'
    trHTML += '<tr><td>' +  + '5/5' + '</td><td>' +
        'message' + '</td><td>' + 'location' + '</td><td>' +
        'time' + '</td><td>' + 'upvote downvote'+ '</td>';
    if (mod) {
      trHTML += '<td> remove post </td>';
    }
    trHTML += '</tr>'
  //);
  return trHTML;
}

function callReact(vote,postID,trendingFlag){
  switch(vote){
    case "upvote":
      return "success: upvote"
      break;
    case "downvote":
      return "success: downvote"
      break;
    default:
      break;
  }
  if(postID == ""){
      if(trendingFlag){
        return "trending"
      } else {
        return "recents"
      }
    } else {
        if(trendingFlag){
            return "trending"
        } else {
            return "recents"
        }
    }
}

function getTrending(loc,time,stats){
  //console.log("using new getTrending");
  //stat_trend = document.getElementById('script_loader').getAttribute('is_stat').toLowerCase() == 'true';
  if (stats) {
    var staturl_trend = '/request/get_trending_personal_posts';
  } else {
    var staturl_trend = '/request/get_trending_posts';
  }
  var currData = {};
  if(loc){
    currData['logical_location'] =loc;
  }
  if(time){
    currData['start_time'] = time;
  }
  // return the proper call
  return staturl_trend + ' ' + currData['logical_location'] + ' ' + currData['start_time'];

  // $.ajax({
  //   url: staturl_trend,
  //   type: 'post',
  //   dataType: 'json',
  //   data: currData,
  //   success: function(data) {
  //     var messageArray = data;
  //     console.log(messageArray);
  //     var trHTML = makeRow(messageArray);
  //     $('#tuffy').empty(trHTML);
  //     $('#tuffy').append('<table class=\'table table-hover\'>'+ headertext + trHTML + '</table>');
  //   },
  //   error: function(msg) {
  //     alert(msg.responseText);
  //   }
  // });
  // trendingFlag = 1;
}
function getRecents(loc,time,stats){
  if (stats) {
    var staturl_trend = '/request/get_recents_personal_posts';
  } else {
    var staturl_trend = '/request/get_recents_posts';
  }
  var currData = {};
  if(loc){
    currData['logical_location'] =loc;
  }
  if(time){
    currData['start_time'] = time;
  }
  // return the proper call
  return staturl_trend + ' ' + currData['logical_location'] + ' ' + currData['start_time'];
  
  // $.ajax({
  //   url: staturl_rec,
  //   type: 'post',
  //   dataType: 'json',
  //   data: currData,
  //   success: function(data) {
  //     var messageArray = data;
  //     console.log(messageArray);
  //     var trHTML = makeRow(messageArray);
  //     $('#tuffy').empty()
  //     $('#tuffy').append('<table class=\'table table-hover\'>'+ headertext + trHTML + '</table>');
  //   },
  //   error: function(msg) {
  //     alert(msg.responseText);
  //   }
  // });
  // trendingFlag = 0;
}

var secondsPerMinute = 60;
var secondsPerHour = secondsPerMinute * 60;
var secondsPerDay = secondsPerHour * 24;
var secondsPerMonth = secondsPerDay * 30;
var secondsPerYear = secondsPerDay * 365;

function timeSince(timeStamp) {
    //var elapsed = new Date().getTime() / 1000 - timeStamp;
    elapsed = 1519947079/1000 - timeStamp;
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

function welcomeText(happy_lvl){
    var welcome = "", color
    switch(happy_lvl){
      case 1:
        welcome = "1/5?!?! Why are you so sad?";
        color = "SlateBlue";
        break;
      case 2:
        welcome ="2/5? Tell us why you're feeling blue...";
        color = "DodgerBlue";
        break;
      case 3:
        welcome ="Keep your chin up, and tell us why you feel so 3 right now...";
        color = "Orange";
        break;
      case 4:
        welcome ="4/5? Nice! Tell us why...";
        color = "Yellow";
        break;
      case 5:
        welcome = "A perfect 5? You're too happy. Tell us why...";
        color = "MediumSeaGreen";
        break;
      default:
        document.getElementById('myform').innerHTML = "";
        welcome = "Vote first, then post!";
        color = "White";
    }
    return "<h4 style=\"color:" + color + "; text-align:left;\">" + welcome + "</h4>"
}

function makeRow(messageArray,mod){
  var trHTML = '';
  //mod = document.getElementById('script_loader').getAttribute('is_mod').toLowerCase() == 'true';
  //console.log('mod: ' + mod)
  //console.log("mod = " + typeof(mod));
  var headers = '<th scope=\'col\'>Happiness Level</th><th scope=\'col\'>Messages</th><th scope=\'col\'>Where</th><th scope=\'col\'>When</th><th scope=\'col\'>Reactions</th>'
  if (mod) {
    headers += '<th scope=\'col\'>Remove Post</th>';
  }
  headertext = '<thead class=\'thead-dark\'><tr>' + headers + '</tr></thead>'
    trHTML += '<tr><td>' +  + '5/5' + '</td><td>' +
        'message' + '</td><td>' + 'location' + '</td><td>' +
        'time' + '</td><td>' + 'upvote downvote'+ '</td>';
    if (mod) {
      trHTML += '<td> remove post </td>';
    }
    trHTML += '</tr>'
  //);
  return trHTML;
}

function callReact(vote,postID,trendingFlag){
  switch(vote){
    case "upvote":
      return "success: upvote"
      break;
    case "downvote":
      return "success: downvote"
      break;
    default:
      break;
  }
  if(postID == ""){
      if(trendingFlag){
        return "trending"
      } else {
        return "recents"
      }
    } else {
        if(trendingFlag){
            return "trending"
        } else {
            return "recents"
        }
    }
}

function getTrending(loc,time,stats){
  //console.log("using new getTrending");
  //stat_trend = document.getElementById('script_loader').getAttribute('is_stat').toLowerCase() == 'true';
  if (stats) {
    var staturl_trend = '/request/get_trending_personal_posts';
  } else {
    var staturl_trend = '/request/get_trending_posts';
  }
  var currData = {};
  if(loc){
    currData['logical_location'] =loc;
  }
  if(time){
    currData['start_time'] = time;
  }
  // return the proper call
  return staturl_trend + ' ' + currData['logical_location'] + ' ' + currData['start_time'];

  // $.ajax({
  //   url: staturl_trend,
  //   type: 'post',
  //   dataType: 'json',
  //   data: currData,
  //   success: function(data) {
  //     var messageArray = data;
  //     console.log(messageArray);
  //     var trHTML = makeRow(messageArray);
  //     $('#tuffy').empty(trHTML);
  //     $('#tuffy').append('<table class=\'table table-hover\'>'+ headertext + trHTML + '</table>');
  //   },
  //   error: function(msg) {
  //     alert(msg.responseText);
  //   }
  // });
  // trendingFlag = 1;
}
function getRecents(loc,time,stats){
  if (stats) {
    var staturl_trend = '/request/get_recents_personal_posts';
  } else {
    var staturl_trend = '/request/get_recents_posts';
  }
  var currData = {};
  if(loc){
    currData['logical_location'] =loc;
  }
  if(time){
    currData['start_time'] = time;
  }
  // return the proper call
  return staturl_trend + ' ' + currData['logical_location'] + ' ' + currData['start_time'];
  
  // $.ajax({
  //   url: staturl_rec,
  //   type: 'post',
  //   dataType: 'json',
  //   data: currData,
  //   success: function(data) {
  //     var messageArray = data;
  //     console.log(messageArray);
  //     var trHTML = makeRow(messageArray);
  //     $('#tuffy').empty()
  //     $('#tuffy').append('<table class=\'table table-hover\'>'+ headertext + trHTML + '</table>');
  //   },
  //   error: function(msg) {
  //     alert(msg.responseText);
  //   }
  // });
  // trendingFlag = 0;
}

var secondsPerMinute = 60;
var secondsPerHour = secondsPerMinute * 60;
var secondsPerDay = secondsPerHour * 24;
var secondsPerMonth = secondsPerDay * 30;
var secondsPerYear = secondsPerDay * 365;

function timeSince(timeStamp) {
    //var elapsed = new Date().getTime() / 1000 - timeStamp;
    elapsed = 1519947079/1000 - timeStamp;
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

function welcomeText(happy_lvl){
    var welcome = "", color
    switch(happy_lvl){
      case 1:
        welcome = "1/5?!?! Why are you so sad?";
        color = "SlateBlue";
        break;
      case 2:
        welcome ="2/5? Tell us why you're feeling blue...";
        color = "DodgerBlue";
        break;
      case 3:
        welcome ="Keep your chin up, and tell us why you feel so 3 right now...";
        color = "Orange";
        break;
      case 4:
        welcome ="4/5? Nice! Tell us why...";
        color = "Yellow";
        break;
      case 5:
        welcome = "A perfect 5? You're too happy. Tell us why...";
        color = "MediumSeaGreen";
        break;
      default:
        document.getElementById('myform').innerHTML = "";
        welcome = "Vote first, then post!";
        color = "White";
    }
    return "<h4 style=\"color:" + color + "; text-align:left;\">" + welcome + "</h4>"
}

function makeRow(messageArray,mod){
  var trHTML = '';
  //mod = document.getElementById('script_loader').getAttribute('is_mod').toLowerCase() == 'true';
  //console.log('mod: ' + mod)
  //console.log("mod = " + typeof(mod));
  var headers = '<th scope=\'col\'>Happiness Level</th><th scope=\'col\'>Messages</th><th scope=\'col\'>Where</th><th scope=\'col\'>When</th><th scope=\'col\'>Reactions</th>'
  if (mod) {
    headers += '<th scope=\'col\'>Remove Post</th>';
  }
  headertext = '<thead class=\'thead-dark\'><tr>' + headers + '</tr></thead>'
    trHTML += '<tr><td>' +  + '5/5' + '</td><td>' +
        'message' + '</td><td>' + 'location' + '</td><td>' +
        'time' + '</td><td>' + 'upvote downvote'+ '</td>';
    if (mod) {
      trHTML += '<td> remove post </td>';
    }
    trHTML += '</tr>'
  //);
  return trHTML;
}

function callReact(vote,postID,trendingFlag){
  switch(vote){
    case "upvote":
      return "success: upvote"
      break;
    case "downvote":
      return "success: downvote"
      break;
    default:
      break;
  }
  if(postID == ""){
      if(trendingFlag){
        return "trending"
      } else {
        return "recents"
      }
    } else {
        if(trendingFlag){
            return "trending"
        } else {
            return "recents"
        }
    }
}

function getTrending(loc,time,stats){
  //console.log("using new getTrending");
  //stat_trend = document.getElementById('script_loader').getAttribute('is_stat').toLowerCase() == 'true';
  if (stats) {
    var staturl_trend = '/request/get_trending_personal_posts';
  } else {
    var staturl_trend = '/request/get_trending_posts';
  }
  var currData = {};
  if(loc){
    currData['logical_location'] =loc;
  }
  if(time){
    currData['start_time'] = time;
  }
  // return the proper call
  return staturl_trend + ' ' + currData['logical_location'] + ' ' + currData['start_time'];

  // $.ajax({
  //   url: staturl_trend,
  //   type: 'post',
  //   dataType: 'json',
  //   data: currData,
  //   success: function(data) {
  //     var messageArray = data;
  //     console.log(messageArray);
  //     var trHTML = makeRow(messageArray);
  //     $('#tuffy').empty(trHTML);
  //     $('#tuffy').append('<table class=\'table table-hover\'>'+ headertext + trHTML + '</table>');
  //   },
  //   error: function(msg) {
  //     alert(msg.responseText);
  //   }
  // });
  // trendingFlag = 1;
}
function getRecents(loc,time,stats){
  if (stats) {
    var staturl_trend = '/request/get_recents_personal_posts';
  } else {
    var staturl_trend = '/request/get_recents_posts';
  }
  var currData = {};
  if(loc){
    currData['logical_location'] =loc;
  }
  if(time){
    currData['start_time'] = time;
  }
  // return the proper call
  return staturl_trend + ' ' + currData['logical_location'] + ' ' + currData['start_time'];
  
  // $.ajax({
  //   url: staturl_rec,
  //   type: 'post',
  //   dataType: 'json',
  //   data: currData,
  //   success: function(data) {
  //     var messageArray = data;
  //     console.log(messageArray);
  //     var trHTML = makeRow(messageArray);
  //     $('#tuffy').empty()
  //     $('#tuffy').append('<table class=\'table table-hover\'>'+ headertext + trHTML + '</table>');
  //   },
  //   error: function(msg) {
  //     alert(msg.responseText);
  //   }
  // });
  // trendingFlag = 0;
}

