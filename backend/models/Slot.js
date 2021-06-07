const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  clientLimit: {
    type: Number,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  instructorName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  booking :{
    type: String,
  }
});

module.exports = mongoose.model('Slot', SlotSchema);