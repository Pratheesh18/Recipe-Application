const express = require('express');
const connectDatabase = require('./database/db');
const dotenv  = require('dotenv');
const cors = require('cors');

dotenv.config();

connectDatabase();