'use strict';

/**
 * @ngdoc directive
 * @name main.directive:InventoryInputDoc
 * @description
 * # InventoryInputDoc
 */
angular.module('main').directive('inputDocs', function() {
    return {
        templateUrl: 'components/InventoryInputDoc/inputDocs.html',
        restrict: 'E',
        scope: {
            ///start:slot:scope<<<
            ///end:slot:scope<<<
        },
        controller: 'InventoryInputDocListController'
    };
});
