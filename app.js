const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();

const Data = require('./models/data');

app.use(cors());

const port = process.env.PORT || 4910;

let date = new Date();
let day = date.getUTCDay();
let year = date.getUTCFullYear();
let month = date.getUTCMonth();
let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

let previousDay = day - 1;
let correctMonth = month + 1;

console.log("Date: " + date );
console.log("Day: " + day );
console.log("Year: " + year );
console.log("Month: " + month );
console.log("Time: " + time );
console.log("Previous Day: " + previousDay );

if(previousDay < 10){
    previousDay = "0" + previousDay;
    console.log("Day Checked: " + previousDay );
}
if(correctMonth < 10){
    correctMonth = "0" + correctMonth;
    console.log("Month: " + correctMonth );
}


app.listen(port, () => {
    console.log(`Live on http://localhost:${port}`);
    
})