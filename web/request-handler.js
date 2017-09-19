var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');

exports.handleRequest = function (req, res) {
  console.log('req in handleRequest', req.method, req.url);
  var data = '';
  var asset = req.url;

  if (req.method === 'GET') {
    httpHelpers.serveAssets(res, asset, (response) => {
      data = response;
      if (req.url.substr(0, 4) !== '/www' && req.url !== '/') {
        res.writeHead(404);
        res.end();
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });
  }
  if (req.method === 'POST') {
    var body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      asset = body.substring(4, body.length);

      archive.addUrlToList(asset, () => {
        httpHelpers.serveAssets(res, asset, response => {
          res.writeHead(302, {'Content-Type': 'text/plain'});
          res.end();
        });
      });
    });
  }
};
