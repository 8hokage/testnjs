require('dotenv').config();

// node_modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const sqlite = require('sqlite3');

const PORT = process.env.PORT || 4000;

// helpers
const { logger } = require('./lib/helpers/logger');

const db = new sqlite.Database('cgc_test.db', (err) => {
  if (err) {
    logger.err(`[DB]${err}`);
  } else {
    logger.info('[DB] Database was created');
  }
});

db.serialize(() => {
  db.exec(`CREATE TABLE IF NOT EXISTS analitics(
    id INTEGER PRIMARY KEY NOT NULL AUTOINCREMENT
    user_id INTEGER NOT NULL
    area TEXT NOT NULL
    timestamp DATETIME NOT NULL
  )`, (err) => {
    console.log('userCreated');
  });
});

const app = express();

app.use(express.static('build'));

app.get('./');
app.get('*', (req, res) => {
  res.sendFile('index.html');
});

app.listen(PORT, () => {
  logger.info(`Server ready at port ${PORT}`);
});
