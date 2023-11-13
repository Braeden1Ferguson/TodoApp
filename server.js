/*
Autheror: Braeden Ferguson
Project: Todo List Application
Date: November 12, 2023
*/
//Setting up server to PORT 5000

const express = require('express');
const cors = require('cors');
const { DateTime } = require('luxon');
const fs = require('fs');
const app = express();
const PORT = 5001;



app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

let tasks = [];

//getting list of tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

try {
    const data = fs.readFileSync('schedule.json');
    tasks = JSON.parse(data);
    console.log('Schedule loaded successfully.');
  } catch (err) {
    console.error('Error loading schedule:', err.message);
    //create empty array if file loading of schedule.json fails
    tasks = [];
    console.log('Created empty schedule');
  }


  
  // Save tasks to JSON file
  const saveSchedule = () => {
    fs.writeFileSync('schedule.json', JSON.stringify(tasks), 'utf-8');
    console.log('Schedule saved successfully.');
  };

  // Middleware to save schedule on every request
app.use((req, res, next) => {
    saveSchedule();
    next();
  });


//creates a new task based on the CRUD opperations in App.js
app.post('/tasks', (req, res) => {
    const { text, dueDate } = req.body;
    
    const newTask = { 
        id: Date.now(), 
        text: req.body.text, 
        completed: false,
        dueDate: dueDate ? DateTime.fromISO(dueDate, { zone: 'America/New_York' }).toISO() : null,
    };
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