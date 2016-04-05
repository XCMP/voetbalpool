(function(_utils) {

  VP.Views.AddUpdateClub = Backbone.View.extend({

    className:'edit',
    template: Handlebars.templates['add_update_club.hbs'],
    events: {
      'submit form': 'saveAddClub',
      'click .previewLogo': 'showImage',
      'click button.js_button_back': 'toClubList'
    },

    initialize: function() {
      _.bindAll(this, 'handleResult');
      this.render();
    },

    saveAddClub: function(ev) {
      ev.preventDefault();
      var formData = _utils.formDataToJSON($(ev.currentTarget));
      var options = {
        success: this.handleResult
      };
      var result = this.model.save(formData, options);
    },

    showImage: function() {
      this.confirmationView = _utils.showModalWindow({
        header: 'Logo',
        content: '<img src="/images/logos/' + $('#logoFilename').val() + '" />',
        back: null
      });
    },

    toClubList: function() {
      VP.router.navigate('list/clubs', {trigger: true});
    },

    handleResult: function(object, response, options) {
      _utils.removeFieldErrors();
      if (response.error) {
        _utils.handleErrors(response);
      } else {
        this.toClubList();
      }
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });

})(VP.utils);