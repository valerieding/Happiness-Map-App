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
      //var elapsed = new Date().getTime() / 1000 - 1000;
      expect(timeSince(234523)).toEqual('~15 days ago');
      expect(timeSince(523451)).toEqual('~12 days ago');
      expect(timeSince(345235)).toEqual('~14 days ago');
    });
  });

  describe("Welcome Test",function(){
    //testing the testing infrastructure with an easy test
    it("should return greeting based on what last vote was", function(){
      expect(welcomeText(1)).toEqual('<h4 style=\"color:SlateBlue; text-align:left;\">1/5?!?! Why are you so sad?</h4>');
      expect(welcomeText(2)).toEqual('<h4 style=\"color:DodgerBlue; text-align:left;\">2/5? Tell us why you\'re feeling blue...</h4>');
      expect(welcomeText(3)).toEqual('<h4 style=\"color:Orange; text-align:left;\">Keep your chin up, and tell us why you feel so 3 right now...</h4>');
      expect(welcomeText(4)).toEqual('<h4 style=\"color:Yellow; text-align:left;\">4/5? Nice! Tell us why...</h4>');
      expect(welcomeText(5)).toEqual('<h4 style=\"color:MediumSeaGreen; text-align:left;\">A perfect 5? You\'re too happy. Tell us why...</h4>');
      // expect(welcomeText(0)).toEqual('Vote first, then post!');
      // expect(welcomeText(0)).toEqual('Vote first, then post!');
    });
  });

  describe("call react Test",function(){
    //testing the testing infrastructure with an easy test
    it("should return upvote() or downvote() depending on type of react", function(){
      //insure upvote works
      expect(callReact('upvote',3)).toEqual('success: upvote');
      // downvote
      expect(callReact('downvote',3)).toEqual('success: downvote');
      // based on the flag returns right recent or trending
      expect(callReact('uh oh',"sdf",0)).toEqual('recents');
      expect(callReact('uh oh',"",0)).toEqual('recents');
      expect(callReact('uh oh',"",1)).toEqual('trending');
      // expect(timeConverter(423)).toEqual('Hello World');
      // expect(timeConverter(423)).toEqual('Hello World');
    });
  });

  describe("makeRow test function",function(){
    //testing the testing infrastructure with an easy test
    it("should return the right row type", function(){
      //depending on the flag it should either 
      // have 5 columns
      expect(makeRow("oh boy",0)).toEqual('<tr><td>NaN</td><td>message</td><td>location</td><td>time</td><td>upvote downvote</td></tr>');
      // have 6 columns
      expect(makeRow("oh boy",1)).toEqual('<tr><td>NaN</td><td>message</td><td>location</td><td>time</td><td>upvote downvote</td><td> remove post </td></tr>');
    });
  });

  describe("getTrending test function",function(){
    //testing the testing infrastructure with an easy test
    it("this only returns the arguments that getTrendingPosts() would call so to show it works. the actual function is tested on backside", function(){
      //depending on the flag it should either 
      // if from reg, now,  stat page
      expect(getTrending("Reg",0,1)).toEqual('/request/get_trending_personal_posts Reg undefined');
      // from reg, now, board page
      expect(getTrending("Reg",0,0)).toEqual('/request/get_trending_posts Reg undefined');
      // from crerar, x time, board page
      expect(getTrending("Crerar",1234,0)).toEqual('/request/get_trending_posts Crerar 1234');
    });
  });

  describe("getRecents test function",function(){
    //testing the testing infrastructure with an easy test
    it("this only returns the arguments that getRecentsPosts() would call so to show it works. the actual function is tested on backside", function(){
      //depending on the flag it should either 
      // if from reg, now,  stat page
      expect(getRecents("Reg",0,1)).toEqual('/request/get_recents_personal_posts Reg undefined');
      // from reg, now, board page
      expect(getRecents("Reg",0,0)).toEqual('/request/get_recents_posts Reg undefined');
      // from crerar, x time, board page
      expect(getRecents("Crerar",1234,0)).toEqual('/request/get_recents_posts Crerar 1234');
    });
  });



});
