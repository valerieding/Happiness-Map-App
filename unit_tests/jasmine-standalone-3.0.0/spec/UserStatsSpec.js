describe("User Stats Tests", function(){


  describe("intToDay()", function(){
    it("should convert from an integer [0:6] to a day of the week string " +
        " which should be useful for labeling the graph with data from the database", function(){
      expect(intToDay(0)).toEqual("Saturday");
      expect(intToDay(1)).toEqual("Monday");
      expect(intToDay(6)).toEqual("Saturday");
      expect(intToDay(-1)).toEqual("");
      expect(intToDay(7)).toEqual("");
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
