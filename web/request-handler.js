var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log('req in handleRequest', req.method);
  if (req.url === '/') {
    if (req.method === 'GET') {

    //  httpHelpers.serveAssets(res, asset, callback);
    }
  }
  res.end(archive.paths.list);
};
