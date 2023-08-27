const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Dummy database in memory
const USERS_FILE_PATH = path.join(__dirname, 'comments.json');