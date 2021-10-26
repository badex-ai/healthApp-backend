const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, 'Each user must have a name'],
        unique: true,
        trim: true,
        maxlength: [20, 'A user name must have less or equal than 20 character'],
        minlength: [2, 'A user name must have less or equal than 2 character']
      },
  height: {
    type: Number,
    required: [true, 'height must be provided!']
  },
  weight: {
    type: Number,
    required: [true, 'weight must be provided!']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  bloodPressure:{
    type: Number,
    required: [true, 'bloodPressure must be provided!']
  },
  bloodGlucose:{
    type: Number,
    required: [true, 'bloodGlucose must be provided!']
  },
  BMI:{
    type: Number,
    required: [true, 'BMI must be provided!']
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  }

  

});
const User = mongoose.model('User', userSchema);
module.exports = User;