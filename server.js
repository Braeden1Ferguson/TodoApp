/*
Autheror: Braeden Ferguson
Project: Todo List Application
Date: November 12, 2023
*/
//Setting up server to PORT 5000

const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

let tasks = [];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const newTask = { id: Date.now(), text: req.body.text, completed: false };
    tasks.push(newTask);
    res.json(newTask);
});

app.delete('/taks/:id', (req, res) => {
    tasks = tasks.filter((task) => task.id !== parseInt(req.params.id));
    res.json({ message: 'Task deleted successfully'});
});

app.patch('/tasks/:id', (req, res) => {
    const taskToUpdate = tasks.find((task) => task.id === parseInt(req.params.id));
    taskToUpdate.completed = req.body.completed;
    res.json(taskToUpdate);
});


app.listen(PORT, () => {
    console.log('Server is running on $(PORT}');
});