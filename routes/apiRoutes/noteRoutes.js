const router = require('express').Router();
const { findById, createNewNote, validateNote } = require('../../lib/notes');
const { notes } = require('../../db/db.json')


// get all notes 
router.get('/notes', (req, res) => {
  const results = notes;
  res.json(results);
  console.log(notes)
})

// get notes by id
router.get('/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  res.json(result);
  console.log(result)
})

// if no entry exists for that record, return an error
router.get('/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
})

// accept data to be used or stored server-side
router.post('/notes', (req, res) => {
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

module.exports = router;