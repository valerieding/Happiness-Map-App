# Happiness-Map-App

## 1) Installation Guide:
On Localhost:
1. Install python3, if you don't already have it installed
2. Install flask, wtforms, coverage, and ecdsa (on Mac, this is pip3 install flask, pip3 install wtforms, pip3 install coverage, pip3 install ecdsa).
3. Navigate to the src directory, and run: python3 main.py --debug
4. Open a browser and navigate to "localhost:8000"
NOTE: You may have to change the Google Maps API key being used in order ot use the Google Map on the Vote page, since the one currently being used has a cap of 1000 queries/day. 
	The location of the API key is in src/site/vote.html, line: 145. Replace the text between "key=" and "=initMap" in line 145 with your API key (which you can sign up for at https://developers.google.com/maps/documentation/javascript/get-api-key) before running any of the above steps.

On DNS:
http://happymap.ddns.net

## 2) A brief functionality description
Voting:
- Implemented interactive map using Google Maps API which runs in an iframe on vote page
- Implemented form submission for happiness votes to database
- Made UI for happiness voting page - can use either dropdown or the map to submit votes
- Wrote unit tests for interactive map functions and acceptance tests for vote submission

Message Board:
- Designed the message board page
- A user can post on the board after they vote 
- This post can be up and down voted on
- Populates a table and can be sorted via buttons
- Users can see all the posts and laugh and cry with their friends
- Dynamic welcome text depending on the user's last happiness vote
- Changed the way we display time on the message board (now "1 minute ago") versus how it's stored in the database
- Wrote the unit tests for all the functions we use in board.js. boardFunctions.js contains all of the same functions just in their own spot.

Map:
- Used Raphael to make our own SVG campus map with a selection of prominent campus buildings
- Queries the database for average votes by building and for all votes- can be filtered by times
- Color codes buildings based on the recorded happiness level with a light pink to dark pink scale
- Included a label above the map to show the full name and happiness level of the most recently selected building
- A label for the campus average
- Buttons to change the time filter on the map
- Use Case: A user can visit this page and learn about how happy different buildings were for different recent time periods

Backend:
- Wrote unit tests for database API and requests
- Created database using SQLite
- Set up server using Flask
- Set up API for front-end to post requests and query the database (all functions outlined in the design doc are implemented, and any changes are noted below in section 7)
- Maintained and updated database/queries to keep up with front end needs

Stats:
The stats page is a convenient way for a user to look back on his/her recent votes and posts. It contains several visualizations, including:
- a trendline of a user's happiness levels over time (based on up to 50 of their most recent votes) which can be filtered by time
- a user's recent posts
- a user's campus map, which shows a user's personal happiness votes and where they took place and which can also be filtered by time
- a bar graph of a user's votes by day of week, which shows a user's average happiness level for each day
- a bar graph of a user's votes by time of day, which shows a user's average happiness level for each hour of the past day

Admin:
We've implemented moderator functionality that can be accessed when running the app on localhost:8000. If you navigate to localhost:8000/moderator, the app will prompt you to log in as an admin. You can login with the credentials: username = admin, password = password. This will redirect you to the message board, with the added ability to remove posts. If you click the log out button on the message board, you will return to the message board as a regular user, without admin abilities. 


## 3) A brief tutorial about how to use your software
## 4) If you know certain inputs are not well handled by the software and should not be tried by users, list these inputs.


### 4.) Acceptance tests to try
Note: A user MUST add a vote before posting a message. If you don't add a vote, you can't post.

Map:
After adding a vote, check the campus map to make sure the campus-wide average was updated to include your vote value, and that the building's average was updated to include your vote value. Also, the color of the location you voted at should be updated on the campus map.

Message Board:
You cannot post if you did not already vote.
Message board does not accept empty messages.
You cannot double upvote/downvote, but you may switch between upvote and downvote on a post. 
Switching your vote subtracts from current vote and adds to new vote so as to not double count it.
Sorting posts by 'trending' or 'recent' should result in either the highest rated or most recently added posts.

Voting:
	Valid requests - should see updates to campus happiness average and the selected building happiness average, viewable from Campus Map. Should also see latest happiness level and selected building when posting to Message Board. Off-campus votes affect campus average, but do not have a building associated with them. 

	Google Maps geolocation has some accuracy issues, so we allow the user to click directly on the Google Map to choose their location. They can also specify a campus building from the dropdown menu. When a user submits their vote, their last location is submitted, whether it is from geolocation, directly clicking on the map, or selecting from the dropdown menu.

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
