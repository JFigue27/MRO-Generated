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

    $scope.$on('load_InventoryInputDoc', function(scope) {
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
