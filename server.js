//import variables
const express = require('express');
const fs = require('fs');
const path = require('path')
const { notes } = require('./db/db.json');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const PORT = process.env.PORT || 3002;
const app = express();

//middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
app.use(express.static('public'));

// listener
app.listen(PORT, () => {
  console.log(`API server now live on PORT ${PORT}! `)
})


// https://arcane-ravine-03617.herokuapp.com/