# LIRI Bot

## Project Functionality
LIRI is an example of command line node app that takes in search parameters from a user and returns data.  It provides specific information to the user, based on their request, without the user having to navigate between different interfaces. This functionality is possible due to the availability of third-party dependencies.

## App Overview
A Node.js project was initialized, 4 Node packages were installed:
* Node-Spotify-API
* Axios (which was used to retrieve data from the OMDB and SeatGeek API's)
* Moment 
* DotEnv

A liri.js file was created with the code that runs the application. 

## Instructions for the User
Step 1: open the Terminal
Step 2: enter the following text: `node liri.js`
Step 3: enter a space
Step 4: enter one of the following search parameters:
   * `concert-this`
   * `spotify-this-song`
   * `movie-this`
   * `do-what-it-says`
Step 5: enter a space
Step 6: for the first 3 categories, enter the name of the performer, the song title, or the movie title, respectively, as the second search term.

Example: `node liri.js movie-this jaws`

If the 2nd search parameter is not included for a song search or movie search, the app will default to a song search of "The Sign" by Ace of Base, and a movie search of "Mr. Nobody". 

The 2nd search term is case insenstive and can accomodate multiple words.

Example: `node liri.js spotify-this-song Nice to meet ya`

No default is provided for the `concert-this` search, but a message will be provided in the terminal.

For the `do-what-it-says` search parameter, the app will search the song "I Want It That Way" (here, the app is reading data from a .txt file).

For additional searches, simply repeat the steps.

## Video of app functioning 
This has been provided separately

## Deployed link: 
https://gistewart.github.io/liri-node-app/

## Technologies Used
Node packages and APIs used were as follows:
* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
* [Axios](https://www.npmjs.com/package/axios)
* [OMDB API](http://www.omdbapi.com) and the 
* [SeatGeek API](http://platform.seatgeek.com/#events)
* [Moment](https://www.npmjs.com/package/moment)
* [DotEnv](https://www.npmjs.com/package/dotenv)
* [fs] (https://nodejs.org/api/fs.html)

The Moment Node package was used to format dates.  
The DotEnv package was used to protect API keys.
The fs package was used to read data from a .txt file.

## Role in App Development
I developed this app as part of an assignment for Georgia Tech's Full Stack Coding Boot Camp.






