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
                $mdDialog
                    .show({
                        contentElement: '#modal-Vendors',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                        multiple: true,
                        fullscreen: true,
                        targetEvent: oEvent
                    })
                    .then(() => {
                        refresh();
                    });

                $rootScope.$broadcast('load-modal-Vendors', oInstance);
            },
            afterLoad: function() {
                listCtrl.setRotationFocus();
            },
            afterSave: function(oEntity) {
                refresh();
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
            },
            filters: []
        });

        $scope.$on('load_CatVendor', function(scope) {
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
