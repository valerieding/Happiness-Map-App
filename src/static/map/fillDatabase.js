// function just for testing, adds a bunch of votes to the database for a nice visualization
function populateDB() {
  $.ajax({
    url: '/request/add_vote',
    type: 'post',
    dataType: 'json',
    data: {'logical_location': 'regenstein', 'happiness_level': 1},
  });
  $.ajax({
    url: '/request/add_vote',
    type: 'post',
    dataType: 'json',
    data: {'logical_location': 'regenstein', 'happiness_level': 2},
  });
  $.ajax({
    url: '/request/add_vote',
    type: 'post',
    dataType: 'json',
    data: {'logical_location': 'regenstein', 'happiness_level': 2},
  });
  $.ajax({
    url: '/request/add_vote',
    type: 'post',
    dataType: 'json',
    data: {'logical_location': 'regenstein', 'happiness_level': 2},
  });
  $.ajax({
    url: '/request/add_vote',
    type: 'post',
    dataType: 'json',
    data: {'logical_location': 'mansueto', 'happiness_level': 3},
  });
  $.ajax({
   url: '/request/add_vote',
   type: 'post',
   dataType: 'json',
   data: {'logical_location': 'maxp', 'happiness_level': 5},
 });
 $.ajax({
   url: '/request/add_vote',
   type: 'post',
   dataType: 'json',
   data: {'logical_location': 'bartlett', 'happiness_level': 4},
 });
 let i = 0;
 for (i = 0; i < 10; i++){
   let vote = Math.ceil(Math.random() * 5);
   let keys = Object.keys(FullNameKey);
   let place = keys[Math.floor(keys.length * Math.random())];
   $.ajax({
     url: '/request/add_vote',
     type: 'post',
     dataType: 'json',
     data: {'logical_location': place, 'happiness_level': vote},
   });
  }


};
