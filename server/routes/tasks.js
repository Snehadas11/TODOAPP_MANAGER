const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Middleware to simulate user authentication (replace with real auth later)
const requireAuth = (req, res, next) => {
  // For now, hardcoding a user ID for testing:
  req.user = { id: '64a1f8bc9f1b146d3e33abcd' }; // Replace with actual logged-in user id
  next();
};

router.use(requireAuth);

// GET all tasks for the logged-in user
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create a new task
router.post('/', async (req, res) => {
  try {
   const { task } = req.body;
const newTask = new Task({
  userId: req.user.id,
  title: task,
  description: '',
  dueDate: null,
  status: 'pending'
});

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update a task by id
router.put('/:id', async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, description, dueDate, status },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a task by id
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
