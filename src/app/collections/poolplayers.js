(function(_config) {

  VP.Collections.PoolPlayers = Backbone.Collection.extend({

    model: VP.Models.PoolPlayer,

    url: _config.BACKEND_HOSTNAME_PORT + '/vp/poolplayers'

  });

})(VP.Config);