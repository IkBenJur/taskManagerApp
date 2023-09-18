const express = require('express');
const connectDB = require('./db/conn');
const cors = require('cors');
require('dotenv').config({ path: './config.env' });
const port = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

const todos = require('./routes/todos');

app.get('/', (req, res) => {
    res.send('Hello teskmanager!');
});

app.use('/todos', todos);

app.listen(port,() => console.log(`Listening on port: ${port}. \nGo to link http://localhost:${port}/`));