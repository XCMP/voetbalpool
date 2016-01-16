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

  VP.router = new VP.Router();
  Backbone.history.start();

});
