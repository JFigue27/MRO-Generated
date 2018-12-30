'use strict';

/**
 * @ngdoc function
 * @name main.controller:TaskController
 * @description
 * # TaskController
 * Controller of the main
 */
angular.module('main').controller('TaskController', function($scope, formController, TaskService) {
    var ctrl = this;

    formController.call(this, {
        scope: $scope,
        entityName: 'Task',
        baseService: TaskService,
        afterCreate: function(oEntity) {},
        afterLoad: function(oEntity) {}
    });

    ctrl.load();
});
