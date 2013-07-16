
/**
 * Module dependencies.
 */

var JSV = require('JSV').JSV
  , each = require('each')
  , bind = require('bind');

/**
 * Module exports.
 */

module.exports = SchemaValidate;

/**
 * Initialize new validator.
 */

function SchemaValidate() {

  // make this callbable as function

  if (!(this instanceof SchemaValidate)) return new SchemaValidate();
  var self = this;
  this.env = JSV.createEnvironment();

  // return real validator function

  return function(Model){
    self.model = Model;
    Model.validate(bind(self, self.validate));
  };
}

/**
 * Validator function called with the model class as context.
 *
 * @param {Object} the model instance
 *
 * @api private
 */

SchemaValidate.prototype.validate = function(model){
  var Model = this.model
    , env = this.env;

  // check each attribute with the associated schema

  each(Model.attrs, function(attr, schema){
    var value = model[attr]()
    , report;
    report = env.validate(value, schema);
    registerErrors(model, attr, report);
  });
};

/**
 * Registers the errors included in the report as model errors.
 *
 * @param {Model} model the model instance
 * @param {String} attr the attribute the errors refer to
 * @param {Report} report the jsv report
 *
 * @api private
 */

function registerErrors(model, attr, report) {
  each(report.errors, function(error){
    var uri = error.uri
      , path
      , prop;

    // parse the uri to get the error key

    path = uri.split('#')[1];

    // turn the path into dot notation

    prop = attr + path.replace(/\//g, '.');

    // register the error

    model.error(prop, error);
  });
}
