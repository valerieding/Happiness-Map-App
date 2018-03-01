var dateCallback = function(value, index, values) {
    let temp = new Date(1000 * value).toDateString();
    return temp;
}
var timeCallback = function(value, index, values) {
    let temp = new Date(1000 * value).toLocaleTimeString();
    return temp;
}


var chart = makeHistoryChart();
var weekChart = makeWeekChart();
var timeChart = makeTimeChart();
updateHistoryChart(chart, null);
setScatterButtonFunctions();


setUpMapPersonal();
setButtonFunctions(getAllBuildingScoresByUser);


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
    data: {'start_time': start_time},
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

function getVoteByDayOfWeek() {
  var myScores;
  $.ajax({
    url: '/request/get_personal_votes_by',
    type: 'post',
    dataType: 'json',
    async: false,
    data: {'group_by': 'dow'},
    success: function(data){
      myScores = data;
    }
  });
  return myScores;
}

function getVoteByTimeOfDay() {
  var myScores;
  $.ajax({
    url: '/request/get_personal_votes_by',
    type: 'post',
    dataType: 'json',
    async: false,
    data: {'group_by': 'tod'},
    success: function(data){
      myScores = data;
    }
  });
  return myScores;
}

function makeHistoryChart() {
  let ctx = document.getElementById('userVotesOverTime').getContext('2d');
  var timeChart = new Chart(ctx, {
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
                    min: 1,
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
  return timeChart;
}

function makeWeekChart() {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let dayScores = [0, 0, 0, 0, 0, 0, 0];
  let dayData = getVoteByDayOfWeek();
  for (let day in days) {
    if (dayData[days[day]]) {
      dayScores[day] = formatScore(dayData[days[day]]);
    }
  }
  let ctx = document.getElementById('userVotesByDayOfWeek').getContext('2d');
  var weekChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: days,
      datasets: [{
        label: "Vote",
        borderWidth: 1,
        backgroundColor: '#DD1C77',
        data: dayScores
      }]
    },
    options: {
      legend: {
          display: false,
      },
      yAxes: [{
          ticks: {
            min: 0,
            max: 5,
            stepSize: 1
          }
      }]
    }
  });
  return weekChart;
}

function makeTimeChart() {
  let timeData = getVoteByTimeOfDay();
  let ctx = document.getElementById('userVotesByTimeOfDay').getContext('2d');
  let timesScores = [];
  for (let i = 0; i < 24; i++) {
    if (timeData[i]) {
      timesScores.push(formatScore(timeData[i]));
    } else {
      timesScores.push(0);
    }
  }
  let timesLabels = ["12 AM"];
  for (let i = 1; i < 12; i++) {
    timesLabels.push(parseInt(i) + " AM");
  }
  timesLabels.push("12 PM");
  for (let i = 1; i < 12; i++) {
    timesLabels.push(parseInt(i) + " PM");
  }
  var weekChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: timesLabels,
      datasets: [{
        label: "Vote",
        borderWidth: 1,
        backgroundColor: '#DD1C77',
        data: timesScores
      }]
    },
    options: {
      legend: {
          display: false,
      },
      yAxes: [{
          ticks: {
            min: 0,
            max: 5,
            stepSize: 1
          }
      }]
    }
  });
  return weekChart;
}

function updateHistoryChart(chart, start_time) {
  ds = getVoteHistory(start_time);
  if (ds.length > 2) {
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
    updateHistoryChart(chart, null);
  });
  $('#optWeekScatter').on('change', function () {
    let now = Math.floor(Date.now() / 1000);
    updateHistoryChart(chart, now - week);
  });
  $('#optDayScatter').on('change', function () {
    let now = Math.floor(Date.now() / 1000);
    updateHistoryChart(chart, now - day);
  });
  $('#optHourScatter').on('change', function () {
    let now = Math.floor(Date.now() / 1000);
    updateHistoryChart(chart, now - twoHr);
  });
}
