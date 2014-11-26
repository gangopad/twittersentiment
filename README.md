<<<<<<< HEAD
For this program, we use a js application to scrape tweets using the Twitter API and then we display them dynamically on the map. We use a heatmap structure to display our tweets and we also use a dropdown menu option to filter based on tweets. We use the AWS beanstalk application and enable load balancing to allow for our application to deploy to the cloud and scale across multiple instances. We use the node.js and npm software
for our code to run the javascript/HTML-CSS stuff and we use the For this program, we use a js application to scrape tweets using the Twitter API and then we display them dynamically on the map. We use a heatmap structure to display our tweets and we also use a dropdown menu option to filter based on tweets. We use the AWS beanstalk application and enable load balancing to allow for our application to deploy to the cloud and scale across multiple instances.We also use the Websockets, Twitter, and Express node modules to allow for scraping from Twitter, etc.
=======
twitternode
===========
Names: 
Esha Maharishi (em2852) 
Abhinav Mishra (anm2147) 

For this project we used Node.js on Elastic Beanstalk and Websockets API for generating the Twitter Stream Requests 

Note that for commits, they have been mostly made by Esha Maharishi but the coding itself was only being done on one computer. 
The work was split in terms of coding and debugging/testing/EC2 management and most of the configuration of Elastic Beanstalk 
and trying to debug many issues in Beanstalk were done by Abhinav (for ex. security groups, container environment, etc.) 

In addition, there is a slight issue when the Websocket server for some reason goes down. It gets fixed if we just push 
the code to AWS again. 
A video has been submitted but if you want to look at the specific URL and the Twitter Streams are not coming up please email 
one of us and we'll push the code again. It seems to be some minor Websockets issue. 

The app also uses a nice heat map feature from Google Maps to show the clustering which is cool because then it's really
easy to identify locations. 

The software required was node.js, npm, 
For executing the code itself, Elastic Beanstalk already is running it and starts the server by executing the command npm start. Nginx proxy server is also running on port 8081. You also need the Websockets, Twitter, and Express node modules. 

Link to webapp: http://twitternode-env-nckmmseqq5.elasticbeanstalk.com
>>>>>>> 8a0de14e631e58d91b9b18a3fb6ab6301e6988fb
