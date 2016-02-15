(function(_events, _utils) {

  VP.Views.Score = Backbone.View.extend({

    template: Handlebars.templates['score.hbs'],

    events: {
    },

    initialize: function() {
      this.initMonths();
    },

    initMonths: function() {
      this.months = new VP.Collections.Months({});
      var self = this;
      this.months.fetch().done(
        function(){
          self.months.setPeriod(VP.Data.selectedYearMonth);
        }
      );
    },

    yearMonthSelected: function(ev) {
      var selectedYearMonth = ev.currentTarget.value
      VP.Data.selectedYearMonth = _utils.getPeriod(selectedYearMonth);
      this.months.setPeriod();
      this.collection.setPeriod();
      this.collection.fetch();
    },

    render: function() {
      this.$el.html(this.template({
        months: this.months.toJSON()
      }));
      return this;
    },

    close: function() {
      this.unbind();
      this.remove();
      // this.collection.unbind();
    }

  });

})(VP.Events, VP.utils);