// src/index.js

const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./configs/serverConfig.js');
const APIROUTES = require('./routes/index.js');
const cron = require('node-cron');
const cors = require('cors');
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
})


const app = express();

app.use(cors());
app.use(limiter);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', APIROUTES);

const host='0.0.0.0';

app.get('/', (req, res) => {
  res.send('Hello World!');
});

async function SetupAndStartServer() {
  app.listen(PORT,host, () => {
    console.log('Server is listening on port 3000');
  });

  process.on('SIGINT', async () => {
    try {
      // Disconnect the Redis client
      await redisClient.quit();
      console.log('Redis client disconnected');
      process.exit(0); // Exit the process gracefully
    } catch (error) {
      console.error('Error while disconnecting Redis client:', error);
      process.exit(1); // Exit the process with an error
    }
  });

  cron.schedule('0 0 * * 0', async () => {
    try {
      // Perform the cleanup
      console.log('Running Redis cleanup job...');
      await redisClient.flushall(); // Delete all keys in the database
      console.log('Redis cleanup job completed successfully.');
    } catch (error) {
      console.error('Error during Redis cleanup:', error);
    }
  });
  
}

SetupAndStartServer();



