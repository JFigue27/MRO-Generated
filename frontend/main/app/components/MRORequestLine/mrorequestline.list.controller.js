'use strict';

/**
 * @ngdoc function
 * @name main.controller:MRORequestLineListController
 * @description
 * # MRORequestLineListController
 * Controller of the main
 */
angular.module('main').controller('MRORequestLineListController', function(
    $scope,
    listController,
    $timeout,
    MRORequestLineService,
    CatMaterialService
    ///start:slot:dependencies<<<
    ///end:slot:dependencies<<<
) {
    var listCtrl = new listController({
        scope: $scope,
        entityName: 'MRORequestLine',
        baseService: MRORequestLineService,
        ///start:slot:listOptions<<<
        ///end:slot:listOptions<<<
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
            $scope.isDisabled = false;
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

    $scope.$on('load_MRORequestLine', function(scope) {
        refresh();
    });

    ///start:slot:js<<<
    $scope.$watch('parent.id', function() {
        if ($scope.parent) {
            listCtrl.localLoad($scope.parent.MRORequestLines);
        } else {
            $scope.baseList = [];
        }
    });
    $scope.onInputChange = function(oItem) {
        let allFieldsAreEmtpy = true;
        for (let prop in oItem) {
            if (['Quantity'].indexOf(prop) > -1) {
                if (oItem[prop] != '' && oItem[prop] != null && oItem[prop] != undefined) {
                    allFieldsAreEmtpy = false;
                    break;
                }
            }
        }

        if (allFieldsAreEmtpy) {
            if (oItem.hasOwnProperty('id')) {
                oItem.EF_State = 3; // Deleted
            }
        } else {
            oItem.EF_State = 2; // Modified
            if (!oItem.hasOwnProperty('id') || oItem.id == null || oItem.id == undefined || oItem.id == 0) {
                oItem.id = 0;
                oItem.EF_State = 1; // Added
            }
        }
    };
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
    $scope.CatMaterialService = CatMaterialService;

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
