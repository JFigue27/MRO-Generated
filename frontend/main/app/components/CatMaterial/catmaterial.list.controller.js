'use strict';

/**
 * @ngdoc function
 * @name main.controller:CatMaterialListController
 * @description
 * # CatMaterialListController
 * Controller of the main
 */
angular
    .module('main')
    .controller('CatMaterialListController', function($scope, listController, $timeout, CatMaterialService, $mdDialog, $rootScope) {
        var listCtrl = new listController({
            scope: $scope,
            entityName: 'CatMaterial',
            baseService: CatMaterialService,
            afterCreate: function(oInstance, oEvent) {
                $mdDialog
                    .show({
                        contentElement: '#modal-Material',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                        multiple: true,
                        fullscreen: true,
                        targetEvent: oEvent
                    })
                    .then(() => {
                        refresh();
                    });

                $rootScope.$broadcast('load-modal-Material', oInstance);
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
                        contentElement: '#modal-Material',
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

                $rootScope.$broadcast('load-modal-Material', oEntity);
            },
            filters: []
        });

        $scope.$on('load_CatMaterial', function(scope) {
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
