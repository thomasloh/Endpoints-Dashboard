'use strict';

DashboardApp.controller('CreateEndpointCtrl', function($scope, $http, $location, g) {

  // Init the code editor
  $scope.editor = ace.edit("editor");
  $scope.editor.setTheme("ace/theme/monokai");
  $scope.editor.getSession().setMode("ace/mode/javascript");

  // model
  $scope.api = {};
  $scope.error_msg_class = "hide"

  $scope.addNewEndpoint = function() {
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
        url: g.API,
        method: "POST",
        data: {
          url: $scope.api.url,
          method: $scope.api.method,
          short: $scope.api.short,
          name: $scope.api.name,
          description: $scope.api.description,
          expected_response: $scope.api.expected_response
        } 
      })
        .success(function(data, status, headers, config) {
          $location.path("/api/" + data.id);
        })
        .error(function(data, status, headers, config) {
          console.log("error")
          console.log(data)
        })

    }

  }

});
