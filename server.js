/*
Autheror: Braeden Ferguson
Project: Todo List Application
Date: November 12, 2023
*/
//Setting up server to PORT 5000

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

let tasks = [];

//getting list of tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

//creates a new task based on the CRUD opperations in App.js
app.post('/tasks', (req, res) => {
    const newTask = { id: Date.now(), text: req.body.text, completed: false };
    tasks.push(newTask);
    res.json(newTask);
});


//See CRUD operations in App.js
app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter((task) => task.id !== parseInt(req.params.id));
    res.json({ message: 'Task deleted successfully'});
});

//updates task completed flag to true for the give id
app.patch('/tasks/:id', (req, res) => {
    const taskToUpdate = tasks.find((task) => task.id === parseInt(req.params.id));
    taskToUpdate.completed = req.body.completed;
    res.json(taskToUpdate);
});


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});