'use strict';
var app = app || {};

if (window.location.protocol.startsWith('https:')) {
  page.base('/book-list-client');
}

page('/*', (ctx, next) => {
  $('.container').hide();
  next();
});

page('/', () => $('.book-view').show());
page('/book/:id', result => app.Book.fetchOne(result.params.id, app.bookView.detailView));
page('/new', app.formView.show);



page.start();