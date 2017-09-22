var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  if (asset === '/') {
    asset = path.join(__dirname, '../web/public/index.html');
    fs.readFile(asset, 'utf-8', (err, data) => {
      if (err) {
        console.log('err', err);
      } else {
        callback(data);
      }
    });
  } else if (asset === '/styles.css') {
    asset = path.join(__dirname, '../web/public/styles.css');
    fs.readFile(asset, 'utf-8', (err, data) => {
      if (err) {
        console.log('err', err);
      } else {
        callback(data);
      }
    });
  } else {
    archive.isUrlArchived(asset, boolean => {
      if (!boolean) {
        var string = asset.substr(4);
        string = string.slice(0, -4);
        console.log('this is the whole asset', asset);
        console.log('this is the sliced string', string);
        var url = '../archives/sites/' + asset;
        asset = path.join(__dirname, url);
        fs.writeFile(asset, '/' + string + '/', err => console.log('err', err));
        fs.readFile(asset, 'utf-8', (err, data) => {
          if (err) {
            console.log('err:', err);
          } else {
            callback(data);
          }
        });
      } else {
        callback(null);
      }
    });
  }
};



// As you progress, keep thinking about what helper functions you can put here!
