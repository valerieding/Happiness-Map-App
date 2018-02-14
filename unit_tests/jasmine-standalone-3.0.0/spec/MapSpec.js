describe("Map Tests", function(){
  /* Testing Strategy */
  /* We need to test all of the functions in mapFunctions.js
  * The general strategy for the map page is to query the database, convert
  * the results into "map objects", and use this information to render the
  * visualization.
  * All other mapping files are used for rendering the visual components
  * of the map page and so they are not included in this test suite.
  * They can be evaluated visually by running the server, visiting the map
  * page and visually inspecting the contents.
  */
  describe("test infrastructure tests",function(){
    //testing the testing infrastructure with an easy test
    it("should return Hello World", function(){
      expect(helloworld()).toEqual('Hello World');
    });
  });


  // example returns from database queries
  // for a diverse test set, includes max and min scores (1 and 5), integers,
  // floats, and truncated floats. covers all 5 happiness categories.
  // tests database returns of size 0, 1, and many. (database returns contain as
  // many entries as buildings which have been voted at)
  let firstCase = [];
  let secondCase = [{happiness_level: 2.8, logical_location: "ratner"}];
  let thirdCase = [{happiness_level: 5, logical_location: "alumni"},
    {happiness_level: 1, logical_location: "bartlett"},
    {happiness_level: 4.25, logical_location: "bj"},
    {happiness_level: 3.25, logical_location: "booth"},
    {happiness_level: 2, logical_location: "cathey"},
    {happiness_level: 3.4285714285714284, logical_location: "classicsBuilds"}];

  // example returns from allMapObjects() (truncated)
  // for a diverse test set, includes max and min scores (1 and 5), integers,
  // floats, truncated floats, and empty map objects (when no data is available)
  let thirdCaseObjs = Object.freeze({
    alumni: {id: "alumni", score: 5, fullname: "Alumni House",
      color: "#bd0026", rating: "very happy"},
    bartlett: {id: "bartlett", score: 1, fullname: "Bartlett Dining Commons",
      color: "#ffffb2", rating: "very unhappy"},
    bj: {id: "bj", score: 4.25, fullname: "Burton Judson Courts",
      color: "#f03b20", rating: "happy"},
    bond: {id: "bond", score: "n/a", fullname: "Bond Chapel",
      color: "#ADADAD", rating: "no data available"},
    bookstore: {id: "bookstore", score: "n/a", fullname: "University Bookstore",
      color: "#ADADAD", rating: "no data available"},
    booth: {id: "booth", score: 3.25, fullname: "Booth School of Business",
      color: "#fd8d3c", rating: "neutral"},
    cathey: {id: "cathey", score: 2, fullname: "Cathey Dining Commons",
      color: "#fecc5c", rating: "unhappy"},
    classicsBuilds: {id: "classicsBuilds", score: 3.43, fullname: "Classics Quad Buildings",
      color: "#fd8d3c", rating: "neutral"}});

  let ratnerObj = {id: "ratner", score: 2.8, fullname: "Ratner Athletics Center",
    color: "#fecc5c", rating: "unhappy"}


  describe("databaseToMapObj tests", function(){
    it("should return the appropriate map object" +
      " for any entry from a get_heatmap call", function() {
      expect(databaseToMapObj(thirdCase[0])).toEqual(thirdCaseObjs['alumni']);
      expect(databaseToMapObj(thirdCase[1])).toEqual(thirdCaseObjs['bartlett']);
      expect(databaseToMapObj(thirdCase[2])).toEqual(thirdCaseObjs['bj']);
      expect(databaseToMapObj(thirdCase[3])).toEqual(thirdCaseObjs['booth']);
      expect(databaseToMapObj(thirdCase[4])).toEqual(thirdCaseObjs['cathey']);
      expect(databaseToMapObj(thirdCase[5])).toEqual(thirdCaseObjs['classicsBuilds']);
    });
  });
  describe("emptyMapObj tests", function(){
    it("should return empty map objects when given a valid logical_location", function(){
      expect(emptyMapObj('bookstore')).toEqual(thirdCaseObjs['bookstore']);
      expect(emptyMapObj('bond')).toEqual(thirdCaseObjs['bond']);
    });
  });

  describe("allMapObjects tests", function(){
    it("should return dictionaries of all map objects. should all " +
      "be the same length with entries for all logical_locations, regardless " +
      "of the input size. should contain the correct scores, colors, " +
      "full names etc.", function(){
      let lengthOfAllBuildings = Object.keys(FullNameKey).length;
      let firstRes = allMapObjects(firstCase);
      expect(Object.keys(firstRes).length).toEqual(lengthOfAllBuildings);
      expect(firstRes['alumni']).toEqual(emptyMapObj('alumni'));
      expect(firstRes['ratner']).toEqual(emptyMapObj('ratner'));
      let secondRes = allMapObjects(secondCase);
      expect(Object.keys(secondRes).length).toEqual(lengthOfAllBuildings);
      expect(secondRes['alumni']).toEqual(emptyMapObj('alumni'));
      expect(secondRes['ratner']).toEqual(ratnerObj);
      let thirdRes = allMapObjects(thirdCase);
      expect(Object.keys(thirdRes).length).toEqual(lengthOfAllBuildings);
      expect(thirdRes['alumni']).toEqual(thirdCaseObjs['alumni']);
      expect(thirdRes['bartlett']).toEqual(thirdCaseObjs['bartlett']);
      expect(thirdRes['bond']).toEqual(thirdCaseObjs['bond']);
      expect(thirdRes['classicsBuilds']).toEqual(thirdCaseObjs['classicsBuilds']);
    });
  });

  describe("getInfo tests", function(){
    it("should return the html formatted string with the building's happiness " +
      "for use in the region-card", function(){
      expect(getInfo(thirdCaseObjs['alumni'])).toEqual("very happy<br>building happiness: 5");
      expect(getInfo(thirdCaseObjs['bartlett'])).toEqual("very unhappy<br>building happiness: 1");
      expect(getInfo(thirdCaseObjs['bj'])).toEqual("happy<br>building happiness: 4.25");
      expect(getInfo(thirdCaseObjs['bond'])).toEqual("no data available<br>building happiness: n/a");
      expect(getInfo(thirdCaseObjs['cathey'])).toEqual("unhappy<br>building happiness: 2");
      expect(getInfo(thirdCaseObjs['classicsBuilds'])).toEqual("neutral<br>building happiness: 3.43");
    });
  });

  describe("getName tests", function(){
    it("should return the fullname for any logical_location " +
      "in the FullNameKey", function(){
      expect(getName(secondCase[0])).toEqual("Ratner Athletics Center");
      expect(getName(thirdCase[0])).toEqual("Alumni House");
      expect(getName(thirdCase[3])).toEqual("Booth School of Business");
    });
  });

  describe("getHappinessRating tests", function(){
    it("should return the happiness rating (a text label) for any entry " +
      "from a get_heatmap call", function(){
      expect(getHappinessRating(secondCase[0])).toEqual("unhappy");
      expect(getHappinessRating(thirdCase[0])).toEqual("very happy");
      expect(getHappinessRating(thirdCase[1])).toEqual("very unhappy");
      expect(getHappinessRating(thirdCase[2])).toEqual("happy");
      expect(getHappinessRating(thirdCase[4])).toEqual("unhappy");
      expect(getHappinessRating(thirdCase[5])).toEqual("neutral");
    });
  });

  describe("computeColor tests", function(){
    it("should return the appropriate color in hex for any entry " +
      "from a get_heatmap call", function(){
      expect(computeColor(secondCase[0])).toEqual("#fecc5c");
      expect(computeColor(thirdCase[0])).toEqual("#bd0026");
      expect(computeColor(thirdCase[1])).toEqual("#ffffb2");
      expect(computeColor(thirdCase[2])).toEqual("#f03b20");
      expect(computeColor(thirdCase[3])).toEqual("#fd8d3c");
      expect(computeColor(thirdCase[4])).toEqual("#fecc5c");
      expect(computeColor(thirdCase[5])).toEqual("#fd8d3c");
    });
  });

  describe("formatScore tests", function(){
    it("should return a formatted score when given a building average rating " +
      "(truncates to 2 decimals)", function(){
      expect(formatScore(1)).toEqual(1);
      expect(formatScore(4.25)).toEqual(4.25);
      expect(formatScore(3.4285714285714284)).toEqual(3.43);
      expect(formatScore(2.71111)).toEqual(2.71);
    });
  });

});
