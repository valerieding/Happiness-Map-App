setUpMapPersonal();
//setButtonFunctions(getAllBuildingScores);
var dateCallback = function(value, index, values) {
    let temp = new Date(1000 * value).toDateString();
    return temp;
}

var ctx = document.getElementById('userVotesOverTime').getContext('2d');
var chart = makeChart(ctx);
updateChart(chart, null);
setScatterButtonFunctions();



/* Functions for the stats page */

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

function makeChart(ctx) {
  var chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: "Vote",
          backgroundColor: '#DD1C77',
          borderColor: '#DF65B0',
          borderWidth: 2,
          fill: false,
          lineTension: 0,
          data: []
        }]
      },
      options: {
          scales: {
              xAxes: [{
                  type: 'linear',
                  position: 'bottom',
                  ticks: {
                      callback: dateCallback
                  }
              }],
              yAxes: [{
                  type: 'linear',
                  ticks: {
                    beginAtZero: true,
                    stepSize: 1
                  }
              }]
          },
          legend: {
              display: false
          },
          tooltips: {
              enabled: true,
              callbacks: {
                  title: function(tooltipItem, chart) {
                      let temp = new Date(1000 * tooltipItem[0].xLabel);
                      return temp.toLocaleString();
                  }
              }
          }
      }
  });
  return chart;
}

function updateChart(chart, start_time) {
  ds = getVoteHistory(start_time);
  console.log(ds);
  if (ds.length > 1) {
    document.getElementById("userVotesOverTime").style.display="block";
    chart.data.datasets.forEach((d) => {
          d.data = ds;
      });
    chart.update();
  } else {
    document.getElementById("userVotesOverTime").style.display="none";
    document.getElementById("warningNotEnoughInfo").innerHTML = "Not Enough Data to Display"
  }
}

function setScatterButtonFunctions() {
  $('#optAllScatter').on('change', function () {
    updateChart(chart, null);
  });
  $('#optWeekScatter').on('change', function () {
    let now = Math.floor(Date.now() / 1000);
    updateChart(chart, now - week);
  });
  $('#optDayScatter').on('change', function () {
    let now = Math.floor(Date.now() / 1000);
    updateChart(chart, now - day);
  });
  $('#optHourScatter').on('change', function () {
    let now = Math.floor(Date.now() / 1000);
    updateChart(chart, now - twoHr);
  });
}
