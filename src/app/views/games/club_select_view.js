(function(_events, _utils) {

  VP.Views.ClubSelect = Backbone.View.extend({

    tagName: 'span',
    template: Handlebars.templates['club_select.hbs'],

    events: {
      'change': 'setLogo'
    },

    initialize: function(options) {
      this.name = options.name;
      this.selected = options.selected;
      this.collection.on('sync', this.render, this);
      this.collection.fetch();
    },

    setLogo: function() {
      console.log('changed!');
    },

    render: function() {
      var club = this.getSelectedClub();
      this.$el.html(this.template({
        name: this.name,
        clubs: this.collection.toJSON(),
        selected: club ? club.toJSON() : null
      }));
      return this;
    },

    getSelectedClub: function() {
      if (this.selected) {
        var club = this.collection.get(this.selected);
        club.set('selected', true);
        return club;
      }
    },

    close: function() {
      this.unbind();
      this.remove();
      this.collection.unbind();
    }

  });

})(VP.Events, VP.utils);