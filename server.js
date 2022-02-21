const express = require('express');
const { notes }= require('./data/notes');

const app = express();

function filterByQuery(query, notesArray) {
  let filteredResults = notesArray;
  if(query.title) {
    filteredResults = filteredResults.filter(note => note.title === query.title);
  }
  if(query.text) {
    filteredResults = filteredResults.filter(note => note.text === query.text)
  }
  return filteredResults;
}

app.get('/api/notes', (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
})

app.listen(3001, () => {
  console.log(`API server now live on PORT 3001! `)
})