(function(_events, _utils) {

  VP.Views.MonthSelect = Backbone.View.extend({

    tagName: 'span',
    template: Handlebars.templates['month_select.hbs'],

    events: {
      'change': 'setMonth'
    },

    initialize: function(options) {
      this.name = options.name;
      this.selected = options.selected;
      this.collection.on('sync', this.render, this);
      this.collection.fetch();
    },

    render: function() {
      this.$el.html(this.template({
        name: this.name,
        months: this.collection.toJSON(),
      }));
      return this;
    },

    getSelectedMonth: function() {
      if (this.selected) {
        var month = this.collection.get(this.selected);
        month.set('selected', true);
        return month;
      }
    },

    close: function() {
      this.unbind();
      this.remove();
      this.collection.unbind();
    }

  });

})(VP.Events, VP.utils);