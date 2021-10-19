const express = require('express');
const cors = require('cors');
const path = require('path');
const rateLimit = require("express-rate-limit");

require('dotenv').config();

const { connectDB, runCronJob } = require('./utils')

//Connect to database
connectDB();

//Run cron jobs
runCronJob()

const app = express();


//Route files
const v1 = require('./routes/v1');
const v2 = require('./routes/v2');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'docs')));

// limit each IP to 100 requests every 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

const port = process.env.PORT || 4915;


//Mount routers
app.use('/', v1);
app.use('/v2', v2);



app.listen(port, () => {
  console.log(`Live on http://localhost:${port}`);
});
