'use strict';

/**
 * @ngdoc function
 * @name main.controller:MRORequestListController
 * @description
 * # MRORequestListController
 * Controller of the main
 */
angular
    .module('main')
    .controller('MRORequestListController', function($scope, listController, $timeout, MRORequestService, $mdDialog, $rootScope) {
        var listCtrl = new listController({
            scope: $scope,
            entityName: 'MRORequest',
            baseService: MRORequestService,
            afterCreate: function(oInstance, oEvent) {
                $scope.baseEntity = oInstance;
                $('input, md-checkbox')
                    .first()
                    .focus();
                $mdDialog
                    .show({
                        contentElement: '#modal-MRO',
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

                $rootScope.$broadcast('load-modal-MRO', oInstance);
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
                        contentElement: '#modal-MRO',
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

                $rootScope.$broadcast('load-modal-MRO', oEntity);
                ///Start:Slot:onOpenItem<<<
                ///End:Slot:onOpenItem<<<
            },
            filters: []
        });

        $scope.$on('load_MRORequest', function(scope) {
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
