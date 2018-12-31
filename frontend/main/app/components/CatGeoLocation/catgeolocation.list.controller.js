'use strict';

/**
 * @ngdoc function
 * @name main.controller:CatGeoLocationListController
 * @description
 * # CatGeoLocationListController
 * Controller of the main
 */
angular
    .module('main')
    .controller('CatGeoLocationListController', function($scope, listController, $timeout, CatGeoLocationService, $mdDialog, $rootScope) {
        var listCtrl = new listController({
            scope: $scope,
            entityName: 'CatGeoLocation',
            baseService: CatGeoLocationService,
            afterCreate: function(oInstance, oEvent) {
                $mdDialog
                    .show({
                        contentElement: '#modal-Locations',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                        multiple: true,
                        fullscreen: true,
                        targetEvent: oEvent
                    })
                    .then(() => {
                        refresh();
                    });

                $rootScope.$broadcast('load-modal-Locations', oInstance);
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
                        contentElement: '#modal-Locations',
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

                $rootScope.$broadcast('load-modal-Locations', oEntity);
            },
            filters: []
        });

        $scope.$on('load_CatGeoLocation', function(scope) {
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
