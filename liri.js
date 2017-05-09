var request = require("request");
var keys = require("./keys.js");
var twitter = require("twitter");
var inquirer = require("inquirer");
var spotify = require("spotify");
var omdb = require("omdb");
var fs = require("fs");
var userSong1 = "";
var userMovie1 = "";

var command = process.argv[2];

switch(command){

	case "my-tweets":
		anaTweets();
		break;
};

switch(command){

	case "spotify-this-song":
		songSpotify();
		break;
};

switch(command){

	case "movie-this":
		Omdb();
		break;
};

switch(command){

	case "do-what-it-says":
		Dosays();
		break;
};

function anaTweets() {
	console.log("in function");

	var client = new twitter({
		consumer_key: keys.twitterKeys.consumer_key,
  		consumer_secret: keys.twitterKeys.consumer_secret,
  		access_token_key: keys.twitterKeys.access_token_key,
  		access_token_secret: keys.twitterKeys.access_token_secret

	})
	var params = {screen_name: "analamyra_test"};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		for (var i = 0; i < tweets.length; i++) {

		if (!error) {
			//console.log(tweets);
			console.log(tweets[i].text);
			console.log(tweets[i].created_at);
  		}

  		else {
  			console.log(error);
  		}
	}
});
};

function songSpotify () {
	inquirer.prompt([

  {
    type: "input",
    name: "favoriteSong",
    message: "What song are you looking for?"
  }

	]).then(function(user) {
		userSong1 = user.favoriteSong;
		Spotifythis();

	function Spotifythis () {
	//var songArray = [];

	spotify.search({ type: 'track', query: userSong1}, function(err, data) {
    if (data) {
    	console.log("Artist: " + data.tracks.items[0].artists[0].name);
    	console.log("Song: " + data.tracks.items[0].name);
    	console.log("The Link: " + data.tracks.items[0].preview_url);
    	console.log("Album: " + data.tracks.items[0].album.name);

    }

    //error code won't work for me, sad face.
    //else {
    	//spotify.search({ type: 'track', query: "ace base The Sign"}, function(err, data) {
    	//console.log(data);	
    	//console.log("Artist: " + data.tracks.items[0].artists[0].name);
    	//console.log("Song: " + data.tracks.items[0].name);
    	//console.log("The Link: " + data.tracks.items[0].preview_url);
    	//console.log("Album: " + data.tracks.items[0].album.name);
    	//});
    //};

	});
 };
});
};

function Omdb () {
	inquirer.prompt([

  {
    type: "input",
    name: "favoriteMovie",
    message: "What movie are you looking for?"
  }

	]).then(function(user) {
		userMovie1 = user.favoriteMovie;
		Omdbthis();

	function Omdbthis () {
		request("http://www.omdbapi.com/?t=" + userMovie1 + "&tomatoes=true", function(error, response, body) {
			var movie = JSON.parse(body);
			if (!error && response.statusCode === 200 && movie.Title != undefined) {

				//console.log(movie);
				console.log("Title: " + movie.Title);
				console.log("Year: " + movie.Year);
				console.log("IMDB Rating: " + movie.imdbRating);
				console.log("Country: " + movie.Country);
				console.log("Language: " + movie.Language);
				console.log("Plot " + movie.Plot);
				console.log("Actors: " + movie.Actors);
				console.log("Rotten Tomatoes: " + movie.tomatoURL);
			}
			else {
				request("http://www.omdbapi.com/?t=" + "Mr+Nobody" + "&tomatoes=true", function(error, response, body) {
			var movie = JSON.parse(body);
				//console.log(movie);
				console.log("Title: " + movie.Title);
				console.log("Year: " + movie.Year);
				console.log("IMDB Rating: " + movie.imdbRating);
				console.log("Country: " + movie.Country);
				console.log("Language: " + movie.Language);
				console.log("Plot " + movie.Plot);
				console.log("Actors: " + movie.Actors);
				console.log("Rotten Tomatoes: " + movie.tomatoURL);
				});
			};
		});


    }
	});
 };

function Dosays () {
	fs.readFile("random.txt", "utf8", function (error, data){
		var array = data.split(",");
		action = array[0];
		detail = array [1];
		userSong1 = detail;
		spotify.search({ type: 'track', query: userSong1}, function(err, data) {
    	if (!err) {
    	console.log("Artist: " + data.tracks.items[0].artists[0].name);
    	console.log("Song: " + data.tracks.items[0].name);
    	console.log("The Link: " + data.tracks.items[0].preview_url);
    	console.log("Album: " + data.tracks.items[0].album.name);

    }
	});

	})
}


