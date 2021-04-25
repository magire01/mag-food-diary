const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
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


app.get('/',(req, res) =>{
    res.sendFile(__dirname + '/index.html');
});

app.get("/test", (req, res) => {
    return db.Food.find({})
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

app.post("/post/food", (req, res) => {
  db.Food.create({
    foodName: req.body.foodName
  })
  .then(console.log(`Successfully added ${req.body.foodName}`))
  .catch(err => console.log(err))
})




