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
        afterCreate: function(oInstance, oEvent) {
            ///Start:Slot:afterCreate<<<
            ///End:Slot:afterCreate<<<
        },
        afterLoad: function() {
            ///Start:Slot:afterLoad<<<
            ///End:Slot:afterLoad<<<
        },
        afterSave: function(oEntity) {
            ///Start:Slot:afterSave<<<
            ///End:Slot:afterSave<<<
        },
        onOpenItem: function(oEntity, oEvent) {
            ///Start:Slot:onOpenItem<<<
            ///End:Slot:onOpenItem<<<
        },
        filters: []
    });

    $scope.$on('load_InventoryInput', function(scope) {
        refresh();
    });

    ///Start:Slot:js<<<
    ///End:Slot:js<<<

    function refresh() {
        listCtrl.load();

        ///Start:Slot:refresh<<<
        ///End:Slot:refresh<<<
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
