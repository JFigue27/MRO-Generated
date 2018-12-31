'use strict';

/**
 * @ngdoc directive
 * @name main.directive:Task
 * @description
 * # Task
 */
angular.module('main').directive('taskList', function() {
    return {
        templateUrl: 'components/Task/task.list.html',
        restrict: 'E',
        controller: function($scope, listController, $mdDialog, $rootScope, TaskService, $timeout, AdvancedSortService, $location) {
            var listCtrl = new listController({
                scope: $scope,
                entityName: 'Task',
                baseService: TaskService,
                paginate: true,
                perPage: 10,
                afterCreate: function(oInstance, oEvent) {
                    $mdDialog.show({
                        title: 'Task',
                        contentElement: '#modal-Task',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                        multiple: true,
                        fullscreen: true,
                        targetEvent: oEvent,
                        onRemoving: function(element, removePromise) {
                            listCtrl.load();
                        }
                    });

                    $rootScope.$broadcast('load-modal-Task', oInstance);
                },
                afterLoad: function() {},
                onOpenItem: function(oEntity, oEvent) {
                    $mdDialog.show({
                        title: 'Task',
                        contentElement: '#modal-Task',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                        multiple: true,
                        fullscreen: true,
                        targetEvent: oEvent,
                        onRemoving: function(element, removePromise) {
                            listCtrl.load();
                        }
                    });

                    $rootScope.$broadcast('load-modal-Task', oEntity);
                },
                filters: []
            });

            $scope.$on('load_Task', function(scope) {
                refresh();
            });

            var sAdvancedSortName = 'MainTaskList';

            function refreshFilterInfo() {
                // AdvancedSortService.getSingleWhere('Name', sAdvancedSortName).then(function(data) {
                //     if (data) {
                //         if (data.Filtering) {
                //             for (var prop in data.Filtering) {
                //                 if (data.Filtering.hasOwnProperty(prop) && data.Filtering[]) {
                //                 }
                //             }
                //         }
                //     }
                // });
            }

            // refreshFilterInfo();

            $scope.openFilters = function(oEvent) {
                $mdDialog
                    .show({
                        title: 'Tasks Filters',
                        contentElement: '#modal-TaskFilters',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                        multiple: true,
                        fullscreen: true,
                        targetEvent: oEvent
                    })
                    .then(function(answer) {
                        if (answer == 'OK') {
                            refresh();
                        }
                    });

                $rootScope.$broadcast('load-modal-TaskFilters', sAdvancedSortName);
            };

            $scope.openTask = function(oItem) {
                $timeout(function() {
                    TaskService.goToTask(oItem);
                }, 100);
            };

            function refresh() {
                listCtrl.load('advanced-sort=MainTaskList');
            }

            $scope.$on('on_login', function() {
                refresh();
            });

            $timeout(function() {
                refresh();
            }, 800);
        }
    };
});
