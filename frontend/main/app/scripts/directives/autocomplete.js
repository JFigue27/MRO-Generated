'use strict';

/**
 * @ngdoc directive
 * @name main.directive:autocomplete
 * @description
 * # autocomplete
 */
angular.module('main').directive('autocomplete', function() {
    return {
        templateUrl: 'scripts/directives/autocomplete.html',
        restrict: 'E',
        scope: {
            caption: '@',
            ownerEntity: '=',
            property: '@',
            propertyKey: '@',
            valueProperty: '@',
            service: '=',
            onChange: '&'
        },
        controller: function($scope) {
            $scope.querySource = function(sQuery) {
                if (!$scope.service) return Promise.reject('No given service.');

                return $scope.service.getFilteredPage(0, 1, '?filterGeneral=' + sQuery).then(function(response) {
                    return response.Result;
                });
            };

            $scope.newEntry = function(sValue) {
                if (sValue) {
                    $scope.service
                        .createEntity()
                        .then(function(oInstance) {
                            oInstance[$scope.valueProperty] = sValue;
                            return oInstance;
                        })
                        .then($scope.service.save)
                        .then(function(oEntity) {
                            $scope.theSearch = '';
                            alertify.success('Created Successfully.');
                            $timeout(function() {
                                $scope.theSearch = sValue;
                            });
                        })
                        .catch(function() {
                            alertify.error('An error has occurried');
                        });
                }
            };

            $scope.onSelectedItemChange = function() {
                if ($scope.ownerEntity && $scope.ownerEntity[$scope.property]) {
                    $scope.ownerEntity[$scope.propertyKey] = $scope.ownerEntity[$scope.property].id;
                }
                $scope.onChange();
            };
        }
    };
});
