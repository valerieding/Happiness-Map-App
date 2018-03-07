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
A user can vote on their happiness and location using the vote page. It uses the Google Maps Geolocation API and can automatically detect the user's location. Because the geolocation might not be accurate at times, users can also select their position on the map, or select their location from the dropdown menu. After selecting their happiness level and location, the user can submit their vote: this remembers the user's most recent vote and location, and adds the vote to the campus map and user's personal stats.

Message Board:
After submitting a vote, a user can post to the message board, and their post will be tied to their most recent vote and location. Users can upvote and downvote posts on the message board. The message board can be sorted based on most recent posts and trending posts, and can be filtered based on time frame, and location.

Map:
- Used Raphael to make our own SVG campus map with a selection of prominent campus buildings
- Queries the database for average votes by building and for all votes- can be filtered by times
- Color codes buildings based on the recorded happiness level with a light pink to dark pink scale
- Included a label above the map to show the full name and happiness level of the most recently selected building
- A label for the campus average
- Buttons to change the time filter on the map
- Use Case: A user can visit this page and learn about how happy different buildings were for different recent time periods

Backend:
The backend consists of a database built with SQLite, and a server built on Flask and Python. The front-end posts requests to the server, and the back-end responds with a json object. The backend has requests to get votes, posts, and average values over certain timeframes and locations. 

Stats:
The stats page is a convenient way for a user to look back on his/her recent votes and posts. It contains several visualizations, including:
- a trendline of a user's happiness levels over time (based on up to 50 of their most recent votes) which can be filtered by time
- a user's recent posts
- a user's campus map, which shows a user's personal happiness votes and where they took place and which can also be filtered by time
- a bar graph of a user's votes by day of week, which shows a user's average happiness level for each day
- a bar graph of a user's votes by time of day, which shows a user's average happiness level for each hour of the past day

Admin:
We've implemented moderator functionality that can be accessed when running the app on localhost:8000. If you navigate to localhost:8000/moderator, the app will prompt you to log in as an admin. (Note: we decided not to have the moderator page be in the navigation bar, or put a button that would lead to it, because we wanted to hide its functionality as much as possible from normal users. We wanted it to be only for people who explicitly knew how to use it). You can login with the credentials: username = admin, password = password. This will redirect you to the message board, with the added ability to remove posts. If you click the log out button on the message board, you will return to the message board as a regular user, without admin abilities. 


## 3) A brief tutorial about how to use your software
See the Installation Guide for instructions on setting up and running the server on your localhost. When you go to your browser and connect to localhost:8000, you will be taken to the home page, which has the happiness map of campus. You can use the navigation drop down menu to change pages.
On the Vote page, you can vote and indicate your location through location services (only on some browsers), through clicking on the map, or through selecting a building/region from the dropdown menu. Not all locations will be available through location services or the map functionality.
On the Message Board page, you can post messages, sort the message display, filter messages by location, and react to messages. 
The Campus Map page takes you back to the home page where you can see the happiness map.
The My Stats page can show you some interesting visualizations, but note that My History will only be available when you have logged 3 or more votes, and remember that you can only vote so frequently without overriding your previous vote.

Note: If you vote twice within 15 minutes, your first vote will be overwritten by your second vote. If you post to the message board in between submitting these votes, that message will stay on the board with the location and happiness level of the first vote. This is the intended behavior to prevent people from flooding the system with votes, while also allowing them to vote/update their votes freely. Message board posts are meant to last and to be tied to the vote that was accurate at the time of posting. If you vote and post in succession, you may see posts on "My Recent Posts" which are not tied to a currently valid vote and are therefore not reflected on the map or in the other charts on "My Stats". That is ok.
 
## 4) If you know certain inputs are not well handled by the software and should not be tried by users, list these inputs.
- In order to view all pages as they are intended, you must be using the latest version of your browser and OS. Otherwise, some pages may not render as expected.
- If you visit the DNS site, because it's served over http and not https, some browsers automatically block geolocation sensing. So, on the vote page, you may need to select your location from the dropdown.
