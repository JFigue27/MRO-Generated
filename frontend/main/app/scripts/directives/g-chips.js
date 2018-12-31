'use strict';

/**
 * @ngdoc directive
 * @name Main.directive:GChips
 * @description
 * # GChips
 */
angular.module('main').directive('gChips', function() {
    return {
        templateUrl: 'scripts/directives/g-chips.html',
        restrict: 'E',
        scope: {
            ownerEntity: '=',
            placeholder: '@',
            property: '@',
            displayProperty: '@',
            itemsSource: '=',
            bypassTransform: '=',
            requireMatch: '='
        },
        controller: function($scope) {
            $scope.on_input_change = function(oEntity) {
                oEntity.editMode = true;
            };

            $scope.$watch(
                'ownerEntity',
                function() {
                    if ($scope.ownerEntity) {
                        $scope.ownerEntity[$scope.property] = $scope.ownerEntity[$scope.property] || [];
                    } else {
                        $scope.ownerEntity = {};
                        $scope.ownerEntity[$scope.property] = $scope.ownerEntity[$scope.property] || [];
                    }
                },
                false
            );

            function commonQueryItems(query) {
                return $scope.itemsSource
                    ? $scope.itemsSource.filter(function(oItem) {
                          if (query) {
                              var lowercaseQuery = _.lowerCase(query || null);
                              var lowercaseItem = _.lowerCase(oItem[$scope.displayProperty]);
                              return lowercaseItem.indexOf(lowercaseQuery) > -1;
                          } else {
                              return [];
                          }
                      })
                    : [];
            }

            $scope.queryItems = function(query) {
                return (
                    commonQueryItems(query)
                        //Omit duplicates:
                        .filter(function(oItem) {
                            return !$scope.ownerEntity[$scope.property].find(function(oCurrent) {
                                return oCurrent[$scope.displayProperty] == oItem[$scope.displayProperty];
                            });
                        })
                );
            };

            $scope.newItem = function(chip) {
                if ($scope.bypassTransform) {
                    return chip;
                } else {
                    var oItem = {};
                    oItem[$scope.displayProperty] = chip;
                    return oItem;
                }
            };
        }
    };
});
