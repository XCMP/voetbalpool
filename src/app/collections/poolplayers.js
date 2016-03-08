(function() {

  VP.Collections.PoolPlayers = Backbone.Collection.extend({

    model: VP.Models.PoolPlayer,

    url: 'http://localhost:3001/vp/poolplayers'

  });

})();