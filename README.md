# Covid19 API

[![Build Status](https://travis-ci.com/bolorundurovj/Covid-API.svg?branch=master)](https://travis-ci.com/bolorundurovj/Covid-API)

Get International Covid-19 data


> This api is live
> Retrieves raw data from John Hopkins University in CSV format, and provides response in JSON


## Demo
Check the `live API` <a href="https://ncovid19api.herokuapp.com/"> here</a>
<br>

## 💻 Requirements
* Any Operating System (ie. MacOS X, Linux, Windows)
* Any IDE with NODE installed on your system
* A little knowledge of NodeJS
* Hands to code 🤓
* A brain to think 🤓

## ✨ Features
- Covid19 Data By Country
- Covid19 Data For All Countries
- Covid19 Geo Data
- Covid19 Progression By Country
- Covid19 Progression For All Countries


## Dependencies
* [Node Cron](https://www.npmjs.com/package/node-cron)
* [ExpressJS Framework](https://expressjs.com/)
* [Mongoose](https://mongoosejs.com/)
* [Cors](https://www.npmjs.com/package/cors)
* [Csv Parser](https://www.npmjs.com/package/csv-parser)

## Routes
- #### / || Contains api documentation
- #### /all || Get the world total, as well as every country’s data
- #### /country/{country} || Get the latest update on each country
- #### /timeline/{country} || Get the timeline of daily cases in a specific country from January 2020 to date
- #### /timeline/all || Get the timeline of the daily cases for all countries from January 2020 to date
- #### /geojson || Get data in GeoJSON format, which is optimised for populating maps

## Getting started

#### 1. [Setting up Node & NPM](#)

#### 2. Clone the repo

```sh
$ git clone #
$ cd #
```

#### 3. Install Dependencies

```sh
$ npm install
```

#### 4. Create .env file and add db URL

```sh
$ mongodb://localhost:27017/covidapi
```

#### 5. Run the application

```sh
$ npm start
```


## 📸 ScreenShots

|<img src="#" width="250">|



## :heart: Found this project useful?
#### If you found this project useful or you like what you see, then please consider giving it a :star: on Github and sharing it with your friends via social media.

## 🐛 Bugs/Request
#### Encounter any problem(s)? feel free to open an issue. If you feel you could make something better, please raise a ticket on Github and I'll look into it. Pull request are also welcome.

