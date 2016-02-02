  VP.Collections.Months = Backbone.Collection.extend({

    model: VP.Models.Month,

    url: 'http://localhost:3001/vp/prediction/months'

  });