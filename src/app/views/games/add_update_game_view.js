(function(_utils) {

  VP.Views.AddUpdateGame = Backbone.View.extend({

    template: Handlebars.templates['add_update_game.hbs'],
    events: {
      // 'submit form': 'saveAddGame',
      'click button.js_button_back': 'toGameList'
    },

    initialize: function() {
      // _.bindAll(this, "handleErrors", "handleResult");
    },

    // saveAddPoolPlayer: function(ev) {
    //   ev.preventDefault();
    //   var formData = _utils.formDataToJSON($(ev.currentTarget));
    //   formData.birthday = _utils.toDate(formData.birthday);
    //   var options = {
    //     success: this.handleResult,
    //     error: this.handleErrors,
    //   };
    //   var result = this.model.save(formData, options);
    // },

    toGameList: function() {
      VP.router.navigate('list/games', {trigger: true});
    },

    // handleResult: function(object, response, options) {
    //   _utils.removeFieldErrors();
    //   if (response.error) {
    //     _.each(response.response.errors, function(errorObject) {
    //       _utils.displayFieldError(errorObject);
    //     });
    //   } else {
    //     this.toPoolPlayerList();
    //   }
    // },

    // handleErrors: function(object, response, options) {
    //   console.log('error');
    // },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.setClubSelectOptions('homeTeam');
      this.setClubSelectOptions('awayTeam');
      return this;
    },

    setClubSelectOptions: function(field) {
      var teamModel = this.model.get(field);
      if (teamModel) {
        var teamId = teamModel._id;
      }
      var teamSelect = this.getClubSelectView(field, teamId);
      this.$('span.' + field).html(teamSelect);
    },

    getClubSelectView: function(name, selected) {
      var clubs = new VP.Collections.Clubs({});
      var view = new VP.Views.ClubSelect({
        name: name,
        collection: clubs,
        selected: selected
      });
      return view.$el;
    },

    close: function() {
      this.unbind();
      this.remove();
      this.model.unbind();
    }

  });

})(VP.utils);