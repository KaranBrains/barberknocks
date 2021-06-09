const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Service', ServiceSchema);