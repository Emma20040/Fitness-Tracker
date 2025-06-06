const express = require('express');
const router = express.Router();
const authController = require('./controllers/authController');
const workoutController = require('./controllers/workoutController');
const goalController = require('./controllers/goalController');
const auth = require('./middleware/auth');

// Authentication Routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/me', auth, authController.getMe);

// Workout Routes (protected)
router.post('/workouts', auth, workoutController.logWorkout);
router.get('/workouts', auth, workoutController.getWorkouts);
router.get('/workouts/:id', auth, workoutController.getWorkout);
router.put('/workouts/:id', auth, workoutController.updateWorkout);
router.delete('/workouts/:id', auth, workoutController.deleteWorkout);

// Goal Routes (protected)
router.post('/goals', auth, goalController.setGoal);
router.get('/goals', auth, goalController.getGoals);
router.get('/goals/:id', auth, goalController.getGoal);
router.put('/goals/:id', auth, goalController.updateGoal);
router.delete('/goals/:id', auth, goalController.deleteGoal);

module.exports = router;