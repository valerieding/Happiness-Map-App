describe("User Stats Tests", function(){

  describe("intToDay tests", function(){
    it("should convert from an integer [0:6] to a day of the week string " +
        " which should be useful for labeling the graph with data from the database", function(){
      expect(intToDay(0)).toEqual("Saturday");
      expect(intToDay(1)).toEqual("Monday");
      expect(intToDay(6)).toEqual("Saturday");
      expect(intToDay(-1)).toEqual("");
      expect(intToDay(7)).toEqual("");
    });
  });

});
