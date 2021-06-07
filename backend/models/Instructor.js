  
const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
  ride: {
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

const InstructorSchema = new mongoose.Schema({
  fullName: {
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
  rating: [RatingSchema],
});

module.exports = mongoose.model('Instructor', InstructorSchema);