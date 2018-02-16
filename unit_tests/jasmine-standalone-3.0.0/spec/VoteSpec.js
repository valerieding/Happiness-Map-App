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

	//example returns from nameToMapObject()
    let reg = {logical: "Regenstein Library", raw_happy: 100, num_votes: 100};
    let harper = {name: "Harper Memorial Library", raw_happy: 200, num_votes: 50};
    let crerar = {name: "Crerar Library", raw_happy: 300, num_votes: -300};
    let ryerson= {name: "Ryerson Hall", raw_happy: 0, num_votes: 100};
    let nonsense = {};
    let noname = {name: "", raw_happy: 1, num_votes: 1};

    // example votes
	let testvote1 = [{uid: 1, happiness_level: 5, location: "Regenstein Library"}];
	let testvote2 = [{uid: -1, happiness_level: 1, location: "Harper Memorial Library"}];
	let testvote3 = [{uid: 1, happiness_level: 10, location: "Regenstein Library"}];	
	let testvote4 = [{uid: 1, happiness_level: -10, location: "Ryerson Hall"}];
	let testvote5 = [{uid: 1, happiness_level: 3, location: ""}];
	let testvote6 = [{uid: 1, happiness_level: 1, location: "asdf"}];


	it("nameToMapObject tests", function()
	{
		expect(nameToMapObject("Regenstein Library")).toEqual(reg);
			// name corresponds to a map object
		expect(nameToMapObject("asdf")).toBeNull();
			// there is no map object with that name
		expect(nameToMapObject("")).toBeNull();
			// must specify a name
		expect(nameToMapObject("nonsense")).toBeNull();
			// name corresponds to improperly formatted map object
	});

	it("getLocAvg tests", function()
	{
		expect(getLocAvg(reg)).toEqual(1.0);
			// provided properly formatted location object
		expect(getLocAvg(harper)).toEqual(4.0);
		expect(getLocAvg(ryerson)).toBeNull();
			// improperly formatted location object: raw_happy must at least equal num_votes
		expect(getLocAvg(crerar)).toBeNull();
			// num_votes must be positive
		expect(getLocAvg(noname)).toBeNull();
			// locations must have specified names
		expect(getLocAvg(nonsense)).toBeNull();
			// expects properly formatted location object
	});

	it("addvote tests", function()
	{
		expect(addvote(testvote2)).toEqual(false);
			// uid must be positive
		expect(addvote(testvote4)).toEqual(false);
			// happiness level must be between 1 and 5
		expect(addvote(testvote5)).toEqual(false)
			// must specify a location
		expect(addvote(testvote6)).toEqual(false);
			// must specify extant location

		expect(addvote(testvote1)).toEqual(true);
			// valid uid, happiness level, location
		expect(getLocAvg(reg)).toBeEqual(1.04);
			// building average updates
		expect(addvote(testvote3)).toEqual(false);
			// happiness level must be between 1 and 5 
		expect(getLocAvg(reg)).toBeEqual(1.04);
			// unchanged from testvote1
	});

});
