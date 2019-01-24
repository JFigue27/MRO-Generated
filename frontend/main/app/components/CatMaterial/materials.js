'use strict';

/**
 * @ngdoc directive
 * @name main.directive:CatMaterial
 * @description
 * # CatMaterial
 */
angular.module('main').directive('materials', function() {
    return {
        templateUrl: 'components/CatMaterial/materials.html',
        restrict: 'E',
        scope: {
            ///start:slot:scope<<<
            ///end:slot:scope<<<
        },
        controller: 'CatMaterialListController'
    };
});
