'use strict';

/**
 * @ngdoc function
 * @name main.controller:UserController
 * @description
 * # UserController
 * Controller of the main
 */
angular.module('main').controller('UserController', function($scope, formController, UserService) {
    var ctrl = new formController({
        scope: $scope,
        entityName: 'User',
        baseService: UserService,
        afterCreate: function(oEntity) {},
        afterLoad: function(oEntity) {}
    });

    ctrl.load();
});
