(function(_utils) {

  VP.Models.Club = Backbone.Model.extend({

    urlRoot: 'http://localhost:3001/vp/club',
    idAttribute: '_id',

    defaults: {
      name: null,
      logoBase64Url: null
    },

    getName: function() {
      return this.get('name');
    },

    getLogoUrl: function() {
      return this.get('logoBase64Url');
    }

  });

})(VP.utils);
