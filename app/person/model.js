import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  progress: DS.attr('number'),
});
