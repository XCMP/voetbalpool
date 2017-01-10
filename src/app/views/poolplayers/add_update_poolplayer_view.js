(function(_utils) {

  VP.Views.AddUpdatePoolPlayer = Backbone.View.extend({

    className: 'edit',
    template: Handlebars.templates['add_update_poolplayer.hbs'],
    events: {
      'submit form': 'saveAddPoolPlayer',
      'click button.js_button_back': 'toPoolPlayerList',
      'blur .js_color_input': 'setColor',
      'click .js_color_picker': 'showColorPicker'
    },

    initialize: function() {
      _.bindAll(this, 'handleResult');
      this.render();
    },

    showColorPicker: function() {
      window.open('https://www.google.nl/search?q=color+picker', 'color_picker');
    },

    setColor: function(ev) {
      const $colorInput = $(ev.currentTarget);
      const $colorLabel = this.$el.find('.js_color_label');
      $colorLabel.css('background-color', $colorInput.val());
    },

    saveAddPoolPlayer: function(ev) {
      ev.preventDefault();
      var formData = _utils.formDataToJSON($(ev.currentTarget));
      formData.birthday = _utils.ddmmyyyyToDate(formData.birthday);
      var options = {
        success: this.handleResult
      };
      var result = this.model.save(formData, options);
    },

    toPoolPlayerList: function() {
      VP.router.navigate('list/poolplayers', {trigger: true});
    },

    handleResult: function(object, response, options) {
      _utils.removeFieldErrors();
      if (response.error) {
        _utils.handleErrors(response);
      } else {
        this.toPoolPlayerList();
      }
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });

})(VP.utils);