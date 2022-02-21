const fs = require('fs');
const path = require('path');

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
    path.join(__dirname, '../db/db.json'),
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

module.exports = {
  findById,
  createNewNote,
  validateNote
};