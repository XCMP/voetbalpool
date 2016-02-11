var VP = {

  Models: {},
  Collections: {},
  Views: {},

  Data: {},

  Events: {
    // constant for events

    // the event bus
    bus                   : _.extend({}, Backbone.Events)
  }

};

$(document).ready(function() {

  VP.Data.selectedYearMonth = VP.utils.getCurrentPeriod();
  VP.router = new VP.Router();
  Backbone.history.start();

});
