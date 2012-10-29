'use strict';

describe('Controller: ViewEndpointCtrl', function() {

  // load the controller's module
  beforeEach(module('DashboardApp'));

  var ViewEndpointCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    ViewEndpointCtrl = $controller('ViewEndpointCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
