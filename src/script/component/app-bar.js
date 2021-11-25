import './btn-genre.js';

class AppBar extends HTMLElement {
  set genres(genres) {
    this._genres = genres;
    this.render();
  }

  render() {
    this.innerHTML = `
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <a class="navbar-brand" href="index.html"> Movie Area</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse " id="navbarNavAltMarkup">
              <div class="navbar-nav mx-3">
                <a class="nav-item nav-link active" href="index.html">Home</a>
                <li class="nav-item dropdown dropdown-dark">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                    Genre
                  </a>
                  <div class="dropdown-menu genre" aria-labelledby="navbarDropdown">

                  </div>
                </li>
              </div>
          </div>
          </div>
      </nav>`;
    const dropDown = document.querySelector('.dropdown-menu');
    this._genres.forEach((genre) => {
      const btnGenre = document.createElement('btn-genre');
      btnGenre.id = genre.id;
      btnGenre.text = genre.name;
      dropDown.appendChild(btnGenre);
    });
  }
}

customElements.define('app-bar', AppBar);
