const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const foodSchema = new Schema({
    user: { type: String, required: true },
    day: { type: String, required: true},
    date: { type: String, required: true},
    stamp: { type: String, required: true},
    meal: [{
        mealName: { type: String, required: true },
        foodName: { type: String, required: true },
        calories: { type: Number, required: false },
        comments: { type: String, required: false },
        datePosted: { type: String, required: true, default: moment().format('MM-DD-YYYY hh:mm a') }
    }]
  });

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;