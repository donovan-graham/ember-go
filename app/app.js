import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

const { inject } = Ember;

var App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});



Ember.Router.reopen({

  ui: inject.service(),

  uiPlay: function() {
    this.get('ui').play();
  }.on('willTransition'),

});


loadInitializers(App, config.modulePrefix);

export default App;
