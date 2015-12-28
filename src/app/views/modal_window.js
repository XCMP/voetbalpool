(function(_events) {

  VP.Views.ModalWindow = Backbone.View.extend({

    tagName: 'div',
    className: 'modal_window',
    template: Handlebars.templates['modal_window.hbs'],
    templateData: {
      header: null,
      content: null      
    },

    events: {
      'click .close': 'close'
    },

    initialize: function(options) {
      this.templateData.header = options.header,
      this.templateData.content = options.content
    },

    render: function() {
      $('body').append(this.$el.html(this.template({
        data: this.templateData
      })));
      return this;
    },

    close: function() {
      this.remove();
    }

  });

})(VP.Events);