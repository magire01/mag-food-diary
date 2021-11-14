const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const moment = require("moment");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const AWS = require("aws-sdk");

app.use(cookieParser());
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

const corsOptions ={
  origin: true,
  methods: "OPTIONS, GET, POST, PUT",
  credentials: true,   
  optionSuccessStatus:200
}
app.use(cors(corsOptions))
app.use(express.static(path.join(__dirname, 'public')));


// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

//AWSCONFIG

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_USER = "food-diary-user";
const TABLE_INFO = "food-diary-info";


// home page route
app.get('/', (req, res) =>{
  res.sendFile(__dirname + '/index.html');
});
//date page route
app.get("/date", (req, res) => {
  const token = req.cookies.token
  if (!token) {
    res.send(401)
  } else {
    res.sendFile(__dirname + '/public/pages/date.html')
  }
})
//summary page route
app.get("/summary/", (req, res) => {
  const token = req.cookies.token
  if (!token) {
    res.send(401)
  } else {
    res.sendFile(__dirname + '/public/pages/summary.html')
  }
})
//Start new day route
app.get("/startDay/", (req, res) => {
  const token = req.cookies.token
  if (!token) {
    res.send(401)
  } else {
    res.sendFile(__dirname + '/public/pages/startDay.html')
  }
})

//sign up route
app.get("/signUp", (req, res) => {
  res.sendFile(__dirname + '/public/pages/signUp.html')
})

//login

app.post("/login/", (req, res) => {
  const params = {
    TableName: TABLE_USER,
    Key: {
      user: req.body.user
    }
  }
  dynamoClient.get(params).promise()
  .then(async user => {
    if (await bcrypt.compare(req.body.password, user.Item.password)) {
      const jwtExpirySeconds = 1000
      const accessToken = jwt.sign({ user }, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: jwtExpirySeconds
      })  
      res.send(accessToken)
      //res.cookie("token", accessToken, { maxAge: jwtExpirySeconds * 1000 })
      
      app.get("/summary/", (req, res) => {
        const token = req.cookies.token
        if (!token) {
          res.send(401)
        } else {
          res.sendFile(__dirname + '/public/pages/summary.html')
        }
      })
      res.end()

    } else {
      res.json({ message: "Invalid Credentials" });
      console.log("Invalid Credentials")
    }
  })
})



// //Register User

app.post("/create/profile", async(req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = { user: req.body.username, password: hashedPassword }
    const params = {
      TableName: TABLE_USER,
      Item: user
    }
    await dynamoClient.put(params).promise()
    .then(console.log("Success!"))
  } catch {
    res.status(201).send()
  }
});

//Post Day with first meal
app.post("/create/item", async (req, res) => {
  const item = {
    _id: req.body.user + req.body.stamp,
    user: req.body.user,
    day: req.body.day,
    date: req.body.date,
    stamp: req.body.stamp,
    meal: [
      req.body.meal
    ]

  }
  const params = {
    TableName: TABLE_INFO,
    Item: item
  }
  await dynamoClient.put(params).promise()
  .then(console.log(params))
  .catch(err => console.log(err))
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

//get food for today
app.get("/summary/:user/:stamp", async (req, res) => {

  const params = {
    TableName: TABLE_INFO,
    Key: {
      _id: req.params.user + req.params.stamp
    }
  }

  await dynamoClient.get(params).promise()
  .then(result => res.send(result.Item))
  .catch(err => console.log(err))
})

// add meal
app.put("/add/:user/:stamp", async (req, res) => {
  const params = {
    TableName: TABLE_INFO,
    Key: { _id: req.params.user + req.params.stamp },
    UpdateExpression: 'set #meal = list_append(#meal, :items)',
    ExpressionAttributeNames: {
      '#meal': 'meal'
    },
    ExpressionAttributeValues: {
      ':items': req.body.meal
      }
  }
  await dynamoClient.update(params).promise()
  .catch(err => console.log(err))
})
