setUpMapPersonal();
setButtonFunctions(getAllBuildingScoresByUser);

var ctx = document.getElementById('userVotesOverTime').getContext('2d');
var chart = makeChart(ctx);
updateChart(chart, null);
setScatterButtonFunctions();
