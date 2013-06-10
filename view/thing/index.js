var resource = require('resource'),
  thing = resource.use('thing'),
  forms = resource.use('forms');

// list all uploads / things
module['exports'] = function (options, callback) {
  var $ = this.$;
  return callback(null, $.html());
}