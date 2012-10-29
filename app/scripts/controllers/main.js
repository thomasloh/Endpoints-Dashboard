'use strict';

DashboardApp.controller('MainCtrl', function($scope, $http, g) {

  // Spinner
  $scope.spinner = getSpinner();
  $scope.status_class = "hide";
  $scope.spinner_class = "";

  // Grab endpoint data
  $http({
    url: g.API,
    method: "GET"
  })
    .success(function(data, status, headers, config) {
      console.log(data)
      if (data === g.NO_ENDPOINTS) {
        $scope.no_endpoints_msg = g.NO_ENDPOINTS;
      } else {
        $scope.endpoints = data;
        $scope.test_all();
      }
    })
    .error(function(data, status, headers, config) {
      console.log("Error retrieving /endpoints/");
    })

  // Get status of each endpoint
  $scope.test_all = function() {
    $scope.status_class = "hide";
    $scope.spinner_class = "";
    _.each($scope.endpoints, function(o) {
      $scope.test(o);
    })
  }

  $scope.test = function(o) {
    $.ajax({
      url: o.url,
      type: o.method,
      headers: {
        "Authorization": "Basic MmExOTg3YTctZTMxZS00NGU5LWEyOTUtNWUyOWNjMmJjYWQ3OmRiZTEwZGIxLTQ5YWEtNGU3Yi1hYzdmLTQ1MjgzNjBjNTgzNQ=="
      },
      success: function(data, textStatus, jqXHR) {
        $scope.$apply(function() {
          $scope.status_class = "";
          $scope.spinner_class = "hide";
          o.status = "up";
        })
      },
      error: function(jqXHR, textStatus, errorThrown) {
        $scope.$apply(function() {
          o.status  = "down";
        })
      }
    })
  }

  function getSpinner() {
    var opts = {
      lines: 7, // The number of lines to draw
      length: 0, // The length of each line
      width: 3, // The line thickness
      radius: 5, // The radius of the inner circle
      corners: 1, // Corner roundness (0..1)
      rotate: 0, // The rotation offset
      color: '#000', // #rgb or #rrggbb
      speed: 1, // Rounds per second
      trail: 60, // Afterglow percentage
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      top: 'auto', // Top position relative to parent in px
      left: 'auto' // Left position relative to parent in px
    };
    var spinner = new Spinner(opts).spin();
    return nodeToString(spinner.el);
  }

  function nodeToString ( node ) {
     var tmpNode = document.createElement( "div" );
     tmpNode.appendChild( node.cloneNode( true ) );
     var str = tmpNode.innerHTML;
     tmpNode = node = null; // prevent memory leaks in IE
     return str;
  }


});
