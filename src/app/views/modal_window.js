(function(_events) {

  VP.Views.ModalWindow = Backbone.View.extend({

    tagName: 'div',
    className: 'modal_window',
    template: Handlebars.templates['modal_window.hbs'],
    templateData: {
      header      : null,
      content     : null,
      yesFunction : null,
      noFunction  : null
    },

    events: {
      'click .close' : 'close',
      'click .yes'   : 'yes',
      'click .no'    : 'no'
    },

    initialize: function(options) {
      this.templateData.header = options.header;
      this.templateData.content = options.content;
      this.yesFunction = options.yes;
      this.noFunction = options.no;
    },

    render: function() {
      $('body').append(this.$el.html(this.template({
        data: this.templateData
      })));
      return this;
    },

    close: function() {
      this.remove();
    },

    yes: function() {
      if (this.yesFunction) {
        this.yesFunction();
      }
      this.close();
    },

    no: function() {
      if (this.noFunction) {
        this.noFunction();
      }
      this.close();
    }

  });

})(VP.Events);