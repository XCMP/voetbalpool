(function(_events, _utils) {

  VP.Views.Clubs = Backbone.View.extend({

    template: Handlebars.templates['clubs.hbs'],
    deleteTemplate: Handlebars.templates['club_delete.hbs'],

    $selectedClub: null,
    confirmationView: null,

    events: {
      'click tr.club': 'selectClub',
      'click button.js_button_add': 'renderAddClub',
      'click button.js_button_update': 'renderUpdateClub',
      'click button.js_button_delete': 'confirmDeleteClub'
    },

    initialize: function() {
      this.collection.on('sync', this.render, this);
      this.collection.on('remove', this.render, this);
      this.collection.fetch();
    },

    selectClub: function(ev) {
      var $clickedClub = $(ev.currentTarget);

      // no Club selcted
      if (this.$selectedClub === null) {
        this.setSelectedClub($clickedClub);
        this.setButtons();
        return;
      }

      // same Club already selcted
      if ($clickedClub.data('id') === this.$selectedClub.data('id')) {
        this.removeSelectedClub();
        this.setButtons();
        return;
      }
    
      // select an other Club
      this.removeSelectedClub();
      this.setSelectedClub($clickedClub);
      this.setButtons();
    },

    setSelectedClub: function($clickedClub) {
      $clickedClub.addClass('selected');
      this.$selectedClub = $clickedClub;
    },

    removeSelectedClub: function() {
      if (this.$selectedClub) {
        this.$selectedClub.removeClass('selected');
        this.$selectedClub = null;
      }
    },

    confirmDeleteClub: function() {
      var id = this.$selectedClub.data('id');
      var model = this.collection.get(id);
      this.confirmationView = _utils.showModalWindow({
        header: 'Club verwijderen',
        content: this.deleteTemplate({model: model.toJSON()}),
        yes: _.bind(this.deleteClub, this)
      });
    },

    deleteClub: function() {
      var id = this.$selectedClub.data('id');
      var model = this.collection.get(id);
      model.destroy();
      this.collection.remove(model);
    },

    renderAddClub: function() {
      VP.router.navigate('add/club',  {trigger: true});
    },

    renderUpdateClub: function() {
      var id = this.$selectedClub.data('id');
      VP.router.navigate('update/club/'+id,  {trigger: true});
    },

    render: function() {
      this.$el.html(this.template({
        clubs: this.collection.toJSON(),
        activate: this.$selectedClub === null? 'disabled':''
      }));
      return this;
    },

    setButtons: function() {
      var self = this;
      $(['.js_button_update', '.js_button_delete']).each(function(i, selector) {
        $(selector).prop("disabled", self.$selectedClub === null? true:false);
      });
    },

    close: function() {
      this.unbind();
      this.remove();
      this.collection.unbind();
    }

  });

})(VP.Events, VP.utils);