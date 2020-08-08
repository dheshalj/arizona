'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Arizona = require('./core/Arizona');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Arizona
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Arizona} A new instance of Arizona
 */
function createInstance(defaultConfig) {
  var context = new Arizona(defaultConfig);
  var instance = bind(Arizona.prototype.request, context);

  // Copy arizona.prototype to instance
  utils.extend(instance, Arizona.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var arizona = createInstance(defaults);

// Expose Arizona class to allow class inheritance
arizona.Arizona = Arizona;

// Factory for creating new instances
arizona.create = function create(instanceConfig) {
  return createInstance(mergeConfig(arizona.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
arizona.Cancel = require('./cancel/Cancel');
arizona.CancelToken = require('./cancel/CancelToken');
arizona.isCancel = require('./cancel/isCancel');

// Expose all/spread
arizona.all = function all(promises) {
  return Promise.all(promises);
};
arizona.spread = require('./helpers/spread');

module.exports = arizona;

// Allow use of default import syntax in TypeScript
module.exports.default = arizona;
