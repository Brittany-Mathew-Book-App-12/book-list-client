// 'use strict';

// page('/', ctx => app.Book.fetchAll(app.bookView.initIndexPage(ctx)));
// // page('/books/new', ctx => app.Book.fetchForm(ctx.params, app.bookView.initNewBookPage));
// page('/books/:id', ctx => app.Book.fetchOne(ctx.params.id, app.bookView.initDetailPage(ctx)));


// page.start();


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
// page('/new', app.formView.show);



page.start();


