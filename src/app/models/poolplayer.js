(function(_utils) {

  VP.Models.PoolPlayer = VP.Models.Base.extend({

    url: function() {
      return this.urlRoot + '/vp/poolplayers';
    },

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