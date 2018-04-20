'use strict';

var app = app || {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://bm-book-app.herokuapp.com/';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function (module) {
  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  function Book(rawBookObj) {
    Object.keys(rawBookObj).forEach(key => this[key] = rawBookObj[key]);
  }

  Book.prototype.toHtml = function () {
    let template = Handlebars.compile($('#book-list-template').text());
    return template(this);
  }

  Book.all = [];
  Book.loadAll = rows => Book.all = rows.sort((a, b) => b.title - a.title).map(book => new Book(book));

  Book.fetchAll = callback =>
    $.get(`${ENV.apiUrl}/api/v1/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);

  Book.fetchOne = (result,callback) => {
    $.getJSON(`${ENV.apiUrl}/api/v1/books/${result}`)
      .then(book => Book.new = new Book(book))
      .then(callback)
      .catch(errorCallback);
  };

  Book.prototype.create = function (callback) {
    $.post(`${ENV.apiUrl}/api/v1/books`, {
      title: this.title,
      author: this.author,
      isbn: this.isbn,
      image_url: this.image_url,
      description: this.description
    })
      .then(console.log)
      .then(callback);
  }

  $('#new-form').on('submit', (e) => {
    e.preventDefault();
    let book = new Book({
      title: $('#book-title').val(),
      author: $('#book-author').val(),
      isbn: $('#book-isbn').val(),
      image_url: $('#book-image-url').val(),
      description: $('#book-description').val()
    });
    console.log(book);
    book.create();
    $('#book-list').append(book.toHtml());


  });
  module.Book = Book;
})(app)

// https://bm-book-app.herokuapp.com/api/v1/books