describe("Vote", function() {

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
