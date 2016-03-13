(function() {

  VP.Models.Club = VP.Models.Base.extend({

    url: function() {
      return this.urlRoot + '/vp/clubs';
    },
  
    defaults: {
      name: null,
      logoBase64Url: null
    },

    getLogoUrl: function() {
      return this.get('logoBase64Url');
    }

  });

})();
