var dateCallback = function(value, index, values) {
    let temp = new Date(1000 * value).toDateString();
    return temp;
}
var timeCallback = function(value, index, values) {
    let temp = new Date(1000 * value).toLocaleTimeString();
    return temp;
}


var chart = makeHistoryChart({
    stepSize: 60*60*24,
    callback: dateCallback,
  }, null);
var weekChart = makeWeekChart();
var timeChart = makeTimeChart();
setScatterButtonFunctions();


setUpMapPersonal();
setButtonFunctions(getAllBuildingScoresByUser);


async function getVoteHistory(start_time) {
  var myScores;
  if (!start_time) {
    start_time = 0;
  }
  try {
    myScores = await $.ajax({
      url: '/request/get_recent_votes',
      type: 'post',
      dataType: 'json',
      data: {'start_time': start_time},
      success: function(data){
        myScores = data;
      }
    });
    return myScores;
  } catch(error) {
    console.error(error);
  }
}

async function getVoteByDayOfWeek() {
  var myScores;
  try {
    myScores = await $.ajax({
      url: '/request/get_personal_votes_by',
      type: 'post',
      dataType: 'json',
      data: {'group_by': 'dow'},
      success: function(data){
        myScores = data;
      }
    });
    return myScores;
  } catch(error) {
    console.error(error);
  }
}

async function getVoteByTimeOfDay() {
  var myScores;
  try {
    myScores = await $.ajax({
      url: '/request/get_personal_votes_by',
      type: 'post',
      dataType: 'json',
      data: {'group_by': 'tod'},
      success: function(data){
        myScores = data;
      }
    });
    return myScores;
  } catch(error) {
    console.error(error);
  }
}

async function makeHistoryChart(ticks, start_time) {
  var voteHistory = await getVoteHistory(start_time);
  if (voteHistory.length <= 2) {
    document.getElementById("userVotesOverTime").style.display="none";
    document.getElementById("warningNotEnoughInfo").innerHTML = "Not Enough Data to Display"
    return;
  }
  document.getElementById("userVotesOverTime").style.display="block";
  document.getElementById("warningNotEnoughInfo").innerHTML = "";
  var voteHistory2 = [];
  for (var i = 0; i < Math.min(60, voteHistory.length); i++) {
    let x = new Date(1000 * voteHistory[i].timestamp).toDateString();
    voteHistory2.push({
      x: voteHistory[i].timestamp,
      y: voteHistory[i].happiness_level});
  }

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
          data: voteHistory2
        }]
      },
      options: {
          scales: {
              xAxes: [{
                  type: 'linear',
                  position: 'bottom',
                  ticks: ticks
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

async function makeWeekChart() {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let dayScores = [0, 0, 0, 0, 0, 0, 0];
  let dayData = await getVoteByDayOfWeek();
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

async function makeTimeChart() {
  let timeData = await getVoteByTimeOfDay();
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


function setScatterButtonFunctions() {
  $('#optAllScatter').on('change', function () {
    let ticks = {
        stepSize: 60*60*24,
        callback: dateCallback
    };
    makeHistoryChart(ticks, null);
  });
  $('#optWeekScatter').on('change', function () {
    let now = Math.floor(Date.now() / 1000);
    let ticks = {
        stepSize: 60*60*24,
        callback: dateCallback
    };
    makeHistoryChart(ticks, -week);
  });
  $('#optDayScatter').on('change', function () {
    let now = Math.floor(Date.now() / 1000);
    let ticks = {
        stepSize: 60*60,
        callback: timeCallback
    };
    makeHistoryChart(ticks, -day);
  });
  $('#optHourScatter').on('change', function () {
    let now = Math.floor(Date.now() / 1000);
    let ticks = {
        stepSize: 60,
        callback: timeCallback
    };
    makeHistoryChart(ticks, -twoHr);
  });
}
