var app = app || {};

(function (module) {

  const formView = {};

  formView.show = () => {
    $('.container').hide();
    $('.form-view').show();

  };
  module.formView = formView;

})(app)