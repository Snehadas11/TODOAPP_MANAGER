const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Middleware to check authentication
function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Not authenticated' });
}

// In routes/todo.js

router.get('/', ensureAuth, async (req, res) => {
  try {
    const { search, status, dueDate } = req.query;

    // Build query object
    const query = { userId: req.user.id };

    if (search) {
      query.title = { $regex: search, $options: 'i' }; // case-insensitive search by title
    }

    if (status && ['Open', 'Complete'].includes(status)) {
      query.status = status;
    }

    if (dueDate) {
      // Match todos with dueDate equal to given date (consider timezone)
      // We find dueDate between start and end of the day
      const start = new Date(dueDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(dueDate);
      end.setHours(23, 59, 59, 999);
      query.dueDate = { $gte: start, $lte: end };
    }

    const todos = await Todo.find(query).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    console.error('Error in GET /todos:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Create new todo
router.post('/', ensureAuth, async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    const newTodo = new Todo({
      title,
      description,
      dueDate,
      userId: req.user.id,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error('Error in POST /todos:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update todo by ID - updated to support status toggle
router.put('/:id', ensureAuth, async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.user.id });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const { title, description, dueDate, status } = req.body;

    todo.title = title !== undefined ? title : todo.title;
    todo.description = description !== undefined ? description : todo.description;
    todo.dueDate = dueDate !== undefined ? dueDate : todo.dueDate;

    // Only update status if it's a valid value
    if (status && ['Open', 'Complete'].includes(status)) {
      todo.status = status;
    }

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    console.error('Error in PUT /todos/:id:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete todo by ID
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    const deleted = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    console.error('Error in DELETE /todos/:id:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
