import Ember from 'ember';

const { inject, computed } = Ember;

export default Ember.Controller.extend({

  ui: inject.service(),

  people: [],

  sortedPeople: computed.sort('people', 'sorting'),

  isBulk: false,
  selected: [],

  sorting: ['id:asc'],

  sortId: ['id:asc'], // this is not numerically correct, it outputs [1, 10, 100, 1000, 101, 102 , ...]
  sortName: ['name:asc'],
  sortProgress: ['progress:desc'],


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
        this.get('ui').disown(this.toString());
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

    // header menu actions
    sort(sortProperties) {
      this.get('ui').play(); // not necessary if transitioning
      this.set('sorting', sortProperties);
    },



    // list-item actions
    pin(/* person */) {
      console.log("pin person");
    },

    view(/* person */) {
      console.log("view person");
    },

    edit(/* person */) {
      console.log("edit person");
    },

    delete(/* person */) {
      console.log("delete person");
    },


    // plus-button actions
    one() {
      this.get('ui').play(); // not necessary if transitioning
      console.log("plus one");
    },

    two() {
      this.get('ui').play(); // not necessary if transitioning
      console.log("plus two");
    },

    three() {
      this.get('ui').play(); // not necessary if transitioning
      console.log("plus three");
    },

  }
});
