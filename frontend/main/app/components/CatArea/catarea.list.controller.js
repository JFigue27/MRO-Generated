'use strict';

/**
 * @ngdoc function
 * @name main.controller:CatAreaListController
 * @description
 * # CatAreaListController
 * Controller of the main
 */
angular
    .module('main')
    .controller('CatAreaListController', function($scope, listController, $timeout, CatAreaService, $mdDialog, $rootScope) {
        var listCtrl = new listController({
            scope: $scope,
            entityName: 'CatArea',
            baseService: CatAreaService,
            afterCreate: function(oInstance, oEvent) {
                $scope.baseEntity = oInstance;
                $('input, md-checkbox')
                    .first()
                    .focus();
                $mdDialog
                    .show({
                        contentElement: '#modal-Area',
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

                $rootScope.$broadcast('load-modal-Area', oInstance);
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
                        contentElement: '#modal-Area',
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

                $rootScope.$broadcast('load-modal-Area', oEntity);
                ///Start:Slot:onOpenItem<<<
                ///End:Slot:onOpenItem<<<
            },
            filters: []
        });

        $scope.$on('load_CatArea', function(scope) {
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
