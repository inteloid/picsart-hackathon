var redis = require("redis"),
redisClient = redis.createClient(6379, '75.126.39.90');

redisClient.on("error", function (err) {
  console.log("Error " + err);
});

redisClient.on('pmessage', function (pattern, channel, message) {

});
