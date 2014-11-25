var twitter = require('twitter'),
    express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

//Setup twitter stream api
var twit = new twitter({
	consumer_key: '',
        consumer_secret: '',
        access_token_key: '',
        access_token_secret: ''
}),
stream = null;

// Configure app
app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 8081);
server.listen(app.get('port'));

console.log("before receiving connection");
//Create web sockets connection.
io.sockets.on('connection', function (socket) {
	console.log("after receiving connection");

  socket.on("start tweets", function() {
		console.log("starting streaming tweets");
    if(stream === null) {

      //Connect to twitter stream passing in filter for entire world.
      twit.stream('statuses/filter', {'locations':'-180,-90,180,90'}, function(stream) {
          stream.on('data', function(data) {

              // Does the JSON result have coordinates
              if (data.coordinates){
                if (data.coordinates !== null){

                  //If so then build up some nice json and send out to web sockets
                  var outputPoint = {"lat": data.coordinates.coordinates[0],
																		 "lng": data.coordinates.coordinates[1]};
									var tweet = { "outputPoint" : outputPoint,
																"text" : data.text,
																"author" : data.user.screen_name
															};
									// Send out to web sockets channel
									socket.emit('twitter-stream', tweet);
                }
								// Does the JSON result have a place field
                else if(data.place){
                  if(data.place.bounding_box === 'Polygon'){

                    // Calculate the center of the bounding box for the tweet
                    var coord, _i, _len;
                    var centerLat = 0;
                    var centerLng = 0;

                    for (_i = 0, _len = coords.length; _i < _len; _i++) {
                      coord = coords[_i];
                      centerLat += coord[0];
                      centerLng += coord[1];
                    }
                    centerLat = centerLat / coords.length;
                    centerLng = centerLng / coords.length;

                    // Build json object
                    var outputPoint = {"lat": centerLat,"lng": centerLng};
										var tweet = { "outputPoint" : outputPoint,
																	"text" : data.text,
																	"author" : data.user.screen_name
																};

										// Send out to web sockets channel
										socket.emit('twitter-stream', tweet);
                  }
                }
              }
          });
          stream.on('error', function(err) {
						console.log(err);	
					});
      });
    }
  });

		socket.on('disconnect', function () {
			io.sockets.emit('user disconnected');
			console.log("user disconnected");
		});

    // Emits signal to the client telling them that the
    // they are connected and can start receiving Tweets
    socket.emit("connected");
		console.log("emitted connected message to client");
});
