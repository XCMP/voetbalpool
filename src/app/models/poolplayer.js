(function (_utils) {

  VP.Models.PoolPlayer = Backbone.Model.extend({

    urlRoot: 'http://localhost:3001/vp/poolplayer',
    idAttribute: '_id',

    defaults: {
      name: null,
      notes: null,
      birthday: null
    },

    initialize: function () {
    },

    parse: function (model, xhr) {
      model.age = _utils.calculateAge(model.birthday);
      return model;
    }
    
  });

})(VP.utils);