var rsr = Raphael('map', '1457.355', '1077.543');

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
	"bartlett": {name: "Barlett Dining Commons", val: "happy"},
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
	"stuart": {name: "", val: "neutral"},
	"rosenwald": {name: "Rosenwald", val: "neutral"},
	"ryeck": {name: "Ryerson/Eckhart", val: "neutral"},
	"ratner": {name: "Ratner Athletics Center", val: "neutral"},
	"lab": {name: "Lab Buildings", val: "neutral"},
};

function getInfo(n) {
	return "<h5>" + n.name + "</h5><h6>" + n.val + "</h6>";
};

var background = rsr.set(); 
var rect_a = rsr.rect(0, 0, 1144.822, 1076.235).attr({parent: 'background',fill: '#FFFFFF','stroke-width': '0','stroke-opacity': '1'}).data('id', 'rect_a'); 
var path_b = rsr.path("M1144.818,352.424v-14.386H729.997V177.232h98.821v-11.579h-98.821V-0.537h-13.998v166.189H614.823 V-0.537h-14v166.189h-216V-0.537h-14v166.189h-158V-0.537h-14v166.189h-151V-0.537h-14v166.189h-32.5v11.579h32.5v160.807h-32.5 v14.386h32.5v330.629h-32.5v11.529h32.5v37.471h-32.5v14.387h32.5v54.281h-32.5v14.385h32.5v29.947h-32.5v14.387h32.5v159.281 h-32.5v11.859h32.5v42.066h14v-42.066h209.215v42.938h8.521v-42.938h105.265v24.666h14v-24.666h218.74v42.938h8.521v-42.938 h103.916v24.666h13.998v-24.666h106.821v-11.859H729.997V859.44h112.821v-14.387H729.997v-29.947h116.821v-14.385H729.997V746.44 h119.821v-14.387H729.997v-37.471h124.821v-11.529H729.997V352.424H1144.818z M47.823,177.232h151v160.807h-151V177.232z M47.823,352.424h151v330.629h-151V352.424z M257.038,1018.722H47.823V859.44h209.215V1018.722z M370.823,1018.722H265.559V859.44 h105.265V1018.722z M370.823,845.054H265.559v-2.807h-8.521v2.807H47.823v-29.947h323V845.054z M370.823,800.722h-323V746.44h323 V800.722z M370.823,732.054h-323v-37.471h323V732.054z M370.823,683.054h-158V352.424h158V683.054z M370.823,338.039h-158V177.232 h158V338.039z M384.823,177.232h216v160.807h-216V177.232z M384.823,352.424h216v330.629h-216V352.424z M603.563,1018.722h-218.74 V859.44h218.74V1018.722z M715.999,1018.722H612.083V859.44h103.916V1018.722z M715.999,845.054H612.083v-2.807h-8.521v2.807 h-218.74v-29.947h331.176V845.054z M715.999,800.722H384.823V746.44h331.176V800.722z M715.999,732.054H384.823v-37.471h216h14 h101.176V732.054z M715.999,683.054H614.823V352.424h101.176V683.054z M715.999,338.039H614.823V177.232h101.176V338.039z").attr({parent: 'background',fill: '#333333','stroke-width': '0','stroke-opacity': '1'}).data('id', 'path_b'); 
background.attr({'id': 'background','name': 'background'});

var mansueto = rsr.ellipse(415.075, 285.782, 30.927, 16.541);
mansueto.transform("m-0.1795 -0.9838 0.9838 -0.1795 208.4381 745.4121");
mansueto.attr({fill: ColorKey[dic["mansueto"].val], class: "building", id: 'mansueto'});
mansueto.data({'info': dic['mansueto']}); 
regions.push(mansueto);

