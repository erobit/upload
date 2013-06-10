var resource = require('resource'),
  thing = resource.use('thing'),
  forms = resource.use('forms');

module['exports'] = function (options, callback) {
  var $ = this.$;
  return callback(null, $.html());
}