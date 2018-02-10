describe("Map Tests", function(){

   it("should Return Hello world",function(){
      expect(helloworld()).toEqual('Hello World');
   });

   //example returns from database queries
   let firstCase = [];
   let secondCase = [{logicalloc: 'bj', average: 6.1}];
   let thirdCase = [{logicalloc: 'regenstein', average: 3.4},
     {logicalloc: 'mansueto', average: 6.7},
     {logicalloc: 'reynolds', average: 8.7},
     {logicalloc: 'harper', average: 7.0},
     {logicalloc: 'maxp', average: 7.0},
     {logicalloc: 'booth', average: 0}];

   //example returns from databaseToMapObj()
   let mansueto = {name: "Mansueto Library", val: "happiest"};
   let bartlett = {name: "Bartlett Dining Commons", val: "sad"};
   let bj = {name: "Burton Judson Courts", val: "happy"};
   let booth = {name: "Booth School", val: null};

   it("databaseToMapObj tests", function(){
       expect(databaseToMapObj(thirdCase[1])).toEqual(mansueto);
       expect(databaseToMapObj(secondCase[0])).toEqual(bj);
       expect(databaseToMapObj(secondCase[5])).toEqual(booth);
       expect(databaseToMapObj(secondCase[5]).val).toBeNull();
   });

   it("getName tests", function(){
     expect(getName(secondCase[0])).toEqual("Burton Judson Courts");
     expect(getName(thirdCase[0])).toEqual("Regenstein Library");
     expect(getName(thirdCase[1])).toEqual("Mansueto Library");
   });

   it("getHappinessRating tests", function(){
     expect(getHappinessRating(secondCase[0])).toEqual("happy");
     expect(getHappinessRating(thirdCase[1])).toEqual("sad");
     expect(getHappinessRating(thirdCase[2])).toEqual("happiest");
     expect(getHappinessRating(thirdCase[4])).toEqual("happy");
     expect(getHappinessRating(thirdCase[5])).toBeNull();
   });

   it("getInfo tests", function(){
     expect(getInfo(mansueto)).toEqual("<h3>Mansueto Library</h3><h4>happiest</h4>");
     expect(getInfo(bartlett)).toEqual("<h3>Bartlett Dining Commons</h3><h4>sad</h4>");
   });

   it("computeColor tests", function(){
     expect(computeColor(mansueto)).toEqual("#182825");
     expect(computeColor(bartlett)).toEqual("#D0B8AC");
     expect(computeColor(bj)).toEqual("#CAE7B9");
   });

});
