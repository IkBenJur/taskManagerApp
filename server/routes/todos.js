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
        console.log('Request Body:', req.body);
        const createdTodo = await Todo.create(req.body);
        res.json({ message: 'Todo Created Succesfully', todo: createdTodo });
    } catch (err) {
        res.status(400).json({ error: 'Unable To Add This Todo' });
    }
});

module.exports = router;