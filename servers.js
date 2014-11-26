var gap = function(){
<<<<<<< HEAD
    console.log("\n\n\n\n"); 
}

    var twitter = require('twitter'),
    express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    AWS = require('aws-sdk'),
    util = require('util'),
    AlchemyAPI = require('alchemyapi_node'); 
=======
	console.log("\n\n\n\n"); 
}

var twitter = require('twitter'),
		express = require('express'),
		app = express(),
		http = require('http'),
		server = http.createServer(app),
		io = require('socket.io').listen(server),
		AWS = require('aws-sdk'),
		util = require('util'),
		AlchemyAPI = require('alchemyapi_node'); 
>>>>>>> 8a0de14e631e58d91b9b18a3fb6ab6301e6988fb

AWS.config.loadFromPath('./config.json'); 

var sns = new AWS.SNS();
var sqs = new AWS.SQS();
var alchemy = new AlchemyAPI(); 
var topicArn;

// create SNS topic
sns.createTopic({
<<<<<<< HEAD
	'Name': 'twitternode'
	    }, function (err, result) {
	if (err !== null) {
	    console.log(util.inspect(err));
	    return;
	}
	topicArn = result["TopicArn"];
	//console.log("topicArn: " + topicArn);

	// create SQS queue
	sqs.createQueue({
		'QueueName': 'twitternode'
		    }, function (err, result) {
		if (err !== null) {
		    console.log(util.inspect(err));
		    return;
		}
		var queueUrl = result["QueueUrl"];
		//console.log("queueUrl: " + queueUrl);

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
			//console.log("queueArn: " + queueArn);

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
				//console.log("subscriptionArn: " + subscriptionArn);

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
=======
		'Name': 'twitternode'
		}, function (err, result) {
		if (err !== null) {
		console.log(util.inspect(err));
		return;
		}
		topicArn = result["TopicArn"];
		//console.log("topicArn: " + topicArn);

		// create SQS queue
		sqs.createQueue({
			'QueueName': 'twitternode'
			}, function (err, result) {
			if (err !== null) {
			console.log(util.inspect(err));
			return;
			}
			var queueUrl = result["QueueUrl"];
			//console.log("queueUrl: " + queueUrl);

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
//console.log("queueArn: " + queueArn);

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
	//console.log("subscriptionArn: " + subscriptionArn);

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
>>>>>>> 8a0de14e631e58d91b9b18a3fb6ab6301e6988fb


/****************************** TESTING ****************************/

// configure twitter stream api
var twit = new twitter({
<<<<<<< HEAD
	consumer_key: '0CNrAuSnFtRGcLvWWYzhCLuUr',
	consumer_secret: 'izhMtz1mQzHLLlvItZgBlXsOgJk0BjKLfCSgAlx3oyeijWySc7',
	access_token_key: '2849409910-VD66zWkCZjLS55qZhs1qnoZPMTuPGNyLi3qJRPc',
	access_token_secret: 'ljrW3nXgDbteBP765m2rgCTu1tW9HjtTCNEoBPNTaPfAk'
    }),
    stream = null;
=======
consumer_key: '0CNrAuSnFtRGcLvWWYzhCLuUr',
consumer_secret: 'izhMtz1mQzHLLlvItZgBlXsOgJk0BjKLfCSgAlx3oyeijWySc7',
access_token_key: '2849409910-VD66zWkCZjLS55qZhs1qnoZPMTuPGNyLi3qJRPc',
access_token_secret: 'ljrW3nXgDbteBP765m2rgCTu1tW9HjtTCNEoBPNTaPfAk'
}),
		stream = null;
>>>>>>> 8a0de14e631e58d91b9b18a3fb6ab6301e6988fb

// Configure app
app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 8081);
server.listen(app.get('port'));

console.log("before receiving connection");
//Create web sockets connection.
io.sockets.on('connection', function (socket) {
<<<<<<< HEAD
	console.log("after receiving connection");

	socket.on("start tweets", function() {
		console.log("starting streaming tweets");
		// TODO: print statement here for testing SQS

		if(stream === null) {

		    //Connect to twitter stream passing in filter for entire world.
		    twit.stream('statuses/filter', {'locations':'-180,-90,180,90'}, function(stream) {
			    stream.on('data', function(data) {

				    function publish(tweet) {
					sns.publish({
						TargetArn: topicArn,
						    Message: JSON.stringify(tweet)
						    }, 
					    function(err,data){
						if (err){
						    console.log("Error sending a message "+err);
						}
					    });
				    }

				    // Does the JSON result have coordinates
				    if (data.coordinates){
					if (data.coordinates !== null){

					    //If so then build up some nice json and send out to web sockets
					    var outputPoint = {"lat": data.coordinates.coordinates[0],
							       "lng": data.coordinates.coordinates[1]};
					    var tweet = { "outputPoint" : outputPoint,
							  "text" : data.text,
							  "author" : data.user.screen_name,
					    };

					    // send message to be evaluated by SNS-SQS 
					    publish(tweet);
=======
		console.log("after receiving connection");

		socket.on("start tweets", function() {
			console.log("starting streaming tweets");
			// TODO: print statement here for testing SQS

			if(stream === null) {

			//Connect to twitter stream passing in filter for entire world.
			twit.stream('statuses/filter', {'locations':'-180,-90,180,90'}, function(stream) {
				stream.on('data', function(data) {

					function publish(tweet) {
					sns.publish({
TargetArn: topicArn,
Message: JSON.stringify(tweet)
}, 
function(err,data){
if (err){
console.log("Error sending a message "+err);
}
});
					}

					// Does the JSON result have coordinates
					if (data.coordinates){
					if (data.coordinates !== null){

					//If so then build up some nice json and send out to web sockets
					var outputPoint = {"lat": data.coordinates.coordinates[0],
					"lng": data.coordinates.coordinates[1]};
					var tweet = { "outputPoint" : outputPoint,
						"text" : data.text,
						"author" : data.user.screen_name,
					};

					// send message to be evaluated by SNS-SQS 
					publish(tweet);
>>>>>>> 8a0de14e631e58d91b9b18a3fb6ab6301e6988fb

					}
					// Does the JSON result have a place field
					else if(data.place){
<<<<<<< HEAD
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
							      "author" : data.user.screen_name,
						};

						// send message to be evaluated by SNS-SQS 
						publish(tweet);

					    }
					}
				    }
				});
			    stream.on('error', function(err) {
				    console.log(err);
				});
			});
		}
 telling them that the
     // they are connected and can start receiving Tweets
     socket.emit("connected");
 console.log("emitted connected message to client");

 /************************* WORKER FOR SQS QUEUE ************************/
 var sqs = new AWS.SQS();

 sqs.listQueues(null, function(err, data){
	 if (err) {
	     console.log(err, erhen we've successfully processed it
var deleteMessageParams = {
QueueUrl: queueUrl,
ReceiptHandle: data.Messages[0].ReceiptHandle
=======
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
								"author" : data.user.screen_name,
							};

							// send message to be evaluated by SNS-SQS 
							publish(tweet);	

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

/************************* WORKER FOR SQS QUEUE ************************/
var sqs = new AWS.SQS();

sqs.listQueues(null, function(err, data){
		if (err) {
		console.log(err, err.stack);
		return;
		}

		var queueUrl = data["QueueUrls"][1];
	//	console.log("queueUrl: " + queueUrl);

		function readMessage() {
		sqs.receiveMessage(
			{ QueueUrl: queueUrl,
WaitTimeSeconds: 20
}, function(err, data){

if( data["Messages"] != null) {
	// get tweet from message
	var body = JSON.parse(data["Messages"][0]["Body"]);	
	var tweet = JSON.parse(body["Message"]);

	// analyze sentiment
	alchemy.sentiment("text", tweet["text"], {}, function(response) {
		if (response["docSentiment"] != null)
			tweet["sentiment"] = response["docSentiment"]["type"];
			// send tweet and related data across web socket
			socket.emit('twitter-stream', tweet);
	});
}

// delete the message when we've successfully processed it
var deleteMessageParams = {
QueueUrl: queueUrl,
					ReceiptHandle: data.Messages[0].ReceiptHandle
>>>>>>> 8a0de14e631e58d91b9b18a3fb6ab6301e6988fb
};
sqs.deleteMessage(deleteMessageParams, function(err, data){}); // end delete message callback
readMessage();
}); // end receive message callback
}

<<<<<<< HEAD
=======
readMessage();

}); // end listQueues callback

});

>>>>>>> 8a0de14e631e58d91b9b18a3fb6ab6301e6988fb
