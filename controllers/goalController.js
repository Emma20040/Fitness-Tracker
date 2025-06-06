const Goal = require('../models/Goal');

// Create new goal
exports.setGoal = async (req, res) => {
  try {
    const { type, target, unit, deadline } = req.body;
    
    const goal = new Goal({
      user: req.user.id,
      type,
      target,
      unit,
      deadline
    });
    
    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all goals for user
exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id })
      .sort({ createdAt: -1 }); // Newest first
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single goal
exports.getGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({
      _id: req.params.id,
      user: req.user.id // Verify ownership
    });
    
    if (!goal) return res.status(404).json({ error: 'Goal not found' });
    
    res.json(goal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update goal progress
exports.updateGoal = async (req, res) => {
  try {
    const { current, isAchieved } = req.body;
    
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { current, isAchieved },
      { new: true }
    );
    
    if (!goal) return res.status(404).json({ error: 'Goal not found' });
    
    res.json(goal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete goal
exports.deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id // Verify ownership
    });
    
    if (!goal) return res.status(404).json({ error: 'Goal not found' });
    
    res.json({ message: 'Goal deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};