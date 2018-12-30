'use strict';

/**
 * @ngdoc directive
 * @name main.directive:Task.Filter
 * @description
 * # Task.Filter
 */
angular.module('main').directive('taskListFilters', function() {
    return {
        templateUrl: 'components/Task/task.list.filters.html',
        restrict: 'E',
        scope: {},
        controller: function($scope, userService, TaskService, AdvancedSortService, $mdDialog) {
            $scope.filterData = {};
            $scope.sortData = [];

            var sAdvancedSortName = '';
            var iAdvancedSortKey = 0;

            $scope.$on('load-modal-TaskFilters', function(scope, sAdvancedSortNameParam) {
                sAdvancedSortName = sAdvancedSortNameParam;
                refresh();
            });

            $scope.$on('ok-modal-TaskFilters', function() {
                $scope.sortData.forEach((e, i) => (e.Sequence = i + 1));

                var advancedSortEntity = {
                    id: iAdvancedSortKey,
                    AdvancedSortKey: iAdvancedSortKey,
                    Name: sAdvancedSortName,
                    Sorting: JSON.parse(angular.toJson($scope.sortData))
                };

                var arrFilterData = [];
                for (var prop in $scope.filterData) {
                    if ($scope.filterData.hasOwnProperty(prop)) {
                        if (prop != 'editMode') {
                            arrFilterData.push({
                                AdvancedSortKey: iAdvancedSortKey,
                                FilterDataKey: oFilterKeys[prop],
                                Key: prop,
                                Value: angular.toJson($scope.filterData[prop])
                            });
                        }
                    }
                }

                advancedSortEntity.Filtering = arrFilterData;

                return AdvancedSortService.save(advancedSortEntity).then(function() {
                    $mdDialog.hide('OK');
                    alertify.success('Saved Successfully.');
                });
            });

            var oFilterKeys = {};

            function refresh() {
                AdvancedSortService.getSingleWhere('Name', sAdvancedSortName).then(function(data) {
                    $scope.filterData = {};
                    $scope.sortData = TaskService.sortDataInit;

                    if (data) {
                        //Filtering:
                        data.Filtering.forEach(function(oCurrent) {
                            $scope.filterData[oCurrent.Key] = JSON.parse(oCurrent.Value);
                            oFilterKeys[oCurrent.Key] = oCurrent.FilterDataKey;
                        });

                        //Sorting:
                        $scope.sortData = data.Sorting.length > 0 ? data.Sorting : TaskService.sortDataInit;
                        iAdvancedSortKey = data.id;
                    }
                });
            }

            $scope.theStatus = TaskService.getStatusCatalog();
            $scope.theCategories = TaskService.getCategoryCatalog();
            $scope.thePrioritys = TaskService.getPriorityCatalog();

            userService.loadEntities().then(function() {
                $scope.theUsers = userService.getRecipients();
            });

            $scope.selectAllStatus = function() {
                $scope.filterData.Status = angular.copy($scope.theStatus);
            };
            $scope.selectAllPriority = function() {
                $scope.filterData.Priority = angular.copy($scope.thePrioritys);
            };
            $scope.selectAllCreatedBy = function() {
                $scope.filterData.CreatedBy = angular.copy($scope.theUsers);
            };
            $scope.selectAllAssignedTo = function() {
                $scope.filterData.AssignedTo = angular.copy($scope.theUsers);
            };
            $scope.selectAllCategory = function() {
                $scope.filterData.Category = angular.copy($scope.theCategories);
            };
            $scope.selectAllCompletedBy = function() {
                $scope.filterData.CompletedBy = angular.copy($scope.theUsers);
            };

            $scope.clearStatus = function() {
                $scope.filterData.Status = [];
            };
            $scope.clearPriority = function() {
                $scope.filterData.Priority = [];
            };
            $scope.clearCreatedBy = function() {
                $scope.filterData.CreatedBy = [];
            };
            $scope.clearAssignedTo = function() {
                $scope.filterData.AssignedTo = [];
            };
            $scope.clearCategory = function() {
                $scope.filterData.Category = [];
            };
            $scope.clearCompletedBy = function() {
                $scope.filterData.CompletedBy = [];
            };
        }
    };
});
