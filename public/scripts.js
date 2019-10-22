const movieSearchButton = document.querySelector('#movieSearchButton');
const movieSearchTerm = document.querySelector('#movieSearchTerm');
const movieList = document.querySelector('.movieList');


function displayMovieList(data) {
  if (data === '') movieList.innerHTML = '<br><div class="noMatch">Please enter text to search!</div>';
  else if (data === '?') movieList.innerHTML = '<br><div class="noMatch">Entered text is not supported!</div>';
  else if (data.resultCount === 0) movieList.innerHTML = '<br><div class="noMatch">No matches found!</div>';
  else if (data.resultCount) {
    const movieTitles = data.results.map((result) => result.trackName);
    const movieArtwork = data.results.map((result) => result.artworkUrl100);
    const movieShortDescription = data.results.map((result) => result.shortDescription);
    const movieRentalPrice = data.results.map((result) => result.trackRentalPrice);
    console.log({ movieTitles, movieArtwork, movieShortDescription, movieRentalPrice });
    const fullList = data.results.map((result) => `
      <img src=${result.artworkUrl100} alt="Movie Image">
      <div class="movieInfo">
        <div class="movieTitle">${result.trackName}</div>
        <div class="movieShortDescription">${result.shortDescription}...</div>
        <div class="movieRentalPrice">${result.trackRentalPrice}</div>
      </div>
    `);
    movieList.innerHTML = fullList;
  } else movieList.innerHTML = `<br><div class="noMatch">Error detected!<div>${data}</div></div>`;
}

function getMovieData(e) {
  e.preventDefault();
  const regex = /[^-*.A-Z0-9]+/gi;
  if (movieSearchTerm.value === '') displayMovieList('');
  else if (movieSearchTerm.value.match(regex) && movieSearchTerm.value.match(regex)[0].length === movieSearchTerm.value.length) displayMovieList('?');
  else {
    axios.get(`/${movieSearchTerm.value}`)
      .then((response) => displayMovieList(response.data))
      .catch((error) => displayMovieList(error));
  }
}

movieSearchButton.addEventListener('click', getMovieData);
