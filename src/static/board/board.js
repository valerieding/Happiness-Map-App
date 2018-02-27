//Global string to use get_recent and get_trending posts easier
var headertext = '<tr><th scope=\'col\'>Messages</th><th scope=\'col\'>Happiness Level</th><th scope=\'col\'>Location</th><th scope=\'col\'>Time Stamp</th><th scope=\'col\'>Reactions</th></tr>';

$(document).ready(function(){

    //Change 'welcome' text based off the user's most recent happiness level vote.
    function welcomeText(happy_lvl){
        var welcome = ""
        switch(happy_lvl){
          case 1:
            welcome = "<h4 style=\"color:SlateBlue; text-align:left;\">1/5?!?! Why are you so sad?</h4>";
            break;
          case 2:
            welcome ="<h4 style=\"color:DodgerBlue; text-align:left;\">2/5? Tell us why you're feeling blue...</h4>";
            break;
          case 3:
            welcome ="<h4 style=\"color:Orange; text-align:left;\">Keep your chin up, and tell us why you feel so 3 right now...</h4>";
            break;
          case 4:
            welcome ="<h4 style=\"color:Yellow; text-align:left;\">4/5? Nice! Tell us why...</h4>";
            break;
          case 5:
            welcome = "<h4 style=\"color:MediumSeaGreen; text-align:left;\">A perfect 5? You're too happy. Tell us why...</h4>";
            break;
          default:
            welcome = "<h4 style=\"color:White; text-align:left;\">Vote first, then post!</h4>";
        }
       document.getElementById("welcome").innerHTML = welcome;
      }

      // REQUEST FOR HAPPINESS LEVEL FOR WELCOME TEXT
      var happyL = 0;
      console.log("happy level is " + happyL);
      $(function() {
        $.ajax({
          url: '/request/get_happiness_level',
          type: 'post',
          dataType: 'json',
          async: false,
          success: function(data) {
            happyL = data;
            console.log("happy level now is " + happyL);
            welcomeText(happyL); 
          },
           error: function(msg) {
            console.log("didnt work");
          }
        });
      });


      // REQUEST FOR GET RECENT POSTS
      var messageArray = "";
      console.log("messageArray 1is: " + messageArray);
      $(function() {
        $.ajax(
        {
          url: '/request/get_recent_posts',
          type: 'post',
          dataType: 'json',
          data: {'latitude': 10, 'longitude': 10},
          async: false,
          success: function(data) {
            messageArray = data;
            console.log(messageArray);
            var trHTML = makeRow(messageArray);
            $('#tuffy').append(trHTML);
          },
          error: function(msg) {
            alert(msg.responseText);
          }

          });

        });
      });

      //HELPER FUNCTION to ~refactor~, literally exists to get rid of repetition
      //Makes the table string to use in the "get_trending_posts" and "get_recent_posts"
      function makeRow(messageArray){
        var trHTML = '';
        $.each(messageArray, function(index, value){
        trHTML += '<tr><td>' + 
          decodeURI(value['message']) + '</td><td>' + value['happiness_level'] + '/5' + '</td><td>' + 
          decodeURI(value['location']['logical_location']) + '</td><td>' + 
          timeSince(value['timestamp']) + '</td><td> <button onclick=\"callReact(\'upvote\',' + 
          value['post_id']  + ');window.location.reload()\" class=\"btn btn-primary\"><i class="fa fa-smile-o"></i> ' + 
          value['reactions']['upvote'] + '</button> <button onclick=\"callReact(\'downvote\',' + 
          value['post_id'] +');window.location.reload()\" class=\"btn btn-primary\"><i class="fa fa-frown-o"></i> ' + 
          value['reactions']['downvote'] + '</button></td></tr>' ;
        });
        return trHTML;
      }

      // ADD POST, RETURN RECENT POSTS
      $(function() {
        $("#myform").submit(function(e) {
          e.preventDefault();
          $.ajax({
              url: 'request/add_post',
              type: 'post',
              dataType: 'json',
              data: {'latitude': 10, 
                     'longitude': 10, 
                     'message': $("#myform").serialize().slice(8), 
                     'logical_location': "Maclean"},
              success: function(data) {
                // 'request/upvote'
                 console.log("added post successfully");
                 //console.log(decodeURI($(data))
                 console.log("my form input: " + $ encodeURI(("#myform").serialize().slice(8)));
              }
          });
        });
      });

      //QUERY FOR RECENT POSTS WHEN BUTTON IS CLICKED
      $(function() {
        $("#recent").click(function(e) {
          e.preventDefault();
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
      });
    });

      //QUERY FOR TRENDING POSTS WHEN BUTTON IS CLICKED
      $(function() {
        $("#trending").click(function(e) {
          e.preventDefault();
          $.ajax({
                url: '/request/get_trending_posts',
                type: 'post',
                dataType: 'json',
                data: {'latitude': 10, 'longitude': 10},
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
      });        
    });

  //QUERY TO UP AND DOWNVOTE WHEN BUTTONS ARE CLICKED
  function callReact(vote,postID){
      switch(vote){
        case "upvote":
          $(function(){
            $.ajax({
             url: '/request/add_reaction',
             type: 'post',
             dataType: 'json',
             data: {'post_id': postID, 'reaction': 'upvote'}
            });
          });
          break;
        case "downvote":
          $(function(){
            $.ajax({
             url: '/request/add_reaction',
             type: 'post',
             dataType: 'json',
             data: {'post_id': postID, 'reaction': 'downvote'}
            });
          });
          break;
        default:
          window.alert("hi!");
      }
    }

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


       