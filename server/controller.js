const axios = require('axios');


const getMovieData = (req, res) => {
  axios.get(`https://itunes.apple.com/search?entity=movie&term=${req.params.searchTerm}`)
    .then((response) => res.send(response.data))
    .catch((error) => console.error(error));
};


module.exports = { getMovieData };
