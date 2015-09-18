import Ember from 'ember';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';

export default Ember.Component.extend(RecognizerMixin, {
  classNames: ['menu-toggle'],
  recognizers: 'tap',

  tap() {
    // console.log('tap');
    this.attrs['on-click']();
    return false;
  }
});
