class OverlayMovie extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set key(key) {
    this._key = key;
    this.render();
  }

  set err(err) {
    this._err = err;
    this.render();
  }

  render() {
    this.setAttribute('class', 'overlay');
    this.innerHTML = `
    <div class="main-overlay">
        <a href="javascript:void(0)" class="closebtn">&times;</a>
            ${this._err}
        <iframe  src="https://www.youtube.com/embed/${this._key}" class="embed hide movie" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    `;
  }
}

customElements.define('overlay-movie', OverlayMovie);
