  
const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
  booking: {
    type: String,
    required: true,
  },
  stars: {
    type: String,
    required: true,
  },
  clientName : {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
  }
});

const StylistSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  phone :{
    type: String,
    required: true,
  },
  email :{
    type: String,
    required: true,
  },
  city :{
    type: String,
    required: true,
  },
  rating: [RatingSchema],
});

module.exports = mongoose.model('Stylist', StylistSchema);