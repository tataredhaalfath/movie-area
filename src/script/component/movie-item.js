class MovieItem extends HTMLElement {
  set movie(movie) {
    this._movie = movie;
    this.render();
  }

  render() {
    function getColor(vote) {
      if (vote >= 8) {
        return 'green';
      } else if (vote >= 5) {
        return 'orange';
      } else {
        return 'red';
      }
    }
    this.innerHTML = `
        <div class="card mb-3">
            <img src="http://image.tmdb.org/t/p/w500/${this._movie.poster_path || this._movie.poster_path}" class="card-img-top" alt="..." height="450">
            <div class="card-body">
            <h5 class="card-title">${this._movie.title}</h5>
            <h6 class="card-subtitle mb-2">${this._movie.release_date}</h6> 
            <a href="#" class="card-link see-detail btn btn-info btn-sm" data-toggle="modal" 
            data-target="#exampleModal" data-id=${this._movie.id}>See Detail</a>
            <span class="vote-average ${getColor(this._movie.vote_average)}">${this._movie.vote_average}</span>
            </div>
        </div>
          `;
  }
}

customElements.define('movie-item', MovieItem);
