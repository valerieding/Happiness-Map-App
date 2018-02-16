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
      expect(timeConverter(423)).toEqual('Hello World');
      expect(timeConverter(423)).toEqual('Hello World');
      expect(timeConverter(423)).toEqual('Hello World');
    });
  });

  describe("Welcome Test",function(){
    //testing the testing infrastructure with an easy test
    it("should return greeting based on what last vote was", function(){
      expect(timeConverter(423)).toEqual('Hello World');
      expect(timeConverter(423)).toEqual('Hello World');
      expect(timeConverter(423)).toEqual('Hello World');
    });
  });

  describe("call react Test",function(){
    //testing the testing infrastructure with an easy test
    it("should return upvote() or downvote() depending on type of react", function(){
      expect(timeConverter(423)).toEqual('Hello World');
      expect(timeConverter(423)).toEqual('Hello World');
      expect(timeConverter(423)).toEqual('Hello World');
    });
  });



   // it("should Return Hello world",function(){
   //    expect(helloworld()).toEqual('Hello World');
   // });

   // let testpost1 = [];
   // let testpost2 = [{post_id: 1,vote_id: 2, reply_to: 0, uid: 123, time: 1000, message: "test post"}];
   // let testpost3 = [{post_id: 1,vote_id: 2, reply_to: 0, uid: 123, time = 0, message: "dup"},
   //  {post_id: 1,vote_id: 2, reply_to: 0, uid: 123, message: "dup"}];
   // let testpost4 = [{post_id: 2,vote_id: 4, reply_to: 1, uid: 789, time: 1, message: "newer test post"}];

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

   // it("get recent posts tests", function(){
   //   addpost(testpost2);
   //   addpost(testpost4);

   //   expect(get_recent_posts()).toEqual([{post_id: 2,vote_id: 4, reply_to: 1, uid: 789, time: 1, message: "newer test post"},
   //    {post_id: 1,vote_id: 2, reply_to: 0, uid: 123, time = 1000, message: "test post"}]);
   //   // if clicked again will sort in reverse so that oldest is on top
   //   expect(get_recent_posts()).toEqual([{post_id: 1,vote_id: 2, reply_to: 0, uid: 123, time = 1000, message: "test post"},
   //    {post_id: 2,vote_id: 4, reply_to: 1, uid: 789, time: 1, message: "newer test post"}]);
   //   // go back to newest on top
   //   expect(get_recent_posts()).toEqual([{post_id: 2,vote_id: 4, reply_to: 1, uid: 789, time: 1, message: "newer test post"},
   //    {post_id: 1,vote_id: 2, reply_to: 0, uid: 123, time = 1000, message: "test post"}]);
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
