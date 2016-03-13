(function(_config) {

  VP.Models.Club = Backbone.Model.extend({

    urlRoot: _config.BACKEND_HOSTNAME_PORT + '/vp/clubs',
    idAttribute: '_id',

    defaults: {
      name: null,
      logoBase64Url: null
    },

    getLogoUrl: function() {
      return this.get('logoBase64Url');
    }

  });

})(VP.Config);
