(function (_events) {

  VP.Views.ModalWindow = Backbone.View.extend({

    tagName: 'div',
    className: 'modal_window',
    template: Handlebars.templates['modal_window.hbs'],
    templateData: {
      header        : null,
      content       : null,
      confirmDialog : null
    },

    events: {
      'click .close' : 'close',
      'click .yes'   : 'yes',
      'click .no'    : 'no',
      'click .back'  : 'back'
    },

    initialize: function (options) {
      this.templateData.header = options.header;
      this.templateData.content = options.content;
      this.templateData.confirmDialog = options.confirmDialog;

      this.yesFunction = options.yes;
      this.noFunction = options.no;
      this.backFunction = options.back;
    },

    render: function () {
      $('body').append(this.$el.html(this.template({
        data: this.templateData
      })));
      return this;
    },

    close: function () {
      this.remove();
    },

    yes: function () {
      if (this.yesFunction) {
        this.yesfunction ();
      }
      this.close();
    },

    no: function () {
      if (this.noFunction) {
        this.nofunction ();
      }
      this.close();
    },

    back: function () {
      if (this.backFunction) {
        this.backfunction ();
      }
      this.close();
    }

  });

})(VP.Events);