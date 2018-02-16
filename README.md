# Happiness-Map-App
## Instructions to run on localhost

1. Install python3, if you don't already have it installed
2. Install flask, wtforms, and coverage (on Mac, this is pip3 install flask, pip3 install wtforms, pip3 install coverage).
3. Navigate to the src directory, and run: python3 main.py --debug
4. Open a browser and navigate to "localhost:8000"

# 3.a) Unit Testing:

Running unit tests for backend:
1. Navigate to the src directory
2. Run "python3 test.py --coverage"
3. The terminal should print out the test coverage. Now, there should be a coverage_report directory in the src folder, with an .html folder for the coverage report. You can open the coverage report in browser.

Running unit tests for campus map:
1. Open the file Happiness-Map-App/unit_tests/jasmine-standalone-3.0.0/SpecRunner.html in your browser
2. This SpecRunner file should show the output of all unit tests, along with descriptions of what was tested for
3. You can see the individual tests at Happiness-Map-App/unit_tests/jasmine-standalone-3.0.0/spec/MapSpec.js
4. You can see the implementations for these functions at Happiness-Map-App/static/map/mapFunctions.js
5. Although there are other .js files used in displaying the map, these other mapping files are used for rendering the visual components of the map page and so they are not included in this test suite. They can be evaluated by running the server, visiting the map page and visually inspecting the contents.

Running unit tests for message board:
same as above. in jasmine/spec/board.js

Running unit tests for happiness voting:
Unit tests for happiness voting also use jasmine.
Follow steps 1-3 from 'Running unit tests for heat map'
4. Individual unit tests are at Happiness-Map-App/unit_tests/jasmine-standalone-3.0.0/spec/vote.js

# 3.b)

### 1.) How to compile:
See above, first section
### 2.) How to run code:
See above, first section
### 3.) How to run unit tests:
See above, section 3.a)

#### 3a.) Any changes to unit tests:
Backend:
- Running tests is the same, but we added a few functions, so we added more unit tests as well: there are new tests for add_reaction(), get_happiness_level() (located in message_api_test.py and voting_api_test.py).

Voting:
- added getLogicalLoc() which maps from a Google Maps provided address to standardized 'logical location' names
- removed getLocAvg() to reduce redundancy
- removed addVote() tests. addVote() functionality is moved to submitVote(), but is mainly a wrapper for AJAX posts to the database. 
- added unit tests for getLogicalLoc()

### 4.) Acceptance tests to try
((i.e., what inputs to use, and what outputs are expected))

Map:
After adding a vote, check the campus map to make sure the campus-wide average was updated to include your vote value, and that the building's average was updated to include your vote value. Also, the color of the location you voted at should be updated on the campus map.


Message Board:

Voting:
	Valid requests - should see updates to campus happiness average and the selected building happiness average, viewable from Campus Map. Should also see latest happiness level and selected building when posting to Message Board. Off-campus votes affect campus average, but do not have a building associated with them. Off-campus users cannot post to the Message Board.

	The following are valid requests:
	1. Happiness level = 1-5
	   Location = "Regenstein Library" (dropdown only)
	2. Happiness level = 1-5 
	   Location = "Regenstein Library" (map screen only)
	3. Happiness level = 1-5
	   Location = "South Campus Dining Commons" (dropdown)
	   Location = "Regenstein Library" (map screen)
	   		logged location should be "Regenstein Library"
	4. Happiness level = 1-5
	   Location = "Not on campus" (map screen only)
	   		- off campus, will not be able to post messages
	5. Happiness level = 1-5
	   Location = "Off Campus" (dropdown only)
	   		- off campus, will not be able to post messages
	6. Happiness level = 1-5
	   Location = "Not on campus" (map screen)
	   Location = "Saieh Hall" (dropdown only)
	   		- off campus, will not be able to post messages

	Invalid requests are simply discarded.
	The following are invalid requests:
	1. Do not select a happiness level
	   Location = "Regenstein Library" (dropdown only)
	   		- invalid, must have a specified happiness level
	2. Do not select a happiness level
	   Location = "Regenstein Library" (mapscreen only)
	   		- invalid, must have a specified happiness level
	3. Select a happiness level 1-5
	   Do not select a location on either the dropdown or the mapscreen.
	   Leave the dropdown on "".
	   		- invalid, must have a specified location

### 5.) What's been implemented:
((text description of what is implemented. You can refer to the use cases and user stories in your design document.))
Voting:
- Implemented interactive map using Google Maps API which runs in an iframe on vote page
- Implemented form submission for happiness votes to database
- Made UI for happiness voting page - can use either dropdown or the map to submit votes
- Wrote unit tests for interactive map functions and acceptance tests for vote submission

Message Board:

