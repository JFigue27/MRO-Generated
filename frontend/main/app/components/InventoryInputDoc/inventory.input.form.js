'use strict';

/**
 * @ngdoc directive
 * @name main.directive:InventoryInputDoc
 * @description
 * # InventoryInputDoc
 */
angular.module('main').directive('inventoryInputForm', function() {
    return {
        templateUrl: 'components/InventoryInputDoc/inventory.input.form.html',
        restrict: 'E',
        scope: {
            ///start:slot:scope<<<
            ///end:slot:scope<<<
        },
        controller: 'InventoryInputDocFormController'
    };
});
