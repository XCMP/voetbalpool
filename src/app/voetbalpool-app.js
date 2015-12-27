var VP = {

  Models: {},
  Collections: {},
  Views: {},

  Events: {
    // constant for events

    // the event bus
    bus                   : _.extend({}, Backbone.Events)
  }

};

$(document).ready(function() {

  var router = new VP.Router();
  Backbone.history.start();

  new VP.Views.Menu({
    router: router
  });

});
