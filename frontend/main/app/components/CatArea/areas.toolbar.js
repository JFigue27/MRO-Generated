'use strict';

/**
 * @ngdoc directive
 * @name main.directive:CatArea
 * @description
 * # CatArea
 */
angular.module('main').directive('areasToolbar', function() {
    return {
        templateUrl: 'components/CatArea/areas.toolbar.html',
        restrict: 'E',
        controller: function($scope) {}
    };
});
