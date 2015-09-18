import Ember from 'ember';

const { inject } = Ember;

export default Ember.Controller.extend({

  ui: inject.service(),

  enableFilter: false,

  isBulk: false,
  selected: [],


  close() {
    this.setProperties({
      selected: [],
      isBulk: false,
    });
  },

  actions: {
    bulk() {
      let bool = this.get('isBulk');

      if (bool) {
        this.get('ui').disown(this.toString())
      } else {
        this.get('ui').own(this.toString(), this.close.bind(this));
      }

      this.setProperties({
        selected: [],
        isBulk: !bool
      });
    },

    toggle(person) {
      console.log("toggle person");

      if (this.get('selected').contains(person)) {
        this.get('selected').removeObject(person);
      } else {
        this.get('selected').addObject(person);
      }
    },

    edit(person) {
      console.log("edit person");
    },

    delete(person) {
      console.log("delete person");
    },
  }
});
