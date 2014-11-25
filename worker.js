var AWS = require('aws-sdk');
    AWS.config.loadFromPath('./config.json'),
    alchemy = require('alchemy');

var sqs = new AWS.SQS();

sqs.listQueues(null, function(err, data){
	if (err) {
		console.log(err, err.stack);
		
		return;
	}

	var queueUrl = data["QueueUrls"][1];
	console.log("queueUrl: " + queueUrl);

	function readMessage() {
		console.log("waiting for message");
		sqs.receiveMessage(
			{ QueueUrl: queueUrl,
				WaitTimeSeconds: 20
			}, function(err, data){
			console.log("received message");
			console.log(data);

			// process message
			var tweet = "hello";

			// send tweet and related data across web socket
			socket.emit('twitter-stream', tweet);
	
			// delete the message when we've successfully processed it
			var deleteMessageParams = {
				QueueUrl: queueUrl,
				ReceiptHandle: data.Messages[0].ReceiptHandle
			};
			sqs.deleteMessage(deleteMessageParams, function(err, data){
				console.log("deleted message");
				console.log(data);
			}); // end delete message callback
			readMessage();
		}); // end receive message callback
	}

	readMessage();


}); // end listQueues callback



