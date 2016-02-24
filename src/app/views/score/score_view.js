(function (_events, _utils) {

  VP.Views.Score = Backbone.View.extend({

    template: Handlebars.templates['score.hbs'],
    templateLegend: Handlebars.templates['score_legend.hbs'],

    data: { labels: [], datasets: [] },

    events: {
      'change .month_select': 'yearMonthSelected'
    },

    initialize: function () {
      this.initMonths();
      this.getChartData();
    },

    initMonths: function () {
      this.months = new VP.Collections.Months({});
      var self = this;
      this.months.fetch().done(
        function (){
          self.months.setPeriod(VP.Data.selectedYearMonth);
        }
      );
    },

    yearMonthSelected: function (ev) {
      var selectedYearMonth = ev.currentTarget.value
      VP.Data.selectedYearMonth = _utils.getPeriod(selectedYearMonth);
      this.months.setPeriod();
      this.getChartData();
    },

    render: function () {
      this.$el.html(this.template({
        months: this.months.toJSON(),
      }));
      this.setChart();
      return this;
    },

    getChartData: function () {
      this.data = { labels: [], datasets: [] };
      var self = this;
      var predictions = new VP.Collections.Predictions();
      predictions.fetch().done(function (predictions, e) {
        _.map(predictions, function (prediction, i) {
          if (prediction.game.homeTeamGoals !== null && prediction.game.awayTeamGoals !== null) {
            self.addData(prediction);
          }
        });
        self.render();
      });
    },

    addData: function (prediction) {
      this.addGame(prediction.game);
      this.addScores(prediction);
    },

    addGame: function (game) {
      var gameLabel = game.homeTeam.name+'-'+game.awayTeam.name;
      if (!_.contains(this.data.labels, gameLabel)) {
        this.data.labels.push(gameLabel);
      }
    },

    addScores: function (prediction) {
      var name = prediction.poolplayer.name
      var poolplayerData = _.findWhere(this.data.datasets, {label: name});
      if (poolplayerData) {
        var lastScore = poolplayerData.data[poolplayerData.data.length-1];
        poolplayerData.data.push(lastScore + (prediction.score?prediction.score:0));
      } else {
        this.data.datasets.push({
          label: name,
          fillColor: _utils.getFillColor(this.data.datasets.length),
          strokeColor: _utils.getColor(this.data.datasets.length),
          pointColor: _utils.getColor(this.data.datasets.length),
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: _utils.getColor(this.data.datasets.length),
          data: [prediction.score]
        });
      }
    },

    setChart: function () {
      if ($('#scoreChart').length > 0 && this.data.datasets.length > 0) {
        var ctx = $('#scoreChart').get(0).getContext("2d");
        var scoreChart = new Chart(ctx).Line(this.data, { responsive: true});
        this.$el.find('.legend').html(this.getLegend());
      }
      return scoreChart;
    },

    getLegend: function () {
      return this.templateLegend({
        datasets: this.data.datasets
      });
    },

    close: function () {
      this.unbind();
      this.remove();
    }

  });

})(VP.Events, VP.utils);