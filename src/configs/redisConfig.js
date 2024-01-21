const Redis = require("ioredis");
const redisClient = new Redis();

// Handle Redis connection errors
redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});

module.exports = redisClient;
