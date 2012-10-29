'use strict';

var DashboardApp = angular.module('DashboardApp', [])
  .factory('g', function() {
    var data = {
      API: 'http://localhost/endpoints/',
      ENDPOINT_NOT_FOUND: "Endpoint not found",
      NO_ENDPOINTS: "No endpoints yet.",
      request_methods: [
        {type: "GET"},
        {type: "POST"},
        {type: "PUT"},
        {type: "DELETE"}
      ]
    }
    return data;
  })
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/api/new', {
        templateUrl: 'views/create-endpoint.html',
        controller: 'CreateEndpointCtrl'
      })
      .when('/api/:id/edit', {
        templateUrl: 'views/edit-endpoint.html',
        controller: 'EditEndpointCtrl'
      })
      .when('/api/:id', {
        templateUrl: 'views/view-endpoint.html',
        controller: 'ViewEndpointCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
