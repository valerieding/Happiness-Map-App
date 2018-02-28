// same functions but for ADMIN

function makeRowAdmin(messageArray){
  var trHTML = '';
  $.each(messageArray, function(index, value){
  trHTML += '<tr><td>' + 
    decodeURIComponent(value['message']) + '</td><td>' + value['happiness_level'] + '/5' + '</td><td>' + 
    decodeURIComponent(value['location']['logical_location']) + '</td><td>' + 
    timeSince(value['timestamp']) + '</td><td> <button onclick=\"callReact(\'upvote\',' + 
    value['post_id']  + ');\" class=\"btn btn-primary\"><i class="fa fa-smile-o"></i> ' + 
    value['reactions']['upvote'] + '</button> <button onclick=\"callReact(\'downvote\',' + 
    value['post_id'] +');\" class=\"btn btn-primary\"><i class="fa fa-frown-o"></i> ' + 
    value['reactions']['downvote'] + '</button></td>' + 
    '<td> <button onclick=\"deletePost('+ value['post_id'] + ');\" class=\"btn btn-primary\">' + 'Remove Post' + '</button> </td>'+
    '</tr>' ;
  console.log(value['post_id']);
  });
  return trHTML;
}

//GET RECENT POSTS
function getRecentsAdmin(){
  //e.preventDefault();
  $.ajax({
    url: '/request/get_recent_posts',
    type: 'post',
    dataType: 'json',
    async: false,
    success: function(data) {
      var messageArray = data;
      console.log(messageArray);
      var trHTML = makeRowAdmin(messageArray);
      $('#coco').empty()
      $('#coco').append(headertext + trHTML);
    },
    error: function(msg) {
      alert(msg.responseText);
    }
  });
  trendingFlag = 0;
}
//GET TRENDING POSTS
function getTrendingAdmin(){
  $.ajax({
    url: '/request/get_trending_posts',
    type: 'post',
    dataType: 'json',
    data: {'latitude': 10, 'longitude': 10},
    async: false,
    success: function(data) {
      var messageArray = data;
      console.log(messageArray);
      var trHTML = makeRowAdmin(messageArray);
      $('#coco').empty(trHTML);
      $('#coco').append(headertext + trHTML);
    },
    error: function(msg) {
      alert(msg.responseText);
    }
  });
  trendingFlag = 1;
}

//GET RECENTS AND TRENDING WITH PARAMETER: LOCATION
//Used for sorting posts by logical location
//Will get desired location from a dropdown list of all possibilities
function getRecentsAdmin(loc){
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
      var trHTML = makeRowAdmin(messageArray);
      $('#coco').empty()
      $('#coco').append(headertext + trHTML);
    },
    error: function(msg) {
      alert(msg.responseText);
    }
  });
  trendingFlag = 0;
}
function getTrendingAdmin(loc){
  $.ajax({
    url: '/request/get_trending_posts',
    type: 'post',
    dataType: 'json',
    data: {'logical_location':loc},
    async: false,
    success: function(data) {
      var messageArray = data;
      console.log(messageArray);
      var trHTML = makeRowAdmin(messageArray);
      $('#coco').empty(trHTML);
      $('#coco').append(headertext + trHTML);
    },
    error: function(msg) {
      alert(msg.responseText);
    }
  });
  trendingFlag = 1;
}


