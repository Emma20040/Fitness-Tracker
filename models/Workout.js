const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  type: { 
    type: String, 
    required: true,
    enum: ['cardio', 'strength', 'flexibility', 'balance'] 
  },
  duration: { 
    type: Number, 
    required: true,
    min: 1 // Minimum 1 minute
  },
  caloriesBurned: { 
    type: Number, 
    required: true,
    min: 1 // Minimum 1 calorie
  },
  date: { 
    type: Date, 
    required: true,
    default: Date.now 
  },
  exercises: [{
    name: String,
    sets: Number,
    reps: Number,
    weight: Number,
    duration: Number
  }]
});

module.exports = mongoose.model('Workout', workoutSchema);