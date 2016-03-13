(function(_utils, _config) {

  VP.Collections.Months = Backbone.Collection.extend({

    model: VP.Models.Month,

    url: _config.BACKEND_HOSTNAME_PORT + '/vp/months',

    setPeriod: function() {
      var periodString = _utils.getPeriodAsString(VP.Data.selectedYearMonth);
      _.each(this.models, function(model) {
        model.set('selected', model.get('yyyymm') === periodString);
      });
    }

  });

})(VP.utils, VP.Config);