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
                $scope.baseEntity = oInstance;
                $('input, md-checkbox')
                    .first()
                    .focus();
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

                $rootScope.$broadcast('load-modal-Locations', oInstance);
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
                ///Start:Slot:onOpenItem<<<
                ///End:Slot:onOpenItem<<<
            },
            filters: []
        });

        $scope.$on('load_CatGeoLocation', function(scope) {
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
