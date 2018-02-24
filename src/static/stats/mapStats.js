setUpMapPersonal();
//setButtonFunctions(getAllBuildingScores);


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

var voteHistory = getUsersVotes(null);
var voteHistory2 = [];

var i = 0;
for (; i < Math.min(100, voteHistory.length); i++) {
  let x = new Date(1000 * voteHistory[i].timestamp).toDateString();
  voteHistory2.push({
    x: voteHistory[i].timestamp,
    y: voteHistory[i].happiness_level});
}
console.log(voteHistory2);


var ctx = document.getElementById('userVotesOverTime').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'scatter',

    // The data for our dataset
    data: {
      datasets: [{
        label: "Votes Over Time",
        backgroundColor: '#DD1C77',
        data: voteHistory2
      }]
    },

    // Configuration options go here
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
