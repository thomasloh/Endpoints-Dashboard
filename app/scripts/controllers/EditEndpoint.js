'use strict';

DashboardApp.controller('EditEndpointCtrl', function($scope, $http, $routeParams, g, $location) {
  // Init the code editor
  $scope.editor = ace.edit("editor");
  $scope.editor.setTheme("ace/theme/monokai");
  $scope.editor.getSession().setMode("ace/mode/javascript");

  // Request methods
  $scope.methods = g.request_methods;

  // id of this this endpoint
  var id = $routeParams.id;

  // model
  $scope.api = {};
  $scope.error_msg_class = "hide"

  // Grab endpoint data
  $http({
    url: g.API + id,
    method: "GET"
  })
    .success(function(data, status, headers, config) {
      if (data === g.ENDPOINT_NOT_FOUND) {
        $scope.endpoint_not_found_class = "hide";
        $scope.endpoint_not_found_msg = g.ENDPOINT_NOT_FOUND;
        $scope.api.status = "problem";
      } else {
        $scope.endpoint_not_found_class = "";
        $scope.endpoint_found_class = "hide";
        $scope.api = data;
        $scope.api.status = "up";
        $scope.api.expected_response = JSON.parse(JSON.stringify(data.expected_response, undefined, 2));
        $scope.editor.setValue($scope.api.expected_response);
        $scope.editor.clearSelection();
        $scope.editor.scrollPageUp();
        $scope.editor.gotoLine(1, 0, true);
        $scope.api.method = _.find(g.request_methods, function(o) {return o.type === data.method});
        setTimeout(function() {
          prettyPrint();
        }, 1);
      }
    })
    .error(function(data, status, headers, config) {
      $scope.api.status = "down";
    })


  $scope.updateEndpoint = function() {
    try {
      $scope.api.expected_response = JSON.parse(JSON.stringify($scope.editor.getValue()))
    }
    catch(e) {
      console.log("not json")
    }
    if (angular.isUndefined($scope.api.name) ||
        angular.isUndefined($scope.api.short) ||
        angular.isUndefined($scope.api.description) ||
        angular.isUndefined($scope.api.method) || 
        angular.isUndefined($scope.api.url) || 
        $scope.api.expected_response.length === 0) {
      $scope.error_msg_class = "";
    } else {
      $scope.error_msg_class = "hide";

      $http({
        url: g.API + id,
        method: "PUT",
        data: {
          url: $scope.api.url,
          method: $scope.api.method.type,
          short: $scope.api.short,
          name: $scope.api.name,
          description: $scope.api.description,
          expected_response: $scope.api.expected_response
        } 
      })
        .success(function(data, status, headers, config) {
          $location.path("/api/" + id);
        })
        .error(function(data, status, headers, config) {

        })

    }

  }

  $scope.cancelUpdateEndpoint = function() {
    $location.path("/api/" + id);
  }
});




