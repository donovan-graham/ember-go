import Ember from 'ember';

export default Ember.Controller.extend({
  enableFilter: false,

  isBulk: false,

  actions: {
    bulk() {
      this.setProperties({
        selectedItems: [],
        isBulk: !this.get('isBulk')
      });
    }
  }
});
