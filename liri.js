require ("dontenv").config();

var keys = require ("./keys.js");

var spotify = new spotify(keys.spotify);

var Spotify = require("node-spotify-api");

var axios = require("axios");

var fs = require("fs");

var moment = require("moment");


var getArtistNames = function(songName) {
  return artist.name;
};

var getSomeSpotify = function(songName) {
  if(songName === undefined) {
    songName = "Go DJ";
  }

  spotify.search(
    {type: "track",
    query: songName

  },
  function(err, data) {
    if(err) {
      console.log("Error occurred: " + err);
      return;
    }

    var songs = data.tracks.items;

    for (var i = 0; i < songs.length; i++) {
      console.log(i);
      console.log("artist(s): " + songs[i].artist.maps(getArtistNames));
      console.log("song name; " + songs[i].name);
      console.log("preview song: " + songs[i].preview_url);
      console.log("album: " + songs[i].album.name);
      console.log("......hey....")
    }
  }
  );
};

var getTheBands = function(artist) {
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=z3mxV8dA"

  axios.get(queryURL).then(
    function(response) {
      var jsonData = response.data;

      if(!jsonData.length) {
        console.log("No infomation found for " + artist);
        return;
      }

     console.log("Next concerts for " + artist + ":");
     
     for (var i = 0; i < jsonData.length; i++) {
       var show = jsonData[i];
     }
    }
  );
};

var getTheMovie = function(movieName) {
  if (movieName == undefined) {
    movieName = "Friday";
  }

  var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=b13d935a";

  axios.get(urlHit).then(
    function(response) {
      var jsonData = response.data;

      console.log("Title: " + jsonData.Title);
      console.log("Rated: " + jsonData.Rated);
      console.log("Year: " + jsonData.Year);
      console.log("IMDB Rating: + " + jsonData.imdbRating);
      console.log("Rotten Tomatoes Rating: " + jsonData.Rating[1].Value);
      console.log("Actors: " + jsonData.Actors);
      console.log("Plot: " + jsonData.Plot);
    }
  );
};

var doWhatIsAsked = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataArr = data.split(" , ");

    if (dataArr.length === 2) {
      pick(dataArr.length ===1);
    } else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }
  });
};

var choice = function(caseData, functionData) {
  switch (caseData) {
    case "Events" :
      getTheBands(functionData);
      break;
    
    case "spotify-song" :
      getSomeSpotify(functionData);
      break;

    case "movie-me" :
      getTheMovie(functionData);
      break;

    case "do-what-is-asked" :
      doWhatIsAsked();

    default:
      console.log("What is that?")
  }
};

var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};


runThis(process.argv[2], process.argv.slice(3).join( " "));