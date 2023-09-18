const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    is_completed: {
        type: Boolean,
        required: true,
        default: false,
    },
});

module.exports = Todo = mongoose.model('todo', TodoSchema);