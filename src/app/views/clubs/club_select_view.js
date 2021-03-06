(function(_utils) {

  VP.Views.ClubSelect = Backbone.View.extend({

    tagName: 'span',
    template: Handlebars.templates['club_select.hbs'],

    // caching elements
    $logoImage: null,

    events: {
      'change': 'setLogo'
    },

    initialize: function(options) {
      this.name = options.name;
      this.selected = options.selected;
      this.listenTo(this.collection, 'sync', this.render);
      this.collection.fetch();
    },

    render: function() {
      var club = this.getSelectedClub();
      this.$el.html(this.template({
        name: this.name,
        clubs: this.collection.toJSON(),
        selected: club ? club.toJSON() : null
      }));
      // cache elements
      this.$logoImage = this.$el.find('img.logo.' + this.name);
      return this;
    },

    getSelectedClub: function() {
      if (this.selected) {
        var club = this.collection.get(this.selected);
        club.set('selected', true);
        return club;
      }
    },

    setLogo: function(ev) {
      var $el = $(ev.target);
      _utils.removeFieldErrorByName($el.attr('name'));
      var club = this.collection.get(ev.target.value);
      this.$logoImage.attr('src', '/images/logos/' + club.getLogoFilename());
      this.$logoImage.removeClass('hide');
    }

  });

})(VP.utils);