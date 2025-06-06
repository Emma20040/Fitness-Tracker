const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  type: { 
    type: String, 
    required: true,
    enum: ['weight', 'workout', 'calories', 'distance', 'other'] 
  },
  target: { 
    type: Number, 
    required: true 
  },
  current: { 
    type: Number, 
    default: 0 
  },
  unit: String,
  deadline: Date,
  isAchieved: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Goal', goalSchema);

cindynaah235@gmail 
Cindy
Naah
681164542