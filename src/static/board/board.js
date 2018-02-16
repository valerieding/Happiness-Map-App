
$(document).ready(function(){
        var messageArray = "";
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
        }
        function timeSince(timeStamp) {
          var now = new Date(),
            secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
          if(secondsPast < 60){
            return parseInt(secondsPast) + 's';
          }
          if(secondsPast < 3600){
            return parseInt(secondsPast/60) + 'm';
          }
          if(secondsPast <= 86400){
            return parseInt(secondsPast/3600) + 'h';
          }
          if(secondsPast > 86400){
              day = timeStamp.getDate();
              month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ","");
              year = timeStamp.getFullYear() == now.getFullYear() ? "" :  " "+timeStamp.getFullYear();
              return day + " " + month + year;
          }
        }
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
              $('#tuffy').append(trHTML);
            },
            error: function(msg) {
              alert(msg.responseText);
            }

            // function callReact(vote){
            //   switch(vote){
            //     case "upvote":

            //       break;
            //     case "downvote":

            //       break;
            //     default:
            //   }
            // }

          });

          //AA: make function for different welcome messages based on last vote:
          //TODO:   pull most recent happinesslevel, parameter to welcomeText(X)
          //right now it just takes happiness of the most recent post,
          //which is not what we want in the end obviously
          document.body.onload = welcomeText('/request/get_happiness_level');

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
                welcome ="<h4 style=\"color:Orange; text-align:left;\">Keep your chin up, and tell us why you feel so 3 right now</h4>";
                break;
              case 4:
                welcome ="<h4 style=\"color:Yellow; text-align:left;\">4/5? Nice! How come?</h4>";
                break;
              case 5:
                welcome = "<h4 style=\"color:MediumSeaGreen; text-align:left;\">You're too happy. Tell us why...</h4>";
                break;
              default:
                welcome.append("Vote first, then post!");
            }
           document.getElementById("welcome").innerHTML = welcome;
          }



        });
      });
          //if we wanted it displayed in its own column (like before)
          //   $("#posts").append(decodeURI(value['message']) + '<br>');
          //   $("#votes").append(value['happiness_level'] + '/5' + '<br>');
          //   $("#time").append(timeConverter(value['timestamp']) + '<br>');
          //   $("#userid").append(decodeURI(value['location']['logical_location']) + '<br>');


      $(function() {
        $("#myform").submit(function(e) {
          e.preventDefault();
          $.ajax({
              url: 'request/add_post',
              type: 'post',
              dataType: 'json',
              data: {'latitude': 10, 'longitude': 10, 'message': $("#myform").serialize().slice(8), 'logical_location': "Maclean"},
              success: function(data) {
                // 'request/upvote'
                 console.log("added post successfully");
                 //console.log(decodeURI($(data))
                 console.log("my form input: " + $("#myform").serialize().slice(8));
              }
          });
        });

        // $("#upvote").submit(function(e){
        //   e.preventDefault();
        //   $.ajax({
        //     url: 'request/upvote',
        //     type: 'post',
        //     dataType: 'json',
        //     data: {'upvotes': }
        //   })
        // })



      });

      function callReact(vote,postID,userID){
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