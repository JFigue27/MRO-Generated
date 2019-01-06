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
                $mdDialog
                    .show({
                        contentElement: '#modal-MRO',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                        multiple: true,
                        fullscreen: true,
                        targetEvent: oEvent
                    })
                    .then(() => {
                        refresh();
                    });

                $rootScope.$broadcast('load-modal-MRO', oInstance);
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
            },
            filters: []
        });

        $scope.$on('load_MRORequest', function(scope) {
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
