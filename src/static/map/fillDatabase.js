// function just for testing, adds a bunch of votes to the database for a nice visualization
function fillDB() {
 let i = 0;
 for (i = 0; i < 200; i++){
   let vote = Math.ceil(Math.random() * 5);
   let keys = Object.keys(FullNameKey);
   let place = keys[Math.floor(keys.length * Math.random())];
   $.ajax({
     url: '/request/add_vote',
     type: 'post',
     dataType: 'json',
     data: {'latitude': 0, 'longitude': 0,
     'logical_location': place, 'happiness_level': vote},
   });
  }


};
