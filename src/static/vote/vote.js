var helloworld = function(){
	return 'Hello World';
}

// send happiness vote to database
function submitVote(loc, happy){
  alert(loc + " " + happy);
  if (typeof happy != 'undefined' && typeof loc != 'undefined'){
        /*$.ajax({
                url: '/request/add_vote',
                method: 'post',
                dataType: 'json',
                data: {'latitude': 10,
                       'longitude': 10,
                       'logical_location': loc,
                       'happiness_level': happy},
                       //'logical_location': $('#loc_drop option:selected').val(),
                       //'happiness_level': $('input[name=happiness_level]:checked').val()},
                beforeSend: function() {
                  //alert("Happiness level = " + $('input[name=happiness_level]:checked').val());
                  //alert("Location: " + $("#loc_drop option:selected").val());
                  //alert('echo');
                },
                success: function() {
                  //alert('Vote Submitted');
                },
                error: function() {
                  //alert('Failed to submit vote');
                }              
            }); 
          //txt = "You pressed OK!";
      
    }*/
    
  }
  else{
    alert("You have to submit both a happiness value and your location");
    return false;
  }
  return true;
};

// same as in src/static/map/mapFunctions.js
// To Do: move to external static file for reference in both
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
  swift : "Swift Hall"
}); 


