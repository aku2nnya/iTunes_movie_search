const axios = require('axios');


function getMovieData(req, res) {
  axios.get(`https://itunes.apple.com/search?entity=movie&term=${req.params.searchTerm}`)
    .then((response) => res.send(response.data))
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
}


module.exports = { getMovieData };
