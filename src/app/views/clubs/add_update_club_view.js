(function(_utils) {

  VP.Views.AddUpdateClub = Backbone.View.extend({

    template: Handlebars.templates['add_update_club.hbs'],
    events: {
      'submit form': 'saveAddClub',
      'click .previewLogo': 'showImage',
      'click button.js_button_back': 'toClubList'
    },

    initialize: function() {
      _.bindAll(this, "handleErrors", "handleResult");
    },

    saveAddClub: function(ev) {
      ev.preventDefault();
      var formData = _utils.formDataToJSON($(ev.currentTarget));
      var options = {
        success: this.handleResult,
        error: this.handleErrors,
      };
      var result = this.model.save(formData, options);
    },

    showImage: function() {
      this.confirmationView = _utils.showModalWindow({
        header: 'Logo',
        content: '<img src="'+$('#logoBase64Url').val()+'" />',
        back: null
      });
    },

    toClubList: function() {
      VP.router.navigate('list/clubs', {trigger: true});
    },

    handleResult: function(object, response, options) {
      _utils.removeFieldErrors();
      if (response.error) {
        _.each(response.response.errors, function(errorObject) {
          _utils.displayFieldError(errorObject);
        });
      } else {
        this.toClubList();
      }
    },

    handleErrors: function(object, response, options) {
      console.log('error');
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    close: function() {
      this.unbind();
      this.remove();
      this.model.unbind();
    }

  });

})(VP.utils);