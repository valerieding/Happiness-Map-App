var helloworld = function(){
	return 'Hello World';
}

// send happiness vote to database
function submitVote(loc, happy){
  //alert(loc + " " + happy);
  if (typeof happy != 'undefined' && typeof loc != 'undefined'){
    var confirmText = "(" + happy + ")\n";
    if(autoLoc == true) {
       confirmText += "We auto-detected your location is: " + loc + ".\nIf this is correct click Okay, otherwise please\nclick Canceland manually select your\nlocation to submit your vote.";
    } 
    if(loc == 'offcampus') {
      confirmText += "You input that you are off campus.\nIf this is correct click Okay, otherwise please\nclick Cancel and manually select your\nlocation to submit your vote.";
    }
    if(loc == '' || loc == ' ' || loc == null) {
      confirmText += "Oops! We couldn't get your location.\nPlease select your location manually to\nsubmit your vote.";
      alert(confirmText);
    } else {
      if(loc == 'offcampus' || loc == '' || loc == ' '|| autoLoc == true) {
        var confirmed = confirm(confirmText);
        if (confirmed == true) {
          $.ajax({
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
        } else {
            //txt = "You pressed Cancel!";
        }
      }
    }
    
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
  bj : "Burton Judson Courts",
  cathey : "Cathey Dining Commons",
  south : "South Campus Residence Hall",
  law : "Law School",
  harris : "Harris School",
  new_grad : "New Graduate Residence Halls",
  ida : "Ida Noyes",
  booth : "Booth School of Business",
  oriental : "Oriental Institute",
  rock : "Rockefeller Chapel",
  quadr : "Quadrangle Club",
  saieh : "Saieh Hall for Economics",
  henry : "Henry Crown Field House",
  smart : "Smart Museum",
  alumni : "Alumni House",
  snell :  "Snell-Hitchcock",
  reynolds : "Reynolds Club",
  physics : "Physics Buildings",
  med : "Medical Campus",
  logan : "Logan and Midway Studios",
  eastBuild : "East Quad Buildings",
  north : "Campus North Residence and Dining",
  multi : "Office of Multicultural Affairs",
  northBuild : "North Quad Buildings",
  lab : "Lab Buildings",
  crerar : "Crerar Library",
	mansueto : "Mansueto Library",
	regenstein : "Regenstein Library",
  bartlett : "Bartlett Dining Commons",
  maxp : "Max Palevsky Commons",
  hutch : "Hutchinson Commons",
  swift : "Swift Hall",
  mainNorth : "Main Quad North Buildings",
  bookstore : "University Bookstore",
  edward : "Edward H Levi Hall",
  cobb : "Cobb Hall",
  bond : "Bond Chapel",
  classicsBuilds : "Classics Quad Buildings",
  harper : "Harper Memorial Library",
  ssr : "Social Science Research",
  stuart : "Stuart Hall",
  rosenwald : "Rosenwald",
  ryeck : "Ryerson/Eckhart",
  ratner : "Ratner Athletics Center",
  southeast : "South East Quad Buildings",
  offcampus: "Off Campus",
}); 

