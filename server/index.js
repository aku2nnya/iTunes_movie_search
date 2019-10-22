const express = require('express');
const { getMovieData } = require('./controller');


const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/:searchTerm', getMovieData);

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
