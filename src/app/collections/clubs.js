(function() {

  VP.Collections.Clubs = Backbone.Collection.extend({

    model: VP.Models.Club,

    url: '/api/vp/clubs'

  });

})();