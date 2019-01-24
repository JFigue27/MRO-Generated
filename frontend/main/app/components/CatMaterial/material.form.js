'use strict';

/**
 * @ngdoc directive
 * @name main.directive:CatMaterial
 * @description
 * # CatMaterial
 */
angular.module('main').directive('materialForm', function() {
    return {
        templateUrl: 'components/CatMaterial/material.form.html',
        restrict: 'E',
        scope: {
            ///start:slot:scope<<<
            ///end:slot:scope<<<
        },
        controller: 'CatMaterialFormController'
    };
});
