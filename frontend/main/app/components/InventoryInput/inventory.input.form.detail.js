'use strict';

/**
 * @ngdoc directive
 * @name main.directive:InventoryInput
 * @description
 * # InventoryInput
 */
angular.module('main').directive('inventoryInputFormDetail', function() {
    return {
        templateUrl: 'components/InventoryInput/inventory.input.form.detail.html',
        restrict: 'E',
        // scope: {},
        controller: 'InventoryInputListController'
    };
});
