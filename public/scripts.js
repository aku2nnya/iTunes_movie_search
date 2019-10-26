const movieSearchButton = document.querySelector('#movieSearchButton');
const movieSearchTerm = document.querySelector('#movieSearchTerm');
const movieList = document.querySelector('.movieList');
const hideCheckbox = document.querySelector('#hideCheckbox');
const hideCheck = document.querySelector('#hideCheck');


function displayMovieList(data) {
  if (data === '') movieList.innerHTML = '<br><div class="noMatch">Please enter text to search!</div>';
  else if (data === '?') movieList.innerHTML = '<br><div class="noMatch">Entered text is not supported!</div>';
  else if (data.resultCount === 0) movieList.innerHTML = '<br><div class="noMatch">No matches found!</div>';
  else if (data.resultCount) {
    const fullList = data.results.map((result) => {
      let movieTitle = result.trackName;
      const movieArtwork = result.artworkUrl100;
      let movieShortDescription = result.shortDescription;
      let movieRentalPrice = result.trackRentalPrice;
      const moviePageUrl = result.trackViewUrl;
      if (!movieTitle) movieTitle = 'Title unavailable';
      if (!movieShortDescription) movieShortDescription = 'Description unavailable';
      else movieShortDescription += '...';
      if (!movieRentalPrice && hideCheck.checked) return '';
      if (!movieRentalPrice) {
        return `
          <li class="movieInfoNoRent">
            <img src=${movieArtwork} alt="Movie Image">
            <ul class="movieData">
              <li class="movieTitle">${movieTitle}</li>
              <li class="movieShortDescription">${movieShortDescription}</li>
              <br>
              <li class="movieRentalPriceNone">Unavailable for rent</li>
            </ul>
          </li>
        `;
      }
      movieRentalPrice = `<li class="movieRentalPrice"><a href="${moviePageUrl}" target="_blank">Rent for: $${movieRentalPrice}</a></li>`;
      return `
        <li class="movieInfo">
          <img src=${movieArtwork} alt="Movie Image">
          <ul class="movieData">
            <li class="movieTitle">${movieTitle}</li>
            <li class="movieShortDescription">${movieShortDescription}</li>
            <br>
            ${movieRentalPrice}
          </ul>
        </li>
      `;
    }).join('');
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

function hideUnavailable(e) {
  e.preventDefault();
  const movieInfoNoRent = document.querySelectorAll('.movieInfoNoRent');
  e.target.control.checked = !e.target.control.checked;
  if (e.target.control.checked) {
    movieInfoNoRent.forEach((movieInfo) => {
      const movieNoRent = movieInfo;
      movieNoRent.style.display = 'none';
    });
  } else {
    movieInfoNoRent.forEach((movieInfo) => {
      const movieNoRent = movieInfo;
      movieNoRent.style.display = 'flex';
    });
  }
}

movieSearchButton.addEventListener('click', getMovieData);
hideCheckbox.addEventListener('click', hideUnavailable);
