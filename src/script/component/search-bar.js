class SearchBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  get value() {
    return this.querySelector('#search-input').value;
  }

  render() {
    this.innerHTML = `
        <div class="row mt-3 justify-content-center search-bar" >
            <div class="col-md-6 ">
                <h1 class="text-center mb-3"> Search Movies</h1>
                <div class="input-group mb-3 search">
                    <input type="text" class="form-control" placeholder="Movie Title..." id="search-input">
                    <div class="input-group-append">
                    <button class="btn" type="button" id="search-button">Search</span>
                    </div>
                </div>
            </div>
        </div>
        `;

    this.querySelector('#search-button').addEventListener('click', this._clickEvent);
  }
}
customElements.define('search-bar', SearchBar);
