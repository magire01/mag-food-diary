const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const moment = require("moment");
const db = require("./models");
const { reset } = require("nodemon");

require('dotenv').config()
const PORT = process.env.PORT || 5000;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view

app.use(cors({ origin : [ "http://127.0.0.1:5000/"]}));
app.use(express.static(path.join(__dirname, 'public')));

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

mongoose.connect(process.env.URI,
  { useNewUrlParser: true, useFindAndModify: false },
  (err, res) => {
    try {
        console.log('Connected to Database');
    } catch (err) {
        throw err;
    }
});



// home page route
app.get('/',(req, res) =>{
  res.sendFile(__dirname + '/index.html');
});
//date page route
app.get("/date", (req, res) => {
  res.sendFile(__dirname + '/public/pages/date.html')
})
//post page route
app.get("/diary", (req, res) => {
  res.sendFile(__dirname + '/public/pages/post.html')
})
//diary page route
app.get("/diary/summary", (req, res) => {
  res.sendFile(__dirname + '/public/pages/diary.html')
})
//user object for findOne query

//summary page route
app.get("/summary/", (req, res) => {
    res.sendFile(__dirname + '/public/pages/summary.html')
  
})

//Today's date
const currentDay = moment().format("dddd");
const currentDate = moment().format("l");
const currentStamp = moment().format("DDMMYYYY");
const currentWeek = {
  dddd: [moment().subtract("3", "days").format("dddd"), moment().subtract("2", "days").format("dddd"), moment().subtract("1", "days").format("dddd"), moment().format("dddd"), moment().add("1", "days").format("dddd"), moment().add("2", "days").format("dddd"), moment().add("3", "days").format("dddd")],
  l: [moment().subtract("3", "days").format("l"), moment().subtract("2", "days").format("l"), moment().subtract("1", "days").format("l"), moment().format("l"), moment().add("1", "days").format("l"), moment().add("2", "days").format("l"), moment().add("3", "days").format("l")],
  stamp: [moment().subtract("3", "days").format("DDMMYYYY"), moment().subtract("2", "days").format("DDMMYYYY"), moment().subtract("1", "days").format("DDMMYYYY"), moment().format("DDMMYYYY"), moment().add("1", "days").format("DDMMYYYY"), moment().add("2", "days").format("DDMMYYYY"), moment().add("3", "days").format("DDMMYYYY")]
}
//get day
app.get("/day", (req, res) => {
  return res.send({ day: currentDay, date: currentDate, stamp: currentStamp, week: currentWeek });
})
// app.get("/week", (req, res) => {
//   return res.send([days[d-1], days[d], days[d+1]]);
// })
// app.get("/food/all", (req, res) => {
//   return db.Food.find()
//   .then(result => console.log(result))
// })

//get food for today
app.get("/summary/:user/:stamp", (req, res) => {
  return db.Food.findOne({ user: req.params.user, stamp: req.params.stamp })
  .then(result => {

    if(!result) {
      res.send(null)
    } else {
      res.json(result)
    }
    
    
    
  })
  .catch(err => console.log(err))
})
//Post Day with first meal
app.post("/food/post", (req, res) => {
  
  db.Food.create({
    user: req.body.user,
    day: days[d],
    meal: req.body.meal
    })
  .then(console.log(`Successfully added`))
  .catch(err => console.log(err))
})
// add meal
app.put("/add/:user/:day", (req, res) => {
  db.Food.findOneAndUpdate({ user: req.params.user, day: req.params.day }, { $push: { meal: req.body.meal} })
  .then(console.log(`Successfully added`))
  .catch(err => console.log(err))
})





