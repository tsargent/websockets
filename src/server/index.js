const path = require('path');
const express = require('express')
const app = express()
const WebSocketServer = require('websocket').server;
const Twit = require('twit');
const nconf = require('nconf').file({ file: 'config.json'}).env()

const twitter = new Twit({
  consumer_key: nconf.get('TWITTER_CONSUMER_KEY'),
  consumer_secret: nconf.get('TWITTER_CONSUMER_SECRET'),
  access_token: nconf.get('TWITTER_ACCESS_TOKEN'),
  access_token_secret: nconf.get('TWITTER_ACCESS_TOKEN_SECRET')
});

const tweetStream = twitter.stream('statuses/sample');

const httpServer = app.listen(3000, function () {
  console.log('App listening on port 3000!')
});

const wsServer = new WebSocketServer({
  httpServer,
  autoAcceptConnections: false,
});

wsServer.on('request', function(request) {
  const connection = request.accept('twitter-example', request.origin);
  connection.on('message', function(message) {
    console.log('message received: ', message);
  });

  tweetStream.on('tweet', function (tweet) {
    const str = `-----\n${tweet.user.screen_name}\n${tweet.text}`;
    connection.send(str);
  });
});
