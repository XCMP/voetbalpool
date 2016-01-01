(function(http, fs, url, _, _s) {

  var PORT = 1337;
  var JSONDATA = JSON.parse(fs.readFileSync('stub_requests.json', 'utf8'));
  var HEADER_CONTENT_TYPE_JSON = {'Content-Type': 'application/json'};
  var HEADER_CONTENT_TYPE_HTML = {'Content-Type': 'text/html'};
  var HEADER_CONTENT_TYPE_CSS = {'Content-Type': 'text/css'};
  //var HEADER_REDIRECT_TO_INDEX = {'Location': };

  var handle_requests = function(req, res) {
    var path = url.parse(req.url).pathname;
    console.log(req.method + ' ' + path);

    if (_s.startsWith(path, '/vp/')) {
      handleJsonRequest(req.method + '|' + path, res);
    } else {
      handleAssets(path, res);
    }
    // } else {
    //   handlePageNotFound(res);
    // }
  };

  var handleJsonRequest = function(method_path, res) {
    var data = _.find(JSONDATA.requests, function(request){
      return request.method_path === method_path;
    });
    if (data) {
      send_response(data.data.statusCode, {'header': HEADER_CONTENT_TYPE_JSON, 'data': JSON.stringify(data.data.object)}, res);
    } else {
      send_response(404, {'header': HEADER_CONTENT_TYPE_JSON, 'data':'RESOURCE NOT FOUND'}, res);
    }
  };

  var handleAssets = function(path, res) {
    var fileName = _s.strRightBack('/Users/Marco/Documents/Code/javascript/voetbalpool/dist' + path, 'utf8');
    fs.readFile(fileName, 'utf8', function(err, data) {
      if (err && err.code === 'ENOENT') {
        console.log(err);
      } else {
        if (path.endsWith('css')) {
          send_response(200, {'header': HEADER_CONTENT_TYPE_CSS, 'data': data}, res);
        } else {
          send_response(200, {'header': HEADER_CONTENT_TYPE_HTML, 'data': data}, res);
        }
      }
    });
  };

  var send_response = function(status, result, res) {
    res.writeHead(status, result.header);
    if (result.data) {
      res.write(result.data);
    }
    res.end();
  };

  // start the server
  http.createServer(function (req, res) {
    // ignore favicon request
    if (req.url === '/favicon.ico') {
      res.writeHead(200, {'Content-Type': 'image/x-icon'} );
      res.end();
      return;
    }
    // handle other requests
    handle_requests(req, res);
  }).listen(PORT);

  console.info('\nExecuting code from ' + __filename);
  console.info('Server running on localhost:' + PORT);

})(require('http'), require('fs'), require('url'), require('underscore'), require('underscore.string'));
