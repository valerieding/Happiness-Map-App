describe("Vote", function() {

	// Quads
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

	// tests for voteMapScript functions that are easily testable outside of Google Maps API
	// Many of the interactive map functions rely extensivley on Google Maps API and be assumed
	// to work, taking Google Maps API as a black-box
	// These functions can still be tested using the Acceptance Testing scenarios
	
	describe("quad tests", function(){
	    
		
		it("isQuad() tests", function()
		{
			
			expect(isQuad(p1)).toEqual(false);
			expect(isQuad(p2)).toEqual(false);
			expect(isQuad(p3)).toEqual(true);
			expect(isQuad(p4)).toEqual(true);
			expect(isQuad(p5)).toEqual(true);
			expect(isQuad(p6)).toEqual(false);

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




  	let lat6 = 41.784113073154535;
	let lat7 = 41.784113073154540;
	let lat8 = 41.790;
	let lat9 = 41.79494425609070;
	let lat10 = 41.79494425609072;

	let lng6 = -87.59028196334838;
	let lng7 = -87.59028196334840;
	let lng8 = -87.591;
	let lng9 = -87.60500192642211;
	let lng10 = -87.60500192642213;

	let p7 = {lat: lat6, lng: lng6};
	let p8 = {lat: lat7, lng: lng6};
	let p9 = {lat: lat7, lng: lng7};
	let p10 = {lat: lat8, lng: lng8};
	let p11 = {lat: lat8, lng: lng6};
	let p12 = {lat: lat10, lng: lng8};
	let p13 = {lat: lat9, lng: lng9};


  	describe("onCampus() tests", function(){
	    
		
		it("isOnCampus() tests", function()
		{
			expect(isOnCampus(p7)).toEqual(false);
			expect(isOnCampus(p8)).toEqual(false);
			expect(isOnCampus(p9)).toEqual(true);
			expect(isOnCampus(p10)).toEqual(true);
			expect(isOnCampus(p11)).toEqual(false);
			expect(isOnCampus(p12)).toEqual(false);
			expect(isOnCampus(p13)).toEqual(true);

			expect(isOnCampus({lat: 41.7881, lng: -87.599})).toEqual(true);
				// true, lat and lng both in campus boundaries
			expect(isOnCampus({lat: 41.7881, lng: -87.62})).toEqual(false);
				// false, lng out of campus boundaries
			expect(isOnCampus({lat: 42, lng: -87.599})).toEqual(false);
				// false, lat out of campus boundaries
			expect(isOnCampus({lat: 42, lng: -90})).toEqual(false);
				// false, boht lat, lng outside of campus boundaries
		});
  	});
	

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
