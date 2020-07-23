const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        default: 'low'
    },
    scheduled: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    state: {
        type: String,
        default: 'pending'
    },
});

module.exports = mongoose.model('task', TaskSchema);