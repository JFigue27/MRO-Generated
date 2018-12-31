'use strict';

/**
 * @ngdoc function
 * @name main.controller:TaskListController
 * @description
 * # TaskListController
 * Controller of the main
 */
angular.module('main').controller('TaskListController', function($scope, listController, TaskService) {
    var ctrl = new listController({
        scope: $scope,
        entityName: 'Task',
        baseService: TaskService,
        afterCreate: function(oInstance) {},
        afterLoad: function() {},
        onOpenItem: function(oItem) {},
        filters: {}
    });

    ctrl.load();
});
