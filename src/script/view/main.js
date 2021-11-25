import '../component/search-bar.js';
import '../component/movie-list.js';
import '../component/detail-item.js';
import $ from 'jquery';

const axios = require('axios');
const genres = require('../data/genre');

const API_KEY = 'api_key=ce2010b359b7301329efd68f35a7be9d';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const main = () => {
  const appBar = document.querySelector('app-bar');
  const searchElement = document.querySelector('search-bar');
  const movieListElement = document.querySelector('movie-list');
  const paginationEl = document.querySelector('pagination-el');
  const overlayMovie = document.querySelector('overlay-movie');
  let currentPage = 1;
  let nextPage = 2;
  let prevPage = 3;
  let totalPage = 100;
  let lastUrl = '';
  const selectedGenre = [];

  const renderError = (message) => {
    movieListElement.renderError(message);
  };

  const renderResult = (result) => {
    appBar.genres = genres;
    $('.dropdown-menu').on('click', 'btn-genre', function () {
      setGenre($(this).data('id'));
    });
    movieListElement.innerHTML = '';
    movieListElement.movies = result;
  };

  //get videos
  const getVideos = (videosId) => {
    axios({
      method: 'get',
      url: BASE_URL + '/movie/' + videosId + '/videos?' + API_KEY,
    }).then((response) => {
      document.querySelector('.overlay').style.width = '100%';
      if (response) {
        if (response.data.results.length > 0) {
          response.data.results.forEach((video) => {
            const { key, site } = video;
            if (site === 'YouTube') {
              overlayMovie.key = key;
              document
                .querySelector('.overlay .closebtn')
                .addEventListener('click', () => {
                  document.querySelector('.overlay').style.width = '0%';
                });
            } else {
              overlayMovie.err = '<h1 class="text-danger" >ERROR</h1>';
              document
                .querySelector('.overlay .closebtn')
                .addEventListener('click', () => {
                  document.querySelector('.overlay').style.width = '0%';
                });
            }
          });
        }
      }
    });
  };

  //get movie
  const getMovie = async (url) => {
    try {
      await axios({
        method: 'get',
        url,
      }).then((response) => {
        if (response.data.results < 1) {
          renderError('Movie not found!');
        } else {
          lastUrl = url;
          currentPage = response.data.page;
          nextPage = currentPage + 1;
          prevPage = currentPage - 1;
          totalPage = response.data.total_pages;

          //atur pagination
          paginationEl.prev = prevPage;
          paginationEl.current = currentPage;
          paginationEl.next = nextPage;

          if (prevPage < 1) {
            paginationEl.disabledPrev = 'disabled';
            paginationEl.prev = '...';
          } else {
            paginationEl.disabledPrev = 'en';
          }

          if (nextPage > totalPage) {
            paginationEl.disabledNext = 'disabled';
            paginationEl.next = '...';
          } else {
            paginationEl.disabledNext = 'en';
          }

          //render data movies
          const movies = response.data.results;
          renderResult(movies);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  //detail movie
  const detailMovie = (id) => {
    axios({
      method: 'get',
      url: BASE_URL + '/movie/' + id + '?' + API_KEY,
    })
      .then((response) => {
        if (response.data !== 'Undefined') {
          const detailItemElement = document.createElement('detail-item');
          detailItemElement.detail = response.data;
          const modalbody = document.querySelector('.modal-body');
          modalbody.appendChild(detailItemElement);
        }
      })
      .then(() => {
        //see movies
        $('.movies .see-movies').on('click', function () {
          getVideos($(this).data('id'));
        });
      });
  };

  //search movie
  const searchMovie = (keyword) => {
    if (keyword.length < 1) {
      getMovie(API_URL);
    } else {
      const url = searchURL + '&query=' + keyword;
      getMovie(url);
    }
  };

  const setGenre = (id) => {
    if (selectedGenre.length === 0) {
      selectedGenre.push(id);
    } else {
      selectedGenre.length = 0;
      if (selectedGenre.includes(id)) {
        selectedGenre.forEach((idg, index) => {
          if (idg === id) {
            selectedGenre.splice(index, 1);
          }
        });
      } else {
        selectedGenre.push(id);
      }
    }
    getMovie(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')));
  };

  getMovie(API_URL).then(() => {
    $('#movie-list').on('click', '.see-detail', function () {
      const detailItem = document.querySelector('detail-item');
      if (detailItem) {
        detailItem.remove();
      }
      detailMovie($(this).data('id'));
    });
  });

  const onButtonSearchClicked = async () => {
    const keyword = await searchElement.value;
    searchMovie(keyword);
  };

  const nextSearch = () => {
    const url = lastUrl + '&page=' + nextPage;
    getMovie(url);
  };

  const prevSearch = () => {
    const url = lastUrl + '&page=' + prevPage;
    getMovie(url);
  };

  searchElement.clickEvent = onButtonSearchClicked;
  paginationEl.clickEventNext = nextSearch;
  paginationEl.clickEventPrev = prevSearch;
};

export default main;
