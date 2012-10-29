'use strict';

DashboardApp.controller('ViewEndpointCtrl', function($scope, $http, $routeParams, $location, g) {

  // Request methods
  $scope.methods = g.request_methods;

  // id of this this endpoint
  var id = $routeParams.id;

  $scope.api = {};
  $scope.endpoint_not_found_msg = "Endpoint not found";
  $scope.delete_dialog = "hide";
  $scope.endpoint_found_class = "hide";

  // Grab endpoint data
  $http({
    url: g.API + id,
    method: "GET"
  })
    .success(function(data, status, headers, config) {
      if (data === g.ENDPOINT_NOT_FOUND) {
        $scope.endpoint_actions_class = "hide";
        $scope.endpoint_detail_class = "hide";
        $scope.endpoint_found_class = "";
        $scope.endpoint_not_found_msg = g.ENDPOINT_NOT_FOUND;
        $scope.api.status = "problem";
      } else {
        $scope.endpoint_actions_class = "";
        $scope.endpoint_detail_class = "";
        $scope.endpoint_found_class = "hide";
        $scope.api = data;
        $scope.api.status = "up";
        $scope.api.expected_response = JSON.parse(JSON.stringify(data.expected_response, undefined, 2));
        $scope.api.method = _.find($scope.methods, function(o) {return o.type === data.method});
        setTimeout(function() {
          prettyPrint();
        }, 1);
        // Run test
        $scope.test();
      }
    })
    .error(function(data, status, headers, config) {
      $scope.api.status = "down";
    })


  // DOM events triggered functions
  $scope.retest = function() {
    $scope.test();
  };

  // Utilties
  $scope.test = function() {
    $.ajax({
      url: $scope.api.url,
      type: $scope.api.method.type,
      headers: {
        "Authorization": "Basic MmExOTg3YTctZTMxZS00NGU5LWEyOTUtNWUyOWNjMmJjYWQ3OmRiZTEwZGIxLTQ5YWEtNGU3Yi1hYzdmLTQ1MjgzNjBjNTgzNQ=="
      },
      success: function(data, textStatus, jqXHR) {
        $scope.api.status = "up";
        $scope.$apply(function() {
          $scope.api.response_data = data;
        })
        prettyPrint();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        $scope.$apply(function() {
          $scope.api.status = "down";
        })
        
      }
    })
  }

  $scope.showDeleteEndpointDialog = function() {
    $scope.delete_dialog = "";
    $scope.endpoint_actions_class = "hide";
  }

  $scope.cancelDeleteEndpoint = function() {
    $scope.delete_dialog = "hide";
    $scope.endpoint_actions_class = "";
  }

  $scope.confirmDeleteEndpoint = function() {
    $http({
      url: g.API + id,
      method: "DELETE"
    })
      .success(function(data, status, headers, config) {
        $location.path("/");
      });
  }

});


