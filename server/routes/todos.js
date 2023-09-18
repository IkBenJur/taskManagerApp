const express = require('express');
const router = express.Router();

const Todo = require('../db/models/Todo');

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(404).json({ notodosfound: 'No Todos Found!' });
    };
});

router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        res.json(todo);
    } catch (err) {
        res.status(404).json({ notodosfound: 'No Todos Found!' });
    };
});

router.post('/', async (req, res) => {
    try {
        const createdTodo = await Todo.create(req.body);
        res.json({ message: 'Todo Created Succesfully', todo: createdTodo });
    } catch (err) {
        res.status(400).json({ error: 'Unable To Add This Todo' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: 'Todo Updated Succesfully', todo: updatedTodo });
    } catch (err) {
        res.status(400).json({ message: 'Unable To Update Todo' });
    }
})

module.exports = router;