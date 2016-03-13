(function(_utils, _config) {

  VP.Models.PoolPlayer = Backbone.Model.extend({

    urlRoot: _config.BACKEND_HOSTNAME_PORT + '/vp/poolplayers',
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

})(VP.utils, VP.Config);