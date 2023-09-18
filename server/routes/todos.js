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
    };
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

        //Check if deletedTodo is not Null
        if (deletedTodo) {
            res.json({ message: 'Todo Deleted Successfully', todo: deletedTodo });
        } else {
            res.status(404).json({ message: 'Todo Not Found' });
        }
    } catch (err) {
        res.status(404).json({ message: 'Unable To Delete Todo' });
    };
});

module.exports = router;