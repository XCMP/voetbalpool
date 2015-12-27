  VP.Collections.PoolPlayers = Backbone.Collection.extend({

    model: VP.Models.PoolPlayer,

    urlRoot: 'http://localhost:1337',
    
    url: '/vp/poolplayers'

  });
