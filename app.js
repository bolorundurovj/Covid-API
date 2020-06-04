const express = require("express");
const request = require("request");
const cors = require("cors");
const mongoose = require("mongoose");
const cron = require("node-cron");
const fs = require('fs');
const csv = require('csv-parser');

const app = express();

const Data = require("./models/data");

app.use(cors());

const port = process.env.PORT || 4910;

mongoose.connect("mongodb://localhost:27017/covid19Api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("Database connection succeeded for covid19 Api");
});

cron.schedule("17 30 * * * *", () => {
  let date = new Date();
  let day = date.getUTCDay();
  let year = date.getUTCFullYear();
  let month = date.getUTCMonth();
  let time =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  let previousDay = day - 1;
  let correctMonth = month + 1;

  console.log("Date: " + date);
  console.log("Day: " + day);
  console.log("Year: " + year);
  console.log("Month: " + month);
  console.log("Time: " + time);
  console.log("Previous Day: " + previousDay);

  if (previousDay < 10) {
    previousDay = "0" + previousDay;
    console.log("Day Checked: " + previousDay);
  }
  if (correctMonth < 10) {
    correctMonth = "0" + correctMonth;
    console.log("Month: " + correctMonth);
  }

  let newDate = correctMonth + "-" + previousDay + "-" + year;

  let fileName = newDate + ".csv";

  const file = fs.createWriteStream(fileName);

  const results = [];
  var data = [];
  var totalConfirmed = 0;
  var totalDeaths = 0;
  var totalRecovered = 0;

  request
    .get(
      `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${fileName}`
    )
    .on("error", function (err) {
      console.error(err);
    })
    .pipe(file)
    .on("finish", () => {
      fs.createReadStream(fileName)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
          console.log(results);

        //   if(results > 0){

        //   }
        });
    });
});

app.listen(port, () => {
  console.log(`Live on http://localhost:${port}`);
});
