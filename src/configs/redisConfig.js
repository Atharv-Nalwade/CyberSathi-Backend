const Redis = require("ioredis");
const redisClient = new Redis();
const logger = require("../utils/logger.js");

// Handle Redis connection errors
redisClient.on("error", (err) => {
  logger.fatal("Redis Error:", err);
});

module.exports = redisClient;
