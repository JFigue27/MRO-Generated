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
        scope: {
            ///start:slot:scope<<<
            parent: '='
            ///end:slot:scope<<<
        },
        controller: 'InventoryInputListController'
    };
});
