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

Running unit tests for heat map:
1. Navigate to the directory Happiness-Map-App/unit_tests/jasmine-standalone-3.0.0
2. Inside this directory run python3 -m http.server 
3. In your browser navigate to localhost:8000/SpecRunner.html to see the Jasmine Unit testing page
4. You can see the individual tests at Happiness-Map-App/unit_tests/jasmine-standalone-3.0.0/spec/MapSpec.js
5. You can see the skeleton code for these functions at Happiness-Map-App/src/map/map.js

Running tests for message board:
same as above. in jasmine/spec/board.js

Running unit tests for happiness voting:
Unit tests for happiness voting also use jasmine.
Follow steps 1-3 from 'Runnign unit tests for heat map'
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

Backend:
- Wrote unit tests for database API and requests
- Created database using SQLite
- Set up server using Flask
- Set up API for front-end to post requests and query the database

### 6.) Divison of work:
who did what: who paired with who; which part is implemented by which pair
### 7.) Design changes or unit test changes: 
### 8.) Anything else:
### 9.) Peer-evaluation:
