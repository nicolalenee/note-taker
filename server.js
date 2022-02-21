//import variables
const express = require('express');
const { notes }= require('./db/db.json');
const PORT = process.env.PORT || 3002;
const app = express();

// function that filters through an array by the note's id
function findById(id, notesArray) {
  const result = notesArray.filter(note => note.id === id)[0];
  return result;
}

// get all notes 
app.get('/api/notes', (req, res) => {
  const results = notes;
  res.json(results);
  console.log(notes)
})

// get notes by id
app.get('/api/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  res.json(result);
  console.log(result)
})

// if no entry exists for that record, return the error
app.get('/api/animals/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
})

// listener
app.listen(3002, () => {
  console.log(`API server now live on PORT ${PORT}! `)
})

// https://arcane-ravine-03617.herokuapp.com/