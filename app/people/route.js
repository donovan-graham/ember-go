import Ember from 'ember';

export default Ember.Route.extend({

  setupController(controller/*, model*/) {
    this._super(controller, null);

    let people = [
      Ember.Object.create({'id': 1, 'name': 'John', isActive: true, progress: 25}),
      Ember.Object.create({'id': 2, 'name': 'Donovan', isActive: true, progress: 95}),
      Ember.Object.create({'id': 3, 'name': 'Graeme', isActive: false, progress: 64}),
      Ember.Object.create({'id': 5, 'name': 'Jason', isActive: true, progress: 51}),
      Ember.Object.create({'id': 7, 'name': 'Michiel', isActive: false, progress: 78}),
      Ember.Object.create({'id': 9, 'name': 'Monde', isActive: false, progress: 33}),
    ];

    controller.set('people', people);
  }
});
