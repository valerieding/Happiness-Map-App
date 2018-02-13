//where map stuff will go
var helloworld = function(){
   return 'Hello World';
};

var regions = [];

var ColorKey = Object.freeze({
	happiest:"#182825",
	happy:"#CAE7B9",
	neutral:"#E8E1EF",
	sad: "#D0B8AC",
	saddest: "#721817"
});


var dic = {
	"bj": {name: "Crerar Library", val: "saddest"},
	"cathey": {name: "Cathey Dining Commons", val: "sad"},
	"south": {name: "South Residence", val: "sad"},
	"law": {name: "Law School", val: "sad"},
	"harris": {name: "Harris School", val: "sad"},
	"new_grad": {name: "New Graduate Residence Halls", val: "sad"},
	"ida": {name: "Ida Noyes", val: "sad"},
	"booth": {name: "Booth School of Business", val: "sad"},
	"oriental": {name: "Oriental Institute", val: "sad"},
	"rock": {name: "Rockefeller Chapel", val: "sad"},
	"quadr": {name: "Quadrangle Club", val: "sad"},
	"saieh": {name: "Saieh Hall for Economics", val: "happy"},
	"henry": {name: "Henry Crown Field House", val: "happy"},
	"smart": {name: "Smart Museum", val: "happy"},
	"alumni": {name: "Alumni House", val: "happy"},
	"snell": {name: "Snell-Hitchcock", val: "happy"},
	"reynolds": {name: "Reynolds", val: "happy"},
	"physics": {name: "Physics Buildings", val: "saddest"},
	"med": {name: "Medical Campus", val: "happy"},
	"logan": {name: "Logan and Midway Studios", val: "saddest"},
	"eastBuild": {name: "East Quad Buildings", val: "happy"},
	"north": {name: "Campus North Residence and Dining", val: "saddest"},
	"multi": {name: "Office of Multicultural Affairs", val: "saddest"},
	"northBuild": {name: "North Quad Buildings", val: "saddest"},
	"lab": {name: "Lab Buildings", val: "saddest"},
	"crerar": {name: "Crerar Library", val: "saddest"},
	"mansueto": {name: "Mansueto Library", val: "happiest"},
	"regenstein": {name: "Regenstein Library", val: "saddest"},
	"bartlett": {name: "Bartlett Dining Commons", val: "happy"},
	"maxp": {name: "Max Palvsky Commons", val: "neutral"},
	"hutch": {name: "Hutchinson Commons", val: "neutral"},
	"swift": {name: "Swift Hall", val: "neutral"},
	"reynolds": {name: "Reynolds Club", val: "neutral"},
	"mainNorth": {name: "Main Quad North Buildings", val: "neutral"},
	"bookstore": {name: "University Bookstore", val: "neutral"},
	"edward": {name: "Edward H Levi Hall", val: "neutral"},
	"cobb": {name: "Cobb", val: "neutral"},
	"swift": {name: "Swift", val: "neutral"},
	"bond": {name: "Bond Chapel", val: "neutral"},
	"classicsBuilds": {name: "Classics Quad Buildings", val: "neutral"},
	"harper": {name: "Harper Memorial Library", val: "neutral"},
	"ssr": {name: "Social Science Research", val: "neutral"},
	"stuart": {name: "Stuart Hall", val: "neutral"},
	"rosenwald": {name: "Rosenwald", val: "neutral"},
	"ryeck": {name: "Ryerson/Eckhart", val: "neutral"},
	"ratner": {name: "Ratner Athletics Center", val: "neutral"},
	"southeast": {name: "South East Quad Buildings", val: "happiest"},
};


//map page functions
function databaseToMapObj(n) {
};

function getInfo(n) {
	return "<h3>" + n.name + "</h3><h4>" + n.val + "</h4>";
};

function getName(n) { return n.name};

function computeColor(n) { return n};

function getHappinessRating(n) {return n};

//querying database functions
function getCampusScore() {return 0};

function getAllBuildingScores() {return 0};

