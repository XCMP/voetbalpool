(function(_events, _utils) {

  VP.Views.PoolPlayerSelect = Backbone.View.extend({

    tagName: 'span',
    template: Handlebars.templates['poolplayer_select.hbs'],

    events: {
    },

    initialize: function(options) {
      this.name = options.name;
      this.selected = options.selected;
      this.collection.on('sync', this.render, this);
      this.collection.fetch();
    },

    render: function() {
      var poolPlayer = this.getSelectedPoolPlayer();
      this.$el.html(this.template({
        name: this.name,
        poolplayers: this.collection.toJSON(),
        selected: poolPlayer ? poolPlayer.toJSON() : null
      }));
      return this;
    },

    getSelectedPoolPlayer: function() {
      if (this.selected) {
        var poolPlayer = this.collection.get(this.selected);
        poolPlayer.set('selected', true);
        return poolPlayer;
      }
    },

    close: function() {
      this.unbind();
      this.remove();
      this.collection.unbind();
    }

  });

})(VP.Events, VP.utils);