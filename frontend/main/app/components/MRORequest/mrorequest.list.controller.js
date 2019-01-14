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
                ///start:slot:afterCreate<<<
                ///end:slot:afterCreate<<<
            },
            afterLoad: function() {
                listCtrl.setRotationFocus();
                ///start:slot:afterLoad<<<
                ///end:slot:afterLoad<<<
            },
            afterSave: function(oEntity) {
                refresh();
                ///start:slot:afterSave<<<
                ///end:slot:afterSave<<<
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

                $rootScope.$broadcast('load-modal-MRO', oEntity.id);
                ///start:slot:onOpenItem<<<
                ///end:slot:onOpenItem<<<
            },
            filters: []
        });

        $scope.$on('load_MRORequest', function(scope) {
            refresh();
        });

        ///start:slot:js<<<
        ///end:slot:js<<<

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
