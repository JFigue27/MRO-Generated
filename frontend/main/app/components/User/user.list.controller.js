'use strict';

/**
 * @ngdoc function
 * @name main.controller:UserListController
 * @description
 * # UserListController
 * Controller of the main
 */
angular.module('main').controller('UserListController', function($scope, listController, UserService) {
    var ctrl = new listController({
        scope: $scope,
        entityName: 'User',
        baseService: UserService,
        afterCreate: function(oInstance) {},
        afterLoad: function() {},
        onOpenItem: function(oItem) {},
        filters: {}
    });

    ctrl.load();
});
