// src/index.js

const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./configs/serverConfig.js');
const APIROUTES = require('./routes/index.js');
const cors = require('cors');

const app = express();

app.use(cors());

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
}

SetupAndStartServer();