Map:
- Wrote wrapper functions for database queries: get campus average, get averages of all buildings, get average of specific building. note: average is the average of all votes and not limited by recent votes.
- Used Raphael to make our own SVG campus map which runs in an iframe on the campus map page
- Implemented the conversion of query results into color map of campus happiness
- Included a 'region-card' in the corner of the iframe which shows users information about the selected building and the campus happiness averag
- Wrote unit tests for all map object creation and manipulation functions
- We have finished implementing the use case where a user clicks on the Campus Map tab, intending to learn how happy the various campus buildings are and how happy the campus is in general.

Backend:
- Wrote unit tests for database API and requests
- Created database using SQLite
- Set up server using Flask
- Set up API for front-end to post requests and query the database (all functions outlined in the design doc are implemented, and any changes are noted below in section 7)
- Maintained and updated database/queries to keep up with front end needs

### 6.) Divison of work:
who did what: who paired with who; which part is implemented by which pair

Claire and Keely made the maps page! Keely made the SVG/map design (mapBackground.js and mapBuildings.js). Claire connected the map to the database and formatted it on the page (mapFunctions.js, map.css, mapsvg.html, and index.html). Keely set up the Jasmine testing suite and Claire wrote the tests in MapSpec.js. Claire wrote the fillDatabase.js file for visualization testing.

Mihai and Valerie worked on the backend. We pair-programmed the database (with Mihai driving), and pair-programmed unit tests. We both contributed to the database API (querying the database for specific requests). We pair-programmed the server. Mihai worked on form validation.

Anthony and Mitch worked on the vote submission page. Anthony made the UI for vote submission (happiness level and dropdown menu) and form submission via the submit button (vote/index.html, vote.js, vote.css) and wrote unit tests (VoteSpec.js). Mitch made the interactive map with Google Maps API (clickMap.html, voteMapSpec.js).

### 7.) Design changes or unit test changes:

Map:
- Designwise, we decided to make our own svg map instead of using the google maps api. We wanted more customization options and a building-focused design that would show newer building, such as North dorms and Baker dining.
- We made more final decisions about which buildings to use in our system, standardized the list of "logical_location"s to coordinate with the database and grouped certain buildings (such as the medical buildings).
- We have several more functions in our MapSpec.js than we originally described in our design documents. We did not change the functionality of the Map page since writing the design document, but we did decide to break one larger function down into several smaller functions. Since we made this decision recently, the smaller functions were not in the original design document. We thought it would make our code more clear and easier to test if we used these smaller functions. In the design document, we mentioned one function "getHeatMap" which would render the heat map. Now however, the heat map renders using data that is an output of allMapObjects(). allMapObjects() makes calls databaseToMapObj() and emptyMapObj() depending on whether there is any voting data for a building. In turn, databaseToMapObj() makes calls to formatScore(), getName(), computeColor(), and getHappinessRating(). Again, these short functions represent pieces of the larger function we envisioned in the design document, and are not new features.
- We removed the getInfo() function because it was deemed redundant.
- We added more tests and comments to explain the reasoning behind the test cases, including functions that were added since last week (emptyMapObj(), formatScore(), allMapObjs()).
- We changed the data structures slightly so all tests were updated to reflect the new fields.

Backend:
- The design doc says there will be addUpvote() and addDownvote() functions. We changed these to be add_reaction() to make it easier to incorporate a wider range of reactions in the future (ex. happy, sad, funny, etc.). For this iteration, you can add an upvote reaction, or a downvote reaction.
- The design doc says that add_vote() will call updateCampusAverage() and updateBuildingAverage(). We moved the functionality of the latter two functions into get_building_average() and get_campus_average(): they calculate the average values when called, so there is no need to have an updateCampusAverage() or updateBuildingAverage() function.
- We added a get_happiness_level(userId) method to return the most recent happiness vote level of a given user
- Because all voting/posting takes place on campus right now, for this iteration, get_recent_posts() returns all posts within a given time range, posted on campus, sorted by timestamp. get_trending_posts() returns all posts posted on campus, sorted by upvote count. In the next iteration, we will take location into consideration.
- Because remove_post() is only used for admin functionality, and that is not implemented in this iteration, we have left out the implementation and unit tests for remove_post().
- We have gotten rid of getPost(filter) altogether: currently, we have two methods of getting posts: getRecentPosts() and getTrendingPosts(). 

Voting:
- Removed getLocAvg() to remove redundancy. getHappinessAverage() does the same thing.
- Removed nameToLocation(). This function would resolve a given name to a Location object, which the backend now handles.
- Removed addvote(). Functionality has moved to submitVote(), which uses AJAX queries. Test submitVote() using the above acceptance tests
- Added unit tests for getLogicalLoc(), function added in implementation of the interactive map.

### 8.) Anything else:
