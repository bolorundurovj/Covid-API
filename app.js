const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const {connectDB} = require('./utils') 

//Connect to database
connectDB();

const app = express();


//Route files
const v1 = require('./routes/v1');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'docs')));

const port = process.env.PORT || 4915;


//Mount routers
app.use('/', v1);



app.listen(port, () => {
  console.log(`Live on http://localhost:${port}`);
});
