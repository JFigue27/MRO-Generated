'use strict';

/**
 * @ngdoc directive
 * @name main.directive:CatArea
 * @description
 * # CatArea
 */
angular.module('main').directive('areas', function() {
    return {
        templateUrl: 'components/CatArea/areas.html',
        restrict: 'E',
        scope: {
            ///start:slot:scope<<<
            ///end:slot:scope<<<
        },
        controller: 'CatAreaListController'
    };
});
