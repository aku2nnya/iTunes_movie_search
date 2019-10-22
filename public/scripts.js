const movieSearchButton = document.querySelector('#movieSearchButton');
const movieSearchTerm = document.querySelector('#movieSearchTerm');

function getMovieData(e) {
  axios.get(`/${movieSearchTerm.value}`)
    .then((response) => console.log(response.data))
    .catch((error) => console.error(error));
  e.preventDefault();
}

movieSearchButton.addEventListener('click', getMovieData);
