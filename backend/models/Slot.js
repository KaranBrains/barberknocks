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
  stylist: {
    type: String,
    required: true,
  },
  stylistName: {
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