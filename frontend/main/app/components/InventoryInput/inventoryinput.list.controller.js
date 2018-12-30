'use strict';

/**
 * @ngdoc function
 * @name main.controller:InventoryInputListController
 * @description
 * # InventoryInputListController
 * Controller of the main
 */
angular.module('main').controller('InventoryInputListController', function($scope, listController, $timeout, InventoryInputService) {
    var listCtrl = new listController({
        scope: $scope,
        entityName: 'InventoryInput',
        baseService: InventoryInputService,
        afterCreate: function(oInstance, oEvent) {},
        afterLoad: function() {},
        afterSave: function(oEntity) {},
        onOpenItem: function(oEntity, oEvent) {},
        filters: []
    });

    $scope.$on('load_InventoryInput', function(scope) {
        refresh();
    });

    function refresh() {
        listCtrl.load();
    }

    $scope.$on('on_login', function() {
        refresh();
    });

    $timeout(function() {
        refresh();
        $('input, md-checkbox')
            .first()
            .focus();
    }, 200);
});
