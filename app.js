const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();

app.use(cors());

const port = process.env.PORT || 4910;

app.listen(port, () => {
    console.log(`Live on http://localhost:${port}`);
    
})