var resource = require('resource'),
  thing = resource.use('thing');

module['exports'] = function(options, callback) {
  var $ = this.$;

  // list all of the things
  thing.all(function(err, things){
    if (err) { throw err; }
    things.forEach(function(thing) {
      $('#things').append('<li>'+thing.title+'</li>');
    });
    callback(null, $.html());
  });
};
