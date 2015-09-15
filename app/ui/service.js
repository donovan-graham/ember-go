import Ember from 'ember';

export default Ember.Service.extend({

  activeElementId: null,
  deactivateCallback: null,

  own(elementId, cb) {
    /*
      Take ownership as the active ui element,
      the previous ui element's callback will be triggered.
    */
    if (this.get('activeElementId') !== elementId && this.get('deactivateCallback')) {
      this.get('deactivateCallback')();
    }

    this.setProperties({
      activeElementId: elementId,
      deactivateCallback: cb,
    });
  },

  drop(elementId) {
    /*
      Drop ownership if the element is current ui element. Callback will not be triggered.
      Must implement this components willDestroyElement hook.
    */

    if (this.get('activeElementId') !== elementId) {
      return;
    }

    this.setProperties({
      activeElementId: null,
      deactivateCallback: null,
    });
  },

  run() {
    /*
     Run callback and clear the the active ui element.
    */
    if (this.get('deactivateCallback')) {
      this.get('deactivateCallback')();
    }

    this.setProperties({
      activeElementId: null,
      deactivateCallback: null,
    });
  }

});
