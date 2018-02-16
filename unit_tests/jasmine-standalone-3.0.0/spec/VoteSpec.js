describe("Vote", function() {

	describe("quad tests", function(){
    //testing the testing infrastructure with an easy test
    let lat1 = 41.7880849860361;
	let lat2 = 41.7880849860363;
	let lat3 = 41.789;
	let lat4 = 41.7900248540437;
	let lat5 = 41.7900248540439;

	let lng1 = -87.59810328483581;
	let lng2 = -87.59810328483583;
	let lng3 = -87.599;
	let lng4 = -87.60076940059661;
	let lng5 = -87.60076940059663;
	
	let p1 = {lat: lat1, lng: lng1};
	let p2 = {lat: lat1, lng: lng3};
	let p3 = {lat: lat2, lng: lng2};
	let p4 = {lat: lat3, lng: lng3};
	let p5 = {lat: lat3, lng: lng4};
	let p6 = {lat: lat3, lng: lng5};
	
	it("isOnQuad() tests", function()
	{
		expect(isQuad(p1)).toEqual(false);
		expect(isQuad(p2)).toEqual(false);
		expect(isQuad(p3)).toEqual(true);
		expect(isQuad(p4)).toEqual(true);
		expect(isQuad(p5)).toEqual(true);
		expect(isQuad(p6)).toEqual(false);
	});
  });



















	it("should Return Hello world", function(){
		expect(helloworld()).toEqual('Hello World');
	});

	// tests for voteMapScript functions that are easily testable outside of Google Maps API
	// Many of the interactive map functions rely extensivley on Google Maps API and be assumed
	// to work, taking Google Maps API as a black-box
	// These functions can still be tested using the Acceptance Testing scenarios

	/* Jasmine doesn't work well with asynchronous requests. Use Acceptance Tests to test isQuad and isOnCampus 
	describe("isQuad tests", function(){
		it("should resolve given latitude, longitude to UChicago Quad area", function(){
			expect(isQuad({lat: 41.7881, lng: -87.599})).toEqual(true);
				// true, lat and lng both in quad boundaries
			expect(isQuad({lat: 41.7881, lng: -87.62})).toEqual(false);
				// false, lng out of quad boundaries
			expect(isQuad({lat: 42, lng: -87.599})).toEqual(false);
				// false, lat out of quad boundaries
			expect(isQuad({lat: 42, lng: -90})).toEqual(false);
				// false, boht lat, lng outside of Quad boundaries
		});
	});

	describe("isOnCampus tests", function(){
		it("should resolve given latitude, longitude to UChicago campus area", function(){
			var coords = LatLng(lat: 41.7881, lng: -87.599);
			expect(isQuad(coords)).toEqual(true);
			/*
			expect(isQuad({lat: 41.7881, lng: -87.599})).toEqual(true);
				// true, lat and lng both in campus boundaries
			expect(isQuad({lat: 41.7881, lng: -87.62})).toEqual(false);
				// false, lng out of campus boundaries
			expect(isQuad({lat: 42, lng: -87.599})).toEqual(false);
				// false, lat out of campus boundaries
			expect(isQuad({lat: 42, lng: -90})).toEqual(false);
				// false, boht lat, lng outside of campus boundaries
				
		});
	});	
*/
	describe("toLogicalLoc tests", function(){
		it("should resolve address from Google Maps geolocating to" +
			"HappinessMap App standardized location name", function(){
			expect(toLogicalLoc('Rosenwald Hall')).toEqual('rosenwald');
			expect(toLogicalLoc('5737 S University Ave')).toEqual('east');
			expect(toLogicalLoc('')).toBeNull();
			expect(toLogicalLoc('asdf')).toBeNull();
		});
	});
	

	/* submitVote() submits data to the database via AJAX. Test submitVote() using Acceptance Tests
	describe("submitVote tests", function(){
		it("should submit votes with valid happiness leves and locations to database", function(){
			expect(submitVote("reg", "3")).toEqual(true);
				// valid vote
			expect(submitVote("reg", 0)).toEqual(false);
				// invalid vote, 0 < happy <= 5
			expect(submitVote("reg",10)).toEqual(false);
				// invalid vote, 0 < happy <= 5
			expect(submitVote("",3)).toEqual(false);
				// invalid vote, location must be nonempty
		});
	});
	*/

});
