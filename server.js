const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const moment = require("moment");
const db = require("./models");

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

//Today's date
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const d = moment().day();
//get day
app.get("/day", (req, res) => {
  return res.send(days[d]);
})
app.get("/week", (req, res) => {
  return res.send([days[d-1], days[d], days[d+1]]);
})
//get food for today
app.get("/food/:user/:day", (req, res) => {
  return db.Food.find({ user: req.params.user, day: req.params.day })
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





