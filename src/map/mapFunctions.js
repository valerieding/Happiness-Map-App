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
	"mansueto": {name: "Mansueto Library", val: "happiest"},
	"regenstein": {name: "Regenstein Library", val: "saddest"},
	"bartlett": {name: "Bartlett Dining Commons", val: "happy"},
	"maxp": {name: "Max Palevsky Commons", val: "neutral"}
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

