var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log('req in handleRequest', req.method, req.url);
  var data = '';
  if (req.url === '/') {
    if (req.method === 'GET') {
      var asset = req.url;
      httpHelpers.serveAssets(res, asset, (response) => {
        data = response;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      });
    }
  }
};
