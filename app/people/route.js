import Ember from 'ember';

export default Ember.Route.extend({

  setupController(controller/*, model*/) {
    this._super(controller, null);

    let names, people, i=0;
    names = ['John', 'Donovan', 'Graeme', 'Jason', 'Michiel', 'Monde'];
    people = [];

    while (i < 100) {
      i++;
      people.push(Ember.Object.create({
          id: i,
          name: names[i % names.length] + " " + i,
          progress: Math.round(Math.random() * 100)
        }));
    }


    controller.set('people', people);
  }
});
