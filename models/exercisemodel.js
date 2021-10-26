const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Booking must belong  to a Tour!']
  },
  duration: {
    type: Number,
    required: [true, 'A exercise must have a duration']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  difficulty: {
    type: String,
    required: [true, 'a tour must have a difficulty'],
    enum: {
      values: ['easy', 'medium', 'difficult'],
      message: 'Difficulty is either: easy, medium, difficulty'
    }
  },
  category: {
    type: String,
    required: [true, 'an exercise must have a category'],
    enum: {
      values: ['aerobic', 'anearobic'],
      message: 'category is either aerobic or anearobic'
    }
  },
  focalPoint:{
    type: String,
    required: [true, 'an exercise must have a focal point'],
    enum: {
      values: ['upperbody', 'chest', 'arms', 'lowerbody','legs','neck','core'],
      message: 'focal points are parts of the body'
    }
  }
});

const Excercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Excercise;