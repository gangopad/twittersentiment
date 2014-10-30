function initialize() {
  //Setup Google Map
  var myLatlng = new google.maps.LatLng(18,-12);
  var myOptions = {
    zoom: 2,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.LEFT_BOTTOM
    },
  };
  var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  
  //Setup heat map and link to Twitter array we will append data to
  var heatmap;
  var liveTweets = new google.maps.MVCArray();
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: liveTweets,
    radius: 25
  });
  heatmap.setMap(map);

	console.log("before io");
  if(io !== undefined) {

    // Storage for WebSocket connections
    var socket = io.connect('twitternode-env-nckmmseqq5.elasticbeanstalk.com:8081');
//		socket = io.connect('http://localhost:8081');

		console.log("before twitter stream");
    // This listens on the "twitter-steam" channel and data is 
    // received everytime a new tweet is receieved.
    socket.on('twitter-stream', function (data) {
      //Add tweet to the heat map array.
      var tweetLocation = new google.maps.LatLng(data.outputPoint.lng,data.outputPoint.lat);
      liveTweets.push(tweetLocation);
      //Flash a dot onto the map quickly
      var image = "css/small-dot-icon.png";
			var title = "@" + data.author + ": " + data.text;
      var marker = new google.maps.Marker({
        position: tweetLocation,
        map: map,
        icon: image
      });
      setTimeout(function(){
        marker.setMap(null);
      },600);
    });

    // Listens for a success response from the server to 
    // say the connection was successful.
		console.log("before connected to server");
    socket.on("connected", function(r) {
			console.log("connected to server");
      //Now that we are connected to the server let's tell 
      //the server we are ready to start receiving tweets.
      socket.emit("start tweets");
			console.log("starting tweets"); 
   });
  }
}
