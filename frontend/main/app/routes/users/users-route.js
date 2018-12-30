'use strict';

/**
 * @ngdoc function
 * @name main.controller:UsersController
 * @description
 * # UsersController
 * Controller of the main
 */
angular.module('main').controller('UsersController', function($scope) {
    $scope.setFocus = function() {
        angular.element('.SearchInput').focus();
    };
});
