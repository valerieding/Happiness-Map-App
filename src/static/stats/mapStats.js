setUpMapPersonal();
//setButtonFunctions(getAllBuildingScores);
var ctx = document.getElementById('userVotesOverTime').getContext('2d');
var chart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: "Votes Over Time",
        backgroundColor: '#DD1C77',
        data: []
      }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom',
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        let temp = new Date(1000 * value).toDateString();
                        return temp;
                    }
                }
            }]
        },
        legend: {
            display: false
        }
    }
});
var h = getVoteHistory(null);
makeChart(null, h);



function getUsersVotes(start_time) {
  var myScores;
  if (!start_time) {
    start_time = 0;
  }
  $.ajax({
    url: '/request/get_recent_votes',
    type: 'post',
    dataType: 'json',
    async: false,
    ata: {'start_time': start_time},
    success: function(data){
      myScores = data;
    }
  });
  return myScores;
}

function getVoteHistory(start_time) {
  var voteHistory = getUsersVotes(start_time);
  var voteHistory2 = [];

  for (var i = 0; i < Math.min(100, voteHistory.length); i++) {
    let x = new Date(1000 * voteHistory[i].timestamp).toDateString();
    voteHistory2.push({
      x: voteHistory[i].timestamp,
      y: voteHistory[i].happiness_level});
  }
  return voteHistory2;
}

function makeChart(start_time, ds) {
  chart.data.datasets.forEach((d) => {
        d.data = ds;
    });
  chart.update();
}
