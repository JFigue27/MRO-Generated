'use strict';

/**
 * @ngdoc function
 * @name main.controller:CatVendorListController
 * @description
 * # CatVendorListController
 * Controller of the main
 */
angular
    .module('main')
    .controller('CatVendorListController', function($scope, listController, $timeout, CatVendorService, $mdDialog, $rootScope) {
        var listCtrl = new listController({
            scope: $scope,
            entityName: 'CatVendor',
            baseService: CatVendorService,
            afterCreate: function(oInstance, oEvent) {
                $scope.baseEntity = oInstance;
                $('input, md-checkbox')
                    .first()
                    .focus();
                $mdDialog
                    .show({
                        contentElement: '#modal-Vendors',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                        multiple: true,
                        fullscreen: true,
                        targetEvent: oEvent
                    })
                    .then(answer => {
                        if (answer == 'OK') {
                            refresh();
                        }
                    });

                $rootScope.$broadcast('load-modal-Vendors', oInstance);
                ///Start:Slot:afterCreate<<<
                ///End:Slot:afterCreate<<<
            },
            afterLoad: function() {
                listCtrl.setRotationFocus();
                ///Start:Slot:afterLoad<<<
                ///End:Slot:afterLoad<<<
            },
            afterSave: function(oEntity) {
                refresh();
                ///Start:Slot:afterSave<<<
                ///End:Slot:afterSave<<<
            },
            onOpenItem: function(oEntity, oEvent) {
                $mdDialog
                    .show({
                        contentElement: '#modal-Vendors',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                        multiple: true,
                        fullscreen: true,
                        targetEvent: oEvent
                    })
                    .then(answer => {
                        if (answer == 'OK') {
                            refresh();
                        }
                    });

                $rootScope.$broadcast('load-modal-Vendors', oEntity);
                ///Start:Slot:onOpenItem<<<
                ///End:Slot:onOpenItem<<<
            },
            filters: []
        });

        $scope.$on('load_CatVendor', function(scope) {
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
