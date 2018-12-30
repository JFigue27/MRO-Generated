'use strict';

/**
 * @ngdoc directive
 * @name Main.directive:Destinataries
 * @description
 * # Destinataries
 */
angular.module('main').directive('destinataries', function() {
    return {
        templateUrl: 'scripts/directives/destinataries.html',
        restrict: 'E',
        scope: {
            ownerEntity: '=',
            placeholder: '@',
            property: '@',
            displayProperty: '@',
            emailProperty: '@',
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
                              var lowercaseEmail = _.lowerCase(oItem[$scope.emailProperty]);
                              return lowercaseItem.indexOf(lowercaseQuery) > -1 || lowercaseEmail.indexOf(lowercaseQuery) > -1;
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
                                return oCurrent[$scope.emailProperty] == oItem[$scope.emailProperty];
                            });
                        })
                );
            };

            $scope.newItem = function(chip) {
                if ($scope.bypassTransform) {
                    return chip;
                } else {
                    var oItem = {};
                    if (chip.hasOwnProperty($scope.emailProperty)) {
                        oItem[$scope.emailProperty] = chip[$scope.emailProperty];
                        oItem[$scope.displayProperty] = chip[$scope.displayProperty];
                    } else {
                        oItem[$scope.emailProperty] = chip;
                        oItem[$scope.displayProperty] = chip;
                    }
                    return oItem;
                }
            };
        }
    };
});
