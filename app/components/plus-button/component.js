import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Component.extend({
  classNameBindings: [':plus-button', 'isHidden'],

  ui: inject.service(),

  isHidden: computed('ui.activeElementId', 'elementId', function() {
    return (this.get('ui.activeElementId') && this.get('ui.activeElementId') !== this.get('elementId'));
  }),

});
