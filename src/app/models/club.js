(function(_config) {

  VP.Models.Club = Backbone.Model.extend({

    urlRoot: _config.BACKEND_HOSTNAME_PORT + '/vp/clubs',
    idAttribute: '_id',

    defaults: {
      name: null,
      logoFilename: null
    },

    getLogoFilename: function() {
      return this.get('logoFilename');
    }

  });

})(VP.Config);
