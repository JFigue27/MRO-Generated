'use strict';

/**
 * @ngdoc directive
 * @name main.directive:Relationator
 * @description
 * # Relationator
 */
angular.module('main').directive('relationator', function() {
    return {
        templateUrl: 'scripts/directives/relationator.html',
        restrict: 'E',
        scope: {
            entityName: '@',
            relatedEntityName: '@'
        },
        transclude: true,
        controller: function($scope, relationatorController, $mdDialog) {
            var relationator = new relationatorController({
                entityName: $scope.entityName,
                relatedEntityName: $scope.relatedEntityName,
                dragulaBagName: 'entities-bag',
                scope: $scope
            });

            $scope.$on('load-relationator-' + $scope.entityName + $scope.relatedEntityName, function(
                scope,
                iParentKey,
                BaseService,
                RelatedService
            ) {
                relationator.setBaseService(BaseService);
                relationator.setRelatedService(RelatedService);
                relationator.load(iParentKey);
            });
        }
    };
});
