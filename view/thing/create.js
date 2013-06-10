var resource = require('resource'),
  thing = resource.use('thing'),
  forms = resource.use('forms');

module['exports'] = function(options, callback) {
  var $ = this.$;
  forms.generate({
      resource: 'thing',
      method: 'create'
    }, 
    function(err, result) {
      if (err) { throw err; }
      $('.upload-create').html(result);
      callback(null, $.html());
  });
};
