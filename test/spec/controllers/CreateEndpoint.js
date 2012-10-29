'use strict';

describe('Controller: CreateEndpointCtrl', function() {

  // load the controller's module
  beforeEach(module('DashboardApp'));

  var CreateEndpointCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    CreateEndpointCtrl = $controller('CreateEndpointCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
