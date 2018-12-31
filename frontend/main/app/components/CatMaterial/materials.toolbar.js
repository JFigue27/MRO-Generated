'use strict';

/**
 * @ngdoc directive
 * @name main.directive:CatMaterial
 * @description
 * # CatMaterial
 */
angular.module('main').directive('materialsToolbar', function() {
    return {
        templateUrl: 'components/CatMaterial/materials.toolbar.html',
        restrict: 'E',
        controller: function($scope) {}
    };
});
