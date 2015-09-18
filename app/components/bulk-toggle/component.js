import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'div',
  classNameBindings: [':toggle', 'isSelected'],

  item: null,
  selected: [],

  isSelected: computed('item', 'selected.[]', function() {
    return this.get('selected').contains(this.get('item'));
  }),

  click() {
    this.attrs['on-click']();
  }

});


