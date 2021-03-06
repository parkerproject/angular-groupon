'use strict';

angular.module('gdi2290.groupon', [])
.provider('Groupon', function() {
  // hold on to our generic variables
  var _apiKey = '';
  var _baseUrl = 'https://api.groupon.com/v2';
  var _statusUrl = 'https://api.groupon.com';

  // A function to set the api key
  this.setApiKey = function(key) {
    _apiKey = key || _apiKey;
  };

  this.setBaseUrl = function(uri) {
    _baseUrl = uri || _baseUrl;
  };

  this.setStatusUrl = function(uri) {
    _statusUrl = uri || _statusUrl;
  };

  function prepareRequest(conf) {
    // Ensure we have a config option
    conf = conf || {};

    // Set the callback and the client_id
    // in the config object
    conf.callback = 'JSON_CALLBACK';
    conf.client_id = _apiKey;
    return conf;
  }

  this.$get = ['$q', '$http', function($q, $http) {

    var service = {
      getGrouponSays: function(limit, conf) {
        var dfd = $q.defer();
        conf = prepareRequest(conf);
        conf.limit = limit || 10;
        // Execute the request in the background
        $http({
          method: 'JSONP',
          url: _baseUrl + '/groupon_says.json',
          params: conf
        })
        .success(function(data) {
          dfd.resolve(data);
        })
        .error(function(reason) {
          dfd.reject(reason);
        });
        return dfd.promise;
      },
      getDeals: function(conf) {
        var dfd = $q.defer();
        conf = prepareRequest(conf);
        // Execute the request in the background
        $http({
          method: 'JSONP',
          url: _baseUrl + '/deals.json',
          params: conf
        })
        .success(function(data) {
          dfd.resolve(data);
        })
        .error(function(reason) {
          dfd.reject(reason);
        });
        return dfd.promise;
      },
      getDeal: function(id, conf) {
        var dfd = $q.defer();
        conf = prepareRequest(conf);
        // Execute the request in the background
        $http({
          method: 'JSONP',
          url: _baseUrl + '/deals/' + id + '.json',
          params: conf
        })
        .success(function(data) {
          dfd.resolve(data);
        })
        .error(function(reason) {
          dfd.reject(reason);
        });
        return dfd.promise;
      },
      getDealPosts: function(id, conf) {
        var dfd = $q.defer();
        conf = prepareRequest(conf);
        // Execute the request in the background
        $http({
          method: 'JSONP',
          url: _baseUrl + '/deals/' + id + '/posts.json',
          params: conf
        })
        .success(function(data) {
          dfd.resolve(data);
        })
        .error(function(reason) {
          dfd.reject(reason);
        });
        return dfd.promise;
      },
      getDivisions: function(conf) {
        var dfd = $q.defer();
        conf = prepareRequest(conf);
        // Execute the request in the background
        $http({
          method: 'JSONP',
          url: _baseUrl + '/divisions.json',
          params: conf
        })
        .success(function(data) {
          dfd.resolve(data);
        })
        .error(function(reason) {
          dfd.reject(reason);
        });
        return dfd.promise;
      },
      getStatus: function(conf) {
        var dfd = $q.defer();
        conf = prepareRequest(conf);
        // Execute the request in the background
        $http({
          method: 'JSONP',
          url: _statusUrl + '/status.json',
          params: conf
        })
        .success(function(data) {
          dfd.resolve(data);
        })
        .error(function(reason) {
          dfd.reject(reason);
        });
        return dfd.promise;
      }

    };
    return service;
  }];
});
