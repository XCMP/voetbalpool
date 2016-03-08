(function(_utils) {

  VP.Views.AddUpdateGame = Backbone.View.extend({

    template: Handlebars.templates['add_update_game.hbs'],
    events: {
      'submit form': 'saveAddGame',
      'click button.js_button_back': 'toGameList'
    },

    initialize: function() {
      _.bindAll(this, 'handleResult');
      this.render();
    },

    saveAddGame: function(ev) {
      ev.preventDefault();
      var formData = _utils.formDataToJSON($(ev.currentTarget));
      formData.matchDay = _utils.ddmmyyyyhhmmToDateTime(formData.matchDay);
      var options = {
        success: this.handleResult
      };
      var result = this.model.save(formData, options);
    },

    toGameList: function() {
      VP.router.navigate('list/games', {trigger: true});
    },

    handleResult: function(object, response, options) {
      _utils.removeFieldErrors();
      if (response.error) {
        _utils.handleErrors(response);
      } else {
        this.toGameList();
      }
    },

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
    }

  });

})(VP.utils);