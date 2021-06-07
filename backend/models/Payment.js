const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  session : {
    type: String,
    required: true,
  },
  slot : {
    type: String,
    required: true,
  },
  client : {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Payment', PaymentSchema);