import Ember from 'ember';

const { inject } = Ember;

export default Ember.Component.extend({
  classNameBindings: [':header-menu', 'isOpen'],

  ui: inject.service(),

  title: '',
  itemCount: 0,

  isOpen: false,

  close() {
    this.set('isOpen', false);
  },

  actions: {
    toggle() {
      if ('action' in this.attrs) {
        this.attrs.action();
        return;
      }

      if (this.get('itemCount') === 0) {
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
