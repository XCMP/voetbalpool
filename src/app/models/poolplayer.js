(function(_utils) {

  VP.Models.PoolPlayer = Backbone.Model.extend({

    urlRoot: 'http://localhost:3001/vp/poolplayer',
    idAttribute: '_id',

    defaults: {
      name: null,
      birthday: null,
      notes: null
    },

    parse: function(model, xhr) {
      model.age = _utils.calculateAge(model.birthday);
      return model;
    }
    
  });

})(VP.utils);