var regenstein = rsr.path("M428.501,275.501l6.667-8.667v-20.667h15v-13.333h14.667v-10.333h16.333v13.333h26.333 v-3h7v-6.333h7v43h-6v5.333h-3v9.667h5.333v36.333h-4.333v-5.667h-4.333v-2.667h-2.667v-9.333h-3.667v-17.667h-21.333v11.667 c0,0,0,0-15.667,0v5.667c0,0,0,0-15.667,0v6.333h-15.333v-31.667l-4,4.667L428.501,275.501z");
regenstein.attr({fill: ColorKey[dic["regenstein"].val], class: "building", id: "regenstein"});
regenstein.data({'info': dic['regenstein']}); 
regions.push(regenstein);

var bartlett = rsr.path("M592.833,265.501v14.667h3.667v4.414h3.333v13.586h-2.667v5h-4v15.333h-3.333v8h-15.667 v-8h-2.667v-21h-4.333v-10.667h3.667c0-21.333,0-21.333,0-21.333l0,0H592.833z");
bartlett.attr({fill: ColorKey[dic["bartlett"].val], class: "building", id: 'bartlett'});
bartlett.data({'info': dic['bartlett']}); 
regions.push(bartlett);

var hutch = rsr.path("M 541.252,382.835 575.667,382.835 596.833,382.835 596.833,357.585 579,357.585 579,356.585 536.25,356.585 536.25,371.835 541.25,371.835 z");
hutch.attr({fill: ColorKey[dic["hutch"].val], class: "building", id: 'hutch'});
hutch.data({'info': dic['hutch']}); 
regions.push(hutch);

var swift = rsr.path("M 406,361.334 435.667,361.334 435.667,357.001 446.333,357.001 446.333,375.501 437.832,375.501 437.833,371.501 427.662,371.501 427.667,369.963 393,369.963 393,357.001 406,357.001 z");
swift.attr({fill: ColorKey[dic["swift"].val], class: "building", id: 'swift'});
swift.data({'info': dic['swift']}); 
regions.push(swift);

var reynolds = rsr.path("M 595.372,405.668 597.5,405.668 597.5,382.835 576.833,382.835 576.833,440.168 580.833,440.168 580.833,442.502 595.333,442.502 z");
reynolds.attr({fill: ColorKey[dic["reynolds"].val], class: "building", id: 'reynolds'});
reynolds.data({'info': dic['reynolds']}); 
regions.push(reynolds);

var mainNorth = rsr.path("M 536.25,417.335 536.25,389.668 533.5,389.668 533.5,371.668 536.25,371.668 536.25,356.585 504.833,356.585 504.833,365.335 487,365.335 487,356.585 453.333,356.585 453.333,372.001 460.833,372.001 460.833,389.668 459.75,389.668 459.75,417.335 482.75,417.335 482.75,400.585 471.5,400.585 471.5,389.585 465.5,389.585 465.5,372.085 487.5,372.085 487.5,369.71 504.625,369.71 504.625,371.96 512.875,371.96 512.875,378.085 523.375,378.085 523.375,372.085 528.875,372.085 528.875,389.835 523.125,389.835 523.125,417.335 z");
mainNorth.attr({fill: ColorKey[dic["mainNorth"].val], class: "building", id: 'mainNorth'});
mainNorth.data({'info': dic['mainNorth']}); 
regions.push(mainNorth);

var bookstore = rsr.path("M 353.167,480.168 371.501,480.168 371.501,507.168 339.834,507.168 339.834,489.168 352.834,488.502 z");
bookstore.attr({fill: ColorKey[dic["bookstore"].val], class: "building", id: 'bookstore'});
bookstore.data({'info': dic['bookstore']}); 
regions.push(bookstore);

var edward = rsr.rect(399.833, 489.501, 13.667, 53.667);
edward.attr({fill: ColorKey[dic["edward"].val], class: "building", id: 'edward'});
edward.data({'info': dic['edward']}); 
regions.push(edward);

var cobb = rsr.path("M 393,551.168 414.834,551.168 414.834,563.501 412.167,563.501 412.167,568.669 414.834,568.669 414.834,577.502 412.333,577.502 412.333,582.835 414.834,582.835 414.834,595.169 393,595.169 z");
cobb.attr({fill: ColorKey[dic["cobb"].val], class: "building", id: 'cobb'});
cobb.data({'info': dic['cobb']}); 
regions.push(cobb);

var swift = rsr.path("M 444,567.335 477.333,567.335 477.333,577.001 467.667,577.001 467.667,596.668 457,596.668 457,577.668 444,577.668 z");
swift.attr({fill: ColorKey[dic["swift"].val], class: "building", id: 'swift'});
swift.data({'info': dic['swift']}); 
regions.push(swift);

var bond = rsr.path("M 457,595.169 449.667,595.169 449.667,605.169 426.667,605.169 426.667,595.169 444,595.169 444,591.836 457,591.836 z");
bond.attr({fill: ColorKey[dic["bond"].val], class: "building", id: 'bond'});
bond.data({'info': dic['bond']}); 
regions.push(bond);

var classicsBuilds = rsr.path("M 395.5,595.169 406.833,595.169 407.333,658.67 410.833,658.67 415.333,654.503 461.833,654.503 461.833,650.17 459.333,650.17 459.333,633.837 457,633.837 457,620.837 458.666,620.837 458.666,605.169 468.333,605.169 468.333,620.837 471.166,620.837 471.166,633.837 468.5,633.837 468.5,649.67 466.333,649.67 466.333,676.17 458.833,676.17 458.833,672.003 434.166,672.003 434.166,676.17 393,676.17 393,662.337 395.666,662.337 z");
classicsBuilds.attr({fill: ColorKey[dic["classicsBuilds"].val], class: "building", id: 'classicsBuilds'});
classicsBuilds.data({'info': dic['classicsBuilds']}); 
regions.push(classicsBuilds);

var harper = rsr.path("M 466.333,655.005 471.166,655.005 471.166,657.005 519.5,657.005 519.5,655.005 527.334,655.005 527.334,676.17 511.667,676.17 511.667,674.672 477.333,674.672 477.333,676.17 466.333,676.17 z");
harper.attr({fill: ColorKey[dic["harper"].val], class: "building", id: 'harper'});
harper.data({'info': dic['harper']}); 
regions.push(harper);

var ssr = rsr.path("M 555.167,676.17 555.167,673.671 529.667,673.671 527.251,676.087 527.251,655.005 552,655.005 552,646.171 556.5,646.171 556.5,655.005 566.167,655.005 566.167,676.17 z");
ssr.attr({fill: ColorKey[dic["ssr"].val], class: "building", id: 'ssr'});
ssr.data({'info': dic['ssr']}); 
regions.push(ssr);

var stuart = rsr.path("M 527.334,649.838 527.334,655.005 531.834,655.005 531.834,649.838 537,649.838 537,639.504 542.667,639.504 542.667,616.338 538.167,616.338 538.167,606.338 532.001,606.338 532.001,601.671 527.251,601.671 527.251,606.504 521.334,606.504 521.334,649.844 z");
stuart.attr({fill: ColorKey[dic["stuart"].val], class: "building", id: 'stuart'});
stuart.data({'info': dic['stuart']}); 
regions.push(stuart);

var rosenwald = rsr.path("M 532,597.21 532,601.671 527.251,601.671 527.251,597.21 523.125,597.21 523.125,582.001 512.75,582.001 512.75,566.21 543.25,566.21 543.25,569.21 546.125,569.21 546.125,566.21 557.375,566.21 557.375,564.335 566.5,564.335 566.5,566.085 576.375,566.085 576.375,580.585 565.375,580.585 565.375,583.003 564.625,583.003 564.5,584.335 563.5,584.335 563.5,585.335 560.375,585.46 560.375,584.46 559.5,584.335 559.5,583.003 558.625,583.003 558.625,580.71 546.125,580.71 546.125,577.96 538.125,577.96 538.125,597.21 z");
rosenwald.attr({fill: ColorKey[dic["rosenwald"].val], class: "building", id: 'rosenwald'});
rosenwald.data({'info': dic['rosenwald']}); 
regions.push(rosenwald);

var ryeck = rsr.path("M 579.25,470.335 579.25,467.585 590.75,467.585 590.75,442.502 579.25,442.502 579.25,447.335 555,447.085 555,456.418 548,456.418 548,451.335 539.25,451.335 539.25,453.835 530.75,453.835 530.75,447.335 536.25,447.335 536.25,434.335 520.75,434.335 520.75,447.335 525.25,447.335 525.25,453.585 517,453.585 517,451.335 508.5,451.335 508.5,469.085 547,469.085 547,459.335 551.5,459.335 551.5,462.835 553.75,462.835 553.75,467.335 567.5,467.335 567.5,470.335 z");
ryeck.attr({fill: ColorKey[dic["ryeck"].val], class: "building", id: 'ryeck'});
ryeck.data({'info': dic['ryeck']}); 
regions.push(ryeck);

var ratner = rsr.path("M368.5,22.835h-26.25v-5H310.5v55.75h-2v13.5h2.5v34h-9.5v35.25h48.25v-35.25h-4.25V94.979 c1.181,0.389,2.439,0.606,3.75,0.606c6.627,0,12-5.372,12-12c0-2.503-0.769-4.827-2.08-6.75h9.33V22.835z");
ratner.attr({fill: ColorKey[dic["ratner"].val], class: "building", id: 'ratner'});
ratner.data({'info': dic['ratner']}); 
regions.push(ratner);

var maxp = rsr.set(); 
maxp.attr({fill: ColorKey[dic["maxp"].val], class: "building", id: 'maxp'});
maxp.data({'info': dic['maxp']}); 
regions.push(maxp);

var maxp1 = rsr.path("M 543.488,182.602 543.467,201.267 569.967,201.267 569.967,194.101 576.8,194.101 576.8,236.767 572.8,236.767 572.8,230.434 539.3,230.434 539.3,245.934 590.8,245.934 590.8,241.269 593.134,241.269 593.134,182.602 z");
maxp1.attr({fill: ColorKey[dic["maxp"].val], class: "building", id: 'maxp'});
maxp1.data({'info': dic['maxp']}); 

var maxp2 = rsr.rect(444.8, 182.602, 84.25, 17.083);
maxp2.attr({fill: ColorKey[dic["maxp"].val], class: "building", id: 'maxp'});
maxp2.data({'info': dic['maxp']}); 

var maxp3 = rsr.path("M 394.8,223.435 399.8,223.435 399.8,228.685 407.3,228.685 407.3,223.435 410.05,223.435 410.05,199.685 432.3,199.685 432.3,182.602 394.8,182.602 z");
maxp3.attr({fill: ColorKey[dic["maxp"].val], class: "building", id: 'maxp'});
maxp3.data({'info': dic['maxp']}); 

maxp.push(maxp1, maxp2, maxp3);

var lab = rsr.set();
lab.attr({fill: ColorKey[dic["lab"].val], class: "building", id: 'lab'});
lab.data({'info': dic['lab']}); 
regions.push(lab);

var lab1 = rsr.path("M 466.667,454.001 466.667,434.834 452.334,434.834 452.334,453.501 437.084,453.501 437.084,460.001 429.501,460.001 429.501,453.834 413.834,453.834 413.834,440.001 424.667,440.001 424.667,427.167 409.001,427.167 409.001,375.501 393,375.501 393,449.335 396.167,449.335 396.167,451.334 393,453.167 393,482.834 408.334,482.834 408.334,472.501 415.167,466.085 454.834,466.085 454.834,469.001 481.167,469.001 481.167,454.001 z");
lab1.attr({fill: ColorKey[dic["lab"].val], class: "building", id: 'lab'});
lab1.data({'info': dic['lab']}); 

var lab2 = rsr.rect(342.167, 424.502, 26, 45.667);
lab2.attr({fill: ColorKey[dic["lab"].val], class: "building", id: 'lab'});
lab2.data({'info': dic['lab']}); 

lab.push(lab1, lab2);

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


