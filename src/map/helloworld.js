var helloworld = function(){
   return 'Hello World';
};

var rsr = Raphael('map', '1458', '1076.67');

var regions = [];

var ColorKey = Object.freeze({
	happiest:"#182825",
	happy:"#CAE7B9",
	neutral:"#E8E1EF",
	sad: "#D0B8AC",
	saddest: "#721817"
});
