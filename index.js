var resource = require('resource'),
	thing = resource.use('thing'),
	upload = resource.define('upload');

// define how uploads will be persisted
thing.persist('memory');

// define schema - use thing schema for consistency / exporting
upload.schema = thing.schema;

resource.use('html');
resource.use('http');
resource.use('view');

upload.method('init', init, {
  "description": "augment web server with views for upload resource",
  "properties": {
    "options": {
      "type": "object",
      "properties": {
        "app": "current web server instance"
      }
    },
    "callback": {
      "type": "function"
    }
  }
});

function init(options, callback) {
	// 
	// Is web server running? - check resource.http.app
	// otherwise spin up a webserver - upload is being used standalone
	// 
	if(!resource.http.app) {
		console.log('http server must already be running');
		// should we use logger resource here?
		return;
	}

	var connect = require('connect');

	// Serve the /public/ folder
	resource.http.app.use(connect.static(__dirname + '/public'));

	// dynamically create views from filesystem path
	resource.view.create({ path: __dirname + '/view' }, function(err, view) {
		if (err || !resource.http.app) {
			callback(err);
			return;
		}

		// register this view as middleware
		resource.http.app.use(resource.view.middle({view: view}));
	});
}

// TESTING - REMOVE WHEN PACKAGING
function listen(options, callback) {
	resource.http.listen({}, function(){
		upload.init({}, function(err, test){
			if(err) { 
				console.log(err); 
				return 
			}
		});
	});
}
listen();

exports.upload = upload;