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
        scope: {},
        controller: 'InventoryInputDocListController'
    };
});
