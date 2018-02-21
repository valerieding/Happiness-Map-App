const week = 604800;
const day =  86400;
const twoHr = 7200;

function changeTimeFrame(start_time, regions) {
	let allScores = getAllBuildingScores(start_time);
	let allPlaces = allMapObjects(allScores);
	let campus_avg = getCampusScore(start_time);
	for (var i = 0; i < regions.length; i++){
		let data = regions[i].data('info');
		if (allPlaces[data.id]) {
			regions[i].animate({fill: allPlaces[data.id].color},100);
			regions[i].data({'info': allPlaces[data.id]});
		} else {
			let grouped = regions[i].items
			for (var j = 0; j < grouped.length; j++) {
				data = grouped[j].data('info')
				regions[i].items[j].animate({fill: allPlaces[data.id].color},200);
				regions[i].items[j].data({'info': allPlaces[data.id]});
			}
		}
	}
	document.getElementById('region-header').innerHTML =
		'Try hovering over a building!<br><br><br>';
	document.getElementById('campus-avg-text').innerHTML =
		'Campus Happiness: ' + formatScore(campus_avg) + '';
	document.getElementById('region-text').innerHTML = '';
}

function setUpMap() {
	document.getElementById('region-header').innerHTML =
		'Try hovering over a building!<br><br><br>';
  $('#region-text').html = 'Try';
	document.getElementById('region-text').innerHTML = '';
	document.getElementById('campus-avg-text').innerHTML =
		'Campus Happiness: ' + formatScore(campus_avg) + '';
	changeTimeFrame(null, regions);
	for (var i = 0; i < regions.length; i++){
		regions[i].mouseover(function(e){
			this.node.style.opacity = 0.7;
			this.node.style.stroke = 'yellow';
			var info = this.data('info');
			let label = info.rating + "<br>building happiness: " + info.score;
			document.getElementById('region-header').innerHTML = info.fullname;
			document.getElementById('region-text').innerHTML = label;
		});
		regions[i].mouseout(function(e){
			this.node.style.opacity = 1;
			this.node.style.stroke = '#333333';
		});
	}

	$('#optAll').on('change', function () {
		changeTimeFrame(null, regions);
	});
	$('#optWeek').on('change', function () {
		let now = Math.floor(Date.now() / 1000);
		changeTimeFrame(now - week, regions);
	});
	$('#optDay').on('change', function () {
		let now = Math.floor(Date.now() / 1000);
		changeTimeFrame(now - day, regions);
	});
	$('#optHour').on('change', function () {
		let now = Math.floor(Date.now() / 1000);
		changeTimeFrame(now - twoHr, regions);
	});
}
setUpMap();
