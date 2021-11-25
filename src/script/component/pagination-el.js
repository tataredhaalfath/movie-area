class PaginationEl extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set prev(prev) {
    this._prev = prev;
    this.render();
  }

  set disabledPrev(disabled) {
    this._disabledPrev = disabled;
    this.render();
  }

  set disabledNext(disabled) {
    this._disabledNext = disabled;
    this.render();
  }

  set current(curr) {
    this._curr = curr;
    this.render();
  }

  set next(next) {
    this._next = next;
    this.render();
  }

  set clickEventPrev(event) {
    this._clickEventPrev = event;
    this.render();
  }

  set clickEventNext(event) {
    this._clickEventNext = event;
    this.render();
  }

  render() {
    this.innerHTML = `
        <nav aria-label="..." >
            <ul class="pagination justify-content-center mt-5 mb-5">
                <li class="page-item prev-btn ${this._disabledPrev}">
                    <button class="page-link btn" id="prev" tabindex="-1">Previous</button>
                </li>
                <li class="page-item"><span class="page-link prev-page">${this._prev}</span></li>
                <li class="page-item" aria-current="page">
                    <span class="page-link current-page" href="#">${this._curr}</span>
                </li>
                <li class="page-item next-btn "><span class="page-link next-page">${this._next}</span></li>
                <li class="page-item next-btn ${this._disabledNext}">
                    <button class="page-link btn" type="button" id="next">Next</button>
                </li>
            </ul>
        </nav>
    `;
    this.querySelector('pagination-el #prev').addEventListener('click', this._clickEventPrev);
    this.querySelector('pagination-el #next').addEventListener('click', this._clickEventNext);
  }
}
customElements.define('pagination-el', PaginationEl);
