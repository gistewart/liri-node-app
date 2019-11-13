require("dotenv").config();
const Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');
moment().format();

var spotify = new Spotify(keys.spotify);
// var seatgeek = keys.seatgeek;

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
        }
    )
}

function movieInfo() {
    // Then run a request with axios to the OMDB API with the movie specified
    var queryMovieUrl = "http://www.omdbapi.com/?t=" + userTitle + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryMovieUrl);

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
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function songInfo() {
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

    });
}