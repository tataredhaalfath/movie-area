import './movie-item.js';

class MovieList extends HTMLElement {
  set movies(movies) {
    this._movies = movies;
    this.render();
  }

  renderError(message) {
    this.innerHTML = '';
    this.innerHTML = `
      <div class="container align-center">
        <h2 class="placeholder msg-error text-muted">${message}</h2>
      </div>
    `;
  }

  render() {
    this.setAttribute('class', 'row');
    this.setAttribute('id', 'movie-list');
    this.innerHTML = '';
    this._movies.forEach((movie) => {
      const movieItemElement = document.createElement('movie-item');
      movieItemElement.movie = movie;
      this.appendChild(movieItemElement);
    });
  }
}
customElements.define('movie-list', MovieList);
