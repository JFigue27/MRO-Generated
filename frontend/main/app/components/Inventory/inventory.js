'use strict';

/**
 * @ngdoc directive
 * @name main.directive:Inventory
 * @description
 * # Inventory
 */
angular.module('main').directive('inventory', function() {
    return {
        templateUrl: 'components/Inventory/inventory.html',
        restrict: 'E',
        scope: {
            ///start:slot:scope<<<
            ///end:slot:scope<<<
        },
        controller: 'InventoryListController'
    };
});
