(function() {

  VP.Collections.PoolPlayers = Backbone.Collection.extend({

    model: VP.Models.PoolPlayer,

    url: '/api/vp/poolplayers'

  });

})();