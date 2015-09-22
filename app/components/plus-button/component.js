import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Component.extend({
  classNameBindings: [':plus-button', 'itemClass', 'isHidden', 'isOpen'],

  ui: inject.service(),

  itemCount: 0,

  isOpen: false,

  itemClass: computed('itemCount', function() {
    let count = this.get('itemCount');

    switch(count) {
      case 1:
        return 'one';
      case 2:
        return 'two';
      case 3:
        return 'three';
      case 4:
        return 'four';
      case 5:
        return 'five';
      default:
        return null;
    }
  }),

  isHidden: computed('ui.activeElementId', 'elementId', function() {
    return (this.get('ui.activeElementId') && this.get('ui.activeElementId') !== this.get('elementId'));
  }),

  close() {
    this.set('isOpen', false);
  },

  actions: {
    toggle() {

      if ('action' in this.attrs) {
        this.attrs.action();
        return;
      }

      if (this.get('isOpen')) {
        this.get('ui').disown(this.get('elementId'));
      } else {
        this.get('ui').own(this.get('elementId'), this.close.bind(this));
      }

      this.toggleProperty('isOpen');
    }
  }

});
