var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
    }
    if (callback) {
      callback(data.split('\n'));
    }
  });
};

exports.isUrlInList = function(url, callback) {
  fs.readFile(exports.paths.list, 'utf-8', (err, data) => {
    callback(data.includes(url));
  });
};

exports.addUrlToList = function(url, callback) {
  var string = (url + '\n');
  fs.appendFile(exports.paths.list, string, function(err) {
    callback();
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, (err, files) => {
    if (err) {
      throw err;
    }
    callback(files.includes(url));
  });
};

exports.downloadUrls = function(urls) {
  urls.forEach(url => {
    const path = exports.paths.archivedSites + '/' + url;
    fs.appendFile(path, url, err => {
      if (err) {
        throw err;
      }
    });
  });
};




