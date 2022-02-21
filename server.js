//import variables
const express = require('express');
const fs = require('fs');
const path = require('path')
const { notes } = require('./db/db.json');
// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');
const PORT = process.env.PORT || 3002;
const app = express();

//middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);
app.use(express.static('public'));


// function that filters through an array by the note's id
function findById(id, notesArray) {
  const result = notesArray.filter(note => note.id === id)[0];
  return result;
};

// function that allows new note creation from client
function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify({ notes: notesArray}, null, 4)
  );
  
  return note;
};

// function that validates new entries into the notes array
function validateNote(note) {
  if (!note.title) {
    return false;
  }
  if (!note.text) {
    return false;
  }
  return true;
};

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

// if no entry exists for that record, return an error
app.get('/api/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
})

// accept data to be used or stored server-side
app.post('api/notes', (req, res) => {
  // set id based on the next index
  req.body.id = notes.length.toString();
  // if note is missing inforrmation, send back 400 errorr
  if(!validateNote(req.body)) {
    res.status(400).send('The title or text is missing from this note.');
  } else {
    // add note to json file through the notes array
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

// serve up index page html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
// serve up notes page html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});
// serve up wildcard routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});


// listener
app.listen(PORT, () => {
  console.log(`API server now live on PORT ${PORT}! `)
})

// https://arcane-ravine-03617.herokuapp.com/