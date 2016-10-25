(function() {

  VP.Models.Club = Backbone.Model.extend({

    urlRoot: '/api/vp/clubs',
    idAttribute: '_id',

    defaults: {
      name: null,
      logoFilename: null
    },

    getLogoFilename: function() {
      return this.get('logoFilename');
    }

  });

})();
