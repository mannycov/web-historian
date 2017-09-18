var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log('req in handleRequest', req.method, req.url);
  var data = '';
  var asset = req.url;
  if (req.url === '/' && req.method === 'GET') {
    // if (req.method === 'GET') {
    httpHelpers.serveAssets(res, asset, (response) => {
      data = response;
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });
    // }
  } else if (req.url === '/www.google.com' && req.method === 'GET') {
    httpHelpers.serveAssets(res, asset, (response) => {
      console.log('this is the rsponse', response);
      data = response;
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });
  }
};
