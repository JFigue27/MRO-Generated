'use strict';

/**
 * @ngdoc function
 * @name main.controller:InventoryInputListController
 * @description
 * # InventoryInputListController
 * Controller of the main
 */
angular.module('main').controller('InventoryInputListController', function(
    $scope,
    listController,
    $timeout,
    InventoryInputService
    ///start:slot:dependencies<<<
    ///end:slot:dependencies<<<
) {
    var listCtrl = new listController({
        scope: $scope,
        entityName: 'InventoryInput',
        baseService: InventoryInputService,
        afterCreate: function(oInstance, oEvent) {
            $scope.baseEntity = oInstance;
            $('input, md-checkbox')
                .first()
                .focus();
            ///start:slot:afterCreate<<<
            ///end:slot:afterCreate<<<
        },
        afterLoad: function() {
            if ($scope.baseList) {
                $scope.handleDynamicRows($scope.baseList);
            }
            ///start:slot:afterLoad<<<
            ///end:slot:afterLoad<<<
        },
        afterSave: function(oEntity) {
            refresh();
            ///start:slot:afterSave<<<
            ///end:slot:afterSave<<<
        },
        onOpenItem: function(oEntity, oEvent) {
            ///start:slot:onOpenItem<<<
            ///end:slot:onOpenItem<<<
        },
        filters: []
    });

    $scope.$on('load_InventoryInput', function(scope) {
        refresh();
    });

    ///start:slot:js<<<
    ///end:slot:js<<<

    $scope.handleDynamicRows = function(arrRows) {
        if (arrRows.length > 0) {
            var atLeastOneCellFilled = false;
            var lastRow = arrRows[arrRows.length - 1];
            for (var prop in lastRow) {
                if (lastRow.hasOwnProperty(prop)) {
                    if (prop == '$$hashKey' || prop == 'id') {
                        continue;
                    }
                    if (lastRow[prop] !== null && lastRow[prop] !== undefined && (lastRow[prop] > 0 || lastRow[prop].length > 0)) {
                        atLeastOneCellFilled = true;
                        break;
                    }
                }
            }
            if (!atLeastOneCellFilled) {
                return;
            }
        }

        arrRows.push({});
    };

    $scope.removeItem = function(items, index) {
        items.splice(index, 1);
        $scope.handleDynamicRows(items);
    };

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
