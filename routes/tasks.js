const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Task = require('../models/Task');

// @route   GET api/tasks
// @desc    Get all user's tasks
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        tasks = await Task.find({ user: req.user.id }).sort({ scheduled: -1 });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error.');
    }
});

// @route   POST api/tasks
// @desc    Add new task
// @access  Private
router.post('/', [auth, [
    check('title', 'Title is Required.').not().isEmpty(),
    check('description', 'Description is Required.').not().isEmpty(),
    check('scheduled', 'Task must be scheduled.').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { title, description, priority, scheduled } = req.body;

    try {
        // Create a task object
        const task = new Task({
            title,
            description,
            priority,
            scheduled,
            user: req.user.id
        });

        await task.save();
        res.json(task);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error.');
    }

});

// @route   PUT api/tasks/:id
// @desc    Update task
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { title, description, priority, scheduled } = req.body;

    // Create a task object
    const taskFields = {};
    if(title) taskFields.title = title;
    if(description) taskFields.description = description;
    if(priority) taskFields.priority = priority;
    if(scheduled) taskFields.scheduled = scheduled;

    console.log(taskFields);

    try {
        // Find the task
        let task = await Task.findById(req.params.id);
        // Check if task exist
        if (!task) return res.status(404).json({ msg: 'Task not Found.' });
        // Restricts task updating only to the user
        // that created the task
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not Authorized.' });
        }
        // Updates task
        task = await Task.findByIdAndUpdate(req.params.id, { $set: taskFields }, { new: true } ); 
        // Send updated task to the client
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error.');
    }

});

// @route   DELETE api/tasks/:id
// @desc    Delete task
// @access  Private
router.delete('/:id', auth, async (req, res) => {

    try {
        // Find the task
        let task = await Task.findById(req.params.id);
        // Check if task exist
        if (!task) return res.status(404).json({ msg: 'Task not Found.' });
        // Restricts task updating only to the user
        // that created the task
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not Authorized.' });
        }
        // Deletes task
        await Task.findByIdAndRemove(req.params.id);
        // Send delete confirmation message
        // to the client
        res.json({ msg: 'Task has been Removed.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error.');
    }
});

module.exports = router;