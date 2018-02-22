describe("Message Board", function(){


  describe("test infrastructure tests",function(){
    //testing the testing infrastructure with an easy test
    it("should return Hello World", function(){
      expect(helloworld()).toEqual('Hello World');
    });
  });

  describe("test time function",function(){
    //testing the testing infrastructure with an easy test
    it("should return proper time format", function(){
      expect(timeSince(423)).toEqual('~48 years ago');
      expect(timeSince(48008395)).toEqual('~47 years ago');
      expect(timeSince(429913293)).toEqual('~35 years ago');
    });
  });

  describe("Welcome Test",function(){
    //testing the testing infrastructure with an easy test
    it("should return greeting based on what last vote was", function(){
      expect(welcomeText(1)).toEqual('<h4 style=\"color:SlateBlue; text-align:left;\">1/5?!?! Why are you so sad?</h4>');
      expect(welcomeText(2)).toEqual('<h4 style=\"color:DodgerBlue; text-align:left;\">2/5? Tell us why you\'re feeling blue...</h4>');
      expect(welcomeText(3)).toEqual('<h4 style=\"color:Orange; text-align:left;\">Keep your chin up, and tell us why you feel so 3 right now</h4>');
      expect(welcomeText(4)).toEqual('<h4 style=\"color:Yellow; text-align:left;\">4/5? Nice! How come?</h4>');
      expect(welcomeText(5)).toEqual('<h4 style=\"color:MediumSeaGreen; text-align:left;\">You\'re too happy. Tell us why...</h4>');
      // expect(welcomeText(0)).toEqual('Vote first, then post!');
      // expect(welcomeText(0)).toEqual('Vote first, then post!');
    });
  });

  describe("call react Test",function(){
    //testing the testing infrastructure with an easy test
    it("should return upvote() or downvote() depending on type of react", function(){
      expect(callReact('upvote',3,2)).toEqual('success: upvote');
      expect(callReact('downvote',3,2)).toEqual('success: downvote');
      expect(callReact('uh oh',3,2)).toEqual('no react');
      // expect(timeConverter(423)).toEqual('Hello World');
      // expect(timeConverter(423)).toEqual('Hello World');
    });
  });


   let testpost1 = [];
   let testpost2 = [{post_id: 1,vote_id: 2, reply_to: 0, uid: 123, time: 1000, message: "test post",location:{logical_location: "Baker"}  }];
   let testpost3 = [{post_id: 1,vote_id: 2, reply_to: 0, uid: 123, time: 0, message: "dup", location:{logical_location: "Baker"} },
    {post_id: 1,vote_id: 2, reply_to: 0, uid: 123, message: "dup", location:{logical_location: "Baker"} }];
   let testpost4 = [{post_id: 2,vote_id: 4, reply_to: 1, uid: 789, time: 1, message: "newer test post", location:{logical_location: "REG"} }];
   let testpost5 = [{post_id: 1,vote_id: 2, reply_to: 0, uid: 123, time: 2, message: "test post",location:{logical_location: "Baker"}}];


 it("Iteration 2 unit test for filtering recent posts by logical location (more tests on backend):", function(){

     //will return only testpost4
     expect(get_recent_posts("REG")).toEqual([{post_id: 2,vote_id: 4, reply_to: 1, uid: 789, time: 1, message: "newer test post", location:{logical_location: "REG"} }]);
     //will return only testpost 2 (testpost3 is at "Baker", but is an invalid post)
     expect(get_recent_posts("BAKER")).toEqual([{post_id: 1,vote_id: 2, reply_to: 0, uid: 123, time: 1000, message: "test post",location:{logical_location: "Baker"}},{post_id: 1,vote_id: 2, reply_to: 0, uid: 123, time: 2, message: "test post",location:{logical_location: "Baker"}}]);
     //will return no posts; none have been made at CSIL
     expect(get_recent_posts("CSIL")).toEqual("");
   });


  it("Iteration 2 unit test for filtering recent posts by timestamp:", function(){

     //show testpost 4 and 5
     expect(get_recent_posts(0,2)).toEqual([{post_id: 2,vote_id: 4, reply_to: 1, uid: 789, time: 1, message: "newer test post", location:{logical_location: "REG"} },{post_id: 1,vote_id: 2, reply_to: 0, uid: 123, time: 2, message: "test post",location:{logical_location: "Baker"}}]);
     //only show testpost2 (time=1000)
     expect(get_recent_posts(500,1500)).toEqual([{post_id: 1,vote_id: 2, reply_to: 0, uid: 123, time: 1000, message: "test post",location:{logical_location: "Baker"}  }]);
     //no posts fall in this this time range
     expect(get_recent_posts(5000,5001)).toEqual("");

   });

   //    it("should Return Hello world",function(){
   //    expect(helloworld()).toEqual('Hello World');
   // });

   // it("addpost tests", function(){
   //    expect(addpost(testpost2)).toEqual(true);
   //      //empty post
   //    expect(addpost(testpost1)).toEqual(false);
   //      //double post
   //    expect(addpost(testpost3)).toEqual(false);
   //    expect(addpost(testpost4)).toEqual(true)
   // });

   // it("upvote and tests", function(){
   //   expect(upvote(9, 1)).toEqual(true);
   //   // cant double upvote something
   //   expect(upvote(9, 1)).toEqual(false);
   //   expect(upvote(10,1)).toEqual(true);
   //   // this will switch post to downvoted and not upvote
   //   expect(downvote(9,1)).toEqual(true);
   //   expect(downvote(9,1)).toEqual(false);
   //   // can go back to upvote
   //   expect(upvote(9,1)).toEqual(true);

   // });

  
   // it("get trending posts tests", function(){
   //   addpost(testpost2);
   //   addpost(testpost4);

   //   expect(get_trending_posts()).toEqual([{post_id: 2,vote_id: 4, reply_to: 1, uid: 789, time: 1, message: "newer test post"},
   //    {post_id: 1,vote_id: 2, reply_to: 0, uid: 123, time = 1000, message: "test post"}]);
   //   // if clicked again will sort in reverse so that least voted on is on top
   //   expect(get_trending_posts()).toEqual([{post_id: 1,vote_id: 2, reply_to: 0, uid: 123, time = 1000, message: "test post"},
   //    {post_id: 2,vote_id: 4, reply_to: 1, uid: 789, time: 1, message: "newer test post"}]);
   //   // go back to trending on top
   //   expect(get_trending_posts()).toEqual([{post_id: 2,vote_id: 4, reply_to: 1, uid: 789, time: 1, message: "newer test post"},
   //    {post_id: 1,vote_id: 2, reply_to: 0, uid: 123, time = 1000, message: "test post"}]);
   // });



});
