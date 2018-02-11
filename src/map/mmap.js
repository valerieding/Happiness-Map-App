var rsr = Raphael('map', '1458', '1076.67');

var regions = [];

var ColorKey = Object.freeze({
	happiest:"#182825",
	happy:"#CAE7B9",
	neutral:"#E8E1EF",
	sad: "#D0B8AC",
	saddest: "#721817"
});

populateDB();
let allScores = getAllBuildingScores();
console.log(getName(allScores[0]));


var dic = {
	"mansueto": {name: "Mansueto Library", val: "happiest"},
	"regenstein": {name: "Regenstein Library", val: "saddest"},
	"bartlett": {name: "Bartlett Dining Commons", val: "happy"},
	"maxp": {name: "Max Palevsky Commons", val: "neutral"}
};

function getInfo(n) {
	return "<h3>" + n.name + "</h3><h4>" + n.val + "</h4>";
};

var mansueto = rsr.ellipse(411.775, 284.582, 30.927, 16.541);
mansueto.transform("m-0.1795 -0.9838 0.9838 -0.1795 205.7261 740.7498");
mansueto.attr({fill: ColorKey[dic["mansueto"].val], class: "building", id: 'mansueto'});
mansueto.data({'info': dic['mansueto']});
regions.push(mansueto);

var regenstein = rsr.path("M425.501,274.501l6.667-8.667v-20.667h15v-13.333h14.667v-10.333h16.333v13.333h26.333 v-3h7v-6.333h7v43h-6v5.333h-3v9.667h5.333v36.333h-4.333v-5.667h-4.333v-2.667h-2.667v-9.333h-3.667v-17.667h-21.333v11.667 c0,0,0,0-15.667,0v5.667c0,0,0,0-15.667,0v6.333h-15.333v-31.667l-4,4.667L425.501,274.501z");
regenstein.attr({fill: ColorKey[dic["regenstein"].val], class: "building", id: 'regenstein'});
regenstein.data({'info': dic['regenstein']});
regions.push(regenstein);

var bartlett = rsr.path("M589.833,265.501v14.667h3.667v4.414h3.333v13.586h-2.667v5h-4v15.333h-3.333v8h-15.667v-8 h-2.667v-21h-4.333v-10.667h3.667c0-21.333,0-21.333,0-21.333l0,0H589.833z");
bartlett.attr({fill: ColorKey[dic["bartlett"].val], class: "building", id: 'bartlett'});
bartlett.data({'info': dic['bartlett']});
regions.push(bartlett);

var maxp3 = rsr.path("M 541.167,200.167 567.667,200.167 567.667,193 574.5,193 574.5,235.667 570.5,235.667 570.5,229.333 537,229.333 537,244.833 588.5,244.833 588.5,240.168 590.833,240.168 590.833,181.502 541.188,181.502 z");
maxp3.attr({fill: ColorKey[dic["maxp"].val], class: "building", id: 'maxp'});
maxp3.data({'info': dic['maxp']});
regions.push(maxp3);

var maxp2 = rsr.rect(442.5, 181.502, 84.25, 17.083);
maxp2.attr({fill: ColorKey[dic["maxp"].val], class: "building", id: 'maxp'});
maxp2.data({'info': dic['maxp']});
regions.push(maxp2);

var maxp = rsr.path("M430,181.502v17.083h-22.25v23.75H405v5.25h-7.5v-5.25h-5v-40.833H430z");
maxp.attr({fill: ColorKey[dic["maxp"].val], class: "building", id: 'maxp'});
maxp.data({'info': dic['maxp']});
regions.push(maxp);

document.getElementById('region-name').innerHTML = 'Try hovering over a building!';


for (var i = 0; i < regions.length; i++){

	regions[i].mouseover(function(e){
		this.node.style.opacity = 0.7;
		this.node.style.stroke = 'yellow';

		var i = getInfo(this.data('info'));

		document.getElementById('region-name').innerHTML = i;
	});

	regions[i].mouseout(function(e){
		this.node.style.opacity = 1;
		this.node.style.stroke = '#333333';
	});

}
