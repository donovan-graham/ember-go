import Ember from 'ember';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';

const { inject, computed } = Ember;

let screenWidth  = window.innerWidth  || document.body.clientWidth;


export default Ember.Component.extend(RecognizerMixin, {
 /* Setup */
  tagName: 'nav',
  classNameBindings: [':side-menu', 'isHidden'],
  recognizers: 'pan',

  /* Sevices */
  ui: inject.service('ui'),

  /* Public */
  width: 300,

  /* Private */
  isOpen: false,

  revealWidth: computed('width', function() {
    if (screenWidth && screenWidth > 0) {
      return Math.min(this.get('width'), screenWidth - 50); // -50px for side menu toggle button
    } else {
      return this.get('width');
    }
  }),

  clipPoint: computed('revealWidth', function() {
    return Math.floor(this.get('revealWidth') * 0.2);
  }),

  rafMove: null,
  rafAnimate: null,

  startX: 0,
  lastX: 0,
  startY: 0,
  startZ: 0,


  /* Events */

  panStart() {
    this.get('ui').own(this.get('elementId'), this.close.bind(this));

    let style = window.getComputedStyle(this.$()[0]);
    let matrix = new WebKitCSSMatrix(style.webkitTransform);
    this.startX = matrix.m41;
    this.startY = matrix.m42;
    this.startZ = matrix.m43;

    if (!Ember.testing) {
      this.lastX = this.startX;
    }

    window.cancelAnimationFrame(this.rafAnimate);
    this.rafAnimate = null;
  },

  panMove(e) {
    let x = Math.round(this.startX +  e.originalEvent.gesture.deltaX);
    x = Math.min(0, Math.max(-1 * this.get('revealWidth'), x));

    if (this.lastX === x) {
      return;
    }

    this.lastX = x;
    if (!this.rafMove) {
      this.rafMove = window.requestAnimationFrame(this.move.bind(this));
    }
  },

  panEnd(e) {
    if (Math.abs(e.originalEvent.gesture.deltaX) >= this.get('clipPoint')) {
      this.toggleProperty('isOpen');
    }

    if (!this.get('isOpen')) {
      this.get('ui').disown(this.get('elementId'));
    }

    window.cancelAnimationFrame(this.rafMove);
    this.rafMove = null;

    if (!this.rafAnimate) {
      this.rafAnimate = window.requestAnimationFrame(this.animate.bind(this));
    }
  },

  move() {
    this.rafMove = null;

    let x = this.lastX,
        y = this.startY,
        z = this.startZ,
        style = '';

    // keep original inline style
    style += 'touch-action: pan-x;';
    style += '-webkit-user-select: none;';
    style += '-webkit-user-drag: none;';

    // clear animation
    style += '-webkit-transition: none; ';
    style += '-moz-transition: none; ';
    style += '-ms-transition: none; ';
    style += '-o-transition: none; ';
    style += 'transition: none; ';

    style += '-webkit-transform: translate3d(' + x + 'px,' + y + 'px,' + z + 'px) scale3d(1,1,1); ';
    style += '-moz-transform: translate3d(' + x + 'px,' + y + 'px,' + z + 'px); ';
    style += '-ms-transform: translate3d(' + x + 'px,' + y + 'px,' + z + 'px); ';
    style += '-o-transform: translate3d(' + x + 'px,' + y + 'px,' + z + 'px); ';
    style += 'transform: translate3d(' + x + 'px,' + y + 'px,' + z + 'px); ';

    this.$()[0].style.cssText = style;
  },

  animate() {
    this.rafAnimate = null;

    let x = (this.get('isOpen')) ? -1 * this.get('revealWidth') : 0,
        y = this.startY || 0,
        z = this.startZ || 0,
        animation = 'linear',
        duration = '80',
        style = '';

    // keep original inline style
    style += 'touch-action: pan-x;';
    style += '-webkit-user-select: none;';
    style += '-webkit-user-drag: none;';

    // handle animation
    style += '-webkit-transition: -webkit-transform ' + duration + 'ms ' + animation + '; ';
    style += '-moz-transition: -moz-transform ' + duration + 'ms ' + animation + '; ';
    style += '-ms-transition: -ms-transform ' + duration + 'ms ' + animation + '; ';
    style += '-o-transition: -o-transform ' + duration + 'ms ' + animation + '; ';
    style += 'transition: transform ' + duration + 'ms ' + animation + '; ';

    style += '-webkit-transform: translate3d(' + x + 'px,' + y + 'px,' + z + 'px) scale3d(1,1,1); ';
    style += '-moz-transform: translate3d(' + x + 'px,' + y + 'px,' + z + 'px); ';
    style += '-ms-transform: translate3d(' + x + 'px,' + y + 'px,' + z + 'px); ';
    style += '-o-transform: translate3d(' + x + 'px,' + y + 'px,' + z + 'px); ';
    style += 'transform: translate3d(' + x + 'px,' + y + 'px,' + z + 'px); ';

    this.$()[0].style.cssText = style;
  },


  close() {
    this.set('isOpen', false);

    window.cancelAnimationFrame(this.rafMove);
    this.rafMove = null;

    if (!this.rafAnimate) {
      this.rafAnimate = window.requestAnimationFrame(this.animate.bind(this));
    }
  },


  /* Clean up */

  willDestroyElement() {
    window.cancelAnimationFrame(this.rafMove);
    window.cancelAnimationFrame(this.rafAnimate);

    this.get('ui').disown(this.get('elementId'));
  },


  actions: {
    toggle() {
     if (this.get('isOpen')) {
        this.set('isOpen', false);
        this.get('ui').disown(this.get('elementId'));
      } else {
        this.set('isOpen', true);
        this.get('ui').own(this.get('elementId'), this.close.bind(this));
      }

      window.cancelAnimationFrame(this.rafMove);
      this.rafMove = null;

      if (!this.rafAnimate) {
        this.rafAnimate = window.requestAnimationFrame(this.animate.bind(this));
      }
    },
  }

});
