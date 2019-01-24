'use strict';

/**
 * @ngdoc directive
 * @name main.directive:InventoryInput
 * @description
 * # InventoryInput
 */
angular.module('main').directive('inventory', function() {
    return {
        templateUrl: 'components/InventoryInput/inventory.html',
        restrict: 'E',
        scope: {
            ///start:slot:scope<<<
            ///end:slot:scope<<<
        },
        controller: 'InventoryInputListController'
    };
});
