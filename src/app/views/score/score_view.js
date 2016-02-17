(function(_events, _utils) {

  VP.Views.Score = Backbone.View.extend({

    template: Handlebars.templates['score.hbs'],

    events: {
      'change .month_select': 'yearMonthSelected'
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
          self.render(); // TODO should be somewhere else
        }
      );
    },

    yearMonthSelected: function(ev) {
      var selectedYearMonth = ev.currentTarget.value
      VP.Data.selectedYearMonth = _utils.getPeriod(selectedYearMonth);
      this.months.setPeriod();
    },

    render: function() {
      this.$el.html(this.template({
        months: this.months.toJSON(),
      }));
      var chart = this.getChart();
      console.log(chart);
      return this;
    },

    getChart: function() {
      var data = {
          labels: ["AJA-HEE", "ROD-AJA", "AJA-FEY", "CAM-AJA", "AJA-PSV", "GRA-AJA", "AJA-BUI"],
          datasets: [
              {
                  label: "Owen",
                  fillColor: "rgba(220,220,220,0.2)",
                  strokeColor: "rgba(220,220,220,1)",
                  pointColor: "rgba(220,220,220,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(220,220,220,1)",
                  data: [10, 10, 12, 19, 19, 29, 36]
              },
              {
                  label: "Marco",
                  fillColor: "rgba(151,187,205,0.2)",
                  strokeColor: "rgba(151,187,205,1)",
                  pointColor: "rgba(151,187,205,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(151,187,205,1)",
                  data: [5, 10, 20, 23, 30, 32, 37]
              }
          ]
      };
      if ($('#scoreChart').length > 0) {
        var ctx = $('#scoreChart').get(0).getContext("2d");
        var scoreChart = new Chart(ctx).Line(data, { responsive: true });
      }
      return scoreChart;
    },

    close: function() {
      this.unbind();
      this.remove();
    }

  });

})(VP.Events, VP.utils);