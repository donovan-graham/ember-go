import Ember from 'ember';

export default Ember.Route.extend({

  firstLoad: true,

  beforeModel() {
    if (this.get('firstLoad')) {
      let names = ['John', 'Donovan', 'Graeme', 'Jason', 'Michiel', 'Monde'];
      let i=0;
      while (i < 1000) {
        i++;
        this.store.createRecord('person', {
            name: names[i % names.length] + " " + i,
            progress: Math.round(Math.random() * 100)
          });
      }
      this.set('firstLoad', false);
    }
  },

  model() {
    return this.store.peekAll('person');
  },

  setupController(controller, model) {
    this._super(controller, null);
    controller.set('people', model);
  }
});
