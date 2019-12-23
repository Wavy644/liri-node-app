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
  }
  )
}