const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

// const foodSchema = new Schema({
//   username: { type: String, required: true },
//   firstName: { type: String, required: true },
//   food: [{
//       foodName: { type: String, required: true },
//       calories: { type: Number, required: false },
//       datePosted: { type: String, required: true, default: moment().format('MM-DD-YYYY hh:mm a') }
//   }],
// });

const foodSchema = new Schema({
    foodName: { type: String, required: true }
  });

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;