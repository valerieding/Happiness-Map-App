describe("User Stats Tests", function(){


  describe("Vote stats processing functions", function(){
    describe("processHistoryData()", function(){
      it("should take in a get_recent_votes query and returns a [x,y]" +
          " dataset for the line plot", function(){
            let votes = [
            {happiness_level: 5,
             location: {address: null, latitude: null, logical_location: "saieh", longitude: null},
             timestamp: 1519944800},
            {happiness_level: 4,
             location: {address: null, latitude: null, logical_location: "saieh", longitude: null},
             timestamp: 1519944900},
            {happiness_level: 3,
             location: {address: null, latitude: null, logical_location: "saieh", longitude: null},
             timestamp: 1519944970},
            {happiness_level: 2,
             location: {address: null, latitude: null, logical_location: "saieh", longitude: null},
             timestamp: 1519944980}
            ]
            expect(processHistoryData(votes)).toEqual([
              { x: 1519944800, y: 5 },
              { x: 1519944900, y: 4 },
              { x: 1519944970, y: 3 },
              { x: 1519944980, y: 2 }
            ]);
            expect(processHistoryData([])).toEqual([]);
      });
    });

    describe("processWeekData()", function(){
      it("should take in a get_personal_votes_by query for day of week and returns" +
          " a day of week dataset for a bar chart", function(){
            let votes = {Friday: 3.7142857142857144, Monday: 1, Saturday: 4.2, Sunday: 5};
            expect(processWeekData(votes)).toEqual([
              [5, 1, 0, 0, 0, 3.71, 4.2],
              ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            ]);
            expect(processWeekData({})).toEqual([
              [0, 0, 0, 0, 0, 0, 0],
              ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            ]);
      });
    });

    describe("processTimeData()", function(){
      it("should take in a get_personal_votes_by query for day of week and returns" +
          " a day of week dataset for a bar chart", function(){
            let votes = {0: 3, 1: 1, 12: 2.5, 16: 3.3333333333333335, 21: 5, 22: 4, 23: 4};
            expect(processTimeData(votes)).toEqual([
              [3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2.5, 0, 0, 0, 3.33, 0, 0,
                0, 0, 5, 4, 4],
              ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM',
               '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM',
               '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM' ]
            ]);
            expect(processTimeData({})).toEqual([
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0],
              ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM',
               '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM',
               '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM' ]
            ]);
      });
    });
  });

	let votes1 = [];
	let votes2 = [2];
	let votes3 = [-1];
	let votes4 =[10];
	let votes5 = [2.3];
	let votes6 = [1,2,3,-5,4];


	// tests for version of calcAvgVote() function that is easily testible without
	// needing to make asynchronous queries during testing
	// calcAvgVote() can still be tested with Acceptance Testing scenarios
  
	describe("calcAvgVote()", function(){
		it("should return the average of a given list of happiness votes (integers 1-5)" +
		   "If any invalid happiness votes are found, return average of any valid votes",
		function(){
			expect(calcAvgVote(votes1).toEqual(0));
				// valid, no votes
				// In final implementation, voting page will immediately load
				// If user visits the 'Stats' page prior to voting, this will be their avg vote
			expect(calcAvgVote(votes2).toEqual(2));
				// valid, 0 < happiness_level <= 5
			expect(calcAvgVote(votes3)).toEqual(0);
				// invalid, 0 < happiness_level <= 5
			expect(calcAvgVote(votes4)).toEqual(0);
				// invalid, 0 < happiness_level <= 5
			expect(calcAvgVote(votes5)).toEqual(0);
				// invalid, happiness_level must be an integer
			expect(calcAvgVote(votes6)).toEqual(2.5);
				// valid, average of [1,2,3,4] is 2.5
		});
	});
});
