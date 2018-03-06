# Happiness-Map-App

## 1) Installation Guide
For running the server, Python 3.5 or newer is necessary. Additional python package dependencies are:
- flask (backbone of the server. Root privileges or a python virtual environment is necessary)
- wtforms (form validation)
- ecdsa (cookie signature)
- coverage (only for running the server tests with --coverage)

You can run `pip3 install flask wtforms ecdsa coverage` or `python3 -m pip install  flask wtforms ecdsa coverage` to 
take care of these dependencies.

Running the server is simply `python3 main.py` with an optional `--debug` flag for activating debug mode.

Opening the website:
- local instance: http://localhost:8000
- remote instance: http://happymap.ddns.net (WARNING: this is running on a personal computer so it's not always on).

NOTE: You may have to change the Google Maps API key being used in order ot use the Google Map on the Vote page.
	The location of the API key is in src/site/vote.html, line: 145. Replace the text between "key=" and "=initMap" in line 145 with your API key (which you can sign up for at https://developers.google.com/maps/documentation/javascript/get-api-key) before running any of the above steps.

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
See the Installation Guide for instructions on setting up and running the server on your localhost. When you go to your browser and connect to localhost:8000, you will be taken to the home page, which has the happiness map of campus. You can use the navigation drop down menu to change pages.
On the Vote page, you can vote and indicate your location through location services (only on some browsers), through clicking on the map, or through selecting a building/region from the dropdown menu. Not all locations will be available through location services or the map functionality.
On the Message Board page, you can post messages, sort the message display, filter messages by location, and react to messages. 
The Campus Map page takes you back to the home page where you can see the happiness map.
The My Stats page can show you some interesting visualizations, but note that My History will only be available when you have logged 3 or more votes, and remember that you can only vote so frequently without overriding your previous vote.
Note: If you vote twice within 15 minutes, your first vote will be overwritten by your second vote. If you post to the message board in between submitting these votes, that message will stay on the board with the location and happiness level of the first vote. This is the intended behavior to prevent people from flooding the system with votes, while also allowing them to vote/update their votes freely. Message board posts are meant to last and to be tied to the vote that was accurate at the time of posting. If you vote and post in succession, you may see posts on "My Recent Posts" which are not tied to a currently valid vote and are therefore not reflected on the map or in the other charts on "My Stats". That is ok.
 
## 4) If you know certain inputs are not well handled by the software and should not be tried by users, list these inputs.


### 4.) Acceptance tests to try
Note: A user MUST add a vote before posting a message. If you don't add a vote, you can't post.

Map:
After adding a vote, check the campus map to make sure the campus-wide average was updated to include your vote value, and that the building's average was updated to include your vote value. Also, the color of the location you voted at should be updated on the campus map. Try filtering by different time frames and noticing how the map changes.

My Stats:
Try hovering over points or bars on the graphs to see that the labels make sense given the axes, and try changing the time frames on My History and My Map to see how the data and axes change. Add a vote on the Vote page and seeing that it is reflected in each of the graphs on the Personal Stats page.

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
