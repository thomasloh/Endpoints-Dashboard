'use strict';

describe('Controller: EditEndpointCtrl', function() {

  // load the controller's module
  beforeEach(module('DashboardApp'));

  var EditEndpointCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    EditEndpointCtrl = $controller('EditEndpointCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
