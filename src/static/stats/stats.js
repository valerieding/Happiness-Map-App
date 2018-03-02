makeHistoryChart({stepSize: 60*60*24, callback: dateCallback,}, null);
makeWeekChart();
makeTimeChart();
setScatterButtonFunctions();
setUpMapPersonal();
setButtonFunctions(getAllBuildingScoresByUser);
