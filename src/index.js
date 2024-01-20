// src/index.js

const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./configs/serverConfig.js');
const APIROUTES = require('./routes/index.js');

const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', APIROUTES);

async function SetupAndStartServer() {
  app.listen(PORT, () => {
    console.log('Server is listening on port 3000');
  });
}

SetupAndStartServer();
