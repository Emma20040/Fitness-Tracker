const Workout = require('../models/Workout');

// Create new workout
exports.logWorkout = async (req, res) => {
  try {
    const { type, duration, caloriesBurned, exercises } = req.body;
    
    const workout = new Workout({
      user: req.user.id, // From authenticated user
      type,
      duration,
      caloriesBurned,
      exercises
    });
    
    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all workouts for user
exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id })
      .sort({ date: -1 }); // Newest first
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single workout
exports.getWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.user.id // Ensure user owns the workout
    });
    
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    
    res.json(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update workout
exports.updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // Verify ownership
      req.body,
      { new: true } // Return updated document
    );
    
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    
    res.json(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete workout
exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id // Verify ownership
    });
    
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    
    res.json({ message: 'Workout deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};