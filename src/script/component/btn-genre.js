class BtnGenre extends HTMLElement {
  set id(id) {
    this._id = id;
    this.render();
  }

  set text(text) {
    this._text = text;
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  render() {
    this.setAttribute('data-id', this._id);
    this.setAttribute('id', this._id);
    this.classList.add('dropdown-item');
    this.innerText = this._text;
    this.addEventListener('click', this._clickEvent);
  }
}
customElements.define('btn-genre', BtnGenre);
