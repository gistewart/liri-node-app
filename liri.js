require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var userInputA = process.argv[2];

switch (userInputA) {
    case "concert-this":
        function concertInfo();
        break;

    case "spotify-this-song":
        function songInfo();
        break;

    case "movie-this":
        function movieInfo();
        break;

    case "do-what-it-says":
        function doInfo();
        break;
}