'use strict';

/**
 * @ngdoc function
 * @name main.controller:InventoryInputDocListController
 * @description
 * # InventoryInputDocListController
 * Controller of the main
 */
angular.module('main').controller('InventoryInputDocListController', function($scope, listController, $timeout, InventoryInputDocService) {
    var listCtrl = new listController({
        scope: $scope,
        entityName: 'InventoryInputDoc',
        baseService: InventoryInputDocService,
        afterCreate: function(oInstance, oEvent) {
            ///start:slot:afterCreate<<<
            ///end:slot:afterCreate<<<
        },
        afterLoad: function() {
            ///start:slot:afterLoad<<<
            ///end:slot:afterLoad<<<
        },
        afterSave: function(oEntity) {
            ///start:slot:afterSave<<<
            ///end:slot:afterSave<<<
        },
        onOpenItem: function(oEntity, oEvent) {
            ///start:slot:onOpenItem<<<
            ///end:slot:onOpenItem<<<
        },
        filters: []
    });

    $scope.$on('load_InventoryInputDoc', function(scope) {
        refresh();
    });

    ///start:slot:js<<<
    ///end:slot:js<<<

    function refresh() {
        listCtrl.load();

        ///start:slot:refresh<<<
        ///end:slot:refresh<<<
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
