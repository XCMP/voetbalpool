(function(_utils) {

  VP.Collections.Months = Backbone.Collection.extend({

    model: VP.Models.Month,

    url: 'http://localhost:3001/vp/prediction/months',

    setPeriod: function(periodString) {
      _.each(this.models, function(model) {
        model.set('selected', model.get('yyyymm') === periodString);
      });
    }

  });

})(VP.utils);