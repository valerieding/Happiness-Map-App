describe("Hello World", function(){

   it("should Return Hello world",function(){
      expect(helloworld()).toEqual('Hello World');
   });

   let mansueto = {name: "Mansueto Library", val: "happiest"};
   //console.log(getInfo(mansueto));
/*   it("should Return mansueto label", function(){
     expect(getInfo(mansueto))
      .toEqual('<h3>Mansueto Library</h3><h4>happiest</h4>');
   });
*/
});



/*
test ideas

database queries will return a logical location with an avg. score (1-10)
test cases for query results
firstCase = [];
secondCase = [{logical-loc: 'bj', average: 6.1}];
thirdCase = [{logical-loc: 'mansueto', average: 6.7},
  {logical-loc: 'regenstein', average: 3.4},
  {logical-loc: 'reynolds', average: 8.7},
  {logical-loc: 'harper', average: 7.0},
  {logical-loc: 'maxp', average: 7.0}
  {logical-loc: 'booth', average: 0}];


test the getInfo function
let mansueto = {name: "Mansueto Library", val: "happiest"};
let bartlett = {name: "Barlett Dining Commons", val: "happy"};
getInfo(mansueto) = "<h3>Mansueto Library</h3><h4>happiest</h4>"
getInfo(bartlett) = "<h3>Barlett Dining Commons</h3><h4>happy</h4>"
getInfo(null) = null;

test the ColorKey
ColorKey[dic["mansueto"].val] = "#182825"
ColorKey["neutral"] = "#E8E1EF"
ColorKey["none"] = "#767676"

test mapping of logical-locs in database to fullnames
getName(thirdCase[0]) = "Mansueto Library"
getName(thirdCase[1]) = "Regenstein Library"
getName(secondCase[0]) = "Burton Judson Courts"
getName(thirdCase[4]) = "Max Palevsky Commons"

test function to calculate happiness text
getHappinessRating(thirdCase[4]) = "happy"
getHappinessRating(secondCase[0]) = "happy"
getHappinessRating(thirdCase[2]) = "happiest"
getHappinessRating(thirdCase[1]) = "sad"
getHappinessRating(thirdCase[5]) = "none";









*/
