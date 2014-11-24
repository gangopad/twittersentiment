var gap = function(){
console.log("\n\n\n\n"); 
}

var twitter = require('twitter'),
    express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
		AWS = require('aws-sdk'),
		util = require('util');

AWS.config.loadFromPath('./config.json'); 

var sns = new AWS.SNS();
var sqs = new AWS.SQS();

// create SNS topic
sns.createTopic({
	'Name': 'twitternode'
}, function (err, result) {
	if (err !== null) {
		console.log(util.inspect(err));
		return;
	}
	var topicArn = result["TopicArn"];
	console.log("topicArn: " + topicArn);

	// create SQS queue
	sqs.createQueue({
		'QueueName': 'twitternode'
	}, function (err, result) {
		if (err !== null) {
			console.log(util.inspect(err));
			return;
		}
		var queueUrl = result["QueueUrl"];
		console.log("queueUrl: " + queueUrl);

		// get queue ARN
		sqs.getQueueAttributes({
			QueueUrl: queueUrl, 
			AttributeNames: ["QueueArn"]
		}, function (err, result) {
			if (err !== null) {
				console.log(util.inspect(err));
				return;
			}
			var queueArn = result["Attributes"]["QueueArn"];
			console.log("queueArn: " + queueArn);

			// subscribe 
			sns.subscribe({
				'TopicArn': topicArn, 
				'Protocol': 'sqs',
				'Endpoint': queueArn 
			}, function (err, result) {
				if (err !== null) {
						console.log(util.inspect(err));
						return;
				}
				var subscriptionArn = result["SubscriptionArn"];	
				console.log("subscriptionArn: " + subscriptionArn);

				// allow topic to publish to queue
				var attributes = {
						"Version": "2008-10-17",
						"Id": queueArn + "/SQSDefaultPolicy",
						"Statement": [{
										"Sid": "Sid" + new Date().getTime(),
										"Effect": "Allow",
										"Principal": {
												"AWS": "*"
										},
										"Action": "SQS:SendMessage",
										"Resource": queueArn,
										"Condition": {
												"ArnEquals": {
														"aws:SourceArn": topicArn
												}
										}
								}
						]
				};

				sqs.setQueueAttributes({
						QueueUrl: queueUrl,
						Attributes: {
								'Policy': JSON.stringify(attributes)
						}
				}, function (err, result) {
						if (err !== null) {
								console.log(util.inspect(err));
								return;
						}
				}); // end set queue attributes callback
			}); // end subscribe callback
		}); // end getQueueAttributes callback
	}); // end createQueue callback
}); // end createTopic callback


/*
// configure twitter stream api
var twit = new twitter({
  consumer_key: '0CNrAuSnFtRGcLvWWYzhCLuUr',
  consumer_secret: 'izhMtz1mQzHLLlvItZgBlXsOgJk0BjKLfCSgAlx3oyeijWySc7',
  access_token_key: '2849409910-VD66zWkCZjLS55qZhs1qnoZPMTuPGNyLi3qJRPc',
  access_token_secret: 'ljrW3nXgDbteBP765m2rgCTu1tW9HjtTCNEoBPNTaPfAk'
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
var AWS = require('aws-sdk'), util = require('util');
var sns = new AWS.SNS().client;
		// TODO: print statement here for testing SQS

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

*/
