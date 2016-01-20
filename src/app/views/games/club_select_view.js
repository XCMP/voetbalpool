(function(_events, _utils) {

  VP.Views.ClubSelect = Backbone.View.extend({

    tagName: 'select',
    className: 'club_select',
    template: Handlebars.templates['club_select.hbs'],

    events: {
    },

    initialize: function(options) {
      this.name = options.name;
      this.selected = options.selected;
      this.collection.on('sync', this.render, this);
      this.collection.fetch();
    },

    render: function() {
      this.setSelectedOption();
      console.log('rendering select...', this.name, this.selected);
      this.$el.attr('name', this.name);
      this.$el.html(this.template({
        name: this.name,
        clubs: this.collection.toJSON(),
        selected: this.selected
      }));
      return this;
    },

    setSelectedOption: function() {
      if (this.selected) {
        var option = this.collection.get({
          _id:this.selected});
        console.log(option);
        option.set('selected', true);
      }
    },

    close: function() {
      this.unbind();
      this.remove();
      this.collection.unbind();
    }

  });

})(VP.Events, VP.utils);