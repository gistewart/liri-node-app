require("dotenv").config();
const Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require('moment');
moment().format();

var spotify = new Spotify(keys.spotify);

//capture command line arguments
var userCat = process.argv[2];

//capture title of user request
var nodeArgs = process.argv;
var userTitle = "";

for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
        userTitle = userTitle + "+" + nodeArgs[i];
    } else {
        userTitle += nodeArgs[i];
    }
}

//switch case statement to run different functions based on category of user request
switch (userCat) {
    case "concert-this":
        concertInfo();
        break;

    case "spotify-this-song":
        songInfo();
        break;

    case "movie-this":
        movieInfo();
        break;

    case "do-what-it-says":
        doWhat();
        break;
}

function concertInfo() {

    if (!userTitle) {
        console.log("You have to search for a team, artist, event or venue")
    } else {

        var queryEventUrl = "https://api.seatgeek.com/2/events?q=" + userTitle + "&client_id=MTk0MzUzNDR8MTU3MzU5ODU4Mi4yMg"

        axios.get(queryEventUrl).then(
            function(response) {
                var eventInfo = response.data.events[0];
                // console.log(eventInfo);

                var eventName = eventInfo.venue.name;
                console.log("Venue: " + eventName);

                var eventLocation = eventInfo.venue.address + ", " + eventInfo.venue.display_location;
                console.log("Location: " + eventLocation);

                var eventDate = eventInfo.datetime_local;
                console.log("Date: " + moment(eventDate).format("MM/DD/YYYY"));
            });
    }
}

function movieInfo() {

    if (!userTitle) {
        userTitle = "Mr. Nobody";
    }

    // Runs a request with axios to the OMDB API with the movie specified
    var queryMovieUrl = "http://www.omdbapi.com/?t=" + userTitle + "&y=&plot=short&apikey=trilogy";


    axios.get(queryMovieUrl).then(
        function(response) {

            var movieInfo = response.data;
            // console.log(movieInfo);

            var movieTitle = movieInfo.Title;
            console.log("Title: " + movieTitle);

            var movieReleastYear = movieInfo.Year;
            console.log("Release Year: " + movieReleastYear);

            var movieIMDBRating = movieInfo.imdbRating;
            console.log("IMDB Rating: " + movieIMDBRating);

            var movieRTRating = movieInfo.Ratings[1].Value;
            console.log("Rotten Tomatoes Rating: " + movieRTRating);

            var movieCountry = movieInfo.Country;
            console.log("Production Country: " + movieCountry);

            var movieLanguage = movieInfo.Language;
            console.log("Language: " + movieLanguage);

            var moviePlot = movieInfo.Plot;
            console.log("Plot: " + moviePlot);

            var movieActors = movieInfo.Actors;
            console.log("Actors: " + movieActors);

        })
}

function songInfo() {

    // if no search title is provided
    if (!userTitle) {
        userTitle = "The Sign";

        spotify.search({ type: 'track', query: userTitle }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var songInfo = data.tracks.items[5];
            // console.log(songInfo);

            var songArtist = songInfo.artists[0].name;
            console.log("Artist: " + songArtist);

            var songName = songInfo.name;
            console.log("Song name: " + songName);

            var songPreview = songInfo.uri;
            console.log("Preview link: " + songPreview);

            var songAlbum = songInfo.album.name;
            console.log("Album: " + songAlbum);
        })

    } else {
        spotify.search({ type: 'track', query: userTitle }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var songInfo = data.tracks.items[0];
            // console.log(songInfo);

            var songArtist = songInfo.artists[0].name;
            console.log("Artist: " + songArtist);

            var songName = songInfo.name;
            console.log("Song name: " + songName);

            var songPreview = songInfo.uri;
            console.log("Preview link: " + songPreview);

            var songAlbum = songInfo.album.name;
            console.log("Album: " + songAlbum);
        })
    }

}

function songInfo2() {
    var songArtist = songInfo.artists[0].name;
    console.log("Artist: " + songArtist);

    var songName = songInfo.name;
    console.log("Song name: " + songName);

    var songPreview = songInfo.uri;
    console.log("Preview link: " + songPreview);

    var songAlbum = songInfo.album.name;
    console.log("Album: " + songAlbum);
}

function doWhat() {
    fs.readFile("random.txt", "utf-8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        // console.log(data);
        var arr = data.split(",");
        // console.log(arr);

        userCat = arr[0];
        userTitle = arr[1];
        // console.log(userCat);
        // console.log(userTitle);

        songInfo();
    });
}