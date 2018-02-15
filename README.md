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
### 4.) Acceptance tests to try
((i.e., what inputs to use, and what outputs are expected))
### 5.) What's been implemented:
((text description of what is implemented. You can refer to the use cases and user stories in your design document.))
Voting:

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
- Set up API for front-end to post requests and query the database
- Maintained and updated database/queries to keep up with front end needs

### 6.) Divison of work:
who did what: who paired with who; which part is implemented by which pair

Claire and Keely made the maps page! Keely made the SVG/map design (mapBackground.js and mapBuildings.js). Claire connected the map to the database and formatted it on the page (mapFunctions.js, map.css, mapsvg.html, and index.html). Keely set up the Jasmine testing suite and Claire wrote the tests in MapSpec.js. Claire wrote the fillDatabase.js file for visualization testing.

Mihai and Valerie worked on the backend. We pair-programmed the database (with Mihai driving), and pair-programmed unit tests. We both contributed to the database API (querying the database for specific requests). We pair-programmed the server. Mihai worked on form validation.

### 7.) Design changes or unit test changes:

Map:
- Designwise, we decided to make our own svg map instead of using the google maps api. We wanted more customization options and a building-focused design that would show newer buildings like north campus.
- We made more final decisions about which buildings to use in our system, standardized the list of "logical_location"s to coordinate with the database and grouped certain buildings.
- We added more tests and comments to explain the reasoning behind the test cases.
- We wrote tests for additional functions that were added since last week (emptyMapObj, formatScore, allMapObjs).
- We changed the data structures slightly so all tests were updated to reflect the new fields.

Backend:
- The design doc says there will be addUpvote() and addDownvote() functions. We changed these to be add_reaction() to make it easier to incorporate a wider range of reactions in the future (ex. happy, sad, funny, etc.). For this iteration, you can add an upvote reaction, or a downvote reaction.
- The design doc says that add_vote() will call updateCampusAverage() and updateBuildingAverage(). We moved the functionality of the latter two functions into get_building_average() and get_campus_average(): they calculate the average values when called, so there is no need to have an updateCampusAverage() or updateBuildingAverage() function.
- We added a get_happiness_level(userId) method to return the most recent happiness vote level of a given user
- Because all voting/posting takes place on campus right now, for this iteration, get_recent_posts() returns all posts within a given time range, posted on campus, sorted by timestamp. get_trending_posts() returns all posts posted on campus, sorted by upvote count. In the next iteration, we will take location into consideration.
- Because remove_post() is only used for admin functionality, and that is not implemented in this iteration, we have left out the implementation and unit tests for remove_post(). 

### 8.) Anything else:
### 9.) Peer-evaluation:
