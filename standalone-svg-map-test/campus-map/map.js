var rsr = Raphael('map', '1458', '1076.67'); 

var regions = [];

var mansueto = rsr.ellipse(411.775, 284.582, 30.927, 16.541);
mansueto.attr({fill: '#DDF9C1','stroke-width': '1','stroke-opacity': '1', 'stroke': '#61210F'});
mansueto.transform("m-0.1795 -0.9838 0.9838 -0.1795 205.7261 740.7498").data({'id': 'mansueto', 'region': 'Mansueto Library'}); 
regions.push(mansueto);

var regenstein = rsr.path("M425.501,274.501l6.667-8.667v-20.667h15v-13.333h14.667v-10.333h16.333v13.333h26.333 v-3h7v-6.333h7v43h-6v5.333h-3v9.667h5.333v36.333h-4.333v-5.667h-4.333v-2.667h-2.667v-9.333h-3.667v-17.667h-21.333v11.667 c0,0,0,0-15.667,0v5.667c0,0,0,0-15.667,0v6.333h-15.333v-31.667l-4,4.667L425.501,274.501z"); 
regenstein.attr({fill: '#DDF9C1','stroke-width': '1','stroke-opacity': '1', 'stroke': '#61210F'});
regenstein.data({'id': 'regenstein', 'region': 'Regenstein Library'});
regions.push(regenstein);

for (var i = 0; i < regions.length; i++){
	/*
	if (regions[i].data('id') == 'mansueto'){
		regions[i].node.setAttribute('fill', 'gold');
	}
	*/

	regions[i].mouseover(function(e){
		this.node.style.opacity = 0.7;
		document.getElementById('region-name').innerHTML = this.data('region');
	});

	regions[i].mouseout(function(e){
		this.node.style.opacity = 1;
		document.getElementById('region-name').innerHTML = ""; 
	});
}
