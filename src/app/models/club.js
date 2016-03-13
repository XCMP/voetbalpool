(function() {

  VP.Models.Club = Backbone.Model.extend({

    urlRoot: 'http://localhost:3001/vp/clubs',
    idAttribute: '_id',

    defaults: {
      name: null,
      logoBase64Url: null
    },

    getLogoUrl: function() {
      return this.get('logoBase64Url');
    }

  });

})();
