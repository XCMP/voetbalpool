(function(_events) {

  VP.Views.ModalWindow = Backbone.View.extend({

    tagName: 'div',
    className: 'modal_window',
    template: Handlebars.templates['modal_window.hbs'],

    events: {
    },

    initialize: function() {
    },

    render: function() {
      $('body').append(this.$el.html(this.template({
        header: 'Verwijderen',
        content: 'Weet je zeker dat je Marco wilt verwijderen?'
      })));
      return this;
    },

  });

})(VP.Events);