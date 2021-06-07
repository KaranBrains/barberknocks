const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
  client : {
    type: String,
    required: true,
  },
  clientName : {
    type: String,
    required: true,
  },
  instructor : {
    type: String,
    required: true,
  },
  instructorName : {
    type: String,
    required: true,
  },
  slot : {
    type: String,
    required: true,
  },
  date : {
    type: String,
    required: true,
  },
  time : {
    type: String,
    required: true,
  },
  status : {
    type: String,
    required: true,
  },
  modeOfPayment : {
    type: String,
    required: true,
  },
  price : {
    type: String,
    required: true,
  },
  feedback : {
    type: String,
  },
  address : {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  }
});

module.exports = mongoose.model('Ride', RideSchema);