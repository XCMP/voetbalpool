(function(_utils) {

  VP.Views.AddPoolPlayer = Backbone.View.extend({

    el: '.content',
    model: new VP.Models.PoolPlayer(),
    template: Handlebars.templates['addpoolplayer.hbs'],
    events: {
      'submit form': 'saveAddPoolPlayer',
      'click button.js_button_back': 'toPoolPlayerList'
    },

    initialize: function() {
      // this.listenTo(this.model, 'change', this.render);
      // this.listenTo(this.model, 'destroy', this.remove);
      // this.listenTo(this.model, 'error', this.saveError);
      _.bindAll(this, "handleErrors");
    },

    saveAddPoolPlayer: function(ev) {
      ev.preventDefault();
      var formData = _utils.formDataToJSON($(ev.currentTarget));
      formData.birthday = _utils.toDate(formData.birthday);
      var options = {
        success: this.toPoolPlayerList,
        // function(object, model, options) {
        //   console.log('success');
        //   console.log('object', object);
        //   console.log('model', model);
        //   console.log('options', options);
        // },
        error: this.handleErrors,
      };
      var result = this.model.save(formData, options);
    },

    toPoolPlayerList: function() {
      VP.router.navigate('list/poolplayers',  {trigger: true});
    },

    handleErrors: function(object, response, options) {
      if (response.status === 400) {
        _.each(response.responseJSON.errors, function(errorObject, i) {
          _utils.displayFieldError(errorObject);
        });
      } else {
        _utils.displayErrorMessage(response.status + ' | ' + response.statusText);
      }
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });

})(VP.utils);