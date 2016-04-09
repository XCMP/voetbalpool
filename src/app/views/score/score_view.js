(function(_utils) {

  VP.Views.Score = Backbone.View.extend({

    template: Handlebars.templates['score.hbs'],
    templateLegend: Handlebars.templates['score_legend.hbs'],
    templateNoResults: Handlebars.templates['no_results.hbs'],

    $rotate: null,
    $graph: null,

    data: { labels: [], datasets: [] },

    events: {
      'change .month_select': 'yearMonthSelected'
    },

    initialize: function() {
      this.initMonths();
      this.getChartData();
      this.bindEvents();
    },

    handleViewMode: function() {
      if(window.innerHeight > window.innerWidth){
        this.showPortrait();
        window.orientation = 'portrait';
      } else {
        this.showLandscape();
        window.orientation = 'landscape';
      }
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
      var selectedYearMonth = ev.currentTarget.value;
      VP.Data.selectedYearMonth = _utils.getPeriod(selectedYearMonth);
      this.months.setPeriod();
      this.getChartData();
    },

    render: function() {
      this.$el.html(this.template({
        months: this.months.toJSON(),
      }));
      this.setChart();
      this.cacheElements();
      this.handleViewMode();
      return this;
    },

    getChartData: function() {
      this.data = { labels: [], datasets: [] };
      var self = this;
      var predictions = new VP.Collections.Predictions();
      predictions.fetch().done(function(predictions, e) {

        var games = self.getPlayedGames(predictions);
        var poolplayers = self.getPoolplayers(predictions);

        _.each(games, function(game) {
          self.addGame(game);

          _.each(poolplayers, function(poolplayer) {
            var predictionOfPoolplayer = _.filter(predictions, function(prediction) {
              return prediction.game._id == game._id && prediction.poolplayer._id == poolplayer._id;
            });
            var score = (predictionOfPoolplayer.length > 0) ? predictionOfPoolplayer[0].score : 0;
            self.addScore(poolplayer.name, score);
          });

        });

        self.render();
      });
    },

    addGame: function(game) {
      var gameLabel = game.homeTeam.name+'-'+game.awayTeam.name;
      this.data.labels.push(gameLabel);
    },

    addScore: function(name, score) {
      var poolplayerData = _.findWhere(this.data.datasets, {label: name});
      if (poolplayerData) {
        var lastScore = poolplayerData.data[poolplayerData.data.length-1];
        poolplayerData.data.push(lastScore + (score));
      } else {
        this.data.datasets.push({
          label: name,
          fillColor: _utils.getFillColor(this.data.datasets.length),
          strokeColor: _utils.getColor(this.data.datasets.length),
          pointColor: _utils.getColor(this.data.datasets.length),
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: _utils.getColor(this.data.datasets.length),
          data: [score]
        });
      }
    },

    setChart: function() {
      var $scoreChart = $('#scoreChart');
      if ($scoreChart.length > 0 && this.data.datasets.length > 0) {
        var ctx = $scoreChart.get(0).getContext('2d');
        var scoreChart = new Chart(ctx).Line(this.data, { responsive: true});
        this.$el.find('.legend').html(this.getLegend());
      } else {
        this.$el.find('.message').html(this.templateNoResults());
      }
    },

    getLegend: function() {
      return this.templateLegend({
        datasets: this.data.datasets
      });
    },

    getPlayedGames: function(predictions) {
      var games = _.pluck(predictions, 'game')
        .filter(function(game) {
          return game.homeTeamGoals !== null && game.awayTeamGoals !== null;
        });
      return _.uniq(games, function(game) { return game._id; });
    },

    getPoolplayers: function(predictions) {
      var poolplayers = _.pluck(predictions, 'poolplayer');
      return _.uniq(poolplayers, function(poolplayer) { return poolplayer._id; });
    },

    cacheElements: function() {
      this.$rotate = $('.rotate');
      this.$graph = $('.graph');
    },

    showPortrait: function() {
      this.$rotate.show();
      this.$graph.hide();
    },

    showLandscape: function() {
      this.$rotate.hide();
      this.$graph.show();
    },

    bindEvents: function() {
      $(window).on('orientationchange', _.bind(this.handleViewMode, this));
      $(window).on('resize', _.debounce(_.bind(this.handleViewMode, this), 100, true));
    }

  });

})(VP.utils);