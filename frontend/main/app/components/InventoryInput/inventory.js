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
        scope: {},
        controller: 'InventoryInputListController'
    };
});
