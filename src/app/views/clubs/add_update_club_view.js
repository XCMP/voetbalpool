(function(_utils) {

  VP.Views.AddUpdateClub = Backbone.View.extend({

    className:'edit',
    template: Handlebars.templates['add_update_club.hbs'],
    uploadLogoTemplate: Handlebars.templates['upload_club_logo.hbs'],

    events: {
      'submit form': 'saveAddClub',
      'click .js_previewLogo': 'showImage',
      'click button.js_upload_logo': 'showUploadLogo',
      'keyup input#logoFilename': 'logoFilenameValueChanged',
      'click button.js_button_back': 'toClubList'
    },

    initialize: function() {
      _.bindAll(this, 'handleResult');
      this.render(this.isPreviewButtonDisabled(this.model.get('logoFilename')));
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
        content: '<img src="/images/logos/' + $('#logoFilename').val() + '" />'
      });
    },

    showUploadLogo: function() {
      this.confirmationView = _utils.showModalWindow({
        header: 'Upload logo',
        content: this.uploadLogoTemplate
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

    logoFilenameValueChanged: function() {
      var disable = this.isPreviewButtonDisabled($('#logoFilename').val());
      this.disablePreviewButton(disable);
    },

    disablePreviewButton: function(disable) {
      $('.js_previewLogo').prop( 'disabled', disable );
    },

    isPreviewButtonDisabled: function(logoFilename) {
      return logoFilename ? logoFilename.length === 0 : true;
    },

    render: function(previewDisabled) {
      this.$el.html(this.template({
        club: this.model.toJSON(),
        previewDisabled: previewDisabled
      }));
      return this;
    }

  });

})(VP.utils);