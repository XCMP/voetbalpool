(function (_utils) {

  VP.Models.Month = Backbone.Model.extend({

    defaults: {
      yyyymm: null
    },

    parse: function (model, xhr) {
      model.text = _utils.getMonthYearText(model.yyyymm);
      return model;
    }

  });

})(VP.utils);
