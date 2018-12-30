'use strict';

/**
 * @ngdoc directive
 * @name main.directive:Task
 * @description
 * # Task
 */
angular.module('main').directive('taskForm', function() {
    return {
        templateUrl: 'components/Task/task.form.html',
        restrict: 'E',
        controller: function($scope, formController, $mdDialog, TaskService) {
            var ctrl = this;

            formController.call(this, {
                scope: $scope,
                entityName: 'Task',
                baseService: TaskService,
                afterCreate: function(oEntity) {},
                afterLoad: function(oEntity) {}
            });

            $scope.$on('load-modal-Task', function(scope, oTask) {
                refresh(oTask);
            });

            $scope.$on('ok-modal-Task', function() {
                $scope.baseEntity.editMode = true;
                return ctrl.save().then(function() {
                    $mdDialog.hide();
                    alertify.success('Saved Successfully.');
                });
            });

            function refresh(oTask) {
                ctrl.load(oTask);
            }
        }
    };
});
