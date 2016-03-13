(function(_config) {

  VP.Collections.Clubs = Backbone.Collection.extend({

    model: VP.Models.Club,

    url: _config.BACKEND_HOSTNAME_PORT + '/vp/clubs'

  });

})(VP.Config);