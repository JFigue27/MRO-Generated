'use strict';

/**
 * @ngdoc function
 * @name main.controller:InventoryInputDocController
 * @description
 * # InventoryInputDocController
 * Controller of the main
 */
angular.module('main').controller('InventoryInputDocFormController', function(
    $scope,
    formController,
    InventoryInputDocService,
    $timeout,
    $mdDialog,
    CatVendorService
    ///start:slot:dependencies<<<
    ///end:slot:dependencies<<<
) {
    var ctrl = this;

    formController.call(this, {
        scope: $scope,
        entityName: 'InventoryInputDoc',
        baseService: InventoryInputDocService,
        afterCreate: function(oEntity) {
            ///start:slot:afterCreate<<<
            ///end:slot:afterCreate<<<
        },
        afterLoad: function(oEntity) {
            ///start:slot:afterLoad<<<
            $scope.isDisabled = false;
            if (oEntity.InventoryInputs) {
                $scope.handleDynamicRows(oEntity.InventoryInputs);
            }
            ///end:slot:afterLoad<<<
        }
    });

    ///start:slot:js<<<
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
    ///end:slot:js<<<

    $scope.$on('load-modal-InventoryInput', function(scope, oEntity) {
        refresh(oEntity);
    });

    $scope.$on('ok-modal-InventoryInput', function() {
        $scope.baseEntity.editMode = true;
        return $scope.save().then(function() {
            $mdDialog.hide('OK');
            alertify.success('Saved Successfully.');
        });
    });
    CatVendorService.loadEntities(true).then(function(oResponse) {
        $scope.theCatVendors = oResponse.Result;
    });

    function refresh(oInventoryInputDoc) {
        ///start:slot:refresh<<<
        ctrl.load(oInventoryInputDoc);
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
