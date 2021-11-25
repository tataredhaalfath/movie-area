class DetailItem extends HTMLElement {
  set detail(detail) {
    this._detail = detail;
    this.render();
  }

  render() {
    this.setAttribute('class', 'container-fluid');
    this.innerHTML = `
        <div class="row">
            <div class="col-md-4">
                <img src="http://image.tmdb.org/t/p/w500/${this._detail.poster_path}" class="img-fluid">
            </div>

            <div class="col-md-8">
                <ul class="list-group">
                    <li class="list-group-item"><h3><strong>${this._detail.title}</strong></h3></li>
                    <li class="list-group-item"><h3><strong>Released : </strong>${this._detail.release_date}</h3></li>
                    <li class="list-group-item"><h3><strong>Genre : </strong>${this._detail.genres.map((genre) => genre.name)}</h3></li>
                    <li class="list-group-item"><h3><strong>Rating : </strong>${this._detail.vote_average}</h3></li>
                    <li class="list-group-item over-view"><h3><strong>Overview : </strong>${this._detail.overview}</h3></li>
                    <li class="list-group-item movies">
                    <a href="#" class="card-link see-movies btn btn-md" data-toggle="modal" 
                            data-dismiss="modal" data-id="${this._detail.id}"><i class="fab fa-youtube"></i> See Video </a>
                    </li>
                </ul>
            </div>
        </row>
    `;
  }

  disconnectedCallback() {
    this.render();
  }
}
customElements.define('detail-item', DetailItem);
